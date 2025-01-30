<template>
  <div>
    <h2>Your Tasks</h2>
    <ul>
      <li v-for="todo in todos" :key="todo._id">
        <span :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }">
          {{ todo.title }}
        </span>
        <button @click="deleteTodo(todo._id)">Delete</button>
      </li>
    </ul>

    <input v-model="newTodo" placeholder="Add a new task" />
    <button @click="addTodo">Add</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      todos: [],
      newTodo: "",
    };
  },
  methods: {
    async fetchTodos() {
      try {
        const response = await axios.get("http://localhost:5000/api/todos");
        this.todos = response.data;
      } catch (err) {
        console.error("Error fetching todos:", err);
      }
    },
    async addTodo() {
      try {
        const response = await axios.post("http://localhost:5000/api/todos", {
          title: this.newTodo,
        });
        this.todos.push(response.data);
        this.newTodo = "";
      } catch (err) {
        console.error("Error adding todo:", err);
      }
    },
    async deleteTodo(id) {
      try {
        await axios.delete(`http://localhost:5000/api/todos/${id}`);
        this.todos = this.todos.filter((todo) => todo._id !== id);
      } catch (err) {
        console.error("Error deleting todo:", err);
      }
    },
  },
  created() {
    this.fetchTodos();
  },
};
</script>
