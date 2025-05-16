import type { FooterData } from "@theojs/lumen";

export const Footer_Data: FooterData = {
  // beian: { icp: "备案号", police: "公网安备号", showIcon: true },
  author: { name: "Yibo Wang", link: "https://" },
  group: [
    {
      title: "参考博客",
      icon: "bx:link",
      color: "",
      links: [
        { name: "Lumen", link: "https://lumen.theojs.cn/" },
        { name: "Vitepress", link: "https://vitepress.yiov.top/" },
        { name: "爱涂鸦啊", link: "https://aituyaa.com/" },
        { name: "Yiov", link: "https://yiov.top/" },
      ],
    },
    {
      title: "内部链接",
      icon: "bx:link",
      color: "rgba(255, 87, 51, 1)",
      links: [
        { name: "示例1", icon: "solar:book-bold", link: "/docs" },
        { name: "示例2", link: "/page" },
      ],
    },
  ],
};
