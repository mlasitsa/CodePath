import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Post {
  id: string;
  username: string;
  title: string;
  attributes: string;
  created_at: string;
}

function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/posts');
      const data = await res.json();
      if (Array.isArray(data)) {
        setPosts(data);
      }
    } catch (err) {
      console.error('GET /posts failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const res = await fetch(`http://localhost:3001/api/posts/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setPosts((prev) => prev.filter((post) => post.id !== id));
      }
    } catch (err) {
      console.error('DELETE /posts failed:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (posts.length === 0) return <p>No posts yet.</p>;

  return (
    <div>
      <h1 style={{ marginBottom: '1rem' }}>All Posts</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map((post) => (
          <li
            key={post.id}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: '8px',
              background: '#fafafa'
            }}
          >
            <h3>{post.title}</h3>
            <p><strong>User:</strong> {post.username}</p>
            <p><strong>Attributes:</strong> {post.attributes}</p>
            <p style={{ fontSize: '0.8rem', color: '#666' }}>{new Date(post.created_at).toLocaleString()}</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <Link to={`/post/${post.id}`} style={{ color: 'blue' }}>View</Link>
              <Link to={`/edit/${post.id}`} style={{ color: 'orange' }}>Edit</Link>
              <button onClick={() => handleDelete(post.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
