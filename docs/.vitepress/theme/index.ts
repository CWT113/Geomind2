import DefaultTheme from "vitepress/theme"
// 自定义的css要在 DefaultTheme 后导入，因为样式要覆盖
import "./style/index.css"
import "virtual:group-icons.css"
import { useData } from "vitepress"
import mediumZoom from "medium-zoom"
import "nprogress-v2/dist/index.css"
import busuanzi from "busuanzi.pure.js"
import Update from "./components/update.vue"
import { useRoute, inBrowser } from "vitepress"
import LinkCard from "./components/LinkCard.vue"
import xgplayer from "./components/xgplayer.vue"
import Confetti from "./components/Confetti.vue"
import BackToTop from "./components/BackToTop.vue"
import MNavLinks from "./components/MNavLinks.vue"
import MouseClick from "./components/MouseClick.vue"
import { NProgress } from "nprogress-v2/dist/index.js"
import HomeUnderline from "./components/HomeUnderline.vue"
import MouseFollower from "./components/MouseFollower.vue"
import { Fragment, h, onMounted, watch, nextTick } from "vue"
import ArticleMetadata from "./components/ArticleMetadata.vue"

export default {
  extends: DefaultTheme,

  Layout() {
    const props: Record<string, any> = {}
    // 获取 frontmatter
    const { frontmatter } = useData()

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }

    return h(DefaultTheme.Layout, props, {
      "doc-footer-before": () => h(BackToTop),
      "layout-top": () => h(Fragment, null, [h(MouseClick), h(MouseFollower)])
    })
  },

  enhanceApp({ app, router }) {
    // 注册全局组件
    app.component("LinkCard", LinkCard)
    app.component("xgplayer", xgplayer)
    app.component("Confetti", Confetti)
    app.component("Update", Update)
    app.component("MNavLinks", MNavLinks)
    app.component("HomeUnderline", HomeUnderline)
    app.component("ArticleMetadata", ArticleMetadata)

    // 顶部进度条
    if (inBrowser) {
      NProgress.configure({ showSpinner: false })
      router.onBeforeRouteChange = () => {
        NProgress.start()
      }
      router.onAfterRouteChanged = () => {
        busuanzi.fetch()
        NProgress.done()
      }
    }
  },

  setup() {
    const route = useRoute()
    const initZoom = () => {
      mediumZoom(".main img", { background: "var(--vp-c-bg)" })
    }
    onMounted(() => {
      initZoom()
    })
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    )
  }
}
