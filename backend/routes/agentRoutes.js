import express from 'express';
import Agent from '../models/Agent.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const agents = await Agent.find().sort({ createdAt: 1 });
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching agents', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const agent = new Agent(req.body);
    const saved = await agent.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Error creating agent', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const agent = await Agent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!agent) return res.status(404).json({ message: 'Agent not found' });
    res.json(agent);
  } catch (error) {
    res.status(400).json({ message: 'Error updating agent', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const agent = await Agent.findByIdAndDelete(req.params.id);
    if (!agent) return res.status(404).json({ message: 'Agent not found' });
    res.json({ message: 'Agent deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting agent', error: error.message });
  }
});

export default router;
