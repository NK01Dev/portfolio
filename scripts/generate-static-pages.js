const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist', 'portfolio_frontend', 'browser');
const baseIndexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(baseIndexHtmlPath)) {
  console.error('Error: Base index.html not found at', baseIndexHtmlPath);
  process.exit(1);
}

const baseHtml = fs.readFileSync(baseIndexHtmlPath, 'utf8');

const pages = [
  {
    route: 'about',
    title: 'About Kamal Naim — Software Engineer & Cross-Platform Developer',
    description:
      'Professional profile, software architecture philosophy, infrastructure scope, and technical background of Kamal Naim, Software Engineer based in Morocco.',
    canonical: 'https://kamalnaim.vercel.app/about',
    content: `
      <div style="max-width: 900px; margin: 0 auto; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #18181b; line-height: 1.6;">
        <nav aria-label="Breadcrumb"><a href="/">Home</a> / <span>About</span></nav>
        <header style="margin-top: 20px;">
          <h1 style="font-size: 2.2rem; font-weight: 800;">About Kamal Naim</h1>
          <p style="font-size: 1.1rem; color: #4b5563;">Software Engineer &amp; Cross-Platform Developer</p>
        </header>
        <section style="margin-top: 24px;">
          <h2>Engineering Profile &amp; Mindset</h2>
          <p>I build software and systems that work beyond the prototype. Software engineer with 2+ years of experience across mobile, web, backend and desktop applications, with hands-on expertise in infrastructure, networking, servers, and deployment.</p>
        </section>
        <section style="margin-top: 24px;">
          <h2>Engineering Scope</h2>
          <ul>
            <li><strong>Software:</strong> Mobile applications (Flutter), Web applications (Angular, React), Desktop applications (Flutter, Drift SQLite).</li>
            <li><strong>Systems:</strong> Application architecture, REST APIs (Node.js, Express, NestJS), Databases (MongoDB, PostgreSQL, SQLite, Isar).</li>
            <li><strong>Infrastructure &amp; Networks:</strong> Switching, Routing, Linux (Ubuntu Server), Windows Server, Proxmox virtualization.</li>
            <li><strong>Delivery:</strong> Docker containerization, CI/CD pipelines, Cloud infrastructure.</li>
          </ul>
        </section>
      </div>
    `,
  },
  {
    route: 'resume',
    title: 'Resume & Credentials — Kamal Naim | Software Engineer',
    description:
      'Official credentials, software engineering background, ENSA Master ILMSI, Simplon DevOps certification, and verified technical skills of Kamal Naim.',
    canonical: 'https://kamalnaim.vercel.app/resume',
    content: `
      <div style="max-width: 900px; margin: 0 auto; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #18181b; line-height: 1.6;">
        <nav aria-label="Breadcrumb"><a href="/">Home</a> / <span>Resume</span></nav>
        <header style="margin-top: 20px;">
          <h1 style="font-size: 2.2rem; font-weight: 800;">Kamal Naim — Resume &amp; Credentials</h1>
          <p style="font-size: 1.1rem; color: #4b5563;">Software Engineer · Based in Morocco</p>
        </header>
        <section style="margin-top: 24px;">
          <h2>Professional Experience</h2>
          <div>
            <h3>Freelance Web &amp; Mobile Developer (2022–Present)</h3>
            <p>Specialized in Flutter, Angular, Express, and Android application development. Delivering custom applications with optimized interfaces, clean architecture, and robust cross-platform experiences.</p>
          </div>
          <div>
            <h3>IT Technician — Hotel Fairmont Royal Palm (2018)</h3>
            <p>Maintained IT systems and network infrastructure, VOIP systems, and IP cameras. Hands-on systems foundation supporting software and infrastructure engineering profile.</p>
          </div>
        </section>
        <section style="margin-top: 24px;">
          <h2>Education &amp; Credentials</h2>
          <ul>
            <li><strong>DevOps Development Program:</strong> Simplon / Digital Africa — Talent 4 Startups (2025–2026). Ref: 0147/2026.</li>
            <li><strong>Master Degree (ILMSI):</strong> Software Engineering and Information Systems Management — ENSA (2023–2025).</li>
            <li><strong>Bachelor Degree:</strong> Information Systems and Software for Enterprise Systems — FS Kenitra (2021–2022).</li>
            <li><strong>Specialized Technician:</strong> Systems and Computer Networks — ISTA Marrakech / OFPPT (2016–2018).</li>
          </ul>
        </section>
      </div>
    `,
  },
  {
    route: 'projects',
    title: 'Featured Projects & Engineering Case Studies — Kamal Naim',
    description:
      'Explore software engineering case studies by Kamal Naim across mobile (Flutter, Riverpod), web (Angular, TypeScript, Docker), and desktop (offline-first Drift SQLite).',
    canonical: 'https://kamalnaim.vercel.app/projects',
    content: `
      <div style="max-width: 900px; margin: 0 auto; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #18181b; line-height: 1.6;">
        <nav aria-label="Breadcrumb"><a href="/">Home</a> / <span>Projects</span></nav>
        <header style="margin-top: 20px;">
          <h1 style="font-size: 2.2rem; font-weight: 800;">Featured Engineering Projects</h1>
          <p style="font-size: 1.1rem; color: #4b5563;">In-depth technical case studies and open-source applications built by Kamal Naim.</p>
        </header>
        <section style="margin-top: 24px;">
          <ul>
            <li><strong><a href="/projects/wifi-manager">WiFi Manager (Desktop)</a>:</strong> Offline-first network management and security dashboard with local AES-256-GCM encryption.</li>
            <li><strong><a href="/projects/quoteverse">QuoteVerse (Mobile)</a>:</strong> Multilingual quotes application with Isar local database and Supabase synchronization.</li>
            <li><strong><a href="/projects/blueprint">BluePrint Academy (Full-Stack Web)</a>:</strong> Containerized learning portal with Angular frontend and Express API orchestrated via Docker Compose.</li>
            <li><strong><a href="/projects/hasbi">Hasbi (Mobile)</a>:</strong> Zero-cloud personal finance and expense tracking mobile application with Clean Architecture.</li>
          </ul>
        </section>
      </div>
    `,
  },
  {
    route: 'projects/wifi-manager',
    title: 'WiFi Manager Case Study | Kamal Naim — Software Engineer',
    description:
      'In-depth software engineering case study of WiFi Manager: an offline-first Windows desktop utility built with Flutter, Riverpod, Drift SQLite, AES-256-GCM, and Argon2.',
    canonical: 'https://kamalnaim.vercel.app/projects/wifi-manager',
    content: `
      <article style="max-width: 900px; margin: 0 auto; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #18181b; line-height: 1.6;">
        <nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/projects">Projects</a> / <span>WiFi Manager</span></nav>
        <header style="margin-top: 20px;">
          <h1 style="font-size: 2.2rem; font-weight: 800;">WiFi Manager — Desktop Network Security &amp; Monitoring Dashboard</h1>
          <p style="font-size: 1.1rem; color: #4b5563;">Windows Desktop Application · Offline-First Architecture · AES-256-GCM Encryption</p>
          <p><a href="https://github.com/NK01Dev/flutter_wifi_manager" target="_blank" rel="noopener noreferrer">View Verified GitHub Repository</a></p>
        </header>
        <section style="margin-top: 24px;">
          <h2>Overview &amp; Executive Summary</h2>
          <p>A secure, offline-first desktop application built with Flutter and Drift (SQLite) giving IT professionals real-time network visibility, device discovery, and cryptographic access control without transmitting telemetry to external servers.</p>
        </section>
        <section style="margin-top: 24px;">
          <h2>Core Engineering Decisions</h2>
          <ul>
            <li><strong>Offline-First Drift (SQLite) Engine:</strong> Instantaneous startup (&lt;200ms) and millisecond queries across 50,000+ logged scan events.</li>
            <li><strong>Authenticated Encryption (AES-256-GCM + Argon2id):</strong> Cryptographically protected configuration and credential storage with zero disk leaks.</li>
            <li><strong>Asynchronous Multithreaded Scanning:</strong> Subnet discovery across /24 address spaces in under 3.5 seconds maintaining 60 FPS desktop framerate.</li>
          </ul>
        </section>
      </article>
    `,
  },
  {
    route: 'projects/quoteverse',
    title: 'QuoteVerse Case Study | Kamal Naim — Software Engineer',
    description:
      'Technical case study of QuoteVerse: a high-performance offline-first multilingual mobile app built with Flutter, Riverpod, Isar database, and Supabase sync.',
    canonical: 'https://kamalnaim.vercel.app/projects/quoteverse',
    content: `
      <article style="max-width: 900px; margin: 0 auto; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #18181b; line-height: 1.6;">
        <nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/projects">Projects</a> / <span>QuoteVerse</span></nav>
        <header style="margin-top: 20px;">
          <h1 style="font-size: 2.2rem; font-weight: 800;">QuoteVerse — Multilingual Offline-First Mobile Application</h1>
          <p style="font-size: 1.1rem; color: #4b5563;">Cross-Platform Mobile · Isar NoSQL Engine · Supabase Realtime Sync</p>
          <p><a href="https://github.com/NK01Dev/quote_verse" target="_blank" rel="noopener noreferrer">View Verified GitHub Repository</a></p>
        </header>
        <section style="margin-top: 24px;">
          <h2>Overview &amp; Executive Summary</h2>
          <p>High-performance mobile application engineered with Flutter and Isar embedded NoSQL database, delivering instantaneous content rendering (&lt;15ms cold start) and background synchronization with Supabase.</p>
        </section>
      </article>
    `,
  },
  {
    route: 'projects/blueprint',
    title: 'BluePrint Academy Case Study | Kamal Naim — Software Engineer',
    description:
      'Architecture case study of BluePrint Academy: a containerized full-stack academic platform engineered with Angular, Express, MongoDB, and Docker Compose.',
    canonical: 'https://kamalnaim.vercel.app/projects/blueprint',
    content: `
      <article style="max-width: 900px; margin: 0 auto; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #18181b; line-height: 1.6;">
        <nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/projects">Projects</a> / <span>BluePrint Academy</span></nav>
        <header style="margin-top: 20px;">
          <h1 style="font-size: 2.2rem; font-weight: 800;">BluePrint Academy — Containerized Monorepo Learning Platform</h1>
          <p style="font-size: 1.1rem; color: #4b5563;">Full-Stack Web · TypeScript · Angular · Express · Docker Compose</p>
          <p><a href="https://github.com/NK01Dev/blue_print_academy" target="_blank" rel="noopener noreferrer">View Verified GitHub Repository</a></p>
        </header>
        <section style="margin-top: 24px;">
          <h2>Overview &amp; Architecture</h2>
          <p>Containerized full-stack learning management platform featuring decoupled Angular client and Express REST API backend, orchestrated with multi-stage Docker builds reducing production image footprint by 65%.</p>
        </section>
      </article>
    `,
  },
  {
    route: 'projects/hasbi',
    title: 'Hasbi Case Study | Kamal Naim — Software Engineer',
    description:
      'Technical case study of Hasbi: a privacy-first personal finance and expense tracking mobile application engineered with Flutter, Riverpod, and Clean Architecture.',
    canonical: 'https://kamalnaim.vercel.app/projects/hasbi',
    content: `
      <article style="max-width: 900px; margin: 0 auto; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #18181b; line-height: 1.6;">
        <nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/projects">Projects</a> / <span>Hasbi</span></nav>
        <header style="margin-top: 20px;">
          <h1 style="font-size: 2.2rem; font-weight: 800;">Hasbi — Privacy-First Personal Finance Mobile App</h1>
          <p style="font-size: 1.1rem; color: #4b5563;">Mobile Application · Flutter Material 3 · Zero-Cloud Encrypted Storage</p>
          <p><a href="https://github.com/NK01Dev/hasbi" target="_blank" rel="noopener noreferrer">View Verified GitHub Repository</a></p>
        </header>
        <section style="margin-top: 24px;">
          <h2>Overview &amp; Privacy Design</h2>
          <p>Privacy-respecting expense tracking application operating on a strict zero-cloud, 100% on-device architecture, eliminating third-party financial data harvesting.</p>
        </section>
      </article>
    `,
  },
  {
    route: 'contact',
    title: 'Contact Kamal Naim — Software Engineer & Cross-Platform Developer',
    description:
      'Get in touch with Kamal Naim for software engineering roles, cross-platform app development (Flutter), full-stack projects, and technical consulting.',
    canonical: 'https://kamalnaim.vercel.app/contact',
    content: `
      <div style="max-width: 900px; margin: 0 auto; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #18181b; line-height: 1.6;">
        <nav aria-label="Breadcrumb"><a href="/">Home</a> / <span>Contact</span></nav>
        <header style="margin-top: 20px;">
          <h1 style="font-size: 2.2rem; font-weight: 800;">Contact Kamal Naim</h1>
          <p style="font-size: 1.1rem; color: #4b5563;">Available for local contracts &amp; worldwide remote opportunities.</p>
        </header>
        <section style="margin-top: 24px;">
          <p>Email: <a href="mailto:kamal.nk.naim@gmail.com">kamal.nk.naim@gmail.com</a></p>
          <p>Phone: +212 670 572 967</p>
          <p>GitHub: <a href="https://github.com/NK01Dev" target="_blank" rel="noopener noreferrer">github.com/NK01Dev</a></p>
          <p>LinkedIn: <a href="https://www.linkedin.com/in/kamal-naim-014989310/" target="_blank" rel="noopener noreferrer">linkedin.com/in/kamal-naim-014989310</a></p>
        </section>
      </div>
    `,
  },
  {
    route: 'privacy',
    title: 'Privacy Policy — Kamal Naim Portfolio',
    description:
      'Privacy Policy for the personal portfolio of Kamal Naim. Explains usage of Google Analytics 4, Microsoft Clarity, and data protection practices.',
    canonical: 'https://kamalnaim.vercel.app/privacy',
    content: `
      <div style="max-width: 900px; margin: 0 auto; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #18181b; line-height: 1.6;">
        <nav aria-label="Breadcrumb"><a href="/">Home</a> / <span>Privacy Policy</span></nav>
        <header style="margin-top: 20px;">
          <h1 style="font-size: 2.2rem; font-weight: 800;">Privacy Policy</h1>
          <p style="font-size: 0.95rem; color: #6b7280;">Personal Portfolio Website of Kamal Naim</p>
        </header>
        <section style="margin-top: 24px;">
          <h2>1. Overview &amp; Transparency</h2>
          <p>This website (kamalnaim.vercel.app) is the personal professional portfolio of Kamal Naim. We believe in transparency and respect for visitor privacy.</p>
          <h2>2. Analytics Tools (GA4 &amp; Microsoft Clarity)</h2>
          <p>We use Google Analytics 4 for aggregate, anonymous usage statistics and Microsoft Clarity for user experience optimization. No personal form information, passwords, or message contents are ever sent to analytics platforms.</p>
        </section>
      </div>
    `,
  },
  {
    route: '404',
    title: '404: Page Not Found | Kamal Naim — Software Engineer',
    description: 'The requested page could not be found. Explore Kamal Naim software engineering portfolio, project case studies, and resume.',
    canonical: 'https://kamalnaim.vercel.app/404',
    noIndex: true,
    content: `
      <div style="max-width: 600px; margin: 80px auto; padding: 40px 20px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #18181b;">
        <h1 style="font-size: 3rem; font-weight: 800;">404</h1>
        <h2>Page Not Found</h2>
        <p style="color: #4b5563;">The URL you requested does not exist or has been moved.</p>
        <p style="margin-top: 24px;"><a href="/" style="padding: 10px 20px; background: #4f46e5; color: white; border-radius: 8px; text-decoration: none; font-weight: 600;">Return to Homepage</a></p>
      </div>
    `,
  },
];

