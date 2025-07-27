import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const createPost = async (req: Request, res: Response) => {
  try {
    const { username, title, attributes } = req.body;

    if (!username || !title || !attributes) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data, error } = await supabase.from('posts').insert([
      { username, title, attributes }
    ]);

    if (error) throw error;
    res.status(201).json(data);
  } catch (err: any) {
    console.error('Create failed:', err.message);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

export const getAllPosts = async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.status(200).json(data);
  } catch (err: any) {
    console.error('Fetch failed:', err.message);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    res.status(200).json(data);
  } catch (err: any) {
    console.error('Fetch single failed:', err.message);
    res.status(404).json({ error: 'Post not found' });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, attributes } = req.body;

    const { data, error } = await supabase
      .from('posts')
      .update({ title, attributes })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.status(200).json(data);
  } catch (err: any) {
    console.error('Update failed:', err.message);
    res.status(500).json({ error: 'Failed to update post' });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) throw error;

    res.status(204).send();
  } catch (err: any) {
    console.error('Delete failed:', err.message);
    res.status(500).json({ error: 'Failed to delete post' });
  }
};
