export const nav = [
  { text: "导航", link: "/navigation/index.md" },

  {
    text: "Java",
    items: [
      // { text: "JDBC", link: "" },
      {
        text: "SSM",
        items: [
          { text: "Spring", link: "/backend/Java/Spring/Spring简介.md" },
          { text: "SpringMVC", link: "/backend/Java/SpringMVC/MVC理论基础.md" }
        ]
      }
    ]
  },

  {
    text: "GIS",
    items: [
      {
        text: "三维地图",
        items: [
          {
            text: "Cesium",
            link: "/gis/Cesium/基础使用.md"
          }
        ]
      }
    ]
  },

  { text: "听首歌", link: "https://vitepress.dev/zh/", noIcon: false }
]
