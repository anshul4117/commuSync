import { Router } from 'express';
import { createTask } from '../controllers/task.controller';

const router = Router();

// Route for creating a task
router.post('/', createTask);

export default router;
