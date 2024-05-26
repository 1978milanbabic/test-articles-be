import express from 'express';
import { createComment, getComments, getCommentById } from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createComment)
  .get(getComments);

router.route('/:id')
  .get(getCommentById);

export default router;
