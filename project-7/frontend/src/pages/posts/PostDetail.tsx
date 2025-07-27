import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/posts/${id}`);
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error('GET /posts/:id failed:', err);
        alert('Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Post Details</h2>
      <div style={{
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        background: '#f9f9f9',
        maxWidth: '600px'
      }}>
        <p><strong>Username:</strong> {post.username}</p>
        <p><strong>Title:</strong> {post.title}</p>
        <p><strong>Attributes:</strong> {post.attributes}</p>
        <p><strong>Created:</strong> {new Date(post.created_at).toLocaleString()}</p>
        <Link to={`/edit/${post.id}`} style={{ color: 'blue', marginTop: '1rem', display: 'inline-block' }}>Edit this post</Link>
      </div>
    </div>
  );
}

export default PostDetail;
