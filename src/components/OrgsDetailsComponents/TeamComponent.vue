<template>
<v-container>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>
        {{ team.name }}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <p>Membres :</p>

        <v-row>
          <TeamMemberComponent  v-for="teamMember in team.members" :team-member="teamMember" v-bind:key="teamMember"/>

        </v-row>





      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</v-container>
</template>

<script>
import TeamMemberComponent from "@/components/OrgsDetailsComponents/TeamMemberComponent.vue";

export default {
  name: "TeamComponent",
  components: {TeamMemberComponent},
  props: {
    team: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>