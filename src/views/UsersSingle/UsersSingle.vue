<template>
  <div class="pa-6">
    <h1>Single user ID: {{ $route.params.id }}</h1>
    <code> {{ selectedUser }}</code>
    <router-link :to="'/users/'" class="text-decoration-none">
    <v-btn>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
         Voltar <v-icon v-bind="attrs" v-on="on"> mdi-open-in-new </v-icon>
        </template>
        <span>Ir para a página dos jogadores</span>
      </v-tooltip>
      </v-btn>
    </router-link>
  </div>
</template>

<script type="text/javascript" src="./UsersSingle.js"></script>