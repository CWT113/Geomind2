import type { FooterData } from "@theojs/lumen";

export const Footer_Data: FooterData = {
  beian: { icp: "备案号", police: "公网安备号", showIcon: true },
  author: { name: "Theo", link: "https://" },
  group: [
    {
      title: "外部链接",
      icon: "bx:link",
      color: "rgba(255, 87, 51, 1)",
      links: [
        { name: "示例1", link: "https://", icon: "solar:book-bold" },
        { name: "示例2", link: "https://" },
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
