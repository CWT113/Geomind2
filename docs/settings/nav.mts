export const nav = [
  { text: "导航", link: "/navigation/index.md" },

  {
    text: "前端",
    items: [
      {
        text: "CSS",
        link: "/frontend/CSS/基础使用.md",
      },
      {
        text: "JavaScript",
        link: "/a.md",
      },
      {
        text: "TypeScript",
        link: "/a.md",
      },
      {
        text: "Node.js",
        link: "/a.md",
      },
      {
        text: "Git",
        link: "/frontend/Gits/分支分类.md",
      },
    ],
  },

  {
    text: "Vue",
    items: [
      {
        text: "Vue3",
        link: "/frontend/Vue/1.类型标注.md",
      },
      {
        text: "Pinia",
        link: "/a.md",
      },
      {
        text: "打包构建",
        items: [
          {
            text: "Vite",
            link: "/a.md",
          },
          {
            text: "Rollup",
            link: "/a.md",
          },
        ],
      },
      {
        text: "组件库",
        items: [
          {
            text: "Element Plus",
            link: "/a.md",
          },
        ],
      },
      {
        text: "微前端",
        link: "/frontend/MicroFrontend/qiankun.md",
      },
    ],
  },

  {
    text: "Java",
    items: [
      // { text: "JDBC", link: "" },
      {
        text: "SSM",
        items: [
          { text: "Spring", link: "/backend/Java/Spring/Spring简介.md" },
          { text: "SpringMVC", link: "/backend/Java/SpringMVC/MVC理论基础.md" },
          { text: "MyBatis", link: "/backend/Java/Mybatis/基础使用.md" },
          {
            text: "MyBatisPlus",
            link: "/backend/Java/MybatisPlus/基础使用.md",
          },
        ],
      },
      { text: "SpringBoot", link: "/backend/Java/SpringBoot/基础使用.md" },
    ],
  },

  {
    text: "GIS",
    items: [
      {
        text: "三维地图",
        items: [
          {
            text: "Cesium",
            link: "/gis/Cesium/1.基础使用.md",
          },
        ],
      },
      {
        text: "浏览器渲染",
        items: [
          {
            text: "WebGL",
            link: "/gis/WebGL/1.WebGL概述.md",
          },
        ],
      },
    ],
  },

  // {
  //   text: "数据库",
  //   items: [
  //     {
  //       text: "MySQL",
  //       link: "/a.md"
  //     },
  //     {
  //       text: "PostgreSQL",
  //       link: "/a.md"
  //     }
  //   ]
  // },

  {
    text: "服务端",
    items: [
      {
        text: "Linux",
        link: "/devops/linux/系统命令.md",
      },
      {
        text: "Nginx",
        link: "/a.md"
      },
      {
        text: "Docker",
        link: "/devops/docker/镜像与容器.md",
      },
      {
        text: "K8s",
        link: "/a.md"
      }
    ],
  },

  { text: "听首歌", link: "https://vitepress.dev/zh/", noIcon: false },
];
