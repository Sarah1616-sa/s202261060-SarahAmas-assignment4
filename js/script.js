let activeProjectFilter = 'all';
let notificationTimeoutId;

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileNav();
    initTypingEffect();
    initScrollAnimations();
    initProjectControls();
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

function initThemeToggle() {
    const toggleButton = document.getElementById('themeToggle');

    if (!toggleButton) {
        return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || (mediaQuery.matches ? 'dark' : 'light');

    setTheme(initialTheme);

    toggleButton.addEventListener('click', () => {
        const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', nextTheme);
        setTheme(nextTheme);
    });

    mediaQuery.addEventListener('change', (event) => {
        if (!localStorage.getItem('theme')) {
            setTheme(event.matches ? 'dark' : 'light');
        }
    });
}

function setTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
}

function initMobileNav() {
    const navToggleButton = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggleButton || !navMenu) {
        return;
    }

    const closeMenu = () => {
        navMenu.classList.remove('active');
        navToggleButton.classList.remove('active');
        navToggleButton.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
    };

    navToggleButton.addEventListener('click', () => {
        const willOpen = !navMenu.classList.contains('active');
        navMenu.classList.toggle('active', willOpen);
        navToggleButton.classList.toggle('active', willOpen);
        navToggleButton.setAttribute('aria-expanded', String(willOpen));
        document.body.classList.toggle('menu-open', willOpen);
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
}

function initTypingEffect() {
    const typingTarget = document.getElementById('typingText');

    if (!typingTarget) {
        return;
    }

    const phrases = [
        'Software Engineering Student',
        'AI Enthusiast',
        'UI/UX Designer',
        'Problem Solver',
        'Lifelong Learner'
    ];

    let phraseIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;

    const typeNextCharacter = () => {
        const currentPhrase = phrases[phraseIndex];
        const nextLength = isDeleting ? characterIndex - 1 : characterIndex + 1;

        typingTarget.textContent = currentPhrase.slice(0, nextLength);
        characterIndex = nextLength;

        let delay = isDeleting ? 50 : 100;

        if (!isDeleting && characterIndex === currentPhrase.length) {
            isDeleting = true;
            delay = 1800;
        } else if (isDeleting && characterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 400;
        }

        window.setTimeout(typeNextCharacter, delay);
    };

    window.setTimeout(typeNextCharacter, 800);
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');

    if (!animatedElements.length) {
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const delay = Number(entry.target.getAttribute('data-aos-delay') || 0);

            window.setTimeout(() => {
                entry.target.classList.add('aos-animate');
            }, delay);

            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach((element) => observer.observe(element));
}

function initProjectControls() {
    const filterButtons = document.querySelectorAll('.btn-filter');
    const searchInput = document.getElementById('projectSearch');

    if (!filterButtons.length || !searchInput) {
        return;
    }

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            activeProjectFilter = button.dataset.filter || 'all';

            filterButtons.forEach((item) => item.classList.remove('active'));
            button.classList.add('active');
            updateProjectVisibility();
        });
    });

    searchInput.addEventListener('input', updateProjectVisibility);
    updateProjectVisibility();
}

function updateProjectVisibility() {
    const projectCards = document.querySelectorAll('.projects-grid .project-card');
    const noProjectsMessage = document.getElementById('noProjectsMessage');
    const searchInput = document.getElementById('projectSearch');

    if (!projectCards.length || !noProjectsMessage || !searchInput) {
        return;
    }

    const searchTerm = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    projectCards.forEach((card) => {
        const cardCategory = card.dataset.category || '';
        const cardText = card.textContent.toLowerCase();
        const matchesFilter = activeProjectFilter === 'all' || cardCategory === activeProjectFilter;
        const matchesSearch = !searchTerm || cardText.includes(searchTerm);
        const shouldShow = matchesFilter && matchesSearch;

        card.classList.toggle('hidden', !shouldShow);
        card.setAttribute('aria-hidden', String(!shouldShow));

        if (shouldShow) {
            visibleCount += 1;
        }
    });

    noProjectsMessage.classList.toggle('show', visibleCount === 0);

    noProjectsMessage.textContent = 'No projects found.';
}

async function initGithubProjects() {
    const githubStatus = document.getElementById('githubStatus');
    const githubProjectsContainer = document.getElementById('githubProjects');

    if (!githubStatus || !githubProjectsContainer) {
        return;
    }

    try {
        const response = await fetch('https://api.github.com/users/Sarah1616-sa/repos?sort=updated&per_page=4');

        if (!response.ok) {
            throw new Error(`GitHub request failed with status ${response.status}`);
        }

        const repositories = await response.json();
        const portfolioRepos = repositories.filter((repo) => !repo.fork).slice(0, 4);

        if (!portfolioRepos.length) {
            githubStatus.textContent = 'No projects found.';
            return;
        }

        githubStatus.classList.add('hidden');
        githubProjectsContainer.innerHTML = portfolioRepos.map((repo) => createRepoCard(repo)).join('');
    } catch (error) {
        githubStatus.textContent = 'Unable to load GitHub projects right now. Please try again later.';
        githubStatus.classList.add('error');
    }
}

