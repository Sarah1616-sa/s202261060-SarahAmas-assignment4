let activeProjectFilter = 'all';
let notificationTimeoutId;

document.addEventListener('DOMContentLoaded', () => {
    injectPortfolioRefreshStyles();
    applyPortfolioRefresh();
    initThemeToggle();
    initMobileNav();
    initTypingEffect();
    initScrollAnimations();
    initProjectControls();
    initPortfolioLightbox();
    initGithubProjects();
    initContactForm();
    initScrollToTop();
    initSmoothScroll();
    initActiveNavHighlight();
    initNavbarEffect();
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

function injectPortfolioRefreshStyles() {
    if (document.querySelector('link[data-portfolio-refresh]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/portfolio-refresh.css';
    link.dataset.portfolioRefresh = 'true';
    document.head.appendChild(link);
}

function applyPortfolioRefresh() {
    enhancePowrExperience();
    rebuildCertifications();
    rebuildProjectPortfolio();
}

function enhancePowrExperience() {
    document.querySelectorAll('.timeline-content').forEach((item) => {
        const heading = item.querySelector('h4');
        if (!heading || !heading.textContent.includes('Game Development Trainee')) return;
        const description = item.querySelector('p:last-child');
        if (description) {
            description.textContent = 'Developed two interactive game projects at POWR Games, working across gameplay flow, UI/UX, real-time player interactions, testing, iteration, and product polish. I also added micro-interactions such as character motion triggered from the game logo to make the interface feel more alive.';
        }
    });
}

function rebuildCertifications() {
    const section = document.querySelector('.certifications');
    if (!section) return;

    section.innerHTML = `
        <h3 class="timeline-heading">
            <span class="timeline-icon" aria-hidden="true">&#127942;</span>
            Certifications & Professional Development
        </h3>
        <div class="cert-grid">
            <article class="cert-card credential-card">
                <div class="cert-icon" aria-hidden="true">AI</div>
                <h4>Generative AI & Autonomous Systems Workshop</h4>
                <p>Hands-on professional development focused on generative AI and autonomous systems.</p>
                <span class="credential-issuer">NITA / AIPA · 2026</span>
            </article>
            <article class="cert-card credential-card">
                <div class="cert-icon" aria-hidden="true">FW</div>
                <h4>McKinsey.org Forward Program</h4>
                <p>Problem solving, adaptability, communication, digital tools, and professional growth.</p>
                <span class="credential-issuer">McKinsey.org · 2025</span>
            </article>
            <article class="cert-card credential-card">
                <div class="cert-icon" aria-hidden="true">AT</div>
                <h4>ATAD Program</h4>
                <p>Professional development training focused on career readiness, communication, and personal branding.</p>
                <span class="credential-issuer">KFUPM Student Affairs · 2025</span>
            </article>
            <article class="cert-card credential-card">
                <div class="cert-icon" aria-hidden="true">MS</div>
                <h4>Microsoft Office Specialist (MOS)</h4>
                <p>60 hours of structured Microsoft Office Specialist training.</p>
                <span class="credential-issuer">KFUPM · 2024</span>
            </article>
        </div>
    `;
}

function rebuildProjectPortfolio() {
    const projectsSection = document.getElementById('projects');
    const grid = document.getElementById('projectsGrid');
    if (!projectsSection || !grid) return;

    const title = projectsSection.querySelector('.section-title');
    const subtitle = projectsSection.querySelector('.section-subtitle');
    if (title) title.textContent = 'Selected Work';
    if (subtitle) subtitle.textContent = 'Game development, product engineering, healthcare, security, databases, and interface design.';

    const filters = projectsSection.querySelector('.filter-buttons');
    if (filters) {
        filters.innerHTML = `
            <button class="btn btn-filter active" type="button" data-filter="all">All</button>
            <button class="btn btn-filter" type="button" data-filter="game">Games</button>
            <button class="btn btn-filter" type="button" data-filter="web">Web / Product</button>
            <button class="btn btn-filter" type="button" data-filter="ui">UI/UX</button>
            <button class="btn btn-filter" type="button" data-filter="other">Engineering</button>
        `;
    }

    grid.innerHTML = `
        <article class="project-card case-study featured" data-aos="fade-up" data-category="game">
            <div class="project-badge">POWR Games · Featured</div>
            <div class="project-media-panel">
                <div class="project-gallery-row">
                    <button class="project-media-trigger" type="button" data-lightbox-src="assets/images/no-talk-home.jpg" data-lightbox-caption="No Talk — player entry and room creation screen">
                        <img src="assets/images/no-talk-home.jpg" alt="No Talk game home screen with room creation interface" loading="lazy">
                    </button>
                    <button class="project-media-trigger" type="button" data-lightbox-src="assets/images/no-talk-stage.jpg" data-lightbox-caption="No Talk — gameplay stage, room settings, and POWR platform integration">
                        <img src="assets/images/no-talk-stage.jpg" alt="No Talk gameplay stage, room configuration, and POWR platform screens" loading="lazy">
                    </button>
                </div>
            </div>
            <div class="project-content">
                <span class="portfolio-kicker">Game case study</span>
                <h3>No Talk — بدون كلام</h3>
                <p class="project-role">Real-time multiplayer charades web game</p>
                <p>Developed during my POWR Games training as a full multiplayer experience rather than a static prototype. The work covered room flow, turn behavior, game-state feedback, Arabic-first UI decisions, and responsive player interactions.</p>
                <div class="project-proof">
                    <span>Real-time Multiplayer</span><span>Arabic RTL</span><span>Game Flow</span><span>UI Iteration</span>
                </div>
                <ul class="project-detail-list">
                    <li>Creator/join-room flow, teams, difficulty, timers, rounds, and assist-card configuration.</li>
                    <li>Stage experience built around the reveal curtain and clear team/round feedback.</li>
                    <li>Added interactive character motion triggered from the game logo for additional interface feedback.</li>
                </ul>
                <div class="project-tags">
                    <span class="tag">JavaScript</span><span class="tag">Node.js</span><span class="tag">Socket.IO</span><span class="tag">Game Design</span>
                </div>
            </div>
        </article>

        <article class="project-card case-study featured" data-aos="fade-up" data-category="game">
            <div class="project-badge">POWR Games</div>
            <div class="project-media-panel contain">
                <button class="project-media-trigger" type="button" data-lightbox-src="assets/images/xo-game-flow.jpg" data-lightbox-caption="XO — full seven-screen gameplay flow">
                    <img src="assets/images/xo-game-flow.jpg" alt="XO game full flow showing splash, rooms, lobby, questions, board, power clash, and winner screen" loading="lazy">
                </button>
            </div>
            <div class="project-content">
                <span class="portfolio-kicker">Game case study</span>
                <h3>XO — إكس أو</h3>
                <p class="project-role">Question-driven team XO game with power clashes</p>
                <p>Designed the experience as a seven-screen game loop that combines trivia, team turns, the XO board, and special abilities into one coherent multiplayer flow.</p>
                <div class="project-proof">
                    <span>7-screen Flow</span><span>Lobby Design</span><span>Power Clash</span><span>Winner State</span>
                </div>
                <ul class="project-detail-list">
                    <li>Splash → Create/Join Room → Host Lobby → Question → XO Board → Power Clash → Winner.</li>
                    <li>Focused on readable turn ownership, room configuration, state transitions, and consistent visual feedback.</li>
                </ul>
                <div class="project-tags">
                    <span class="tag">Game Design</span><span class="tag">JavaScript</span><span class="tag">UI/UX</span><span class="tag">Gameplay Systems</span>
                </div>
            </div>
        </article>

        <article class="project-card case-study featured" data-aos="fade-up" data-category="web">
            <div class="project-badge">Healthcare Hackathon</div>
            <div class="project-media-panel contain">
                <button class="project-media-trigger" type="button" data-lightbox-src="assets/images/smart-diaguide-1.jpg" data-lightbox-caption="Smart DiaGuide — patient dashboard, clinical workflows, and AI assistant concepts">
                    <img src="assets/images/smart-diaguide-1.jpg" alt="Smart DiaGuide patient dashboard and AI healthcare interface concepts" loading="lazy">
                </button>
            </div>
            <div class="project-content">
                <span class="portfolio-kicker">Product case study</span>
                <h3>Smart DiaGuide</h3>
                <p class="project-role">Diabetes support web application built with medical advisors</p>
                <p>Built a bilingual patient/doctor experience around adherence, patient monitoring, risk escalation, and accessible health information. Medical advisors helped shape the domain requirements while I translated them into the software experience.</p>
                <div class="project-proof">
                    <span>Patient Dashboard</span><span>Doctor View</span><span>AI Assistant</span><span>Bilingual UX</span>
                </div>
                <div class="project-tags">
                    <span class="tag">Healthcare</span><span class="tag">Web App</span><span class="tag">Product Design</span><span class="tag">Hackathon</span>
                </div>
            </div>
        </article>

        <article class="project-card case-study featured" data-aos="fade-up" data-category="web">
            <div class="project-badge">Web Engineering</div>
            <div class="project-media-panel contain">
                <button class="project-media-trigger" type="button" data-lightbox-src="assets/images/micro-connect-dashboard.jpg" data-lightbox-caption="Micro Connect — brand dashboard and end-to-end influencer collaboration flows">
                    <img src="assets/images/micro-connect-dashboard.jpg" alt="Micro Connect brand dashboard and influencer platform screens" loading="lazy">
                </button>
            </div>
            <div class="project-content">
                <span class="portfolio-kicker">Product case study</span>
                <h3>Micro Connect</h3>
                <p class="project-role">Brand × micro-influencer collaboration platform</p>
                <p>A web platform that helps brands discover creators, create campaigns, manage collaboration workflows, and structure agreements between brands and influencers.</p>
                <div class="project-proof">
                    <span>Brand Dashboard</span><span>Influencer Discovery</span><span>Campaign Flow</span><span>Contract Workflow</span>
                </div>
                <div class="project-tags">
                    <span class="tag">Web Engineering</span><span class="tag">UI/UX</span><span class="tag">Figma</span><span class="tag">Product Flow</span>
                </div>
            </div>
        </article>

        <div class="projects-break" aria-hidden="true">
            <div><span class="portfolio-kicker">Technical breadth</span><h3>More Engineering Work</h3></div>
            <p>Security, databases, desktop systems, and UI/UX.</p>
        </div>

        <article class="project-card compact" data-aos="fade-up" data-category="other">
            <div class="project-image">
                <button class="project-media-trigger" type="button" data-lightbox-src="assets/images/dvsa.jpg" data-lightbox-caption="DVSA Vulnerability Discovery & Remediation — ICS344 security project">
                    <img src="assets/images/dvsa.jpg" alt="DVSA vulnerability discovery and remediation project summary" loading="lazy">
                </button>
            </div>
            <div class="project-content">
                <h3>DVSA Vulnerability Discovery & Remediation</h3>
                <p>A security project focused on discovering, reproducing, documenting, and remediating vulnerabilities in an AWS serverless application.</p>
                <div class="metric-strip"><div><strong>10</strong><span>Vulnerabilities</span></div><div><strong>8</strong><span>AWS Services</span></div><div><strong>100%</strong><span>Verified</span></div></div>
                <div class="project-tags"><span class="tag">Security</span><span class="tag">AWS</span><span class="tag">Testing</span></div>
            </div>
        </article>

        <article class="project-card compact" data-aos="fade-up" data-category="other">
            <div class="project-image">
                <button class="project-media-trigger" type="button" data-lightbox-src="assets/images/database-er.jpg" data-lightbox-caption="Store Database System — entity relationship model">
                    <img src="assets/images/database-er.jpg" alt="Store Database System entity relationship diagram" loading="lazy">
                </button>
            </div>
            <div class="project-content">
                <h3>Store Database System</h3>
                <p>Relational database design for customers, owners, stores, orders, products, reports, reviews, and administrative workflows.</p>
                <div class="project-tags"><span class="tag">SQL</span><span class="tag">ER Modeling</span><span class="tag">Data Integrity</span></div>
            </div>
        </article>

        <article class="project-card compact" data-aos="fade-up" data-category="ui">
            <div class="project-image">
                <button class="project-media-trigger" type="button" data-lightbox-src="assets/images/tutoring-platform.jpg" data-lightbox-caption="Student Tutoring Platform — interface prototype">
                    <img src="assets/images/tutoring-platform.jpg" alt="Student Tutoring Platform interface prototype" loading="lazy">
                </button>
            </div>
            <div class="project-content">
                <h3>Student Tutoring Platform</h3>
                <p>A student-centered tutoring experience with tutor discovery, sessions, resources, profiles, and progress-oriented flows.</p>
                <div class="project-tags"><span class="tag">Figma</span><span class="tag">UI/UX</span><span class="tag">Prototype</span></div>
            </div>
        </article>

        <article class="project-card compact" data-aos="fade-up" data-category="other">
            <div class="project-image">
                <button class="project-media-trigger" type="button" data-lightbox-src="assets/images/campus-map.jpg" data-lightbox-caption="University Map & Building System — campus visualization">
                    <img src="assets/images/campus-map.jpg" alt="University Map and Building System campus visualization" loading="lazy">
                </button>
            </div>
            <div class="project-content">
                <h3>University Map & Building System</h3>
                <p>A C# desktop application for visualizing campus buildings, calculating distances, and showing building capacity information.</p>
                <div class="project-tags"><span class="tag">C#</span><span class="tag">Desktop</span><span class="tag">Visualization</span></div>
            </div>
        </article>
    `;
}

function initPortfolioLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Project image preview');
    lightbox.innerHTML = `
        <div class="lightbox-dialog">
            <button type="button" class="lightbox-close" aria-label="Close image preview">&times;</button>
            <img src="" alt="">
            <p class="lightbox-caption"></p>
        </div>
    `;
    document.body.appendChild(lightbox);

    const image = lightbox.querySelector('img');
    const caption = lightbox.querySelector('.lightbox-caption');
    const closeButton = lightbox.querySelector('.lightbox-close');
    let lastTrigger = null;

    const close = () => {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
        if (lastTrigger) lastTrigger.focus();
    };

    document.addEventListener('click', (event) => {
        const trigger = event.target.closest('[data-lightbox-src]');
        if (!trigger) return;
        lastTrigger = trigger;
        image.src = trigger.dataset.lightboxSrc || '';
        image.alt = trigger.querySelector('img')?.alt || 'Project preview';
        caption.textContent = trigger.dataset.lightboxCaption || image.alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
        closeButton.focus();
    });

    closeButton.addEventListener('click', close);
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) close();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && lightbox.classList.contains('open')) close();
    });
}

