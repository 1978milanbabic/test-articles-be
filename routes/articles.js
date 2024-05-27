import express from 'express';
import { createArticle, getArticles, getArticleById, getCommentsByArticleId } from '../controllers/articleController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getArticles)
  .post(protect, createArticle);

router.route('/:id')
  .get(getArticleById);;

router.route('/:id/comments')
  .get(getCommentsByArticleId)

export default router;
