import { marked } from 'marked';
import hljs from 'highlight.js';
import { categories, getCategoryInfo } from './categories.js';

// Simple frontmatter parser for browser (replaces gray-matter which needs Node.js Buffer)
function parseFrontmatter(text) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = text.match(frontmatterRegex);

  // If no frontmatter found, try to extract title from first heading
  if (!match) {
    const data = {};
    let content = text;

    // Try to extract title from first markdown heading
    const titleMatch = text.match(/^#\s+(.+?)$/m);
    if (titleMatch) {
      data.title = titleMatch[1].trim();
    }

    // Try to extract date from content (common patterns)
    const dateMatch = text.match(/(?:日期|时间|Date|发布于|发表于)[：:]\s*(\d{4}[-年]\d{1,2}[-月]\d{1,2}日?)/);
    if (dateMatch) {
      // Convert Chinese date format to ISO
      const dateStr = dateMatch[1].replace(/年/g, '-').replace(/月/g, '-').replace(/日/g, '');
      data.date = dateStr;
    }

    return { data, content };
  }

  const frontmatterText = match[1];
  const content = match[2];

  const data = {};
  const lines = frontmatterText.split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.substring(0, colonIndex).trim();
    let value = line.substring(colonIndex + 1).trim();

    // Handle arrays [item1, item2]
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(v => v.trim());
    }
    // Remove quotes from strings
    else if ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }

  return { data, content };
}

// Configure marked to use highlight.js
marked.setOptions({
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch (err) { }
    }
    return hljs.highlightAuto(code).value;
  },
  breaks: true,
  gfm: true
});

// State
let posts = [];
let currentView = 'home';
let currentPost = null;
let currentCategory = 'all'; // Track selected category filter

// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

// Navigation
document.getElementById('logo').addEventListener('click', () => {
  navigateTo('home');
});

document.getElementById('nav-home').addEventListener('click', (e) => {
  e.preventDefault();
  navigateTo('home');
});

// Router
const BASE_URL = import.meta.env.BASE_URL;

function navigateTo(view, postSlug = null) {
  currentView = view;

  if (view === 'home') {
    window.history.pushState({}, '', BASE_URL);
    renderHome();
  } else if (view === 'post' && postSlug) {
    window.history.pushState({}, '', `${BASE_URL}#${postSlug}`);
    renderPost(postSlug);
  }
}

window.addEventListener('popstate', () => {
  const hash = window.location.hash.slice(1);
  if (hash) {
    navigateTo('post', hash);
  } else {
    navigateTo('home');
  }
});

