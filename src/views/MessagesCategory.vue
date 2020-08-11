<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="categoryList"
      :loading="loading"
      sort-by="calories"
      hide-default-footer
      class="elevation-1 mx-5 mb-5 shallow-shadow"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Message Categories</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Add new category</v-btn>
            </template>
            <v-card>
              <v-form style="padding:0" ref="category_form" :lazy-validation="true" @submit.prevent="save">
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container class="pa-0">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          rounded
                          outlined
                          dense
                          :rules="rules.category_name"
                          v-model="editedItem.c_name"
                          label="Category name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          rounded
                          outlined
                          dense
                          v-model="editedItem.c_description"
                          label="Description"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-file-input
                          v-model="thumbnail"
                          color="primary"
                          counter
                          label="Upload avatar"
                          rounded
                          dense
                          accept="image/png, image/jpeg, image/bmp"
                          :rules="rules.avatar"
                          placeholder="Click to upload avatar"
                          prepend-icon
                          append-icon="mdi-camera"
                          outlined
                          :show-size="1000"
                        >
                          <template v-slot:selection="{ index, text }">
                            <v-chip
                              v-if="index < 2"
                              color="deep-purple accent-4"
                              dark
                              label
                              small
                            >{{ text }}</v-chip>
                            <span
                              v-else-if="index === 2"
                              class="overline grey--text text--darken-3 mx-2"
                            >+{{ files.length - 2 }} File(s)</span>
                          </template>
                        </v-file-input>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="''">mdi-delete</v-icon>
      </template>
      <template v-slot:[`item.c_thumbnail`]="{ item }">
        <v-avatar tile v-if="item.c_thumbnail">
          <img :src="backendUrl + item.c_thumbnail" alt="item thumbnail" />
        </v-avatar>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="loadCategories">Reset</v-btn>
      </template>
    </v-data-table>
    <div class="text-center">
      <v-pagination v-if="pages > 1" circle v-model="page" :length="3"></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    loading: false,
    dialog: false,
    page: 1,
    pages: '',
    thumbnail: [],
    headers: [
      {
        text: "Thumbnail",
        align: "start",
        sortable: false,
        value: "c_thumbnail",
      },
      { text: "Category Name", value: "c_name" },
      { text: "Description", value: "c_description" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    categories: [],
    editedIndex: -1,
    editedItem: {
      c_name: "",
      c_description: "",
      c_thumbnail: "",
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      c_name: "",
      c_description: "",
      c_thumbnail: "",
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    rules: {
      category_name: [(v) => !!v || "First name is required"],
      avatar: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!",
      ],
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Category" : "Edit Category";
    },
    ...mapGetters({
      backendUrl: "auth/backendUrl",
      categoryList: "category/getCategories",
    }),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    page() {
      this.loadCategories();
    },
  },

  created() {
    this.loadCategories();
  },

  methods: {
    ...mapActions({
      createCategory: "category/create",
      getCategories: "category/get",
      updateCategory: "category/edit",
    }),

    loadCategories() {
      this.loading = true;
      this.getCategories(this.page).then(
        (res) => {
          console.log(res);
          this.pages = res.links.pages;
          this.loading = false;
        },
        (err) => {
          console.log(err);
          this.loading = false;
        }
      );
    },

    editItem(item) {
      this.editedIndex = this.categoryList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    // deleteItem(item) {
    //   const index = this.desserts.indexOf(item);
    //   confirm("Are you sure you want to delete this item?") &&
    //     this.desserts.splice(index, 1);
    // },

    close() {
      this.dialog = false;
      this.$refs.category_form.reset()
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        console.log("***** Puting item  *******");
        this.loading = true;
        let formData = new FormData();
        let rawData = JSON.stringify(this.editedItem);
        formData.append("data", rawData);
        formData.append("file", this.thumbnail);
        this.updateCategory([this.editedItem.id, formData]).then(
          ()=>{
            this.loading = false;
          },
          (err)=>{
            console.log(err);
            this.loading = false;
          }
        );
      } else {
        this.loading = true;
        let formData = new FormData();
        let rawData = JSON.stringify(this.editedItem);
        formData.append("file", this.thumbnail);
        formData.append("data", rawData);
        this.createCategory(formData).then(
          () => {
            this.loading = false;
          },
          (err) => {
            this.loading = false;
            console.log(err);
          }
        );
      }
      this.close();
    },
  },
};
</script>

<style>
</style>