import { Request, Response } from 'express';
import Task from '../models/task.model';

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title } = req.body;

    // Check if title is missing or empty
    if (!title || typeof title !== 'string' || !title.trim()) {
      res.status(400).json({
        success: false,
        message: 'Title is required'
      });
      return;
    }

    // Create and save new task
    const newTask = new Task({
      title: title.trim(),
      completed: false
    });

    await newTask.save();

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: newTask
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error'
    });
  }
};
