export const sidebar = {
  "/frontend/CSS/": [
    {
      text: "基础语法",
      items: [
        {
          text: "基础使用",
          link: "/frontend/CSS/基础使用.md"
        },
        {
          text: "Less",
          link: "/frontend/CSS/Less.md"
        },
        {
          text: "Scss",
          link: "/frontend/CSS/Scss.md"
        }
      ]
    },
    {
      text: "样式布局",
      items: [
        {
          text: "Flex布局",
          link: "/frontend/CSS/flex布局.md"
        },
        {
          text: "Grid布局",
          link: "/frontend/CSS/grid布局.md"
        }
      ]
    },
    {
      text: "原子化CSS",
      items: [
        {
          text: "TailwindCSS",
          link: "/frontend/CSS/TailwindCSS.md"
        },
        {
          text: "UnoCSS",
          link: "/frontend/CSS/UnoCSS.md"
        }
      ]
    }
  ],

  "/frontend/Gits/": [
    {
      text: "Git",
      items: [
        {
          text: "Git分支",
          link: "/frontend/Gits/分支分类.md"
        },
        {
          text: "Git代理",
          link: "/frontend/Gits/Git代理.md"
        }
      ]
    }
  ],

  "/frontend/MicroFrontend/": [
    {
      text: "传统嵌入式",
      items: [
        {
          text: "iframe",
          link: "/frontend/MicroFrontend/iframe.md"
        }
      ]
    },
    {
      text: "单页面应用",
      items: [
        {
          text: "single-spa",
          link: "/frontend/MicroFrontend/single-spa.md"
        }
      ]
    },
    {
      text: "乾坤",
      items: [
        {
          text: "乾坤微前端",
          link: "/frontend/MicroFrontend/qiankun.md"
        }
      ]
    },
    {
      text: "无界",
      items: [
        {
          text: "无界微前端",
          link: "/frontend/MicroFrontend/wujie.md"
        }
      ]
    },
    {
      text: "garfish",
      items: [
        {
          text: "garfish微前端",
          link: "/frontend/MicroFrontend/garfish.md"
        }
      ]
    }
  ],

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
        }
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
          text: "查询功能",
          link: "/backend/Java/MybatisPlus/查询功能.md"
        },
        {
          text: "增删改功能",
          link: "/backend/Java/MybatisPlus/增删改功能.md"
        },
        {
          text: "Service 接口",
          link: "/backend/Java/MybatisPlus/Service接口.md"
        },
        {
          text: "常用注解",
          link: "/backend/Java/MybatisPlus/常用注解.md"
        },
        {
          text: "条件构造器",
          link: "/backend/Java/MybatisPlus/条件构造器.md"
        },
        {
          text: "自动映射枚举",
          link: "/backend/Java/MybatisPlus/自动映射枚举.md"
        },
        {
          text: "分页插件",
          link: "/backend/Java/MybatisPlus/分页插件.md"
        },
        {
          text: "乐观锁插件",
          link: "/backend/Java/MybatisPlus/乐观锁和悲观锁.md"
        },
        {
          text: "代码生成器",
          link: "/backend/Java/MybatisPlus/代码生成器.md"
        }
      ]
    }
  ],

  "/backend/Java/SpringBoot/": [
    {
      text: "SpringBoot",
      items: [
        {
          text: "基础使用",
          link: "/backend/Java/SpringBoot/基础使用.md"
        },
        {
          text: "Bean注册与管理",
          link: "/backend/Java/SpringBoot/Bean注册与管理.md"
        },
        {
          text: "自动装配",
          link: "/backend/Java/SpringBoot/自动装配.md"
        },
        {
          text: "日志",
          link: "/backend/Java/SpringBoot/日志.md"
        },
        {
          text: "启动参数配置",
          link: "/backend/Java/SpringBoot/启动参数配置.md"
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
          items: [{ text: "实体绘制", link: "/gis/Cesium/实体绘制.md" }]
        }
      ]
    }
  ],

  "/devops/docker/": [
    {
      text:"安装教程",
      link:"/devops/docker/安装教程.md"
    },
    {
      text:"基础入门",
      link:"/devops/docker/基础入门.md"
    },
    {
      text:"Dockerfile语法",
      link:"/devops/docker/Dockerfile语法.md"
    }
  ],

  "/devops/linux/":[
    {
      text: "基础命令",
      items: [
        { text: "系统命令", link: "/devops/linux/系统命令.md" },
        // { text: "常用命令", link: "/operations/linux/常用命令.md" },
        // { text: "用户和权限", link: "/operations/linux/用户和权限.md" },
        // { text: "vim", link: "/operations/linux/vim.md" },
        // { text: "固定IP地址", link: "/operations/linux/固定IP地址.md" },
        // { text: "yum设置阿里源", link: "/operations/linux/yum设置阿里源.md" }
      ]
    },
  ]
}
