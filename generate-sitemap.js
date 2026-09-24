/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure public directory exists
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Load blog posts to dynamically generate pathways
const blogsPath = path.join(__dirname, 'content', 'blogs.json');
let blogs = [];
try {
  const fileContents = fs.readFileSync(blogsPath, 'utf8');
  blogs = JSON.parse(fileContents);
} catch (e) {
  console.error("Error loading content/blogs.json:", e);
}

// 2. Load resume examples to dynamically generate pathways
const examplesPath = path.join(__dirname, 'content', 'resumeExamples.json');
let resumeExamples = [];
try {
  const fileContents = fs.readFileSync(examplesPath, 'utf8');
  resumeExamples = JSON.parse(fileContents);
} catch (e) {
  console.error("Error loading content/resumeExamples.json:", e);
}

// 3. Load resume templates to dynamically generate pathways
const templatesPath = path.join(__dirname, 'content', 'templatePages.json');
let resumeTemplates = [];
try {
  const fileContents = fs.readFileSync(templatesPath, 'utf8');
  resumeTemplates = JSON.parse(fileContents);
} catch (e) {
  console.error("Error loading content/templatePages.json:", e);
}

// 4. Load cover letter examples to dynamically generate pathways
const coverLettersPath = path.join(__dirname, 'content', 'coverLetterExamples.json');
let coverLetterExamples = [];
try {
  const fileContents = fs.readFileSync(coverLettersPath, 'utf8');
  coverLetterExamples = JSON.parse(fileContents);
} catch (e) {
  console.error("Error loading content/coverLetterExamples.json:", e);
}

// Utility to parse/format date safely for lastmod (YYYY-MM-DD format)
function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      return '2026-06-21'; // Fallback to current build date
    }
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  } catch (err) {
    return '2026-06-21';
  }
}

// Static routes
const routes = [
  { url: '', changefreq: 'daily', priority: '1.0', lastmod: '2026-06-21' },
  { url: 'resume-builder', changefreq: 'weekly', priority: '0.9', lastmod: '2026-06-21' },
  { url: 'cover-letter-builder', changefreq: 'weekly', priority: '0.8', lastmod: '2026-06-21' },
  { url: 'blog', changefreq: 'daily', priority: '0.7', lastmod: '2026-06-21' },
  { url: 'resume-examples', changefreq: 'weekly', priority: '0.8', lastmod: '2026-06-21' },
  { url: 'resume-templates', changefreq: 'weekly', priority: '0.8', lastmod: '2026-06-21' },
  { url: 'cover-letter-examples', changefreq: 'weekly', priority: '0.8', lastmod: '2026-06-21' }
];

// Blog routes
const blogRoutes = blogs.map(blog => {
  return {
    url: `blog/${blog.id}`,
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: formatDate(blog.date)
  };
});

// Resume example routes mapping
const exampleRoutes = resumeExamples.map(ex => {
  return {
    url: `resume-examples/${ex.slug}`,
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: '2026-06-21'
  };
});

// Resume template routes mapping
const templateRoutes = resumeTemplates.map(t => {
  return {
    url: `resume-templates/${t.slug}`,
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: '2026-06-21'
  };
});

// Cover letter routes mapping
const coverLetterRoutes = coverLetterExamples.map(cl => {
  return {
    url: `cover-letter-examples/${cl.slug}`,
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: '2026-06-21'
  };
});

const allRoutes = [...routes, ...blogRoutes, ...exampleRoutes, ...templateRoutes, ...coverLetterRoutes];


// XML construction
let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

allRoutes.forEach(route => {
  const cleanUrl = route.url ? `/${route.url}` : '';
  xml += `
  <url>
    <loc>https://lunchresume.com${cleanUrl}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
});

xml += `
</urlset>`;

// Write physical sitemap.xml
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8');
console.log(`Successfully generated public/sitemap.xml with ${allRoutes.length} URLs.`);
