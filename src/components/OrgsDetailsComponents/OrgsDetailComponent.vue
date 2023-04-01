<template>
  <v-container>
    <!--    En cas d'absence de données ne rien afficher-->
    <v-container v-if="this.currentOrg != ''">
      <p>
        Bienvenue sur la page officielle de l'organisation <strong> {{ currentOrg.name }}</strong>

      </p>
      <p>
        Le giga mot de passe trop stylé est le suivant : <strong>{{ currentOrg.secret }}</strong>
      </p>

      <h3>
        Equipes :
      </h3>

      <v-btn
      @click="dialogAddEquipe = true; getTeamAddable()"
      color="green"
      >
        Ajouter une equipe
      </v-btn>

      <template>
        <v-simple-table>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">
                Team
              </th>
              <th class="text-left">
                Membres
              </th>
              <th class="text-left">
                Actions
              </th>


            </tr>
            </thead>
            <tbody>
            <tr
                v-for="team in currentOrg.teams"
                :key="team._id"
            >
              <td>{{ team.name }}</td>
              <td>{{ team.members.length }}</td>
              <td>
                <v-row>
                  <v-btn color="red" @click="deleteDialog=true; teamToDelete= team">Supp</v-btn>
                 <v-btn color="green" @click="selectedTeam(team._id)">Selectionner</v-btn>
                </v-row>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>
    </v-container>

    <v-container v-else>
      Achtung, ca ne marche pas !

      <router-link to="/orgs">
        <v-btn>Retour</v-btn>
      </router-link>
    </v-container>

    <v-dialog
        v-model="dialogAddEquipe"
        width="500"
        persistent
    >

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Ajouter une equipe
        </v-card-title>

        <v-card-text>
          Sélectionnez une équipe a ajouter
        </v-card-text>

        <v-autocomplete
            auto-select-first
            clearable
            :items="addableTeams"
            item-text="name"
            item-value="_id"
            v-model="teamToAdd"
        ></v-autocomplete>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              color="primary"
              text
              @click="dialogAddEquipe = false"
          >
            Annuler
          </v-btn>

          <v-btn
              color="primary"
              text
              @click="addTeam()"
          >
            Ajouter
          </v-btn>


        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
        v-model="deleteDialog"
        width="500"
    >

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Supression d'une équipe
        </v-card-title>

        <v-card-text>
          Voulez vous vraiment supprimer cette equipe ?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              color="primary"
              text
              @click="dialog = false"
          >
            Annuler
          </v-btn>

          <v-btn
              color="primary"
              text
              @click="suprimmerTeam(teamToDelete._id)"
          >
           Supprimer
          </v-btn>


        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>





</template>
<script>

export default {
  name: "OrgsDetailComponent",
  data() {
    return {
      deleteDialog: false,
      teamToDelete: null,
      dialogAddEquipe: false,
    };
  },
  methods: {
    selectedTeam(teamId) {
      this.$store.commit("selectTeam", this.currentOrg.teams.find(team => team._id === teamId));
      this.$router.push({ name: "TeamDetails", params: { id: teamId } });
    },
    suprimmerTeam(teamId) {
      this.$store.dispatch("removeTeam", {idTeam: teamId});
      this.deleteDialog = false;
    },
    getTeamAddable() {
      this.$store.dispatch("fetchTeams")
    },
    addTeam(){
      console.log("add team" + this.teamToAdd)
      this.$store.dispatch("addTeam", {idTeam: this.teamToAdd, idOrg: this.currentOrg._id});
      this.teamToAdd = null;
      this.$store.dispatch()
    }
  },
  computed: {
    currentOrg() {
      return this.$store.state.currentOrg;
    },
    addableTeams() {
      return this.$store.getters.addableTeams;
    }
  },
  mounted() {
    this.$store.dispatch("selectOrg", this.$route.params.id);
  }
}
</script>

<style scoped>

</style>