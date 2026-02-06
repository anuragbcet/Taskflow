const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateJWT = require('../middlewares/auth.middleware');

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', authenticateJWT, async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

router.post('/', authenticateJWT, async (req, res) => {
  const { title, description, priority, dueDate, category } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description: description || '',
        priority: priority || 'medium',
        category: category || 'General',
        dueDate: dueDate ? new Date(dueDate) : null,
        userId: req.user.userId
      }
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

router.put('/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, status, dueDate, category } = req.body;

  try {
    const existing = await prisma.task.findFirst({
      where: { id: parseInt(id), userId: req.user.userId }
    });

    if (!existing) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        title: title !== undefined ? title : existing.title,
        description: description !== undefined ? description : existing.description,
        priority: priority !== undefined ? priority : existing.priority,
        status: status !== undefined ? status : existing.status,
        category: category !== undefined ? category : existing.category,
        dueDate: dueDate !== undefined ? (dueDate ? new Date(dueDate) : null) : existing.dueDate
      }
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

router.delete('/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;

  try {
    const existing = await prisma.task.findFirst({
      where: { id: parseInt(id), userId: req.user.userId }
    });

    if (!existing) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await prisma.task.delete({
      where: { id: parseInt(id) }
    });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

router.patch('/:id/toggle', authenticateJWT, async (req, res) => {
  const { id } = req.params;

  try {
    const existing = await prisma.task.findFirst({
      where: { id: parseInt(id), userId: req.user.userId }
    });

    if (!existing) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const newStatus = existing.status === 'completed' ? 'pending' : 'completed';
    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { status: newStatus }
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle task status' });
  }
});

module.exports = router;
