export default function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-inner">
        <div className="contact-topline">
          <span>05 / LET'S CONNECT</span>
          <span>AVAILABLE FOR COLLABORATION</span>
        </div>

        <p className="contact-eyebrow">
          HAVE AN IDEA IN MIND?
        </p>

        <h2 className="contact-heading">
          LET'S BUILD
          <span>SOMETHING.</span>
        </h2>

        <a
          className="contact-email"
          href="mailto:salmanshah34523@gmail.com"
        >
          <span>salmanshah34523@gmail.com</span>
          <span aria-hidden="true">↗</span>
        </a>

        <div className="contact-links">
          <a
            href="https://github.com/salman-raza15"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>GITHUB</span>
            <span aria-hidden="true">↗</span>
          </a>

          <a
            href="https://www.linkedin.com/in/syed-salman-raza-b26683402/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>LINKEDIN</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <footer className="contact-footer">
          <span>© 2026 SYED SALMAN RAZA</span>
          <span>DESIGNED & DEVELOPED WITH PURPOSE</span>
          <a href="#about">BACK TO TOP ↑</a>
        </footer>
      </div>
    </section>
  );
}
