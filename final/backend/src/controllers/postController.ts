import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const createPost = async (req: Request, res: Response) => {
  try {
    const { username, title, content, imageUrl } = req.body;

    if (!username || !title || !content || !imageUrl) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const { data, error } = await supabase
      .from('posts')
      .insert([{ username, title, content, imageUrl, upvotes: 0 }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllPosts = async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .not('title', 'is', null)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .not('title', 'is', null)
      .single();

    if (error) throw error;

    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPostsByUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('username', username)
      .not('title', 'is', null)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, imageUrl } = req.body;

    const { data, error } = await supabase
      .from('posts')
      .update({ title, content, imageUrl })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required.' });
    }

    const { data: existingUser } = await supabase
      .from('posts')
      .select('username')
      .eq('username', username)
      .eq('password', password)
      .maybeSingle();

    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists.' });
    }

    const { error } = await supabase.from('posts').insert([
      {
        username,
        password,
        title: null, // user entries have null post fields
        content: null,
        imageUrl: null,
      },
    ]);
    if (error) throw error;

    res.status(201).json({ message: 'User registered.' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const { data: user, error } = await supabase
      .from('posts')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .is('title', null) // make sure it's not a post
      .maybeSingle();

    if (error) throw error;

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    res.status(200).json({ message: 'Login successful.', username: user.username });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const upvotePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('upvotes')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    const newCount = (post.upvotes || 0) + 1;

    const { data: updatedPost, error: updateError } = await supabase
      .from('posts')
      .update({ upvotes: newCount })
      .eq('id', id)
      .select()
      .single();

    if (updateError) throw updateError;

    res.status(200).json(updatedPost); 
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCommentsForPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const { data, error } = await supabase
      .from('posts')
      .select('comments')
      .eq('id', postId)
      .single();

    if (error) throw error;

    res.status(200).json(data.comments || []);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// POST a new comment
export const addCommentToPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { username, content } = req.body;

    if (!username || !content) {
      return res.status(400).json({ error: 'Username and comment content required.' });
    }

    const newComment = {
      id: Date.now().toString(),
      username,
      content,
      created_at: new Date().toISOString()
    };

    const { data: existing, error: fetchError } = await supabase
      .from('posts')
      .select('comments')
      .eq('id', postId)
      .single();

    if (fetchError) throw fetchError;

    const updatedComments = [...(existing.comments || []), newComment];

    const { error: updateError } = await supabase
      .from('posts')
      .update({ comments: updatedComments })
      .eq('id', postId);

    if (updateError) throw updateError;

    res.status(201).json(newComment);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

