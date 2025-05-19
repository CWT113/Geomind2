export const sidebar = {
  "/backend/Java/Spring": [
    {
      text: "Spring6",
      items: [
        {
          text: "Spring简介",
          link: "/backend/Java/Spring/Spring简介.md"
        },
        {
          text: "IoC模块",
          link: "/backend/Java/Spring/IoC.md",
          items: [
            {
              text: "基于XML注入Bean",
              link: "/backend/Java/Spring/基于XML注入Bean.md"
            },
            {
              text: "基于注解注入Bean",
              link: "/backend/Java/Spring/基于注解注入Bean.md"
            }
          ]
        },
        {
          text: "手写依赖注入",
          // collapsed: false,
          items: [
            {
              text: "回顾反射",
              link: "/backend/Java/Spring/回顾反射.md"
            },
            {
              text: "实现依赖注入",
              link: "/backend/Java/Spring/实现依赖注入.md"
            }
          ]
        },
        {
          text: "AOP",
          link: "/backend/Java/Spring/AOP.md"
        },
        {
          text: "单元测试",
          link: "/backend/Java/Spring/单元测试.md"
        },
        {
          text: "JdbcTemplate",
          link: "/backend/Java/Spring/JdbcTemplate.md"
        },
        {
          text: "声明性事务",
          link: "/backend/Java/Spring/声明性事务.md"
        },
        {
          text: "资源操作",
          link: "/backend/Java/Spring/资源操作.md"
        },
        {
          text: "i18n国际化",
          link: "/backend/Java/Spring/i18n国际化.md"
        },
        {
          text: "数据校验",
          link: "/backend/Java/Spring/数据校验.md"
        }
      ]
    }
  ],

  "/backend/Java/SpringMVC/": [
    {
      text: "SpringMVC",
      items: [
        {
          text: "MVC理论基础",
          link: "/backend/Java/SpringMVC/MVC理论基础.md"
        },
        {
          text: "项目搭建和环境配置",
          link: "/backend/Java/SpringMVC/项目搭建和环境配置.md"
        },
        {
          text: "Controller控制器",
          link: "/backend/Java/SpringMVC/Controller控制器.md"
        },
        {
          text: "@RequestMapping注解",
          link: "/backend/Java/SpringMVC/RequestMapping注解.md"
        },
        {
          text: "获取请求参数",
          link: "/backend/Java/SpringMVC/获取请求参数.md"
        }
      ]
    }
  ],

  "/gis/Cesium/": [
    {
      text: "基础篇",
      items: [
        { text: "基础使用", link: "/gis/Cesium/基础使用.md" },
        { text: "坐标系统", link: "/gis/Cesium/坐标系统.md" },
        { text: "飞行视角", link: "/gis/Cesium/飞行视角.md" }
      ]
    }
  ]
}
