import express from 'express';
import { registerUser, authUser } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);

// Example of protected route
router.get('/profile', protect, (req, res) => {
  res.json({ success: true, data: req.user });
});

export default router;
