import { defineConfig } from "vitepress";
import { nav } from "../settings/nav.mts";
import { search } from "../settings/search.mts";
import { footer } from "../settings/footer.mts";
import { sidebar } from "../settings/sidebar.mts";
import { socialLinks } from "../settings/socialLinks.mts";
import { MermaidMarkdown, MermaidPlugin } from "vitepress-plugin-mermaid";
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from "vitepress-plugin-group-icons";

export default defineConfig({
  base: "/Geomind2/",
  lang: "zh-CN",
  title: "Geomind",
  description: "Salvation lies within.",
  cleanUrls: true,
  appearance: true,
  ignoreDeadLinks: false,
  head: [["link", {rel: "icon", href: "/Geomind2/butterfly-logo.png"}]],

  // 站点地图
  sitemap: {
    hostname: "https://vitepress.yiov.top/page.html",
  },

  vite: {
    build: {
      chunkSizeWarningLimit: 1600,
    },
    plugins: [
      groupIconVitePlugin(), // 代码组图标
      MermaidPlugin(), // mermaid流程图
    ],
    server: {
      port: 15678,
    },
    optimizeDeps: {
      include: ["mermaid"],
    },
    ssr: {
      noExternal: ["mermaid"],
    },
  },

  markdown: {
    math: true,
    lineNumbers: true,
    theme: {
      light: "github-light",
      dark: "one-dark-pro",
    },
    image: {
      lazyLoading: true,
    },
    config: async (md) => {
      md.use(groupIconMdPlugin); //代码组图标
      md.use(MermaidMarkdown); // mermaid流程图

      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
        let htmlResult = slf.renderToken(tokens, idx, options);
        if (tokens[idx].tag === "h1") htmlResult += `<ArticleMetadata />`;
        return htmlResult;
      };

      const container = (await import("markdown-it-container")).default;
      const types = ["note", "important", "caution"];
      types.forEach(type => {
        md.use(container, type, {
          render(tokens, idx) {
            const token = tokens[idx];
            const info = token.info.trim().slice(type.length).trim();

            if (token.nesting === 1) {
              const title = info || "SUCCESS";
              return `<div class="custom-block ${type}"><p class="custom-block-title">${title}</p>\n`;
            } else {
              return "</div>\n";
            }
          },
        });
      });
    },
  },

  themeConfig: {
    outlineTitle: "目录",
    sidebarMenuLabel: "目录",
    returnToTopLabel: "返回顶部",
    logo: "/badminton-logo.png",
    darkModeSwitchLabel: "深浅模式",
    outline: {
      level: [2, 6],
      label: "目录",
    },
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    editLink: {
      pattern: "https://github.com",
      text: "在 GitHub 编辑本页",
    },
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },

    search: search,

    nav: nav,

    sidebar: sidebar,

    socialLinks: socialLinks,

    // 使用自定义页脚插件
    footer: footer,
  },
});
