<template>
  <v-row wrap no-gutters>
    <v-col cols="12">
      <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Date of birth"
            append-icon="mdi-calendar"
            readonly
            rounded
            dense
            outlined
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
        </v-date-picker>
      </v-dialog>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "AppDatePicker",
  data: () => ({
    date: null,
    menu: false,
    modal: false
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
};
</script>