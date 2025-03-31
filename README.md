# Portfolio Website with Payload CMS

A modern portfolio website built with Payload CMS, Next.js, and TypeScript. Features a dark theme design and static site generation for GitHub Pages deployment.

![Portfolio Screenshot](screenshot.png)

## Features

- **Payload CMS Backend**: Headless CMS with MongoDB for content management
- **Next.js Frontend**: Fast, SEO-friendly React framework
- **TypeScript**: Type safety throughout the codebase
- **Dark Theme**: Modern, sophisticated dark UI with accent colors and glass effects
- **Static Site Generation**: Build to static HTML for easy hosting
- **GitHub Pages Ready**: CI/CD workflow for automatic deployment
- **Responsive Design**: Mobile-friendly interface with modern animations
- **Content Collections**: Projects, Blog Posts, Skills, Work Experience, About, Contact

## Tech Stack

- [Payload CMS](https://payloadcms.com/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/) (for local development)
- [Tailwind CSS](https://tailwindcss.com/) (for styling)
- [Lexical Rich Text Editor](https://lexical.dev/)

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the values in `.env` with your configuration

4. Add required assets:
   - Replace placeholder images in the `/public` directory with your own images:
     - `profile-placeholder.jpg`: Your profile photo
     - `project-placeholder-*.jpg`: Project thumbnails
     - `noise.png`: A subtle noise texture for background
     - `og-image.jpg`: Social media preview image

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

To generate a static version of your site:

```bash
npm run build
```

This will create static HTML files in the `dist` directory.

## Deployment

### GitHub Pages

1. Fork this repository
2. Create the following secrets in your GitHub repository:
   - `DATABASE_URI`: Your MongoDB connection string
   - `PAYLOAD_SECRET`: Your Payload secret key
3. Update the `SITE_URL` variable in GitHub repository settings to your GitHub Pages URL
4. Push to the main branch to trigger automatic deployment

### Other Hosting

The static files generated in the `dist` directory can be deployed to any static hosting service:

- Vercel
- Netlify
- AWS S3
- Firebase Hosting
- etc.

## Customization

### Content Management

Access the Payload CMS admin panel at `/admin` to manage your content:

1. Projects: Add your portfolio projects with images, descriptions, and links
2. Blog: Write and publish articles about your work and industry
3. Skills: Showcase your technical skills and expertise
4. Experience: Add your work history and professional background
5. About: Share information about yourself and your career
6. Contact: Manage contact form submissions

### Theme Customization

The dark theme can be customized in:

- `src/app/globals.css`: CSS variables and global styles
- `tailwind.config.ts`: Tailwind theme configuration

## Project Structure

```
/
├── .github/             # GitHub Actions workflows
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js app directory
│   │   ├── admin/       # Admin panel customization
│   │   ├── components/  # React components
│   │   ├── globals.css  # Global styles
│   │   └── layout.tsx   # Root layout component
│   ├── collections/     # Payload CMS collections
│   └── payload.config.ts # Payload configuration
└── tailwind.config.ts   # Tailwind CSS configuration
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Payload CMS](https://payloadcms.com/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Inter Font](https://rsms.me/inter/)
- [Manrope Font](https://manropefont.com/)
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
