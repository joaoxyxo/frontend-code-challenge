<template>
  <v-sheet
    class="pa-6 text-center"
    :color="classColor"
  >
    <v-sheet
      class="mx-auto rounded-circle d-flex justify-center ma-3"
      height="64"
      width="64"
      color="rgb(0, 0, 0, 0.08)"
    >
      <v-icon
        large
        :color="classIcon"
      >
        {{ icon }}
      </v-icon>
    </v-sheet>
    <h1 class="mb-2 title">
      {{ title }}
    </h1>
    <p class="body-2">
      {{ message }}
      <slot name="messageInput" />
    </p>
  </v-sheet>
</template>

<script type="text/javascript" src="./EmptyStateNoData.js"></script>