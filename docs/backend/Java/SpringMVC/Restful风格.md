# Restful风格

SpringMVC 的 Restful 风格是一种基于 REST架构风格的 web 接口设计方法，核心理念是 **通过 URL 表达资源，通过 HTTP 方法表示对资源的操作**。

例如：

| 操作         | URL         | HTTP方法 |
| ------------ | ----------- | -------- |
| 查询所有用户 | /users      | GET      |
| 查询用户详情 | /users/{id} | GET      |
| 新增用户     | /users      | POST     |
| 更新用户     | /users/{id} | PUT      |
| 删除用户     | /users/{id} | DELETE   |

>本质就是通过结合 URL 和 HTTP 方法实现接口的操作。



## 基础示例

```java
@Controller
@RequestMapping("users")
public class UserController {
  // 获取所有用户
  @GetMapping
  public List<User> getAllUsers() {
  }

  // 获取单个用户
  @GetMapping("{id}")
  public User getUser(@PathVariable("id") Long id) {
  }

  // 新增用户
  @PostMapping
  public User addUser(@RequestBody User user) {
  }

  // 修改用户
  @PutMapping("{id}")
  public User updateUser(@PathVariable("id") Long id, @RequestBody User user) {
  }

  // 删除用户
  @DeleteMapping("{id}")
  public void deleteUser(@PathVariable("id") Long id) {
  }
}
```

