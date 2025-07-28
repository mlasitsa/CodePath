import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const username = localStorage.getItem('username');

  useEffect(() => {
    if (!username) {
      navigate('/login');
      return;
    }

    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/posts/${id}`);
        const data = await res.json();

        if (data.username !== username) {
          alert('You are not authorized to edit this post.');
          navigate('/');
          return;
        }

        setTitle(data.title || '');
        setContent(data.content || '');
        setImageUrl(data.imageUrl || '');
      } catch (err) {
        console.error('GET /posts/:id failed:', err);
        alert('Post not found');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, username, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !imageUrl) {
      alert('All fields are required');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, imageUrl })
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
          value={username || ''}
          readOnly
          style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc', background: '#eee' }}
        />
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
        <button type="submit" style={{ padding: '0.5rem', background: 'green', color: 'white', border: 'none', borderRadius: '5px' }}>
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditPost;
