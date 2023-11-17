import http from '../services/http-common';

const getAll = () => {
    return http.get('/courses');
}

const get = id => {
    return http.get(`/courses/${id}`);
}

const create = data => {
    return http.post("/courses", data);
}

const update = (id, data) => {
    return http.put(`/courses/${id}`, data);
};
  
const remove = id => {
    return http.delete(`/courses/${id}`);
};

const getTypes = data => {
    return http.get(`/course_types`)
}

const createType = data => {
    return http.post(`/course_types`, data )
}

const getAllCategories = () => {
    return http.get('/course_categories');
}

const createCategory = data => {
    return http.post(`/course_categories`, data )
}

const updateCategory = (id, data) => {
    return http.put(`/course_categories/${id}`, data);
};

const getCategory = id => {
    return http.get(`/course_categories/${id}`);
}
  
const removeAll = () => {
    return http.delete(`/courses`);
};
    
const findByTitle = title => {
    return http.get(`/tutorials?title=${title}`);
};
  
const CourseService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle,
    createType,
    getTypes,
    getAllCategories,
    createCategory,
    getCategory,
    updateCategory
};

  
export default CourseService;