<template>
  <v-navigation-drawer
    app
  >
    <v-list dense>
      <v-list-item
        v-for="item in routes"
        :key="item.name"
        :to="item.link"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

  </v-navigation-drawer>
</template>

<script type="text/javascript" src="./Sidebar.js"></script>