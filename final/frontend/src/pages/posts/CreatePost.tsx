import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (!username) {
      alert('You must be logged in to create a post.');
      navigate('/login');
    } else {
      setIsAuthorized(true);
    }
  }, [username, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !imageUrl) {
      alert('All fields are required');
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, title, content, imageUrl })
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Create failed');
      }

      navigate('/');
    } catch (err) {
      console.error('Create failed:', err);
      alert('Failed to create post');
    }
  };

  if (!isAuthorized) return null;

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Create New Post</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
          style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc', height: '100px' }}
        />
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
          required
          style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '0.5rem', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
