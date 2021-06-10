<template>
  <v-app>
    <v-app-bar app color="teal lighten-1" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>My personal costs</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="teal--text text--accent-4"
        >
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item to="/add/payment">
            <v-list-item-icon>
              <v-icon>mdi-cash-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Add new cost</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main app>
      <router-view />
    </v-main>
    <v-footer padless fixed>
      <v-col class="text-center teal--text" cols="12">
        {{ new Date().getFullYear() }}
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { API } from "@/const";
import { mapActions } from "vuex";
export default {
  name: "App",
  data: () => ({
    drawer: false,
    group: null
  }),
  mounted() {
    this.loadPaymentList(`${API}paymentList.json`);
    this.loadCategories(`${API}categories.json`);
  },
  methods: {
    ...mapActions(["loadPaymentList", "loadCategories"])
  }
};
</script>
