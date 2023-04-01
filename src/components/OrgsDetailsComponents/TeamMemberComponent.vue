<template>
  <v-card class="mx-auto" max-width="400">
    <v-card-title class="headline">{{ teamMember }}</v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "TeamMemberComponent",
  props: {
    teamMember: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>