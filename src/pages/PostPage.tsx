import { useParams, Link } from 'react-router-dom';
import { getPost, formatDate } from '../data/posts';

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const post = getPost(id || '');

  if (!post) {
    return (
      <div className="not-found">
        <h1>404</h1>
        <p>Запись не найдена</p>
        <Link to="/" className="back-link">← Вернуться на главную</Link>
      </div>
    );
  }

  // Parse markdown-like content
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: JSX.Element[] = [];
    let inCodeBlock = false;
    let codeContent = '';
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={key++} className="post-code">
              <code>{codeContent.trim()}</code>
            </pre>
          );
          codeContent = '';
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeContent += line + '\n';
        continue;
      }

      if (line.trim() === '') {
        continue;
      }

      if (line.startsWith('## ')) {
        elements.push(<h2 key={key++} className="post-h2">{line.slice(3)}</h2>);
      } else if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={key++} className="post-blockquote">
            <p>{line.slice(2)}</p>
          </blockquote>
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={key++} className="post-list-item">
            {renderInline(line.slice(2))}
          </li>
        );
      } else {
        elements.push(
          <p key={key++} className="post-paragraph">
            {renderInline(line)}
          </p>
        );
      }
    }

    return elements;
  };

  const renderInline = (text: string) => {
    // Simple inline formatting
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i} className="inline-code">{part.slice(1, -1)}</code>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <article className="post-page">
      <div className="post-hero">
        <img src={post.coverImage} alt={post.title} className="post-hero-image" />
      </div>

      <div className="post-container">
        <div className="post-meta">
          <div className="post-author">
            <span className="author-avatar">{post.authorAvatar}</span>
            <div className="author-info">
              <span className="author-name">{post.author}</span>
              <time className="post-date" dateTime={post.date}>
                {formatDate(post.date)}
              </time>
            </div>
          </div>
          <div className="post-tags">
            {post.tags.map(tag => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>
        </div>

        <h1 className="post-title">{post.title}</h1>

        <div className="post-body">
          {renderContent(post.content)}
        </div>

        <div className="post-footer">
          <Link to="/" className="back-link">← Вернуться на главную</Link>
        </div>
      </div>
    </article>
  );
}
