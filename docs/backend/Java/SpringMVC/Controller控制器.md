# Controller控制器

有了 SpringMVC 之后，我们不必再像之前那样一个请求创建一个 Servlet 了，它使用 `DispatcherServlet` 替代了 Tomcat 内置提供处理静态资源的 Servlet，也就是说现在所有的请求（除 JSP 文件）都会经过 `DispatcherServlet` 进行处理。![DispatcherServlet](.\assets\DispatcherServlet.png)

## 配置视图解析器和控制器

要实现 HTML 页面的解析并返回到浏览器，就需要配置视图解析器，首先导入 Thymeleaf 的依赖：

```xml
<dependency>  
  <groupId>org.thymeleaf</groupId>  
  <artifactId>thymeleaf-spring6</artifactId>  
  <version>3.1.3.RELEASE</version>  
</dependency>
```

然后在 `WebConfiguraion` 配置类中，将对应的 `viewResolver` 注册为 Bean 就配置好视图解析器了。

```java {29,31}
@Configuration  
@EnableWebMvc  
@ComponentScan("com.geomind")  
public class WebConfiguration {  
  // 设置 ThymeleafViewResolver 作为视图解析器，解析HTML页面
  @Bean  
  public ThymeleafViewResolver thymeleafViewResolver(SpringTemplateEngine springTemplateEngine) {  
    ThymeleafViewResolver resolver = new ThymeleafViewResolver();  
    resolver.setOrder(1); // 存在多个视图解析图时，指定解析器的顺序  
    resolver.setCharacterEncoding("UTF-8");  
    resolver.setTemplateEngine(springTemplateEngine); // 设置模板引擎
    return resolver;  
  }  

  // 配置模板引擎Bean  
  @Bean  
  public SpringTemplateEngine springTemplateEngine(ITemplateResolver resolver) {  
    SpringTemplateEngine engine = new SpringTemplateEngine();  
    engine.setTemplateResolver(resolver);  
    return engine;  
  }  

  // 配置模板解析器  
  @Bean  
  public SpringResourceTemplateResolver templateResolver() {  
    SpringResourceTemplateResolver resolver = new SpringResourceTemplateResolver();  
    resolver.setSuffix(".html"); // 配置解析器要解析文件的后缀 
    // 如果HTML文件存放在 webapp 目录下，设置 / 作为前缀就可以获取到
    resolver.setPrefix("/");  
    // 如果HTML文件存放在类路径下，需要使用 classpath: 作为前缀获取  
    // resolver.setPrefix("classpath:");
    return resolver;  
  }  
}
```

上面配置的前缀是 `/`，因此在 webapp 下，新建 index.html 文件，然后通过 Controller 接口获取文件：

::: code-group

```java [HelloWorldController]
@Controller  
public class HelloWorldController {  
  @RequestMapping("/")  
  public ModelAndView hello() {  
    return new ModelAndView("index"); // 返回视图解析器对象
  }  
}
```

```html [index.html]
<!DOCTYPE html>  
<html lang="en">  
  <head>  
    <meta charset="UTF-8">  
    <title>Title</title>  
  </head>  
  <body>  
    <p>欢迎来到Github全球最大的同性交友网站</p>  
  </body>  
</html>
```

:::



































