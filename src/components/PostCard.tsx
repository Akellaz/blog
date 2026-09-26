import { Link } from 'react-router-dom';
import { Post, formatDate } from '../data/posts';

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <Link to={`/post/${post.id}`} className={`post-card ${featured ? 'featured' : ''}`}>
      <div className="post-card-image">
        <img src={post.coverImage} alt={post.title} loading="lazy" />
      </div>
      <div className="post-card-content">
        <time className="post-card-date" dateTime={post.date}>
          {formatDate(post.date)}
        </time>
        <h2 className="post-card-title">{post.title}</h2>
        {featured && (
          <p className="post-card-excerpt">{post.excerpt}</p>
        )}
      </div>
    </Link>
  );
}
