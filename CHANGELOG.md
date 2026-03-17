# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-03-05

### 🚀 Features

- Enhance blog post metadata with excerpt generation and update social links
- Add Netlify redirects for host-meta and webfinger endpoints
- Update API call in nuxt.config.js to include sorting by creation date
- Add rel="me" link to GitHub profile in nuxt.config.js
- Add webmention support and enhance ArticleView component for better semantic structure
- Add IndieAuth endpoints to nuxt.config.js for improved authentication support
- *(umami)* Add trackign script
- Refactor pages and components for improved structure and performance
- *(middleware)* Add custom manifest-route-rule to suppress warnings
- Enhance article and collection components with new features
- Add RSS feed generation and sitemap XML route
- Implement global SEO composable and enhance SEO across the application
- Add engines field to package.json for node and npm versions
- Add .output directory to .gitignore
- Update pagination logic and enable prerendering for routes
- Update BLOG_EP to a fixed URL in nuxt.config.ts
- Enable devtools and add new icons and web manifest
- Update meta description in nuxt.config.ts
- Add @tailwindcss/typography and update dependencies
- Enhance Rating component with compact mode and improve rating calculation
- Implement tabbed navigation for collection display
- Update prerender routes in nuxt.config.ts
- Enhance CollectionIndex and TabWrapper components for improved styling and functionality
- *(ArticleView)* Implement footnote support with marked-footnote
- *(ArticleView)* Add partner link footnote support
- *(WidgetOpenLibrary)* Replace buttons with links for purchases
- *(CollectionIndex)* Improve styling and sorting of items
- *(author, genre)* Enhance layout and data handling
- *(navigation)* Add genre and author links to navigation
- *(Header)* Update header conditions for slogan display
- *(ArticleView)* Modify footnote handling in non-detail view
- *(ArticleView)* Add Umami events to footnote links
- *(ArticleView)* Switch footnotes / ratings pos
- *(category)* Add rating filter for books category
- *(category)* Increase articles page size for better UX
- *(ArticleView)* Improve partner link handling in markdown
- *(markdown)* Add script to generate markdown files
- *(markdown)* Add category directory handling for markdown files
- *(post)* Add new markdown file for "Das Evangelium der Aale"
- *(markdown)* Enhance markdown generation and cleanup
- *(package)* Add module type declaration
- Add markdown files from posts
- *(article)* Add localization support for articles
- *(lightbox)* Implement lightbox functionality for images in articles
- *(image-gallery)* Apply gallery only on multiple images
- *(localization)* Add showLocalization prop and filter articles by locale in index pages
- *(internal-linking)* Add support for English slug and link to English version of articles
- *(widget)* Add compact view for book widgets and update layout in lists

### 🐛 Bug Fixes

- *(deps)* Bump core-js from 3.12.1 to 3.13.1
- *(deps)* Bump @nuxtjs/axios from 5.13.4 to 5.13.6
- *(deps)* Bump core-js from 3.13.1 to 3.14.0
- *(deps)* Bump @fortawesome/free-brands-svg-icons from 5.15.3 to 5.15.4
- *(deps)* Bump core-js from 3.14.0 to 3.19.0
- *(deps)* Bump nuxt from 2.15.6 to 2.15.8
- *(deps)* Bump @fortawesome/free-solid-svg-icons from 5.15.3 to 5.15.4
- *(deps)* Bump markdown-it-image-lazy-loading from 1.1.0 to 1.2.0
- *(deps)* Bump react from 17.0.2 to 18.2.0
- *(feed)* Revert feed items
- *(umami)* Change id
- Update internal-book-linking props to use direct data references
- Handle potential null values in collections and improve data fetching
- Enhance route handling in Header component
- Fix book widget
- Add margin to logo heading in Header component
- Update package manager version in package.json
- *(pagination)* Fix article pagination layout and improve data fetching logic
- *(rating)* Enhance rating prop validation and ensure proper number handling
- *(widget)* Adjust book cover size for improved layout in full version

### 🚜 Refactor

- Update template syntax for improved readability and consistency
- Improve header navigation and social links structure
- Enhance ArticleView component layout and structure for better readability
- Remove legacy lock files and enhance Header component with mobile menu
- Remove unused pages and streamline routing
- Remove debug information from blog slug page
- Enhance Header component for improved navigation and layout
- Improve Header component layout and styling
- Streamline event tracking in components
- Enhance tracking events across components
- Enhance layout and styling across multiple components

### 📚 Documentation

- Update README with local Strapi setup instructions
- Update README with additional setup instructions and TODO list
- Update README with new TODO item and mark mastodon auth as complete; update site title in nuxt.config.js

### ⚙️ Miscellaneous Tasks

- *(vscode)* Add settings
- Update @nuxtjs/tailwindcss to version 6.13.2
- Downgrade @nuxtjs/tailwindcss to version 4.0.0
- Update Font Awesome icons to version 6.7.2 and add new social icons
- Remove pnpm lock
- Update track
- Update dependencies and refactor Strapi integration
- Update @nuxtjs/tailwindcss to version 6.14.0 and enhance Tailwind CSS configuration
- Update ESLint configuration and refactor data handling
- Remove ESLint configuration and update data fetching
- Refactor data fetching to use native fetch API
- Disable eslint-module due to dependency conflicts
- Remove package-lock.json and pnpm-lock.yaml, add test-markdown.js file, and refactor manifest-route-rule middleware

<!-- generated by git-cliff -->