function initThemeToggle() {
    const toggleButton = document.getElementById('themeToggle');
    if (!toggleButton) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme || (mediaQuery.matches ? 'dark' : 'light'));
    toggleButton.addEventListener('click', () => {
        const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', nextTheme);
        setTheme(nextTheme);
    });
    mediaQuery.addEventListener('change', (event) => {
        if (!localStorage.getItem('theme')) setTheme(event.matches ? 'dark' : 'light');
    });
}

function setTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
}

function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;
    const closeMenu = () => {
        menu.classList.remove('active');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
    };
    toggle.addEventListener('click', () => {
        const open = !menu.classList.contains('active');
        menu.classList.toggle('active', open);
        toggle.classList.toggle('active', open);
        toggle.setAttribute('aria-expanded', String(open));
        document.body.classList.toggle('menu-open', open);
    });
    menu.querySelectorAll('.nav-link').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
}

function initTypingEffect() {
    const target = document.getElementById('typingText');
    if (!target) return;
    const phrases = ['Software Engineering Student', 'Game Design Concentration', 'Game Developer', 'Interactive Experience Builder', 'UI/UX Designer'];
    let phraseIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    const tick = () => {
        const phrase = phrases[phraseIndex];
        characterIndex += deleting ? -1 : 1;
        target.textContent = phrase.slice(0, characterIndex);
        let delay = deleting ? 45 : 90;
        if (!deleting && characterIndex === phrase.length) { deleting = true; delay = 1700; }
        else if (deleting && characterIndex === 0) { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; delay = 350; }
        window.setTimeout(tick, delay);
    };
    window.setTimeout(tick, 600);
}

