# HttpMessageConverter

`HttpMessageConverter` （报文信息转换器）是 Spring 框架中的一个接口，用于 **将 HTTP 请求和响应中的数据与 Java 对象之间进行转换**。



## @RequestBody 注解

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

`RequestEntity` 是一个 **更完整封装了 HTTP 请求数据的类**，通过它可以获取到请求的请求头、请求体、请求方式和请求地址等信息。

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



## @ResponseBody 注解

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



### 返回 JSON 格式数据

 `@ResponseBody` 注解默认可以将一个字符串作为响应体返回给客户端，但如果想返回一个对象作为响应体该怎么做呢？

>直接将对象作为返回值响应是不行的，会报【HTTP 状态 406 - 不可接收】的错！

此时，需要引入 `jackson-databind` 包：

```xml
<dependency>
  <groupId>com.fasterxml.jackson.core</groupId>
  <artifactId>jackson-databind</artifactId>
  <version>2.19.0</version>
</dependency>
```

然后直接将一个对象作为返回值进行响应即可：

```java {7}
@Controller
@ResponseBody
@RequestMapping("user")
public class UserController {
  @GetMapping("getUser")
  public User getUser() {
    return new User("admin", 123456, new String[]{"a", "b"}); // 将对象直接返回
  }
}
```



## @RestController 注解

`@RestController` 注解相当于是 `@Controller` + `@ResponseBody` 的结合体。

>有了 `@RestController` 就不用在每个方法上都标注 `@ResponseBody` 了，它可以标注在整个控制器上，表示控制器内的所有方法都设置为向客户端响应体返回结果。

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

`ResponseEntity` 类用于 **在控制器方法中完全控制返回给客户端的 HTTP 响应内容**。

基本使用：

```java
ResponseEntity<?> response 
  = new ResponseEntity<>(body, headers, httpStatus);
```

|    参数    |     值类型     |     作用     |
| :--------: | :------------: | :----------: |
|    body    |     Object     | 响应体的内容 |
|  headers   |     键值对     |    响应头    |
| httpStatus | HttpStatus枚举 |   响应状态   |

构建更加灵活的 `ResponseEntityBuilder`：

```java
ResponseEntity.ok("Hello, World!");

ResponseEntity.ok().body("Hello, world!");

ResponseEntity.ok().headers("key", "value").body("Hello, world!");

ResponseEntity.status(HttpStatus.OK).body("Hello, World!");
```

| 方法                   | 作用                                  |
| :--------------------- | :------------------------------------ |
| ok(body)               | 返回状态为200，body直接作为响应体内容 |
| body(Object)           | 向响应体中设置内容                    |
| header("key", "value") | 向响应头中设置键值对数据              |
| cacheControl()         | 设置响应头中键值对的缓存时间          |



示例：

```java {6,13,15,21-23,29,36}
@RestController
@RequestMapping("user")
public class UserController {
  @GetMapping("getResponse")
  public ResponseEntity<String> getResponse() {
    ResponseEntity<String> response = new ResponseEntity<>("Hello, World!", HttpStatus.OK);
    return response;
  }

  @GetMapping("getParam")
  public ResponseEntity<String> getParam(@RequestParam("id") Long id) {
    if (id == 1) {
      return ResponseEntity.ok("Hello, World!");
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }
  }

  @GetMapping("getHeader")
  public ResponseEntity<String> getHeader() {
    return ResponseEntity.ok()
      .header("MyHeader", "MyValue666")
      .body("Hello, world!");
  }

  @GetMapping("getUser")
  public ResponseEntity<User> getUser() {
    User user = new User("admin", 123456);
    return ResponseEntity.ok(user);
  }

  @GetMapping("getCache")
  public ResponseEntity<String> getCache() {
    return ResponseEntity.ok()
      .header("MyHeader", "MyValue666")
      .cacheControl(CacheControl.maxAge(10, TimeUnit.SECONDS)) // 10秒过期
      .body("Hello, World!");
  }
}
```

