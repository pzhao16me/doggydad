// 博客分类配置
export const categories = {
    'reading-notes': {
        name: '📚 读书笔记',
        icon: '📚',
        description: '读书心得与笔记分享',
        color: 'hsl(25, 80%, 60%)'
    },
    'turing-award': {
        name: '🏆 图灵奖系列',
        icon: '🏆',
        description: '图灵奖得主与计算机科学史',
        color: 'hsl(45, 90%, 55%)'
    },
    'tech-learning': {
        name: '💻 技术学习',
        icon: '💻',
        description: '编程技术与最佳实践',
        color: 'hsl(210, 80%, 60%)'
    },
    'general': {
        name: '📝 通用',
        icon: '📝',
        description: '其他主题文章',
        color: 'hsl(280, 70%, 60%)'
    }
};

// 获取分类信息
export function getCategoryInfo(categorySlug) {
    return categories[categorySlug] || categories['general'];
}

// 获取所有分类
export function getAllCategories() {
    return Object.keys(categories).map(slug => ({
        slug,
        ...categories[slug]
    }));
}
