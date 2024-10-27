<template>
  <v-main>
    <v-container
      fluid
      class="fill-height"
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col class="text-center">
          <v-tooltip>
            <template #activator="{ on }">
              <v-btn
                icon
                large
                v-on="on"
              >
                <v-progress-circular
                  size="125"
                  indeterminate
                  color="accent"
                />
              </v-btn>
            </template>
            <span>Loading..</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>

export default {
  name: 'Loading',
}
</script>

<style scoped>
</style>