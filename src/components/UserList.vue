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
  </v-card>
</template>

<script>
export default {
  data: () => ({
    users: [],
    showUserSpiner: false
  }),

  mounted() {
    this.showUserSpiner = true;

    // Имитация backend API
    const fetchedUsers = new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: "James Bond",
            tasks: [
              {
                id: 1,
                name: "Build the space ship",
                due_date: "22.02.2019"
              },
              {
                id: 2,
                name: "Destroy darknet",
                due_date: "15.03.2019"
              },
              {
                id: 3,
                name: "Drink beer",
                due_date: "12.04.2019"
              }
            ]
          },
          {
            id: 2,
            name: "Donald Trump",
            tasks: [
              {
                id: 4,
                name: "Make US better",
                due_date: "22.03.2019"
              },
              {
                id: 5,
                name: "Improve economics",
                due_date: "25.04.2019"
              },
              {
                id: 6,
                name: "Get rest",
                due_date: "12.05.2019"
              }
            ]
          }
        ]);
      }, 1500);
    });

    fetchedUsers.then(users => {
      users.forEach(user => {
        this.users.push({
          name: user.name,
          children: user.tasks
        });
      });

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
