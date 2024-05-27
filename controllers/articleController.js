import Article from '../db/articles.js';
import Comment from '../db/comment.js';

export const createArticle = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user;

  try {
    const newArticle = new Article({ title, content, author: id });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate('author', 'name').populate('comments');
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('author', 'name')
      .populate('comments');
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCommentsByArticleId = async (req, res) => {
  console.log(req.params.id);
  try {
    const comments = await Comment.find({ article: req.params.id }).populate('author', 'name');
    if (!comments) {
      return res.status(404).json({ message: 'No comments found for this article' });
    }
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments' });
  }
};
