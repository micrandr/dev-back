import http from '../services/http-common';

const getAll = () => {
    return http.get('/user_skills');
}

const get = id => {
    return http.get(`/user_skills/${id}`);
}

const create = data => {
    return http.post("/user_skills", data);
}

const update = (id, data) => {
    return http.put(`/user_skills/${id}`, data);
};
  
const remove = id => {
    return http.delete(`/user_skills/${id}`);
};

  
const removeAll = () => {
    return http.delete(`/levels`);
};
    
const findByTitle = title => {
    return http.get(`/user_skills?title=${title}`);
};
  
const SkillService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};

  
export default SkillService;