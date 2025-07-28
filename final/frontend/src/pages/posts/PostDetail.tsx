import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Comment {
  id: string;
  username: string;
  content: string;
  created_at: string;
}

function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [upvoting, setUpvoting] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchPost = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/posts/${id}`);
      const data = await res.json();
      setPost(data);
    } catch (err) {
      alert('Failed to fetch post');
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/comments/${id}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setComments(data);
      } else if (typeof data === 'object' && Array.isArray(data.comments)) {
        setComments(data.comments);
      } else {
        setComments([]);
      }
    } catch (err) {
      alert('Failed to fetch comments');
      setComments([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchPost();
      await fetchComments();
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleUpvote = async () => {
    if (upvoting) return;
    setUpvoting(true);
    try {
      const res = await fetch(`http://localhost:3001/api/posts/${id}/upvote`, {
        method: 'POST',
      });
      const updated = await res.json();
      setPost(updated);
    } catch {
      alert('Failed to upvote');
    } finally {
      setUpvoting(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = localStorage.getItem('username');
    if (!username || !newComment.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`http://localhost:3001/api/comments/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, content: newComment }),
      });
      if (!res.ok) throw new Error('Comment failed');
      setNewComment('');
      await fetchComments();
    } catch {
      alert('Failed to submit comment');
    } finally {
      setSubmitting(false);
    }
  };

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
        <p><strong>Username:</strong> {post.username || 'Unknown'}</p>
        <p><strong>Title:</strong> {post.name || 'No title'}</p>
        <p><strong>Content:</strong> {post.content || 'No content'}</p>
        <p><strong>Attributes:</strong> {post.attributes || 'None'}</p>
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt="post"
            style={{ maxWidth: '100%', margin: '1rem 0' }}
          />
        )}
        <p><strong>Created:</strong> {new Date(post.created_at).toLocaleString()}</p>
        <p><strong>Upvotes:</strong> {post.upvotes || 0}</p>
        <button
          onClick={handleUpvote}
          disabled={upvoting}
          style={{
            padding: '0.5rem 1rem',
            marginTop: '0.5rem',
            background: upvoting ? '#999' : 'green',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: upvoting ? 'not-allowed' : 'pointer'
          }}
        >
          {upvoting ? 'Upvoting...' : 'Upvote'}
        </button>
        <br />
        <Link
          to={`/edit/${post.id}`}
          style={{ color: 'blue', marginTop: '1rem', display: 'inline-block' }}
        >
          Edit this post
        </Link>
      </div>

      <div style={{ marginTop: '2rem', maxWidth: '600px' }}>
        <h3>Comments</h3>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {comments.map((comment) => (
              <li key={comment.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #ddd' }}>
                <p><strong>{comment.username}</strong> — {new Date(comment.created_at).toLocaleString()}</p>
                <p>{comment.content}</p>
              </li>
            ))}
          </ul>
        )}
        {localStorage.getItem('username') && (
          <form onSubmit={handleCommentSubmit} style={{ marginTop: '1rem' }}>
            <textarea
              placeholder="Leave a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem' }}
            />
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: '0.5rem 1rem',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                marginTop: '0.5rem'
              }}
            >
              {submitting ? 'Submitting...' : 'Submit Comment'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default PostDetail;
