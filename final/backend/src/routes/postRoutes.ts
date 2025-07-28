// backend/src/routes/postRoutes.ts
import { Router } from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  getPostsByUsername,
  updatePost,
  deletePost,
  registerUser,
  loginUser,
  upvotePost,
  getCommentsForPost,
  addCommentToPost,
} from '../controllers/postController';

const router = Router();

// Posts
router.post('/posts', createPost);
router.get('/posts', getAllPosts);
router.get('/posts/:id', getPostById);
router.get('/user-posts/:username', getPostsByUsername);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);
router.post('/posts/:id/upvote', upvotePost);
router.get('/comments/:postId', getCommentsForPost);
router.post('/comments/:postId', addCommentToPost);

// Auth
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
