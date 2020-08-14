<template>
  <v-data-table
    :headers="headers"
    :items="messageList"
    :loading="loading"
    sort-by="calories"
    class="elevation-1 mx-5 mb-5 shallow-shadow"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Audio Messages</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Audio Message</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-form ref="video_msg_form" :lazy-validation="true" @submit.prevent="save">
              <v-card-text>
                <v-container>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-text-field
                        dense
                        rounded
                        outlined
                        :rules="rules.title"
                        v-model="messageObj.m_title"
                        label="Message title"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-autocomplete
                        v-model="messageObj.m_categories"
                        :items="categoryList"
                        :rules="rules.category"
                        chips
                        dense
                        rounded
                        outlined
                        color="blue-grey lighten-2"
                        label="Message category"
                        item-text="c_name"
                        item-value="id"
                        return-object
                        multiple
                      >
                        <template v-slot:selection="data">
                          <v-chip
                            v-bind="data.attrs"
                            :input-value="data.selected"
                            small
                            close
                            @click="data.select"
                            @click:close="remove(data.item)"
                          >{{ data.item.c_name }}</v-chip>
                        </template>

                        <template v-slot:item="data">
                          <template v-if="typeof data.item !== 'object'">
                            <v-list-item-content v-text="data.item"></v-list-item-content>
                          </template>
                          <template v-else>
                            <v-list-item-avatar color="indigo">
                              <img
                                v-if="data.item.c_thumbnail"
                                :src="backendUrl+data.item.c_thumbnail"
                              />
                              <v-icon v-else dark>mdi-file-tree</v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title v-html="data.item.c_name"></v-list-item-title>
                            </v-list-item-content>
                          </template>
                        </template>
                      </v-autocomplete>
                    </v-col>

                    <v-col cols="12">
                      <v-autocomplete
                        v-model="messageObj.m_type"
                        :items="typeList"
                        :rules="rules.media_type"
                        chips
                        dense
                        rounded
                        outlined
                        color="blue-grey lighten-2"
                        label="Media type"
                        item-text="t_name"
                        item-value="id"
                        return-object
                      >
                        <template v-slot:selection="data">
                          <v-chip
                            v-bind="data.attrs"
                            :input-value="data.selected"
                            small
                          >{{ data.item.t_name }}</v-chip>
                        </template>

                        <template v-slot:item="data">
                          <template v-if="typeof data.item !== 'object'">
                            <v-list-item-content v-text="data.item"></v-list-item-content>
                          </template>
                          <template v-else>
                            <v-list-item-content>
                              <v-list-item-title v-html="data.item.t_name"></v-list-item-title>
                            </v-list-item-content>
                          </template>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        outlined
                        dense
                        rows="3"
                        no-resize
                        name="vid_desc"
                        label="Audio Description"
                        v-model="messageObj.m_description"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12">
                      <v-menu
                        ref="menu"
                        v-model="duration_menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="messageObj.m_duration"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="messageObj.m_duration"
                            label="Audio duration"
                            readonly
                            rounded
                            :rules="rules.duration"
                            outlined
                            dense
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="duration_menu"
                          v-model="messageObj.m_duration"
                          full-width
                          format="24hr"
                          use-seconds
                          @click:second="$refs.menu.save(messageObj.m_duration)"
                        ></v-time-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        dense
                        rounded
                        outlined
                        :rules="rules.link"
                        v-model="messageObj.m_link"
                        label="Audio Link"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-file-input
                        v-model="thumbnail"
                        color="primary"
                        counter
                        label="Upload thumbnail"
                        rounded
                        dense
                        accept="image/png, image/jpeg, image/bmp"
                        :rules="rules.thumbnail"
                        placeholder="Click to upload thumbnail"
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
    <template v-slot:[`item.m_thumbnail`]="{ item }">
        <v-avatar tile v-if="item.m_thumbnail">
          <img :src="backendUrl + item.m_thumbnail" alt="item thumbnail" />
        </v-avatar>
      </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon class="mr-2" @click="''">mdi-play</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="loadMessages">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    loading: false,
    dialog: false,
    duration_menu: false,
    thumbnail: [],
    headers: [
      {
        text: "Thumbnail",
        align: "start",
        sortable: false,
        value: "m_thumbnail",
      },
      {text: "Title", value: "m_title",},
      { text: "Media type", value: "m_type.t_name" },
      { text: "Duration", value: "m_duration" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    messageObj: {
      m_title: "",
      m_description: "",
      m_type: "",
      is_video: false,
      m_categories: [],
      m_thumbnail: "",
      m_link: "",
      m_duration: "",
      m_broadcast: false,
    },
    defaultMessageObj: {
      m_title: "",
      m_description: "",
      m_type: "",
      is_video: false,
      m_categories: [],
      m_thumbnail: "",
      m_link: "",
      m_duration: "",
      m_broadcast: false,
    },
    rules: {
      title: [(v) => !!v || "Message title is required"],
      category: [
        (v) =>
          (v && v.length >= 1) || "At least one message category is required.",
      ],
      media_type: [(v)=> v != "" || "Media type is required."],
      duration: [(v)=> v != "" || "Audio duration is required."],
      link: [(v)=> v != "" || "Audio link is required."],
      thumbnail: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!",
      ],
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Create new audio message"
        : "Edit message";
    },
    ...mapGetters({
      categoryList: "message/getMessageCategories",
      typeList: "message/getTypes",
      backendUrl: "auth/backendUrl",
      messageList: "message/getMessages",
    }),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.fetchMessageTypes();
    this.fetchMessageCategories();
    this.loadMessages();
  },

  methods: {
    ...mapActions({
      fetchMessageTypes: "message/fetchTypes",
      fetchMessageCategories: "message/fetchCategories",
      postMessage: "message/post",
      fetchMessages: "message/fetchMessages",
    }),
    loadMessages(){
      this.loading = true;
      this.fetchMessages(this.messageObj.is_video).then(
        (res) => {
          console.log(res);
          this.loading = false;
        },
        (err) => {
          console.log(err)
          this.loading = false;
        }
      )
    },
    remove(item) {
      const index = this.messageObj.m_categories.indexOf(item);
      if (index >= 0) this.messageObj.m_categories.splice(index, 1);
    },

    editItem(item) {
      this.editedIndex = this.messageList.indexOf(item);
      this.messageObj = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$refs.video_msg_form.reset();
      this.$nextTick(() => {
        this.messageObj = Object.assign({}, this.defaultMessageObj);
        this.editedIndex = -1;
      });
    },

    save() {
      if(!this.$refs.video_msg_form.validate()) return;

      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.loading = true;
        let formData = new FormData();
        let rawData = JSON.stringify(this.messageObj);
        formData.append("file", this.thumbnail);
        formData.append("data", rawData);
        this.postMessage(formData).then(
          (res) => {
            console.log(res);
            this.loading = false;
          },
          (err) => {
            console.log(err);
            this.loading = false;
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