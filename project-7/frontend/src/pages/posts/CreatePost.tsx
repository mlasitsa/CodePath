import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [attributes, setAttributes] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !title || !attributes) {
      alert('All fields are required');
      return;
    }

    const payload = {
      username,
      title,
      attributes
    };

    try {
      const res = await fetch('http://localhost:3001/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
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

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Create New Post</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          value={attributes}
          onChange={(e) => setAttributes(e.target.value)}
          placeholder="Attributes (e.g. funny, fast)"
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
