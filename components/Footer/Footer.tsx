import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <p>© 2026 NoteHub. All rights reserved.</p>
      <p>Developer: your name</p>
      <p>Contact us: student@notehub.app</p>
    </footer>
  );
}