// Load all posts from manifest
async function loadPosts() {
  try {
    // Fetch the posts manifest
    // Use import.meta.env.BASE_URL for correct path in both dev and production
    const manifestResponse = await fetch(`${import.meta.env.BASE_URL}posts-manifest.json`);
    if (!manifestResponse.ok) {
      console.error('Failed to load posts manifest');
      return;
    }

    const manifest = await manifestResponse.json();
    console.log(`📝 Loading ${manifest.posts.length} posts from manifest`);

    const loadedPosts = [];

    for (const postInfo of manifest.posts) {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}${postInfo.path}`);
        if (!response.ok) {
          console.warn(`Failed to fetch ${postInfo.path}: ${response.status}`);
          continue;
        }

        const content = await response.text();
        const { data, content: markdown } = parseFrontmatter(content);

        loadedPosts.push({
          slug: `${postInfo.category}/${postInfo.file.replace('.md', '')}`,
          fileName: postInfo.file.replace('.md', ''),
          category: postInfo.category,
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString(),
          description: data.description || '',
          tags: data.tags || [],
          content: markdown
        });
      } catch (err) {
        console.warn(`Failed to load ${postInfo.path}:`, err);
      }
    }

    // Sort by date (newest first)
    posts = loadedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    console.log(`✅ Loaded ${posts.length} posts`);
  } catch (err) {
    console.error('Failed to load posts:', err);
  }
}

// Render home page
function renderHome(category = 'all') {
  const content = document.getElementById('content');
  currentCategory = category;

  const hero = `
    <div class="hero">
      <h1>欢迎来到我的博客 👋</h1>
      <p>分享技术见解、编程经验和个人思考</p>
    </div>
  `;

  // Category filter buttons
  const categoryButtons = `
    <div class="category-filter">
      <button class="category-btn ${category === 'all' ? 'active' : ''}" data-category="all">
        全部
      </button>
      ${Object.keys(categories).map(cat => {
    const catInfo = categories[cat];
    return `
          <button class="category-btn ${category === cat ? 'active' : ''}" data-category="${cat}">
            ${catInfo.icon} ${catInfo.name.replace(/^[^\s]+ /, '')}
          </button>
        `;
  }).join('')}
    </div>
  `;

  if (posts.length === 0) {
    content.innerHTML = hero + `
      <div class="loading">加载文章中</div>
    `;
    return;
  }

  // Filter posts by category
  const filteredPosts = category === 'all'
    ? posts
    : posts.filter(p => p.category === category);

  if (filteredPosts.length === 0) {
    content.innerHTML = hero + categoryButtons + `
      <div class="no-posts">
        <p>该分类下暂无文章</p>
      </div>
    `;
    addCategoryButtonHandlers();
    return;
  }

  const postsHTML = filteredPosts.map(post => {
    const catInfo = getCategoryInfo(post.category);
    return `
    <div class="post-card" data-slug="${post.slug}">
      <div class="post-category" style="color: ${catInfo.color}">
        ${catInfo.icon} ${catInfo.name}
      </div>
      <div class="post-meta">
        <span>📅 ${formatDate(post.date)}</span>
        ${post.tags && post.tags.length > 0 ?
        `<span>🏷️ ${post.tags.join(', ')}</span>` : ''}
      </div>
      <h2>${post.title}</h2>
      <p>${post.description}</p>
    </div>
  `;
  }).join('');

  content.innerHTML = hero + categoryButtons + `
    <div class="posts-grid">
      ${postsHTML}
    </div>
  `;

  // Add click handlers to post cards
  document.querySelectorAll('.post-card').forEach(card => {
    card.addEventListener('click', () => {
      const slug = card.dataset.slug;
      navigateTo('post', slug);
    });
  });

  // Add category filter handlers
  addCategoryButtonHandlers();
}

function addCategoryButtonHandlers() {
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      renderHome(category);
    });
  });
}

// Render individual post
function renderPost(slug) {
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    document.getElementById('content').innerHTML = `
      <div class="article">
        <h1>文章未找到 😕</h1>
        <p>抱歉，找不到您要查看的文章。</p>
        <button class="back-button" onclick="navigateTo('home')">
          ← 返回首页
        </button>
      </div>
    `;
    return;
  }

  currentPost = post;
  const catInfo = getCategoryInfo(post.category);
  const htmlContent = marked.parse(post.content);

  document.getElementById('content').innerHTML = `
    <article class="article">
      <button class="back-button" id="back-button">
        ← 返回首页
      </button>
      
      <header class="article-header">
        <div class="article-category" style="color: ${catInfo.color}">
          ${catInfo.icon} ${catInfo.name}
        </div>
        <h1 class="article-title">${post.title}</h1>
        <div class="post-meta">
          <span>📅 发布于 ${formatDate(post.date)}</span>
          ${post.tags && post.tags.length > 0 ?
      `<span>🏷️ ${post.tags.join(', ')}</span>` : ''}
        </div>
      </header>
      
      <div class="article-content">
        ${htmlContent}
      </div>
    </article>
  `;

  document.getElementById('back-button').addEventListener('click', () => {
    navigateTo('home');
  });

  // Scroll to top
  window.scrollTo(0, 0);
}

// Utility: Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Make navigateTo available globally for inline handlers
window.navigateTo = navigateTo;

// Initialize app
async function init() {
  await loadPosts();

  // Check if there's a hash in the URL
  const hash = window.location.hash.slice(1);
  if (hash && posts.find(p => p.slug === hash)) {
    navigateTo('post', hash);
  } else {
    navigateTo('home');
  }
}

init();
