<template>
  <v-form ref="formCreateOrder" lazy-validation submit.prevent="handleSubmit">
    <v-dialog
      :value="isOpen"
      max-width="600"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      scrollable
      @click:outside="closeDialog()"
    >
      <v-card>
        <v-card-title>
          {{ title }}
          <v-spacer />
          <v-btn icon class="mr-n2" @click="closeDialog()">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="py-2">
          <v-row dense>
            <v-col v-if="error">
              <v-alert type="error" icon="mdi-alert">
                {{ error }}
              </v-alert>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                v-model="form.userId"
                :items="users"
                item-text="fullName"
                item-value="id"
                :rules="rules.userId"
                label="Jogador"
                outlined
              />
            </v-col>
            <v-col cols="12">
                <DatePicker
                v-model="form.orderDate"
                :rules="rules.orderDate"
                label="Dia da encomenda"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="form.product"
                :rules="rules.product"
                label="Produto"
                outlined
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeDialog()"> Cancelar </v-btn>
          <v-btn
            outlined
            color="success"
            text-color="success"
            :disabled="submitting"
            @click="handleSubmit"
          >
            <v-icon v-if="submitting"> mdi-loading mdi-spin </v-icon>
            <span v-else>Guardar</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>
    
<script type="text/javascript" src="./DialogAddEditOrders.js"></script>
    