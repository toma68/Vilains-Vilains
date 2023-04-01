import myAxios from "@/services/axios.service";


const getteams = () => {
    return myAxios.get('teams/get');
}
const createteam = (team) => {
    return myAxios.post('teams/create', team);
}

const addheroes = (heroes) => {
    return myAxios.patch('teams/addheroes', heroes);
}

const removeheroes = (heroes) => {
    return myAxios.patch('teams/removeheroes', heroes);
}

export  {
    getteams,
    createteam,
    addheroes,
    removeheroes
}