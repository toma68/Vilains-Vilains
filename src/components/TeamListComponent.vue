<template>
  <v-card>
    <v-card-title>Teams</v-card-title>
    <v-card-text>
      <v-data-table
          :headers="headers"
          :items="teams"
          :items-per-page="5"
          class="elevation-1"
      ></v-data-table>
    </v-card-text>

    <v-card-actions>

      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
            Nouvelle team
          </v-btn>
        </template>

        <v-card>
          <v-card-title>{{ dialogTitle }}</v-card-title>

          <v-card-text>
            <v-form @submit.prevent="createOrg">
              <v-text-field v-model="teamName" label="Nom" required></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Annuler
            </v-btn>

            <v-btn color="blue darken-1" text @click="createNewTeam">
              Sauvegarder
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      headers: [
        { text: "ID", value: "_id" },
        { text: "Nom", value: "name" }
      ],
      dialog: false,
      teamName: "",
      selectedTeamId: null,
    };
  },
  computed: {
    dialogTitle() {
      return this.selectedTeamId
          ? "Modifier la team"
          : "Créer une Team";
    },
    ...mapState(["teams"]),
  },
  methods: {
    ...mapActions(["fetchTeams", "createTeam"]),

    async createNewTeam() {
      const team = {
        name: this.teamName,
      };
      await this.createTeam(team);
      this.dialog = false;
    },
  },
  mounted() {
    this.fetchTeams();
  },
};
</script>
