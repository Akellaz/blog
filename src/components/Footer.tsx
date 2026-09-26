export default function Footer() {
  return (
    <footer className="blog-footer">
      <div className="footer-inner">
        <p className="footer-text">
          Сделано с <span className="heart">♥</span> и вниманием к деталям
        </p>
        <p className="footer-sub">© {new Date().getFullYear()} · Все права защищены</p>
      </div>
    </footer>
  );
}
