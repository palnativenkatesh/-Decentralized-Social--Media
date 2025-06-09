import { useEffect, useState } from 'react';

export default function MessageFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/post')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div>
      <h2>Feed</h2>
      {posts.map((post) => (
        <div key={post.id} style={{ borderBottom: '1px solid #ccc', marginBottom: 8 }}>
          <strong>{post.address}</strong>
          <p>{post.message}</p>
          <small>{new Date(post.timestamp).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

