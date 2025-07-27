import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
  const { id } = useParams<{ id: string }>();
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [attributes, setAttributes] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/posts/${id}`);
        const data = await res.json();
        setUsername(data.username);
        setTitle(data.title);
        setAttributes(data.attributes);
      } catch (err) {
        console.error('GET /posts/:id failed:', err);
        alert('Post not found');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !title || !attributes) {
      alert('All fields are required');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, title, attributes })
      });

      if (!res.ok) throw new Error('Update failed');
      navigate('/');
    } catch (err) {
      console.error('PUT /posts/:id failed:', err);
      alert('Failed to update post');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Edit Post</h2>
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
          placeholder="Attributes"
          required
          style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '0.5rem', background: 'green', color: 'white', border: 'none', borderRadius: '5px' }}>
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditPost;
