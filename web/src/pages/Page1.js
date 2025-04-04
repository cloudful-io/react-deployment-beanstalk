import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api/todos";

const Page1 = () => {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        axios.get(API_URL).then(res => setTodos(res.data));
    }, []);

    const addTodo = () => {
        if (!text) return;
        axios.post(API_URL, { text }).then(res => {
            setTodos([...todos, res.data]);
            setText("");
        });
    };

    const deleteTodo = (id) => {
        axios.delete(`${API_URL}/${id}`).then(() => {
            setTodos(todos.filter(todo => todo.id !== id));
        });
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: "20px" }}>
            <TextField fullWidth label="New Task" value={text} onChange={e => setText(e.target.value)} />
            <Button variant="contained" color="primary" onClick={addTodo} style={{ marginTop: "10px" }}>Add Task</Button>
            <List>
                {todos.map(todo => (
                    <ListItem key={todo.id}>
                        <ListItemText primary={todo.text} />
                        <IconButton edge="end" onClick={() => deleteTodo(todo.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};
  
export default Page1;