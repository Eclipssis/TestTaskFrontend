<template>
  <v-app>
    <v-content>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs4>
            <UserList />
          </v-flex>

          <v-flex xs4></v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import UserList from "./components/UserList";

export default {
  name: "App",
  components: {
    UserList
  },
  data() {
    return {
      //
    };
  }
};
</script>
