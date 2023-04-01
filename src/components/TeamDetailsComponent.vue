<template>
  <v-container>
    <h1>{{ team.name }}</h1>


    <v-card>
      <v-card-title>Membres :</v-card-title>
      <v-card-text>
        <v-data-table
            :headers="headers"
            :items="heroesOfTeam"
            :items-per-page="5"
            class="elevation-1"
        >
          <!--          Modifie le contenu de pouvoirs-->
          <template v-slot:[`item.pouvoir`]="{ item }">

            <v-chip
                v-for="pouvoir in item.powers"
                :key="pouvoir._id"
                :label="pouvoir.name"
                color="primary"
                small
            >{{ pouvoir.name }}
            </v-chip>
          </template>

          <!--          Modifie le contenu de actions-->
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editHero(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteHero(item)">
              mdi-delete
            </v-icon>
          </template>

        </v-data-table>
      </v-card-text>

        <v-btn color="primary" dark class="mb-2" @click="dialog = true ; updatedHero = null">
          Ajouter un Membre
        </v-btn>

      <v-card-actions>

        <v-dialog v-model="dialog" max-width="500px">


          <v-card>
            <v-card-title>{{ dialogTitle }}</v-card-title>

            <v-card-text>
              <v-form @submit.prevent="create">
                <v-text-field v-model="updatedHero.realName" label="Nom réél" required></v-text-field>
                <v-text-field v-model="updatedHero.publicName" label="Nom public" required></v-text-field>

                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                    <tr>
                      <th class="text-left">Nom</th>
                      <th class="text-left">Niveau</th>
                      <th class="text-left">Type</th>
                      <th class="text-left">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="pouvoir in updatedHero.powers" :key="pouvoir._id">
                      <td>
                        <v-text-field v-model="pouvoir.name" label="Nom" required></v-text-field>
                      </td>
                      <td>
                        <v-text-field v-model="pouvoir.level" label="Niveau" type="number" max="100" min="0" required></v-text-field>
                      </td>
                      <td>
                        <v-text-field v-model="pouvoir.type" label="Type" required></v-text-field>
                      </td>
                      <td>
                        <v-btn
                            class="ma-2"
                            text
                            icon
                            color="blue lighten-2"
                            @click="removePower(pouvoir)"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                <v-btn
                    class="ma-2"
                    text
                    icon
                    color="blue lighten-2"
                    @click=" updatedHero.powers.push({name: '', level: 0, type: ''})"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-btn color="blue darken-1" text @click="dialog = false; $store.dispatch('fetchTeamHeroes', team)">
                Annuler
              </v-btn>
              <v-btn color="blue darken-1" text @click="createNew">
                Sauvegarder
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>

  </v-container>
</template>

<script>
export default {
  name: "TeamDetailsComponent",
  data() {
    return {
      headers: [
        {text: "ID", value: "_id"},
        {text: "Nom Public", value: "publicName"},
        {text: "Nom réél", value: "realName"},
        {text: "Pouvoirs", value: "pouvoir"},
        {text: "Actions", value: "actions", sortable: false}
      ],
      headersPower: [
        {text: "Nom", value: "name"},
        {text: "Niveau", value: "level"},
        {text: "Type", value: "type", sortable: false}
      ],
      dialog: false,
      dialogTitle: "Ajouter un membre",
      updatedHero: {
        publicName: "",
        realName: "",
        powers: []
      },
    };
  },
  computed: {
    team() {
      return this.$store.state.currentTeam;
    },
    heroesOfTeam() {
      return this.$store.state.heroesOfTeam;
    }
  },
  methods: {
    deleteHero(hero) {
      this.$store.dispatch("removeHero", {hero: [hero], team: this.team})
    },
    editHero(item) {
      this.updatedHero = {...item};
      this.dialogTitle = "Modifier un membre";
      this.dialog = true;

    },
    removePower(pouvoir) {
      this.updatedHero.powers = this.updatedHero.powers.filter(p => p._id !== pouvoir._id);
    },
    createNew() {
      if (this.updatedHero._id) {
        this.$store.dispatch("updateHero", {hero: this.updatedHero})
      } else {
        this.$store.dispatch("createHero", {hero: this.updatedHero})
      }
      this.dialog = false;
    }
  },
  mounted() {
    this.$store.dispatch("fetchTeamHeroes", this.team)
  },

}
</script>

<style scoped>

</style>