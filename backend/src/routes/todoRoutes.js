// src/routes/todoRoutes.js

const express = require("express");
const {
  createTodo,
  getTodosByUser,
  updateTodoStatus,
  deleteTodo,
} = require("../controllers/todoController");

const router = express.Router();

// Create a new todo route
router.post("/todos", createTodo);

// Get all todos of a user route
router.get("/todos/:userId", getTodosByUser);

// Update the status of a todo route
router.put("/todos/:todoId/status", updateTodoStatus);

// Delete a todo route
router.delete("/todos/:todoId", deleteTodo);

module.exports = router;
