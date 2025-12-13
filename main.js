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

// About page navigation
document.querySelector('a[href="#about"]').addEventListener('click', (e) => {
  e.preventDefault();
  navigateTo('about');
});

// Router
const BASE_URL = import.meta.env.BASE_URL;

function navigateTo(view, postSlug = null) {
  currentView = view;

  if (view === 'home') {
    window.history.pushState({}, '', BASE_URL);
    renderHome();
    trackPageView(BASE_URL, 'DoggyDad Blog - 首页');
  } else if (view === 'about') {
    window.history.pushState({}, '', `${BASE_URL}#about`);
    renderAbout();
    trackPageView(`${BASE_URL}#about`, 'DoggyDad Blog - 关于');
  } else if (view === 'post' && postSlug) {
    window.history.pushState({}, '', `${BASE_URL}#${postSlug}`);
    renderPost(postSlug);
    const post = posts.find(p => p.slug === postSlug);
    trackPageView(`${BASE_URL}#${postSlug}`, post ? post.title : postSlug);
  }
}

// Track page views for SPA navigation
function trackPageView(path, title) {
  if (typeof gtag === 'function') {
    gtag('config', 'G-G63268TXPH', {
      page_path: path,
      page_title: title
    });
  }
}

window.addEventListener('popstate', () => {
  const hash = window.location.hash.slice(1);
  if (hash === 'about') {
    navigateTo('about');
  } else if (hash) {
    navigateTo('post', hash);
  } else {
    navigateTo('home');
  }
});

// Load all posts from manifest
async function loadPosts() {
  try {
    // Fetch the posts manifest
    const manifestResponse = await fetch(`${import.meta.env.BASE_URL}posts-manifest.json`);
    if (!manifestResponse.ok) {
      console.error('Failed to load posts manifest');
      return;
    }

    const manifest = await manifestResponse.json();
    console.log(`📝 Loading ${manifest.posts.length} posts from manifest`);

    // Load all posts in parallel for better performance
    const postPromises = manifest.posts.map(async (postInfo) => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}${postInfo.path}`);
        if (!response.ok) {
          console.warn(`Failed to fetch ${postInfo.path}: ${response.status}`);
          return null;
        }

        const content = await response.text();
        const { data, content: markdown } = parseFrontmatter(content);

        return {
          slug: `${postInfo.category}/${postInfo.file.replace('.md', '')}`,
          fileName: postInfo.file.replace('.md', ''),
          category: postInfo.category,
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString(),
          description: data.description || '',
          tags: data.tags || [],
          content: markdown
        };
      } catch (err) {
        console.warn(`Failed to load ${postInfo.path}:`, err);
        return null;
      }
    });

    // Wait for all posts to load
    const loadedPosts = (await Promise.all(postPromises)).filter(p => p !== null);

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

// Render about page
function renderAbout() {
  const content = document.getElementById('content');
  
  content.innerHTML = `
    <article class="article about-page">
      <button class="back-button" id="back-button">
        ← 返回首页
      </button>
      
      <header class="article-header">
        <h1 class="article-title">关于我 👋</h1>
      </header>
      
      <div class="article-content">
        <p>你好！我是 <strong>DoggyDad</strong>，一名热爱技术与思考的软件工程师。</p>
        
        <h2>🎯 关于这个博客</h2>
        <p>这个博客是我记录学习历程、分享技术见解和个人思考的地方。主要内容包括：</p>
        <ul>
          <li><strong>🏆 图灵奖系列</strong> - 探索计算机科学先驱们的贡献与思想，从 Alan Perlis 到 Avi Wigderson，了解塑造现代计算的伟大头脑</li>
          <li><strong>📚 读书笔记</strong> - 深度阅读笔记，特别关注塔勒布的不确定性系列（《反脆弱》《黑天鹅》《随机漫步的傻瓜》）以及软件工程经典</li>
          <li><strong>💻 技术学习</strong> - Git 工作流、开发最佳实践、工具使用技巧等实用内容</li>
          <li><strong>📝 通用分享</strong> - 博客教程、个人思考和其他有趣的话题</li>
        </ul>
        
        <h2>💡 我的兴趣</h2>
        <ul>
          <li><strong>计算机科学历史</strong> - 相信了解历史能帮助我们更好地理解现在和未来</li>
          <li><strong>系统思维与风险管理</strong> - 对反脆弱性、黑天鹅事件、概率思维有浓厚兴趣</li>
          <li><strong>高效工程实践</strong> - 追求用更聪明的方式工作，关注杠杆率和长期价值</li>
          <li><strong>持续学习</strong> - 相信写作是最好的学习方式之一</li>
        </ul>
        
        <h2>🛠️ 技术栈</h2>
        <p>这个博客本身使用以下技术构建：</p>
        <ul>
          <li>Vite - 现代前端构建工具</li>
          <li>Vanilla JavaScript - 保持简单</li>
          <li>Markdown - 内容创作</li>
          <li>GitHub Pages - 托管部署</li>
        </ul>
        
        <h2>📬 联系我</h2>
        <p>欢迎通过以下方式与我交流：</p>
        <ul>
          <li>💼 <a href="https://linkedin.com/in/peng-zhao-mei" target="_blank" rel="noopener">LinkedIn</a></li>
          <li>𝕏 <a href="https://x.com/Hjfjfjsj" target="_blank" rel="noopener">Twitter / X</a></li>
          <li>🐙 <a href="https://github.com/pzhao16me" target="_blank" rel="noopener">GitHub</a></li>
        </ul>
        
        <hr>
        <p><em>感谢你的访问！希望这里的内容对你有所帮助。</em> ✨</p>
      </div>
    </article>
  `;

  document.getElementById('back-button').addEventListener('click', () => {
    navigateTo('home');
  });

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
  // Show loading state first
  renderHome();
  
  await loadPosts();
  
  console.log(`🏠 Init complete, ${posts.length} posts loaded`);

  // Check if there's a hash in the URL
  const hash = window.location.hash.slice(1);
  if (hash === 'about') {
    renderAbout();
  } else if (hash && posts.find(p => p.slug === hash)) {
    renderPost(hash);
  } else {
    // Re-render home with loaded posts
    renderHome(currentCategory);
  }
}

init();
