# HttpMessageConverter

`HttpMessageConverter` （报文信息转换器）是 Spring 框架中的一个接口，用于 **将 HTTP 请求和响应中的数据与 Java 对象之间进行转换**。



## @RequestBody

`@RequestBody` 用于 **将请求体中的 JSON、XML 等格式的数据反序列化成 Java 对象**。

```java {5}
@Controller
@RequestMapping("user")
public class UserController {
  @GetMapping("addUser")
  public String addUser(@RequestBody User user) {
    System.out.println("user = " + user);
    return "user";
  }
}
```



## RequestEntity

`RequestEntity` 是一个 **更完整封装了 HTTP 请求数据的类**，通过它可以获取到请求的 请求头、请求体、请求方式和 请求地址等信息。

```java {5}
@Controller
@RequestMapping("user")
public class UserController {
  @PostMapping("addUser")
  public String addUser(RequestEntity<String> requestEntity) {
    System.out.println("Headers = " + requestEntity.getHeaders()); // 请求头
    System.out.println("Body = " + requestEntity.getBody());       // 请求体
    System.out.println("Method = " + requestEntity.getMethod());   // 请求方式
    System.out.println("URL = " + requestEntity.getUrl());         // 请求地址
    return "user";
  }
}
```



## @ResponseBody

先来回顾一下原生的 ServletAPI 中如何实现向页面返回数据：

```java {7}
@Controller
@RequestMapping("user")
public class UserController {
  @GetMapping("list")
  public void list(HttpServletResponse response) throws IOException {
    // 向客户端响应数据
    response.getWriter().print("Hello, World.");
  }
}
```

而在 SpringMVC 中，提供了 `@ResponseBody` 注解，专门用于 **标记控制器的返回值是作为响应体返回给客户端**，而不是被解析为跳转页面的视图名。

```java {5}
@Controller
@RequestMapping("user")
public class UserController {
  @GetMapping("list")
  @ResponseBody // 将控制器的返回值作为响应体返回给客户端
  public String list() {
    return "user";
  }
}
```



### 处理 JSON



### 处理 Ajax



## @RestController注解

`@RestController` 注解相当于是 `@Controller` + `@ResponseBody` 的结合体。

>有了 `@RestController` 就不用在每个方法上都标注 `@ResponseBody` 了，它默认把整个控制器都设置为向客户端响应体返回结果。

::: code-group

```java [@RestController] {1}
@RestController // 相当于@Controller + @ResponseBody
@RequestMapping("user")
public class UserController {
  @GetMapping("list")
  public String list() {
    return "user";
  }
}
```

```java [@Controller] {1,2}
@Controller
@ResponseBody
@RequestMapping("user")
public class UserController {
  @GetMapping("list")
  public String list() {
    return "user";
  }
}
```

:::



## ResponseEntity

