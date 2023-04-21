// src/controllers/todoController.js

const { User } = require('../models/user');
const { Todo } = require("../models/todo");

// Create a new todo task
const createTodo = async (req, res) => {
  const { title, status, userId } = req.body;

  try {
    // Create a new todo in the database
    const newTodo = await Todo.create({ title, status, userId });

    return res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all todo tasks for a specific user
const getTodosByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find all todos associated with the user in the database
    const todos = await Todo.findAll({ where: { userId }, include: [User] });

    return res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update the status of a todo task
const updateTodoStatus = async (req, res) => {
  const { todoId, status } = req.body;
  try {
    // Find the todo by id in the database
    const todo = await Todo.findOne({ where: { id: todoId } });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Update the status of the todo
    todo.status = status;
    await todo.save();

    return res.status(200).json(todo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete a todo task
const deleteTodo = async (req, res) => {
  const { todoId } = req.params;

  try {
    // Find the todo by id in the database
    const todo = await Todo.findOne({ where: { id: todoId } });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Delete the todo
    await todo.destroy();

    return res.status(204).json();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createTodo,
  getTodosByUser,
  updateTodoStatus,
  deleteTodo,
};