function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');
    if (!elements.length || !('IntersectionObserver' in window)) {
        elements.forEach((el) => el.classList.add('aos-animate'));
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const delay = Number(entry.target.getAttribute('data-aos-delay') || 0);
            window.setTimeout(() => entry.target.classList.add('aos-animate'), delay);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    elements.forEach((element) => observer.observe(element));
}

function initProjectControls() {
    const buttons = document.querySelectorAll('.btn-filter');
    const search = document.getElementById('projectSearch');
    if (!buttons.length || !search) return;
    buttons.forEach((button) => button.addEventListener('click', () => {
        activeProjectFilter = button.dataset.filter || 'all';
        buttons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        updateProjectVisibility();
    }));
    search.addEventListener('input', updateProjectVisibility);
    updateProjectVisibility();
}

function updateProjectVisibility() {
    const cards = document.querySelectorAll('.projects-grid .project-card');
    const breaks = document.querySelectorAll('.projects-grid .projects-break');
    const empty = document.getElementById('noProjectsMessage');
    const search = document.getElementById('projectSearch');
    if (!cards.length || !empty || !search) return;
    const term = search.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach((card) => {
        const category = card.dataset.category || '';
        const matchesFilter = activeProjectFilter === 'all' || category === activeProjectFilter;
        const matchesSearch = !term || card.textContent.toLowerCase().includes(term);
        const show = matchesFilter && matchesSearch;
        card.classList.toggle('hidden', !show);
        card.setAttribute('aria-hidden', String(!show));
        if (show) visible += 1;
    });
    breaks.forEach((item) => item.style.display = activeProjectFilter === 'all' && !term ? '' : 'none');
    empty.classList.toggle('show', visible === 0);
    empty.textContent = 'No projects found.';
}

