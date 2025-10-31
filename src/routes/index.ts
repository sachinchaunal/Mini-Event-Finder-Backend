import { Router } from 'express';
import eventRoutes from './eventRoutes';

const router = Router();

// Mount event routes
router.use('/events', eventRoutes);

// Health check endpoint
router.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;
