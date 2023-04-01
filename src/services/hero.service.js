
import myAxios from "@/services/axios.service";
import store from '../store';

const getaliases = () => {
    return myAxios.get('heroes/getaliases');
}
const createhero = (hero) => {
    return myAxios.post('heroes/create', hero);
}

const updatehero = (hero) => {
    return myAxios.put('heroes/update'+ '?org-secret=' + store.state.secretOrg, hero );
}

const getherobyid = (id) => {
    return myAxios.get('heroes/getbyid/' + id + '?org-secret=' + store.state.secretOrg);
}

export {
    getaliases,
    createhero,
    updatehero,
    getherobyid
}