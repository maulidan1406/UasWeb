import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos';

export default {
  getTodos() {
    return axios.get(API_URL);
  },
  addTodo(todo) {
    return axios.post(API_URL, todo);
  },
  toggleTodo(id) {
    return axios.patch(`${API_URL}/${id}`);
  },
  deleteTodo(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
};
