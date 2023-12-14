import http from '../services/http-common';

const getAll = () => {
    return http.get('/levels');
}

const get = id => {
    return http.get(`/levels/${id}`);
}

const create = data => {
    return http.post("/levels", data);
}

const update = (id, data) => {
    return http.put(`/levels/${id}`, data);
};
  
const remove = id => {
    return http.delete(`/levels/${id}`);
};

  
const removeAll = () => {
    return http.delete(`/levels`);
};
    
const findByTitle = title => {
    return http.get(`/levels?title=${title}`);
};
  
const LevelService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};

  
export default LevelService;