import { Router } from 'express';   
import pool from '../db.js';

const router = Router();

// Create a new todo
router.post('/', async (req, res) => { 
    try {
        const { description, completed } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todos (description, completed) VALUES ($1, $2) RETURNING *",
            [description, completed]
        );
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

export default router;