import { Fragment, h, onMounted, watch, nextTick } from "vue"
import DefaultTheme from "vitepress/theme"
// 自定义的css要在 DefaultTheme 后导入，因为样式要覆盖
import "./style/index.css"
import "virtual:group-icons.css"
import LinkCard from "./components/LinkCard.vue"
import MyLayout from "./components/MyLayout.vue"
import HomeUnderline from "./components/HomeUnderline.vue"
import xgplayer from "./components/xgplayer.vue"
import Confetti from "./components/Confetti.vue"
import Update from "./components/update.vue"
import ArticleMetadata from "./components/ArticleMetadata.vue"
import BackToTop from "./components/BackToTop.vue"
import MouseClick from "./components/MouseClick.vue"
import MouseFollower from "./components/MouseFollower.vue"
import mediumZoom from "medium-zoom"
import { useRoute, inBrowser } from "vitepress"
import { NProgress } from "nprogress-v2/dist/index.js"
import "nprogress-v2/dist/index.css"
import busuanzi from "busuanzi.pure.js"
import { HomeFooter } from '@theojs/lumen'
import { Footer_Data } from '../../settings/footerData.mts'

export default {
  extends: DefaultTheme,

  Layout() {
    return h(DefaultTheme.Layout, null, {
      "doc-footer-before": () => h(BackToTop),
      "layout-top": () => h(Fragment, null, [h(MouseClick), h(MouseFollower)]),
      'layout-bottom': () => h(HomeFooter, { Footer_Data  }) 
    })
  },

  enhanceApp({ app, router }) {
    // 注册全局组件
    app.component("LinkCard", LinkCard)
    app.component("xgplayer", xgplayer)
    app.component("Confetti", Confetti)
    app.component("Update", Update)
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
