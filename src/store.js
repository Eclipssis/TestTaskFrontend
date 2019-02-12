import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentTask: null,
    usersList: null
  },
  getters: {
    GET_CURRENT_TASK(state) {
      return state.currentTask ? Object.assign({}, state.currentTask) : null;
    },
    GET_USERS_LIST(state) {
      return state.usersList;
    }
  },
  mutations: {
    SET_CURRENT_TASK(state, payload) {
      state.currentTask = payload;
    },
    SAVE_CURRENT_TASK(state, payload) {
      state.usersList.forEach((user, index) => {
        let taskIndex = user.children.findIndex(task => {
          return task.id === payload.id;
        });

        state.usersList[index].children[taskIndex] = payload;
      });
    },
    SET_USERS_LIST(state, payload) {
      let users = [];

      payload.forEach(user => {
        users.push({
          name: user.name,
          children: user.tasks
        });
      });

      Vue.set(state, "usersList", users);
    }
  },
  actions: {
    FETCH_USERS(context) {
      // Имитация backend API
      return new Promise(resolve => {
        setTimeout(() => {
          const data = [
            {
              id: 1,
              name: "James Bond",
              tasks: [
                {
                  id: 1,
                  name: "Build the space ship",
                  due_date: "2019-02-22"
                },
                {
                  id: 2,
                  name: "Destroy darknet",
                  due_date: "2019-03-15"
                },
                {
                  id: 3,
                  name: "Drink beer",
                  due_date: "2019-04-12"
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
                  due_date: "2019-03-22"
                },
                {
                  id: 5,
                  name: "Improve economics",
                  due_date: "2019-04-25"
                },
                {
                  id: 6,
                  name: "Get rest",
                  due_date: "2019-05-12"
                }
              ]
            }
          ];

          context.commit("SET_USERS_LIST", data);
          resolve(data);
        }, 1500);
      });
    }
  }
});
