import Vue from 'vue'
import Vuex from 'vuex'
import {getOrgs, createOrg, getOrg, removeTeam, addTeam} from '@/services/org.service';
import {getteams, createteam, removeheroes} from '@/services/team.service';
import {createhero, getherobyid, updatehero} from '@/services/hero.service';


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        secretOrg: '',
        heroAlias: [],
        currentHero: '',
        teams: [],
        currentTeam: '',
        orgs: [],
        currentOrg: '',
        heroesOfTeam: []
    },
    getters: {
        orgs: state => state.orgs,
        getCurrentOrg: state => state.currentOrg,
        addableTeams: state => {
            const addableTeams = state.teams.filter(team => {
                return !state.currentOrg.teams.some(t => t._id === team._id);
            });

            return addableTeams;
        }
    },
    mutations: {
        setPassword(state, secretOrg) {
            state.secretOrg = secretOrg;
        },
        setOrgs(state, orgs) {
            state.orgs = orgs;
        },
        setCurrentOrg(state, org) {
            state.currentOrg = org;
        },
        addOrg(state, org) {
            state.orgs.push(org);
        },

        // TEAMS
        setTeams(state, teams) {
            state.teams = teams;
        },
        addNewTeam(state, team) {
            state.teams.push(team);
        },
        selectTeam(state, team) {
            state.currentTeam = team;
        },


        //HEROES
        setHeroes(state, heroes) {
            state.heroesOfTeam = heroes;
        },
        updateHero(state, hero) {
            state.heroesOfTeam = state.heroesOfTeam.map(h => {
                if (h._id === hero._id) {
                    return hero;
                }
                return h;
            });
        },
        addNewHero(state, hero){
            state.heroesOfTeam.push(hero);
        }

    },
    actions: {
        async fetchOrgs({commit}) {
            try {
                const orgs = await getOrgs();
                commit('setOrgs', orgs.data.data);
            } catch (error) {
                console.error(error);
            }
        },
        async createOrg({commit}, {name, secret}) {
            try {
                const org = await createOrg({name, secret});
                commit('addOrg', org);
            } catch (error) {
                console.error(error);
            }
        },
        async selectOrg({commit}, orgId) {
            try {
                const org = await getOrg(orgId);
                commit('setCurrentOrg', org.data.data[0]);
            } catch (error) {
                console.error(error);
            }
        },
        async removeTeam({commit}, teamId) {
            try {
                const org = await removeTeam(teamId);
                commit('setCurrentOrg', org.data.data);
            } catch (error) {
                console.error(error);
            }
        },
        async addTeam({dispatch}, teamId) {
            try {
                const org = await addTeam(teamId);
                //ici je fais un fetch de l'orga car le retour de l'api n'est pas le bon
                dispatch('selectOrg', org.data.data._id);
            } catch (error) {
                console.error(error);
            }
        },


//########################Teams
        async fetchTeams({commit}) {
            try {
                const teams = await getteams();
                commit('setTeams', teams.data.data);
            } catch (error) {
                console.error(error);
            }
        },

        async createTeam({commit}, team) {
            try {
                const newTeam = await createteam(team);
                commit('addNewTeam', newTeam.data.data);
            } catch (error) {
                console.error(error);
            }
        },

        async removeHero({commit}, hero) {
            try {
                const team = await removeheroes({idTeam: hero.teamId, idHeroes: hero.heroId});
                commit('selectTeam', team.data.data);

            }
            catch (error) {
                console.error(error);
            }
        },

//########################Heroes
        async fetchTeamHeroes({commit}, team) {
            console.log(team)
            try {
                const heroes = [];
                for (const hero of team.members) {
                    const heroData = await getherobyid(hero);
                    heroes.push(heroData.data.data[0]);
                }
                commit('setHeroes', heroes);
            } catch (error) {
                console.error(error);
            }

        },
        async updateHero({commit}, hero) {
            try {
                const heroData = await updatehero(hero);
                commit('updateHero', heroData.data.data)
            } catch (error) {
                console.error(error);
            }
        },
        async createHero({commit}, hero){
            try{
                const newHero = await createhero({publicName:hero.publicName, realName:hero.realName, powers:[{}]});
                commit("addNewHero", newHero);
            }catch(error){
                console.error(error);
            }
        }

    },
    modules: {}
})
