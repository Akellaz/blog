import { posts } from '../data/posts';
import PostCard from '../components/PostCard';

export default function AllPosts() {
  return (
    <div className="all-posts-page">
      <div className="page-header">
        <h1 className="page-title">Все записи</h1>
        <p className="page-subtitle">
          {posts.length} {posts.length === 1 ? 'запись' : posts.length < 5 ? 'записи' : 'записей'}
        </p>
      </div>

      <div className="posts-grid all-posts-grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
