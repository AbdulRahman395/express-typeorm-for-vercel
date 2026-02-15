import { Router } from 'express';
import { createTodo, getTodos, getSingleTodo, updateTodo, deleteTodo, unDeleteTodo } from '../controllers/todo.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

// CREATE
router.post('/create-todo', authenticateToken, createTodo)

// VIEW ALL
router.get('/get-todos', authenticateToken, getTodos)

// VIEW SINGLE
router.get('/get-single-todo/:id', authenticateToken, getSingleTodo)

// UPDATE
router.put('/update-todo/:id', authenticateToken, updateTodo)

// DELETE
router.delete('/delete-todo/:id', authenticateToken, deleteTodo)

// UNDELETE
router.patch('/un-delete-todo/:id', authenticateToken, unDeleteTodo)

export default router;