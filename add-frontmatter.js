import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 处理单个文件，添加 frontmatter
function addFrontmatterToFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');

    // 检查是否已有 frontmatter
    if (content.startsWith('---')) {
        console.log(`⏭️  Skipping ${path.basename(filePath)} - already has frontmatter`);
        return;
    }

    // 提取标题（第一行的 # 标题）
    const titleMatch = content.match(/^#\s+(.+?)$/m);
    if (!titleMatch) {
        console.log(`⚠️  Warning: No title found in ${path.basename(filePath)}`);
        return;
    }

    const fullTitle = titleMatch[1].trim();

    // 从文件名提取年份
    const fileName = path.basename(filePath, '.md');
    const yearMatch = fileName.match(/^\d+_(\d{4})_/);
    const year = yearMatch ? yearMatch[1] : '2024';

    // 生成日期（使用图灵奖颁发年份）
    const date = `${year}-01-01`;

    // 生成简短的 title 和 description
    // 完整标题格式通常是：图灵奖第X届 | Name: 描述
    let title, description;

    if (fullTitle.includes('|')) {
        const parts = fullTitle.split('|');
        title = parts[1] ? parts[1].split(':')[0].trim() : parts[0].trim();
        description = parts[1] ? parts[1].trim() : fullTitle;
    } else if (fullTitle.includes('：')) {
        const parts = fullTitle.split('：');
        title = parts[0].trim();
        description = fullTitle;
    } else {
        title = fullTitle;
        description = fullTitle;
    }

    // 截断过长的 description
    if (description.length > 100) {
        description = description.substring(0, 97) + '...';
    }

    // 生成 tags
    const tags = ['图灵奖', '计算机历史'];

    // 如果标题或内容包含特定关键词，添加相应标签
    const contentLower = content.toLowerCase();
    if (contentLower.includes('编程语言') || contentLower.includes('编译器')) {
        tags.push('编程语言');
    }
    if (contentLower.includes('算法') || contentLower.includes('复杂度')) {
        tags.push('算法');
    }
    if (contentLower.includes('人工智能') || contentLower.includes('ai')) {
        tags.push('人工智能');
    }
    if (contentLower.includes('数据库')) {
        tags.push('数据库');
    }
    if (contentLower.includes('操作系统') || contentLower.includes('unix')) {
        tags.push('操作系统');
    }
    if (contentLower.includes('密码') || contentLower.includes('加密')) {
        tags.push('密码学');
    }

    // 构建 frontmatter
    const frontmatter = `---
title: ${title}
date: ${date}
description: ${description}
tags: [${tags.join(', ')}]
---

`;

    // 添加 frontmatter 到文件开头
    const newContent = frontmatter + content;

    // 写回文件
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`✅ Updated ${path.basename(filePath)}`);
}

// 批量处理目录
function processDirectory(dirPath) {
    const files = fs.readdirSync(dirPath)
        .filter(f => f.endsWith('.md'))
        .sort();

    console.log(`\n📝 Found ${files.length} markdown files\n`);

    let processed = 0;
    let skipped = 0;

    for (const file of files) {
        const filePath = path.join(dirPath, file);
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            if (content.startsWith('---')) {
                skipped++;
            } else {
                addFrontmatterToFile(filePath);
                processed++;
            }
        } catch (err) {
            console.error(`❌ Error processing ${file}:`, err.message);
        }
    }

    console.log(`\n✨ Done!`);
    console.log(`   Processed: ${processed} files`);
    console.log(`   Skipped: ${skipped} files (already have frontmatter)`);
}

// 主程序
const turingAwardDir = path.join(__dirname, 'posts', 'turing-award');
processDirectory(turingAwardDir);
