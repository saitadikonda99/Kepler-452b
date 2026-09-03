import Link from "next/link";
import "./AnnouncementBar.css";

const announcementText =
  "This is an independent version of SAC, created to showcase my original work on the project. It is not the official SAC website.";

const Announcement = () => (
  <div className="announcement-set">
    <span className="announcement-text">{announcementText}</span>
    <Link
      className="announcement-link"
      href="/about"
    >
      Read more <span aria-hidden="true">→</span>
    </Link>
  </div>
);

const AnnouncementBar = () => (
  <aside className="announcement-bar" aria-label="Website notice">
    <div className="announcement-viewport">
      <div className="announcement-track">
        <Announcement />
      </div>
    </div>
  </aside>
);

export default AnnouncementBar;
