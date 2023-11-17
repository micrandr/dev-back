import http from '../services/http-common';

const getAll = () => {
    return http.get('/course_modules');
}

const get = id => {
    return http.get(`/course_modules/${id}`);
}

const create = data => {
    return http.post("/course_modules", data);
}

const update = (id, data) => {
    return http.put(`/course_modules/${id}`, data);
};
  
const remove = id => {
    return http.delete(`/course_modules/${id}`);
};

  
const removeAll = () => {
    return http.delete(`/courses`);
};
    
const findByTitle = title => {
    return http.get(`/tutorials?title=${title}`);
};
  
const CourseModule = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};

  
export default CourseModule;