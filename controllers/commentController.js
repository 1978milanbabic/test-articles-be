import Comment from '../db/comment.js';
import Article from '../db/articles.js';
import { io } from '../index.js';

// Create a new comment
export const createComment = async (req, res) => {
  const { content, articleId } = req.body;
  const { id } = req.user;

  try {
    const newComment = new Comment({ content, author: id, article: articleId });
    await newComment.save();

    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    article.comments.push(newComment._id);
    await article.save();

    const commentToEmit = await Comment.findById(newComment._id).populate('author', 'name');
    io.emit('newComment', commentToEmit);

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all comments
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate('author', 'name');
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a comment by ID
export const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate('author', 'name');
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get comments by author ID
export const getCommentsByAuthor = async (req, res) => {
  try {
    const comments = await Comment.find({ author: req.params.authorId }).populate('author', 'name');
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get comments by article ID
export const getCommentsByArticle = async (req, res) => {
  try {
    const comments = await Comment.find({ article: req.params.articleId }).populate(
      'author',
      'name'
    );
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