async function initGithubProjects() {
    const status = document.getElementById('githubStatus');
    const container = document.getElementById('githubProjects');
    if (!status || !container) return;
    try {
        const response = await fetch('https://api.github.com/users/Sarah1616-sa/repos?sort=updated&per_page=6');
        if (!response.ok) throw new Error(`GitHub request failed with status ${response.status}`);
        const repositories = await response.json();
        if (!Array.isArray(repositories)) throw new Error('Unexpected GitHub response');
        const repos = repositories.filter((repo) => !repo.fork).slice(0, 4);
        if (!repos.length) { status.textContent = 'No public repositories found.'; return; }
        status.classList.add('hidden');
        container.innerHTML = repos.map(createRepoCard).join('');
    } catch (error) {
        status.textContent = 'Unable to load GitHub projects right now.';
        status.classList.add('error');
    }
}

function createRepoCard(repo) {
    const description = repo.description || 'No description available.';
    const language = repo.language || 'Project';
    const repoName = repo.name || 'Untitled repository';
    const repoUrl = repo.html_url || 'https://github.com/Sarah1616-sa';
    const date = repo.updated_at ? new Date(repo.updated_at) : null;
    const updated = date && !Number.isNaN(date.getTime()) ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Recently';
    return `<article class="github-card"><div class="github-card-header"><h4>${escapeHtml(repoName)}</h4><span class="repo-language">${escapeHtml(language)}</span></div><p>${escapeHtml(description)}</p><div class="github-card-footer"><span>Updated ${escapeHtml(updated)}</span><a href="${escapeHtml(repoUrl)}" target="_blank" rel="noopener noreferrer">Open Repo</a></div></article>`;
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const fields = { name: document.getElementById('name'), email: document.getElementById('email'), subject: document.getElementById('subject'), message: document.getElementById('message') };
    const status = document.getElementById('formStatus');
    const submit = form.querySelector('button[type="submit"]');
    if (!submit) return;
    const validators = {
        name: (value) => !value.trim() ? 'Please enter your name.' : value.trim().length < 2 ? 'Name must be at least 2 characters.' : '',
        email: (value) => !value.trim() ? 'Please enter your email address.' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? 'Please enter a valid email address.' : '',
        subject: (value) => value.trim() && value.trim().length < 3 ? 'Subject must be at least 3 characters or left empty.' : '',
        message: (value) => !value.trim() ? 'Please enter your message.' : value.trim().length < 10 ? 'Message must be at least 10 characters.' : ''
    };
    const validate = (name) => {
        const input = fields[name];
        if (!input) return true;
        const message = validators[name](input.value);
        const group = input.closest('.form-group');
        const error = group?.querySelector('.error-message');
        group?.classList.toggle('invalid', Boolean(message));
        if (error) { error.textContent = message; error.classList.toggle('show', Boolean(message)); }
        return !message;
    };
    Object.entries(fields).forEach(([name, input]) => {
        if (!input) return;
        input.addEventListener('input', () => { validate(name); if (status) { status.textContent = ''; status.className = 'form-status'; } });
        input.addEventListener('blur', () => validate(name));
    });
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const invalid = Object.keys(fields).filter((name) => !validate(name));
        if (invalid.length) { if (status) { status.textContent = 'Please correct the highlighted form errors and try again.'; status.className = 'form-status error'; } showNotification('Please correct the form errors.', 'error'); return; }
        const original = submit.innerHTML;
        submit.disabled = true;
        submit.innerHTML = '<span>Sending...</span>';
        window.setTimeout(() => {
            form.reset();
            submit.disabled = false;
            submit.innerHTML = original;
            if (status) { status.textContent = 'Message form validated successfully.'; status.className = 'form-status success'; }
            showNotification('Message form validated.', 'success');
        }, 700);
    });
}

function showNotification(message, type) {
    if (notificationTimeoutId) window.clearTimeout(notificationTimeoutId);
    document.querySelector('.notification')?.remove();
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    requestAnimationFrame(() => notification.classList.add('visible'));
    notificationTimeoutId = window.setTimeout(() => { notification.classList.remove('visible'); window.setTimeout(() => notification.remove(), 300); }, 3000);
}

function initScrollToTop() {
    const button = document.getElementById('scrollTop');
    if (!button) return;
    const update = () => button.classList.toggle('visible', window.scrollY > 320);
    window.addEventListener('scroll', update, { passive: true });
    button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    update();
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;
        event.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 86;
        window.scrollTo({ top, behavior: 'smooth' });
    }));
}

function initActiveNavHighlight() {
    const sections = document.querySelectorAll('header[id], section[id]');
    const links = document.querySelectorAll('.nav-link');
    if (!sections.length || !links.length) return;
    const update = () => {
        let id = 'home';
        sections.forEach((section) => { if (window.scrollY >= section.offsetTop - 140) id = section.id; });
        links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
}

function initNavbarEffect() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    const update = () => navbar.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', update, { passive: true });
    update();
}

function escapeHtml(value) {
    return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
