import { defineConfig } from "vitepress"
import { nav } from "../settings/nav.mts"
import { search } from "../settings/search.mts"
import { footer } from "../settings/footer.mts"
import { sidebar } from "../settings/sidebar.mts"
import { socialLinks } from "../settings/socialLinks.mts"
import {
  groupIconMdPlugin,
  groupIconVitePlugin
} from "vitepress-plugin-group-icons"

export default defineConfig({
  lang: "zh-CN",
  title: "Geomind",
  description: "Salvation lies within.",
  cleanUrls: true,
  appearance: true,
  ignoreDeadLinks: false,
  head: [["link", { rel: "icon", href: "/butterfly-logo.png" }]],
  // 站点地图
  sitemap: {
    hostname: "https://vitepress.yiov.top/page.html"
  },

  vite: {
    build: {
      chunkSizeWarningLimit: 1600
    },
    plugins: [
      groupIconVitePlugin() //代码组图标
    ],
    server: {
      port: 15678
    }
  },

  markdown: {
    math: true,
    lineNumbers: true,
    image: {
      lazyLoading: true
    },
    config: md => {
      // md.use(timeline)
      md.use(groupIconMdPlugin) //代码组图标

      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
        let htmlResult = slf.renderToken(tokens, idx, options)
        if (tokens[idx].tag === "h1") htmlResult += `<ArticleMetadata />`
        return htmlResult
      }
    }
  },

  themeConfig: {
    outlineTitle: "目录",
    sidebarMenuLabel: "目录",
    returnToTopLabel: "返回顶部",
    logo: "/badminton-logo.png",
    darkModeSwitchLabel: "深浅模式",
    outline: { level: [2, 6], label: "目录" },
    docFooter: { prev: "上一篇", next: "下一篇" },
    editLink: {
      pattern: "https://github.com",
      text: "在 GitHub 编辑本页"
    },
    lastUpdated: {
      text: "最后更新于：",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium"
      }
    },
    // carbonAds: {
    //   code: "",
    //   placement: ""
    // },

    search: search,

    nav: nav,

    sidebar: sidebar,

    socialLinks: socialLinks,

    footer: footer
  }
})
