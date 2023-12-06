import http from './http-common';

const getAll = () => {
    return http.get('/subscribers');
}

const get = id => {
    return http.get(`/subscribers/${id}`);
}

const create = data => {
    return http.post("/subscribers", data);
}

const update = (id, data) => {
    return http.put(`/subscribers/${id}`, data);
};
  
const remove = id => {
    return http.delete(`/subscribers/${id}`);
};
  
const removeAll = () => {
    return http.delete(`/subscribers`);
};
    
const findByTitle = title => {
    return http.get(`/subscribers?title=${title}`);
};
  
const UserService = {
    getAll,
    get,
    create,
    update,
    remove,
   //removeAll,
   //findByTitle,
};

  
export default UserService;