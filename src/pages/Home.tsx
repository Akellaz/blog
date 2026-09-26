import { posts } from '../data/posts';
import PostCard from '../components/PostCard';

export default function Home() {
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Истории, идеи и мысли</h1>
          <p className="hero-subtitle">
            Персональный блог о технологиях, дизайне и творчестве.
            <br />Делюсь тем, что вдохновляет.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="featured-section">
        <div className="section-label">Свежая запись</div>
        <PostCard post={featuredPost} featured />
      </section>

      {/* Recent Posts Grid */}
      <section className="recent-section">
        <div className="section-header">
          <h2 className="section-title">Последние записи</h2>
        </div>
        <div className="posts-grid">
          {recentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
