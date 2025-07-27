import { Routes, Route, Link } from 'react-router-dom';
import CreatePost from './pages/posts/CreatePost';
import PostList from './pages/posts/PostList';
import EditPost from './pages/posts/EditPost';
import PostDetail from './pages/posts/PostDetail';

function App() {
  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <aside style={{
        width: '220px',
        background: '#f4f4f4',
        padding: '1rem',
        borderRight: '1px solid #ddd'
      }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Post Manager</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>All Posts</Link>
          <Link to="/create" style={{ textDecoration: 'none', color: '#333' }}>Create Post</Link>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
