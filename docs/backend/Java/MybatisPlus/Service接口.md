# Service 接口

`Service` 接口是对 Mapper 层的进一步封装，主要目的是简化业务逻辑层（Service 层）的开发。



## `IService<T>`

Mybatis-Plus 提供了通用的 `IService<T>` 接口，并通过 `ServiceImpl<T>` 提供了默认的实现。其中泛型类 `T` 是实体类类型，它定义了一套常用的 CRUD 方法，避免在每个业务层都重复写同样的逻辑。



## `ServiceImpl<M, T>`

`ServiceImpl` 是 `IService` 接口的一个默认实现类，其中：

- `M` 是 Mapper 接口，比如 UserMapper；
- `T` 是实体类，比如 User；

它实现了 `IService` 中定义的所有方法，并且底层调用的就是 Mapper 中写好的方法。



## 使用方式

新建 Mapper 接口，继承自 `IService`：

```java [UserService]
public interface UserService extends IService<User> {
}
```

新建接口的实现类，实现 `UserService` 接口，并继承 `ServiceImpl` 实现类：

```java [UserServiceImpl]
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
  // 可以重写或添加自定义方法
}
```

测试获取数据库总条数和批量添加功能：

::: code-group

```java [获取总数]
@SpringBootTest
public class MybatisPlusServiceTests {
  @Autowired
  private UserService userService;

  @Test
  public void testGetCount() {
    long count = userService.count();
    System.out.println("总记录数 = " + count);
  }
}
```

```java [批量添加]
@SpringBootTest
public class MybatisPlusServiceTests {
  @Autowired
  private UserService userService;

  @Test
  public void testAddBatch() {
    List<User> users = new ArrayList<>();
    for (int i = 0; i < 10; i++) {
      User user = new User();
      user.setName("wyb" + i);
      user.setAge(20 + i);
      user.setEmail("123@163.com");
      users.add(user);
    }
    // 批量添加
    boolean b = userService.saveBatch(users);
    System.out.println("b = " + b);

    // INSERT INTO user ( id, name, age, email ) VALUES ( ?, ?, ?, ? )
  }
}
```

:::

::: tip 提示

批量添加的功能，本质上也是循环执行 `insert into` 语句一条一条插入的，而不是一次性插入所有。

:::

