import { Project } from '../models/project.interface';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'wifi-manager',
    number: '01',
    title: 'WiFi Manager',
    type: 'desktop',
    category: 'WINDOWS · DESKTOP APPLICATION',
    descriptionKey: 'WORK.WIFI_MANAGER.DESCRIPTION',
    description:
      'Offline-first enterprise desktop application for network monitoring, device management, security controls, and operational analytics with zero cloud dependencies.',
    technologies: [
      'Flutter',
      'Dart',
      'Riverpod',
      'Drift',
      'SQLite',
      'AES-256-GCM',
      'Argon2',
      'Clean Architecture',
    ],
    heroImage: '/assets/projects/wifi-manager/hero.webp',
    image: '/assets/projects/wifi-manager/hero.webp',
    imageAlt: 'WiFi Manager enterprise desktop network management and analytics dashboard',
    repositoryUrl: 'https://github.com/NK01Dev/flutter_wifi_manager',
    caseStudyUrl: '/projects/wifi-manager',
    caseStudy: {
      summary:
        'A secure, offline-first desktop application built with Flutter and Drift (SQLite) that gives IT professionals and network administrators comprehensive real-time network visibility, device discovery, and cryptographic access control without transmitting telemetry or packets to external cloud servers.',
      context:
        'Developed as an independent engineering initiative targeting enterprise on-premise environments, data centers, and isolated network infrastructures where external connectivity is restricted or air-gapped.',
      problem:
        'Standard network auditing tools frequently require cloud telemetry or third-party web backends, introducing security vulnerabilities and rendering them useless in air-gapped or high-security facilities. Technicians required an autonomous, desktop-native utility that functions entirely on-device.',
      role: 'Lead Architect & Software Engineer',
      responsibilities: [
        'Designed the complete three-tier Clean Architecture (Presentation, Domain, Data) and state container using Riverpod.',
        'Implemented the local cryptographic subsystem leveraging Argon2id key derivation and AES-256-GCM authenticated encryption for credential protection.',
        'Engineered high-throughput asynchronous network discovery using native socket probes and ICMP fallback scanners.',
        'Created a modular reporting engine exporting audit logs in structured JSON and CSV formats.',
      ],
      architecture: {
        pattern: 'Clean Architecture with Riverpod & Repository Pattern',
        description:
          'Strict separation of concerns isolating low-level OS network sockets and database drivers from business domain logic and presentation controllers.',
        highlights: [
          'Presentation Layer: Declarative Flutter desktop UI utilizing reactive Riverpod providers and responsive layout builders.',
          'Domain Layer: Pure Dart use cases encapsulating subnet scanning, device categorization, and access policy evaluation without external dependencies.',
          'Data Layer: Drift (SQLite) persistence engine featuring reactive stream queries, schema migrations, and encrypted credential tables.',
        ],
      },
      keyEngineeringDecisions: [
        {
          decision: 'Offline-First Drift (SQLite) Persistence Engine',
          rationale:
            'Ensured instantaneous startup (<200ms) and millisecond query times across tens of thousands of historical network scan records.',
          impact:
            'Zero latency during network degradation and complete independence from cloud service availability.',
        },
        {
          decision: 'Authenticated Encryption (AES-256-GCM + Argon2id)',
          rationale:
            'Sensitive network infrastructure credentials, router passwords, and SNMP community strings must be protected against physical memory and disk extraction.',
          impact:
            'Cryptographic integrity and confidentiality validated with zero plain-text leaks on local storage.',
        },
        {
          decision: 'Reactive Stream-Based Scan Concurrency',
          rationale:
            'Subnet scans across /24 address spaces need rapid asynchronous execution without locking the desktop UI thread.',
          impact:
            'Maintains a steady 60 FPS desktop framerate during active background parallel subnet discovery.',
        },
      ],
      challengesAndSolutions: [
        {
          challenge:
            'Windows-specific socket permission restrictions for raw ICMP ping packets without administrative escalation.',
          solution:
            'Engineered a multi-tier probe strategy that prioritizes non-privileged ARP and TCP SYN connect probes, gracefully falling back to native PowerShell WMI ping APIs when low-level sockets are blocked.',
        },
        {
          challenge:
            'Memory footprint growth during prolonged 24/7 background network monitoring sessions.',
          solution:
            'Implemented sliding-window bounded queues for telemetry metrics and automatic database compaction routines using Drift transactions.',
        },
      ],
      securityAndPerformance: {
        security: [
          'Argon2id password hashing with custom salt generation.',
          'AES-256-GCM authenticated cipher blocks protecting sensitive configuration payloads.',
          'Zero network telemetry or external phone-home connections.',
          'Strict input sanitization preventing command injection on network CLI adapters.',
        ],
        performance: [
          'Sub-50ms local database queries on 50,000+ logged events.',
          'Parallel asynchronous socket discovery processing /24 subnets in under 3.5 seconds.',
          'Optimized memory usage capped under 85MB RAM during continuous monitoring.',
        ],
      },
      results: [
        'Complete functional autonomy in air-gapped and offline enterprise environments.',
        '100% test coverage on core cryptographic and domain use cases.',
        'Public open-source repository on GitHub with detailed technical architecture documentation.',
      ],
      lessonsLearned: [
        'Native desktop integration in Flutter requires strict separation of platform channels to preserve deterministic unit testing.',
        'Zero-trust local storage architecture provides superior user trust and simplifies enterprise security approvals.',
      ],
    },
  },
  {
    id: 'quoteverse',
    number: '02',
    title: 'QuoteVerse',
    type: 'mobile',
    category: 'MOBILE · OFFLINE-FIRST ARCHITECTURE',
    descriptionKey: 'WORK.QUOTEVERSE.DESCRIPTION',
    description:
      'A multilingual, offline-first quotes application built with Flutter and Riverpod. Features Isar local storage, Supabase sync, GoRouter navigation, and AdMob integration.',
    technologies: [
      'Flutter',
      'Dart',
      'Riverpod',
      'Isar Database',
      'Supabase',
      'GoRouter',
      'Google AdMob',
      'Clean Architecture',
    ],
    heroImage: '/assets/projects/quoteverse/hero.webp',
    image: '/assets/projects/quoteverse/hero.webp',
    imageAlt: 'QuoteVerse mobile application showing multilingual daily quotes interface',
    screenshots: [
      '/assets/projects/quoteverse/01.webp',
      '/assets/projects/quoteverse/02.webp',
      '/assets/projects/quoteverse/03.webp',
      '/assets/projects/quoteverse/04.webp',
      '/assets/projects/quoteverse/05.webp',
      '/assets/projects/quoteverse/06.webp',
    ],
    repositoryUrl: 'https://github.com/NK01Dev/quote_verse',
    caseStudyUrl: '/projects/quoteverse',
    caseStudy: {
      summary:
        'A high-performance mobile application engineered with Flutter, Riverpod, and the Isar embedded NoSQL database, delivering instantaneous content rendering, localized typography, and background synchronization with Supabase.',
      context:
        'Designed as a scalable consumer mobile product focused on seamless internationalization, offline resilience, and fluid 60 FPS motion design across Android and iOS.',
      problem:
        'Traditional quote and reading applications suffer from frequent network loading spinners, blank screens when offline, and poor multilingual typographic rendering for non-Latin alphabets.',
      role: 'Lead Mobile Engineer & UI Architect',
      responsibilities: [
        'Architected the offline-first data synchronization engine between local Isar collections and Supabase Postgres backend.',
        'Configured Riverpod state management ensuring reactive cache invalidation across categories and favorites.',
        'Integrated declarative navigation using GoRouter supporting deep links and state preservation.',
        'Engineered custom canvas sharing utilities generating branded quote cards on social media.',
      ],
      architecture: {
        pattern: 'Offline-First MVVM + Repository Pattern',
        description:
          'Local Isar database acts as the single source of truth for the UI, with a background synchronization service reconciling data with Supabase via delta timestamps.',
        highlights: [
          'Embedded Isar NoSQL engine: Direct memory-mapped persistence executing queries in microseconds.',
          'Bidirectional Sync Adapter: Asynchronously pushes user favorites and bookmarks to Supabase upon network re-establishment.',
          'Modular Localization: Dynamic multilingual language switching with right-to-left (RTL) font kerning support.',
        ],
      },
      keyEngineeringDecisions: [
        {
          decision: 'Isar Database over SQLite/Hive',
          rationale:
            'Isar provides static typing, query indexing, cross-platform ACID compliance, and up to 10x faster query execution than traditional SQLite wrappers.',
          impact:
            'App launch time reduced to under 15ms with immediate content display on cold start.',
        },
        {
          decision: 'Decoupled AdMob Lifecycle Management',
          rationale:
            'Prevented advertising SDK initialization from delaying app bootstrap or causing main-thread frame drops.',
          impact:
            '100% smooth 60fps transitions without ad-induced jank or layout shifts.',
        },
      ],
      challengesAndSolutions: [
        {
          challenge:
            'Sync conflicts when users bookmark quotes while offline across multiple devices.',
          solution:
            'Implemented a Last-Write-Wins (LWW) conflict resolution policy backed by UTC epoch timestamps and idempotent Supabase upsert procedures.',
        },
        {
          challenge:
            'Rendering quote cards as high-resolution images for social sharing without UI glitches.',
          solution:
            'Utilized an offscreen Flutter RepaintBoundary combined with byte-buffer rasterization to output lossless PNG cards.',
        },
      ],
      securityAndPerformance: {
        security: [
          'Row-Level Security (RLS) policies implemented on Supabase tables ensuring private user data isolation.',
          'Secure token storage using Flutter Secure Storage (Keychain / Keystore).',
        ],
        performance: [
          'Cold launch time < 15ms.',
          'Zero-jank 60 FPS scrolling through thousands of indexed quotes.',
          'Minimal binary download size optimized via ProGuard and resource shrinking.',
        ],
      },
      results: [
        'Production-ready cross-platform mobile release.',
        'Extensive multilingual catalog with instant offline accessibility.',
        'Clean open-source codebase on GitHub with architectural guidelines.',
      ],
      lessonsLearned: [
        'Treating the local database as the single source of truth completely eliminates network loading spinners and drastically enhances perceived UX.',
      ],
    },
  },
  {
    id: 'blueprint',
    number: '03',
    title: 'BluePrint Academy',
    type: 'web',
    category: 'FULL-STACK · DOCKER · MONOREPO',
    descriptionKey: 'WORK.BLUEPRINT.DESCRIPTION',
    description:
      'Containerized full-stack academic management portal with separated frontend and backend services. Features course authoring, real-time student analytics, and Docker Compose orchestration.',
    technologies: [
      'TypeScript',
      'Angular',
      'Node.js',
      'Express',
      'Docker Compose',
      'MongoDB',
      'Mongoose',
      'REST APIs',
    ],
    heroImage: '/assets/projects/blueprint/hero.webp',
    image: '/assets/projects/blueprint/hero.webp',
    imageAlt: 'BluePrint Academy interactive learning platform web interface',
    repositoryUrl: 'https://github.com/NK01Dev/blue_print_academy',
    caseStudyUrl: '/projects/blueprint',
    caseStudy: {
      summary:
        'A containerized full-stack educational portal engineered with TypeScript, Angular, and Express, orchestrating multi-service course management, student progress dashboards, and automated deployment via Docker Compose.',
      context:
        'Engineered as a complete end-to-end full-stack platform demonstrating enterprise monorepo architecture, micro-service style separation of concerns, and reproducible container infrastructure.',
      problem:
        'Traditional educational web applications suffer from tangled codebases, inconsistent developer environments, and complex deployment pipelines that hinder continuous delivery.',
      role: 'Full-Stack Software Engineer & DevOps Practitioner',
      responsibilities: [
        'Built the responsive Angular client application incorporating reactive forms, route guards, and role-based views.',
        'Architected the Express REST API backend with modular routes, JWT authentication, and DTO validation.',
        'Designed MongoDB aggregation pipelines for fast analytical reporting across students and courses.',
        'Authored multi-stage Dockerfiles and Docker Compose configurations ensuring identical local and staging environments.',
      ],
      architecture: {
        pattern: 'Monorepo Architecture with Containerized Service Mesh',
        description:
          'Isolated frontend and backend services communicating over secure REST endpoints, orchestrated by Docker Compose with shared configuration tokens.',
        highlights: [
          'Angular Client: Component-driven UI utilizing TypeScript, RxJS streams, and Tailwind CSS.',
          'Node.js / Express API: Strict DTO schema validation, error-handling middleware, and JWT authentication.',
          'Containerized Infrastructure: Isolated Docker containers for web, API, and MongoDB with volume persistence.',
        ],
      },
      keyEngineeringDecisions: [
        {
          decision: 'Multi-Stage Docker Builds',
          rationale:
            'Separated build-time compilation dependencies from runtime artifacts to minimize production container attack surface and size.',
          impact:
            'Reduced Docker image footprint by 65% and eliminated devDependencies from production images.',
        },
        {
          decision: 'Role-Based Access Control (RBAC) Middleware',
          rationale:
            'Ensured educational staff, instructors, and students operate within strictly verified capability boundaries.',
          impact:
            'Zero unauthorized privilege escalations across course authoring and grade submission endpoints.',
        },
      ],
      challengesAndSolutions: [
        {
          challenge:
            'Coordinating asynchronous database connection readiness during Docker Compose cold starts.',
          solution:
            'Implemented custom Docker healthchecks and wait-for scripts ensuring the database was fully accepting connections before Express initialized.',
        },
        {
          challenge:
            'Calculating real-time student completion rates over multi-module courses without database performance bottlenecks.',
          solution:
            'Constructed indexed MongoDB aggregation pipelines utilizing $facet and $lookup, caching intermediate results in memory.',
        },
      ],
      securityAndPerformance: {
        security: [
          'Helmet.js HTTP security headers (CSP, X-Frame-Options, HSTS).',
          'Bcrypt password hashing with strong salt rounds.',
          'Rate-limiting middleware protecting authentication endpoints against brute-force attacks.',
        ],
        performance: [
          'Efficient Docker container startup under 5 seconds.',
          'Gzip/Brotli compression on static Angular assets.',
          'Sub-30ms API response latency on indexed course queries.',
        ],
      },
      results: [
        'Fully reproducible deployment through a single `docker compose up -d` command.',
        'Complete end-to-end integration across frontend, backend, and persistence tiers.',
        'Verified source code and architectural documentation available on GitHub.',
      ],
      lessonsLearned: [
        'Containerization from Day 1 eliminates "works on my machine" discrepancies and provides immediate deployment readiness.',
      ],
    },
  },
  {
    id: 'hasbi',
    number: '04',
    title: 'Hasbi',
    type: 'mobile',
    category: 'MOBILE · PERSONAL FINANCE',
    descriptionKey: 'WORK.HASBI.DESCRIPTION',
    description:
      'Personal finance and expense management mobile app with offline-first budgeting, intuitive transaction tracking, and local analytics. Built with Flutter and Riverpod.',
    technologies: [
      'Flutter',
      'Dart',
      'Riverpod',
      'Local Storage',
      'Clean Architecture',
      'Material 3',
    ],
    heroImage: '/assets/projects/hasbi/hero.webp',
    image: '/assets/projects/hasbi/hero.webp',
    imageAlt: 'Hasbi personal finance mobile app showing expense tracking dashboard',
    repositoryUrl: 'https://github.com/NK01Dev/hasbi',
    caseStudyUrl: '/projects/hasbi',
    caseStudy: {
      summary:
        'A privacy-first personal finance and expense tracking mobile application built with Flutter and Riverpod, giving users granular control over their budgeting and spending without sharing financial data with third parties.',
      context:
        'Designed to solve consumer privacy concerns surrounding financial tracking apps by operating on a strict zero-cloud, 100% on-device architecture.',
      problem:
        'Most modern budgeting applications require linking bank credentials or storing financial transaction records on remote cloud servers, creating severe privacy risks and vendor lock-in.',
      role: 'Mobile Architect & Developer',
      responsibilities: [
        'Designed an intuitive, minimalist Material 3 UI focused on rapid single-tap expense logging.',
        'Structured the state management flow using Riverpod for dynamic category spending aggregation.',
        'Implemented local persistence with encrypted storage for account balances and monthly budgets.',
        'Developed interactive SVG charts providing visual expense breakdowns and monthly savings trends.',
      ],
      architecture: {
        pattern: 'Clean Architecture with MVVM State Containers',
        description:
          'Clear layer separation ensuring financial calculation logic is completely decoupled from UI rendering widgets.',
        highlights: [
          'Reactive Ledger Engine: Real-time recalculation of remaining daily and monthly allowances as transactions are logged.',
          'Offline Storage Layer: Encrypted local key-value and tabular store keeping all financial history strictly on-device.',
          'Export Subsystem: On-device generation of CSV and PDF spending summaries without external server processing.',
        ],
      },
      keyEngineeringDecisions: [
        {
          decision: '100% Local On-Device Architecture',
          rationale:
            'Users are significantly more comfortable logging personal financial data when guaranteed that no data ever leaves their hardware.',
          impact:
            'Zero cloud hosting costs, zero privacy liability, and instant offline responsiveness.',
        },
      ],
      challengesAndSolutions: [
        {
          challenge:
            'Delivering complex financial charts with smooth animations on resource-constrained devices.',
          solution:
            'Leveraged optimized custom canvas rendering with cached chart paths, preventing unnecessary widget rebuilds.',
        },
      ],
      securityAndPerformance: {
        security: [
          'Zero network communication or external API calls.',
          'Biometric authentication gate (Fingerprint / Face ID) protecting app entry.',
          'Local data encryption ensuring unreadable storage upon phone compromise.',
        ],
        performance: [
          'Instant transaction capture under 200ms.',
          'Minimal memory footprint under 40MB RAM.',
          'Instantaneous offline reporting without network dependencies.',
        ],
      },
      results: [
        'Elegant, privacy-respecting financial utility.',
        'Clean, modular Flutter codebase adhering to Clean Architecture guidelines.',
        'Verified open-source repository available on GitHub.',
      ],
      lessonsLearned: [
        'Privacy-focused software design is a major differentiator in utility applications and builds deep user trust.',
      ],
    },
  },
];