function createRepoCard(repo) {
    const description = repo.description || 'No description provided.';
    const language = repo.language || 'Not specified';
    const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return `
        <article class="github-card">
            <div class="github-card-header">
                <h4>${escapeHtml(repo.name)}</h4>
                <span class="repo-language">${escapeHtml(language)}</span>
            </div>
            <p>${escapeHtml(description)}</p>
            <div class="github-card-footer">
                <span>Updated ${escapeHtml(updatedDate)}</span>
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">Open Repo</a>
            </div>
        </article>
    `;
}

function initContactForm() {
    const form = document.getElementById('contactForm');

    if (!form) {
        return;
    }

    const fields = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message')
    };
    const formStatus = document.getElementById('formStatus');
    const submitButton = form.querySelector('button[type="submit"]');

    if (!submitButton) {
        return;
    }

    const validators = {
        name(value) {
            if (!value.trim()) {
                return 'Please enter your name.';
            }

            if (value.trim().length < 2) {
                return 'Name must be at least 2 characters.';
            }

            return '';
        },
        email(value) {
            if (!value.trim()) {
                return 'Please enter your email address.';
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value.trim())) {
                return 'Please enter a valid email address.';
            }

            return '';
        },
        subject(value) {
            if (value.trim() && value.trim().length < 3) {
                return 'Subject must be at least 3 characters or left empty.';
            }

            return '';
        },
        message(value) {
            if (!value.trim()) {
                return 'Please enter your message.';
            }

            if (value.trim().length < 10) {
                return 'Message must be at least 10 characters.';
            }

            return '';
        }
    };

    const setFieldError = (input, message) => {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup ? formGroup.querySelector('.error-message') : null;

        if (!formGroup || !errorElement) {
            return;
        }

        formGroup.classList.toggle('invalid', Boolean(message));
        errorElement.textContent = message;
        errorElement.classList.toggle('show', Boolean(message));
    };

    const clearFieldState = (input) => {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup ? formGroup.querySelector('.error-message') : null;

        if (!formGroup || !errorElement) {
            return;
        }

        formGroup.classList.remove('invalid', 'focused');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    };

    const validateField = (fieldName) => {
        const input = fields[fieldName];
        const validator = validators[fieldName];

        if (!input || !validator) {
            return true;
        }

        const message = validator(input.value);
        setFieldError(input, message);
        return !message;
    };

    Object.keys(fields).forEach((fieldName) => {
        const input = fields[fieldName];

        if (!input) {
            return;
        }

        input.addEventListener('input', () => {
            validateField(fieldName);
            if (formStatus) {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }
        });

        input.addEventListener('focus', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.classList.add('focused');
            }
        });

        input.addEventListener('blur', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.classList.remove('focused');
            }

            validateField(fieldName);
        });
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const invalidFieldNames = Object.keys(fields).filter((fieldName) => !validateField(fieldName));

        if (invalidFieldNames.length > 0) {
            if (formStatus) {
                formStatus.textContent = 'Please correct the highlighted form errors and try again.';
                formStatus.className = 'form-status error';
            }

            showNotification('Please correct the form errors and try again.', 'error');
            return;
        }

        const originalButtonContent = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span>Sending...</span>';

        window.setTimeout(() => {
            form.reset();
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonContent;

            Object.values(fields).forEach((input) => {
                if (input) {
                    clearFieldState(input);
                }
            });

            if (formStatus) {
                formStatus.textContent = 'Message sent successfully. Thank you for reaching out.';
                formStatus.className = 'form-status success';
            }

            showNotification('Message sent successfully.', 'success');
        }, 1200);
    });
}

function showNotification(message, type) {
    if (notificationTimeoutId) {
        window.clearTimeout(notificationTimeoutId);
    }

    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    requestAnimationFrame(() => {
        notification.classList.add('visible');
    });

    notificationTimeoutId = window.setTimeout(() => {
        notification.classList.remove('visible');
        window.setTimeout(() => notification.remove(), 300);
    }, 3500);
}

function initScrollToTop() {
    const scrollTopButton = document.getElementById('scrollTop');

    if (!scrollTopButton) {
        return;
    }

    const updateVisibility = () => {
        scrollTopButton.classList.toggle('visible', window.scrollY > 320);
    };

    window.addEventListener('scroll', updateVisibility, { passive: true });
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    updateVisibility();
}

function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');
            const targetElement = targetId ? document.querySelector(targetId) : null;

            if (!targetElement) {
                return;
            }

            event.preventDefault();

            const navbarOffset = 86;
            const topPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarOffset;

            window.scrollTo({
                top: topPosition,
                behavior: 'smooth'
            });
        });
    });
}

function initActiveNavHighlight() {
    const sections = document.querySelectorAll('header[id], section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) {
        return;
    }

    const updateActiveLink = () => {
        let activeSectionId = 'home';

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 140;
            if (window.scrollY >= sectionTop) {
                activeSectionId = section.id;
            }
        });

        navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${activeSectionId}`;
            link.classList.toggle('active', isActive);
        });
    };

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
}

function initNavbarEffect() {
    const navbar = document.querySelector('.navbar');

    if (!navbar) {
        return;
    }

    const updateNavbarState = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 10);
    };

    window.addEventListener('scroll', updateNavbarState, { passive: true });
    updateNavbarState();
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
