import http from '../services/http-common';

const getAll = () => {
    return http.get('/types');
}

const get = id => {
    return http.get(`/types/${id}`);
}

const create = data => {
    return http.post("/types", data);
}

const update = (id, data) => {
    return http.put(`/types/${id}`, data);
};
  
const remove = id => {
    return http.delete(`/types/${id}`);
};

  
const removeAll = () => {
    return http.delete(`/levels`);
};
    
const findByTitle = title => {
    return http.get(`/types?title=${title}`);
};
  
const TypeService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};

  
export default TypeService;