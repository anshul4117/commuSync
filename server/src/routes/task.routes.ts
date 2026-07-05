import { Router } from 'express';
import { createTask, getTasks, completeTask } from '../controllers/task.controller';

const router = Router();

// Route for creating a task
router.post('/', createTask);

// Route for getting all tasks
router.get('/', getTasks);

// Route for completing a task
router.patch('/:id/complete', completeTask);

export default router;
