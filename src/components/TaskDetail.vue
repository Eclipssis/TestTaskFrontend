<template>
  <v-card>
    <v-card-title class="indigo white--text headline">
      Task detail
    </v-card-title>

    <div v-if="task">
      <v-form v-model="valid">
        <v-container grid-list-md>
          <v-layout align-center row wrap>
            <v-flex xs2>
              Title*:
            </v-flex>
            <v-flex xs10>
              <v-text-field
                v-model="task.name"
                :rules="nameRules"
                :counter="20"
                label="Task title"
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs2>
              Deadline*:
            </v-flex>
            <v-flex xs10>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="task.due_date"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="task.due_date"
                  label="Picker in menu"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="task.due_date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menu = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    flat
                    color="primary"
                    @click="$refs.menu.save(task.due_date)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-flex>

            <v-flex xs2>
              Description:
            </v-flex>
            <v-flex xs10>
              <v-textarea
                label="Description"
                v-model="task.description"
                hint="Description hint"
              ></v-textarea>
            </v-flex>
          </v-layout>

          <div class="text-md-right">
            <v-btn color="success" @click="saveTask">Save</v-btn>
          </div>
        </v-container>
      </v-form>
    </div>
    <v-card-text v-else>There is no task. Please choose some one</v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    menu: false,
    valid: true,
    nameRules: [v => !!v || "Name is required"]
  }),

  computed: {
    ...mapGetters({
      task: "GET_CURRENT_TASK"
    })
  },

  methods: {
    saveTask() {
      this.$store.commit("SAVE_CURRENT_TASK", this.task);
    }
  }
};
</script>

<style scoped></style>
