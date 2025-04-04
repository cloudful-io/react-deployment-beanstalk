const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const PORT = 8080;

app.use(cors())
app.use(bodyParser.json());

let todos = [];

   // Get all todos
   app.get("/api/todos", (req, res) => {
       res.json(todos);
   });

   // Add a new todo
   app.post("/api/todos", (req, res) => {
       const { text } = req.body;
       if (!text) return res.status(400).json({ error: "Text is required" });
       const newTodo = { id: Date.now(), text };
       todos.push(newTodo);
       res.json(newTodo);
   });

   // Delete a todo
   app.delete("/api/todos/:id", (req, res) => {
       const { id } = req.params;
       todos = todos.filter(todo => todo.id !== parseInt(id));
       res.json({ message: "Todo deleted" });
   });

   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));