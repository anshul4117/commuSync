import { Router } from 'express';
import { createTask, getTasks } from '../controllers/task.controller';

const router = Router();

// Route for creating a task
router.post('/', createTask);

// Route for getting all tasks
router.get('/', getTasks);

export default router;
