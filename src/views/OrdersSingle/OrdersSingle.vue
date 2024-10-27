<template>
  <div class="pa-6">
    <h1>Single order ID: {{ $route.params.id }}</h1>
    <router-link :to="'/orders/'" class="text-decoration-none">
    <v-btn>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
        Voltar <v-icon v-bind="attrs" v-on="on"> mdi-open-in-new </v-icon>
        </template>
        <span>Ir para a página das encomendas</span>
      </v-tooltip>
      </v-btn>
    </router-link>
    <div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./OrdersSingle.js"></script>