for (const page of pages) {
  let html = baseHtml;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`);

  // Replace Description
  html = html.replace(
    /<meta name="description"[\s\S]*?>/,
    `<meta name="description" content="${page.description}">`
  );

  // Replace Canonical
  html = html.replace(
    /<link rel="canonical"[\s\S]*?>/,
    `<link rel="canonical" href="${page.canonical}">`
  );

  // Replace Robots if noindex
  if (page.noIndex) {
    html = html.replace(
      /<meta name="robots" content="[^"]*"/,
      '<meta name="robots" content="noindex, nofollow"'
    );
  }

  // Replace OpenGraph Title & Description
  html = html.replace(
    /<meta property="og:title"[\s\S]*?>/,
    `<meta property="og:title" content="${page.title}">`
  );
  html = html.replace(
    /<meta property="og:description"[\s\S]*?>/,
    `<meta property="og:description" content="${page.description}">`
  );
  html = html.replace(
    /<meta property="og:url"[\s\S]*?>/,
    `<meta property="og:url" content="${page.canonical}">`
  );

  // Replace Twitter Title & Description
  html = html.replace(
    /<meta name="twitter:title"[\s\S]*?>/,
    `<meta name="twitter:title" content="${page.title}">`
  );
  html = html.replace(
    /<meta name="twitter:description"[\s\S]*?>/,
    `<meta name="twitter:description" content="${page.description}">`
  );

  // Replace <app-root> content with semantic prerendered body
  html = html.replace(
    /<app-root>[\s\S]*?<\/app-root>/,
    `<app-root>${page.content}</app-root>`
  );

  let targetDir = path.join(distDir, page.route);
  let targetFile = path.join(targetDir, 'index.html');

  if (page.route === '404') {
    targetFile = path.join(distDir, '404.html');
  } else {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.writeFileSync(targetFile, html, 'utf8');
  console.log(`Generated static SSG page: ${targetFile}`);
}

console.log('Static route generation complete!');
