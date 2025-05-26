# RequestMapping 注解

`@RequestMapping` 注解用于将请求和控制器关联起来，建立请求与接口的映射关系。



## 注解的标记位置

`@RequestMapping` 注解可以标记在两个地方：

- 标记在 **类** 上：表示设置请求的初始信息；
- 标记在 **方法** 上：表示设置请求的具体信息；

```java {2,4}
@Controller
@RequestMapping("user")
public class UserController {
  @RequestMapping("index")
  public String index() {
    return "index";
  }
}
```



## 注解的 value 属性

`@RequestMapping` 注解的 `value` 属性用于 **设置当前请求处理方法的请求路径**。它可以是单个字符串，也可以是字符串数组（表示多个请求地址均映射到该方法）。

::: tip 提示

- 注解的 value 属性至少设置一个值；
- 注解的 value 属性中，可以携带 `/` ，也可以不带，看具体团队的代码风格即可；

:::

```java {4,5}
@Controller
@RequestMapping("user")
public class UserController {
  @RequestMapping("list")
  // @RequestMapping(value = {"list", "getUsers"}) // 多个请求地址均映射到该方法
  public String list() {
    return "index";
  }
}
```



## 注解的 method 属性

`@RequestMapping` 注解的 `method` 属性用于 **指定该请求处理方法的HTTP请求类型**。它可以是单个请求类型，或者多个请求类型组成的数组。

::: tip 提示

如果不写 `method` 属性，默认表示任何的 HTTP 请求类型，都能访问当前请求处理方法。

:::

 ```java {4,5}
 @Controller
 @RequestMapping("user")
 public class UserController {
   @RequestMapping(value = "list", method = RequestMethod.GET)
   // @RequestMapping(value = "list", method = {RequestMethod.GET, RequestMethod.POST})
   public String list() {
     return "index";
   }
 }
 ```



## 注解的 params 属性

`@RequestMapping` 注解的 `params` 属性用于 **限制请求中必须包含哪些参数或不能包含哪些参数**，只有满足所有条件的请求才会被该方法处理。

常用的匹配规则：

|       写法        | 作用                                                |
| :---------------: | --------------------------------------------------- |
|    "username"     | 请求中必须包含名为 username 的参数                  |
|    "! username"    | 请求中必须不能包含名为 username 的参数              |
| "username = value"  | 请求中必须包含名为 username 且值为 value 的参数     |
| "username!= value" | 请求中必须包含名为 username 且值不能为 value 的参数 |

>如果请求中 `params` 参数不满足上述的四种匹配规则，会报 【HTTP 状态 400 - 错误的请求 Invalid request parameters. 】的错。

```java {5,11,17}
@Controller
@RequestMapping("user")
public class UserController {
  // 只处理带有 username 的参数的请求
  @RequestMapping(value = "checkUser", params = {"username"})
  public String checkUser() {
    return "index";
  }

  // 只处理 username=admin 的请求
  @RequestMapping(value = "admin", params = {"username=admin"})
  public String adminOnly() {
    return "index";
  }

  // 处理 username!=admin 的所有请求
  @RequestMapping(value = "tourist", params = {"username!=admin"})
  public String touristOnly() {
    return "index";
  }
}
```



## 注解的 header 属性

`@RequestMapping` 注解的 `headers` 属性用于 **限制请求中必须包含某些 HTTP 请求头或自定义请求头**，只有满足所有条件的请求才会被该方法处理。

常见的匹配规则：

|     写法     | 作用                                               |
| :----------: | -------------------------------------------------- |
|    "key"     | 请求头中必须包含名为 key 的 header                 |
|    "! key"    | 请求头中不能包含名为 key 的 header                 |
| "key = value"  | 请求头中必须包含名为 key 且值为 value 的 header    |
| "key!= value" | 请求头中必须包含 key，但其值不能是 value 的 header |

 ```java {4,10,16}
 @Controller
 @RequestMapping("user")
 public class UserController {
   // 只有请求头中包含 content-type:application/json 才会匹配
   @RequestMapping(value = "jsonOnly", headers = {"content-type=application/json"})
   public String jsonOnly() {
     return "index";
   }
 
   // 请求头中不能包含 token
   @RequestMapping(value = "noToken", headers = {"!token"})
   public String noToken() {
     return "index";
   }
 
   // 请求头中必须包含 token 且值必须为 123abc
   @RequestMapping(value = "secure", headers = {"token=123abc"})
   public String secure() {
     return "index";
   }
 }
 ```



## 派生注解（重要）

在 Spring4 之后，官方提供了一组针对 `@RequestMapping` 的派生注解，以更清晰的表达 HTTP 请求方法。

常用的派生注解有：

|    派生注解    | HTTP 请求方法 | 等价写法                                       |
| :------------: | :----------: | ---------------------------------------------- |
|  @GetMapping   |     GET      | @RequestMapping(method = RequestMethod.GET)    |
|  @PostMapping  |     POST     | @RequestMapping(method = RequestMethod.POST)   |
|  @PutMapping   |     PUT      | @RequestMapping(method = RequestMethod.PUT)    |
| @DeleteMapping |    DELETE    | @RequestMapping(method = RequestMethod.DELETE) |

```java {4,9,14,19}
@RestController
@RequestMapping("user")
public class UserController {
  @GetMapping("list")
  public String listUsers() {
    return "index";
  }

  @PostMapping("add")
  public String addUser() {
    return "index";
  }

  @PutMapping("update")
  public String updateUser() {
    return "index";
  }

  @DeleteMapping("delete/{id}")
  public String deleteUser(@PathVariable String id) {
    return "index";
  }
}
```







