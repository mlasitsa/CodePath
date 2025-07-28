import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import CreatePost from './pages/posts/CreatePost';
import PostList from './pages/posts/PostList';
import EditPost from './pages/posts/EditPost';
import PostDetail from './pages/posts/PostDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import type { ReactNode } from 'react';

function SidebarLayout({ children }: { children: React.ReactNode }) {
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
          <Link to="/login" style={{ textDecoration: 'none', color: '#333' }}>Logout</Link>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '2rem' }}>
        {children}
      </main>
    </div>
  );
}

function PrivateRoute({ children }: { children: ReactNode }) {
  const username = localStorage.getItem('username');
  const location = useLocation();
  return username ? children : <Navigate to="/login" state={{ from: location }} replace />;
}

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes inside SidebarLayout */}
      <Route path="/" element={<PrivateRoute><SidebarLayout><PostList /></SidebarLayout></PrivateRoute>} />
      <Route path="/create" element={<PrivateRoute><SidebarLayout><CreatePost /></SidebarLayout></PrivateRoute>} />
      <Route path="/edit/:id" element={<PrivateRoute><SidebarLayout><EditPost /></SidebarLayout></PrivateRoute>} />
      <Route path="/post/:id" element={<PrivateRoute><SidebarLayout><PostDetail /></SidebarLayout></PrivateRoute>} />
    </Routes>
  );
}

export default App;
