<template>
  <v-card class="fill-height">
    <DialogAddEditOrders
      :is-open="dialogues.addEditOrder"
      :action="action"
      @close-dialog="toggleDialog('addEditOrder')"
    />
    <v-card-title>
      <span class="mb-3 mb-md-0"> Encomendas </span>
      <v-spacer />
      <v-spacer />
      <v-text-field
        v-model="dataTable.search"
        append-icon="mdi-magnify"
        class="d-md-flex"
        label="Pesquisar"
        placeholder="Pesquise por encomendas"
        single-line
        hide-details
        outlined
        dense
      />
      <div class="d-flex align-center">
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn
              class="ml-3"
              elevation="1"
              fab
              small
              v-on="on"
              @click="addOrder()"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Adicionar encomenda</span>
        </v-tooltip>
        <router-link :to="'/orders/' + item.id" class="text-decoration-none">
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on"> mdi-open-in-new </v-icon>
            </template>
            <span>Ir para encomenda</span>
          </v-tooltip>
        </router-link>
      </div>
    </v-card-title>
    <v-text-field
      v-model="dataTable.search"
      append-icon="mdi-magnify"
      class="mx-4 mb-3 d-flex d-md-none"
      label="Pesquisar"
      single-line
      hide-details
    />
    <v-data-table
      id="tableUsers"
      :headers="dataTable.headers"
      :items="orders"
      :search="dataTable.search"
      :options="options"
      :loading="ordersLoading"
      loading-text="A carregar..."
      must-sort
      class="table-footer-bottom"
      no-data-text="Não foram encontrados registos de jogadores."
    >
      <template slot="progress">
        <v-progress-linear color="accent" indeterminate />
      </template>
      <!-- Column: Id -->
      <template #item.id="{ item }">
        <span> {{ item.id }} </span>
      </template>

      <!-- Column: orderDate -->
      <template #item.orderDate="{ item }">
        <span> {{ item.orderDate }} </span>
      </template>

      <!-- Column: product -->
      <template #item.product="{ item }">
        <span> {{ item.product }} </span>
      </template>
      <!-- Column: createdAt -->
      <template #item.createdAt="{ item }">
        <span> {{ getDateFormat(item.createdAt) }} </span>
      </template>

      <!-- Column: updatedAt -->
      <template #item.updatedAt="{ item }">
        <span> {{ getDateFormat(item.updatedAt) }} </span>
      </template>

      <!-- Column: action -->
      <template #item.action="{ item }">
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn icon @click="editItem(item)" v-on="on">
              <v-icon small> mdi-pencil </v-icon>
            </v-btn>
          </template>
          <span>Editar encomenda</span>
        </v-tooltip>
      </template>
      <template #no-data>
        <div class="fill-height empty-state-custom-class">
          <EmptyStateNoData
            v-if="!ordersLoading"
            icon="mdi-check-circle-outline"
            title="Não existem encomendas registadas"
            message="Ajuste os filtros para encontrar mais resultados"
            class-color="success white--text py-14"
            class-icon="white"
          />
        </div>
      </template>
      <template #loading>
        <v-skeleton-loader type="table-tbody" />
      </template>
    </v-data-table>
  </v-card>
</template>

<script type="text/javascript" src="./TableOrders.js"></script>

<style scoped>
.empty-state-custom-class {
  background-color: #4caf50;
  padding-top: 100px;
  padding-bottom: 96px;
}
</style>