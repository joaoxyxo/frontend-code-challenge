<template>
  <div class="full-height">
    <v-container>
      <v-row
        align="center" 
        justify="center" 
        class="fill-height"
      >
        <v-col cols="12" sm="6" md="4">
          <v-btn
            color="primary"
            dark
            block
            class="mb-2"
            @click="goToOrders()"
          >
            Orders
          </v-btn>
          <v-btn
            color="green"
            dark
            block
            @click="goToUsers()"
          >
            Users
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script type="text/javascript" src="./Home.js"></script>

<style scoped>
.full-height {
  height: 100vh; /* Garante que o container ocupe toda a altura da tela */
}
</style>
