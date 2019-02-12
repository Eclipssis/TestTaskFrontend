<template>
  <v-card>
    <v-card-title class="indigo white--text headline">
      Users
    </v-card-title>
    <v-progress-circular
      v-if="showUserSpiner"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <v-expansion-panel v-else>
      <v-expansion-panel-content v-for="(user, index) in users" :key="index">
        <div slot="header">{{ user.name }}</div>
        <v-card>
          <div v-for="(task, index) in user.children" :key="index">
            <span class="subheading" @click="showDetails(task)"
              >{{ task.name }} ({{ task.due_date }})</span
            >
          </div>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    {{ users }}
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    showUserSpiner: false
  }),

  computed: {
    ...mapGetters({
      users: "GET_USERS_LIST"
    })
  },

  mounted() {
    this.showUserSpiner = true;
    this.$store.dispatch("FETCH_USERS").then(() => {
      this.showUserSpiner = false;
    });
  },

  methods: {
    showDetails(task) {
      this.$store.commit("SET_CURRENT_TASK", task);
    }
  }
};
</script>
<style>
.subheading {
  display: inline-block;
  cursor: pointer;
  margin-left: 40px;
  margin-bottom: 8px;
  font-size: 14px !important;
}

.subheading:hover {
  color: #1867c0;
}

.v-progress-circular {
  margin: 15px;
}
</style>
