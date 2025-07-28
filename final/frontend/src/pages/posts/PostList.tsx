import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Post {
  id: string;
  username: string;
  title: string;
  name: string;
  attributes: string;
  content: string;
  imageUrl: string;
  created_at: string;
  upvotes: number;
}

function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'time' | 'upvotes'>('time');
  const [searchQuery, setSearchQuery] = useState('');

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

  const filtered = posts
    .filter((post) =>
      (post.title || post.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      sortBy === 'time'
        ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        : b.upvotes - a.upvotes
    );

  if (loading) return <p>Loading...</p>;
  if (filtered.length === 0) return <p>No posts found.</p>;

  return (
    <div>
      <h1 style={{ marginBottom: '1rem' }}>All Posts</h1>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '0.5rem', flex: 1 }}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'time' | 'upvotes')}>
          <option value="time">Sort by Time</option>
          <option value="upvotes">Sort by Upvotes</option>
        </select>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filtered.map((post) => (
          <li
            key={post.id}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: '8px',
              background: '#fafafa',
              display: 'flex',
              gap: '1rem'
            }}
          >
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt="preview"
                style={{ width: '120px', height: 'auto', objectFit: 'cover', borderRadius: '4px' }}
              />
            )}

            <div style={{ flex: 1 }}>
              <h3>
                <Link to={`/post/${post.id}`} style={{ color: 'black', textDecoration: 'none' }}>
                  {post.name || post.title}
                </Link>
              </h3>
              <p><strong>User:</strong> {post.username}</p>
              <p><strong>Attributes:</strong> {post.attributes || 'None'}</p>
              <p style={{ fontStyle: 'italic', color: '#555' }}>
                {post.content?.slice(0, 100)}{post.content?.length > 100 ? '...' : ''}
              </p>
              <p style={{ fontSize: '0.8rem', color: '#666' }}>{new Date(post.created_at).toLocaleString()}</p>
              <p><strong>Upvotes:</strong> {post.upvotes}</p>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <Link to={`/post/${post.id}`} style={{ color: 'blue' }}>View</Link>
                <Link to={`/edit/${post.id}`} style={{ color: 'orange' }}>Edit</Link>
                <button onClick={() => handleDelete(post.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
