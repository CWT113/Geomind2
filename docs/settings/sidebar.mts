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
          text: "RequestMapping注解",
          link: "/backend/Java/SpringMVC/RequestMapping注解.md"
        },
        {
          text: "获取请求参数",
          link: "/backend/Java/SpringMVC/获取请求参数.md"
        },
        {
          text: "域对象共享数据",
          link: "/backend/Java/SpringMVC/域对象共享数据.md"
        },
        {
          text: "RestFul风格",
          link: "/backend/Java/SpringMVC/Restful风格.md"
        },
        {
          text: "HttpMessageConverter",
          link: "/backend/Java/SpringMVC/HttpMessageConverter.md"
        },
        {
          text: "文件上传和下载",
          link: "/backend/Java/SpringMVC/文件上传和下载.md"
        },
        {
          text: "拦截器",
          link: "/backend/Java/SpringMVC/拦截器.md"
        },
        {
          text: "异常处理器",
          link: "/backend/Java/SpringMVC/异常处理器.md"
        }
      ]
    }
  ],

  "/backend/Java/Mybatis/": [
    {
      text: "MyBatis",
      items: [
        {
          text: "基础使用",
          link: "/backend/Java/Mybatis/基础使用.md"
        },
        {
          text: "配置文件详解",
          link: "/backend/Java/Mybatis/配置文件详解.md"
        },
        {
          text: "获取参数值",
          link: "/backend/Java/Mybatis/获取参数值.md"
        },
        {
          text: "查询操作",
          link: "/backend/Java/Mybatis/查询操作.md"
        },
        {
          text: "增删改操作",
          link: "/backend/Java/Mybatis/增删改操作.md"
        },
        {
          text: "自定义映射",
          link: "/backend/Java/Mybatis/自定义映射.md"
        },
        {
          text: "动态SQL",
          link: "/backend/Java/Mybatis/动态SQL.md"
        },
        {
          text: "缓存",
          link: "/backend/Java/Mybatis/缓存.md"
        },
        {
          text: "分页插件",
          link: "/backend/Java/Mybatis/分页插件.md"
        },
      ]
    }
  ],

  "/backend/Java/MybatisPlus/": [
    {
      text: "MyBatis Plus",
      items: [
        {
          text: "基础使用",
          link: "/backend/Java/MybatisPlus/基础使用.md"
        },
        {
          text: "常用注解",
          link: "/backend/Java/MybatisPlus/常用注解.md"
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
        { text: "相机视角", link: "/gis/Cesium/飞行视角.md" },
        {
          text: "Entity实体",
          items: [
            { text: "实体绘制", link: "/gis/Cesium/实体绘制.md" }
          ]
        }
      ]
    }
  ]
}
