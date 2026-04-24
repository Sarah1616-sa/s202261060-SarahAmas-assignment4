# Technical Documentation

## Project Overview

This project is a single-page portfolio website created for SWE363 Assignment 4. It presents personal information, academic background, technical skills, selected projects, and a contact form in a responsive and organized front-end application.

## Technologies Used

- HTML5 for page structure and semantic sections
- CSS3 for layout, styling, responsive behavior, and theme support
- Vanilla JavaScript for interactivity and dynamic behavior
- GitHub REST API for loading repository data
- Local storage for saving theme preference

## Folder Structure

```text
.
|-- index.html
|-- css/
|   `-- styles.css
|-- js/
|   `-- script.js
|-- assets/
|   `-- images/
|-- docs/
|   |-- ai-usage-report.md
|   `-- technical-documentation.md
|-- presentation/
|-- README.md
`-- .gitignore
```

## Features Explanation

- Fixed navigation bar with active section highlighting
- Hero section with typing effect and clear call-to-action buttons
- About, skills, experience, and certifications sections
- Project section with category filtering and search
- GitHub repository area that loads live public repositories
- Contact form with inline validation messages
- Theme toggle and scroll-to-top interaction

## JavaScript Logic

The JavaScript is organized into small initialization functions that run after `DOMContentLoaded`.

- `initThemeToggle()` manages theme switching and saves the selected mode in local storage
- `initMobileNav()` handles the mobile navigation menu and accessibility state
- `initTypingEffect()` rotates short phrases in the hero section
- `initProjectControls()` combines category filtering with project search
- `initGithubProjects()` fetches repository data from GitHub and renders repository cards
- `initContactForm()` validates user input and shows user-friendly feedback
- `initScrollToTop()`, `initSmoothScroll()`, and `initActiveNavHighlight()` improve page navigation

## Error Handling

- If the GitHub API request fails, the page displays a clear fallback message instead of leaving the section empty
- If no GitHub repositories are returned, the interface shows `No projects found.`
- If the local project search and filters hide every project card, the page shows the same empty-state message
- The contact form shows field-level validation errors and a form-level status message when input is invalid

## Responsive Design

The layout uses CSS Grid, Flexbox, and media queries to support different screen sizes.

- Desktop keeps wider multi-column layouts
- Tablet collapses larger grids into fewer columns
- Mobile stacks navigation, project controls, forms, and content cards vertically
- Interactive elements keep usable spacing and button sizes on smaller screens

## Future Improvements

- Connect the contact form to a real backend or email service
- Add real project screenshots inside `assets/images/`
- Expand the GitHub section with pinned repositories or language filters
- Add automated deployment after the final hosting choice is confirmed
