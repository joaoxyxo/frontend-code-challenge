<template>
  <div>
    <v-menu
      v-model="menu"
      :disabled="disabled"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template #activator="{ on, attrs }">
        <v-text-field
          v-model="computedValue"
          :label="label"
          :rules="rules"
          :disabled="disabled"
          prepend-inner-icon="mdi-calendar"
          append-icon="mdi-chevron-down"
          readonly
          :outlined="outlined"
          :dense="dense"
          :hide-details="hideDetails"
          v-bind="attrs"
          v-on="on"
          @click:prepend-inner="menu = true"
          @click:append="menu = true"
        />
      </template>
      <v-date-picker
        v-model="computedValue"
        :min="dateMinValue"
        :max="dateMaxValue"
        @input="menu = false"
      />
    </v-menu>
  </div>
</template>

<script type="text/javascript" src="./DatePicker.js"></script>
