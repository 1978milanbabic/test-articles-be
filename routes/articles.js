import express from 'express';
import { createArticle, getArticles, getArticleById } from '../controllers/articleController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getArticles)
  .post(protect, createArticle);

router.route('/:id')
  .get(getArticleById);;

export default router;
