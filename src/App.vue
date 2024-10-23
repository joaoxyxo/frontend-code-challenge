<template>
  <v-app>
    <v-app-bar app color="black" dark>
      <div class="d-flex align-center">
        <h2>Frontend Code Challenge</h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/joaoxyxo/frontend-code-challenge"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <Sidebar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import HomePage from "./views/Home/Home.vue";
import Sidebar from "./components/Sidebar/Sidebar.vue";

export default {
  name: "App",

  components: {
    HomePage,
    Sidebar,
  },

  data: () => ({
    //
  }),
};
</script>
