import myAxios from "@/services/axios.service";
import store from '@/store/index.js';

const getOrgs = () => {
    return myAxios.get("orgs/get");
}
 const createOrg = (org) => {
     console.log("createOrg", org)
    return myAxios.post("orgs/create", org);
}

const addTeam = (team) => {
    return myAxios.patch("orgs/addteam"+ "?org-secret=" + store.state.secretOrg,
        team);
}

const removeTeam = (team) => {
    return myAxios.patch("orgs/removeteam"+ "?org-secret=" + store.state.secretOrg,
        team);
}

const getOrg = (id) => {
    return myAxios.get("orgs/getbyid/" + id + "?org-secret=" + store.state.secretOrg);
}

export {
    getOrgs,
    createOrg,
    addTeam,
    removeTeam,
    getOrg
}