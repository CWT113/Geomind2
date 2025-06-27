# 动态 SQL

动态 SQL 是指根据不同的条件动态拼接生成 SQL 语句的功能。



## if 标签

`<if>` 标签可以通过 `test` 属性来动态判断参数值是否被拼接到 SQL 中。

::: code-group

```java [UserMapper]
public interface UserMapper {
  List<User> selectByCondition(User user);
}
```

```xml [UserMapper.xml] {4,7,10,13}
<mapper namespace="com.geomind.mapper.UserMapper">
  <select id="selectByCondition" resultType="User">
    select * from tb_user where
    <if test="username != null and username != ''">
      username = #{username}
    </if>
    <if test="password != null and password != ''">
      and password = #{password}
    </if>
    <if test="gender != null and gender != ''">
      and gender = #{gender}
    </if>
    <if test="addr != null and addr != ''">
      and addr = #{addr}
    </if>
  </select>
</mapper>
```

```java [UserMapperTest] {4,5}
@Test
public void testSelect() {
  UserMapper mapper = SqlSessionUtils.getMapper(UserMapper.class);
  User user = new User("王一博", "12345", "男", "江苏苏州");
  List<User> users = mapper.selectByCondition(user);
  System.out.println(users);
}
```

:::



>上面的 SQL 并不完美，如果 username = null 时，就会出现 where and password = ? 这种错误 SQL 出现。
>
>::: note 解决方案
>
>- 使用 where 1 = 1，使 SQL 始终存在一个恒成立的条件；
>- 使用 `<where>` 标签，mybatis 底层会自动处理 `and` 连接符，[查看示例](#where)；
>
>:::

::: code-group

```xml [UserMapper.xml] {3}
<mapper namespace="com.geomind.mapper.UserMapper">
  <select id="selectByCondition" resultType="User">
    select * from tb_user where 1 = 1
    <if test="username != null and username != ''">
      username = #{username}
    </if>
    <if test="password != null and password != ''">
      and password = #{password}
    </if>
    <if test="gender != null and gender != ''">
      and gender = #{gender}
    </if>
    <if test="addr != null and addr != ''">
      and addr = #{addr}
    </if>
  </select>
</mapper>
```

 ```java [UserMapperTest] {4}
 @Test
 public void testSelect() {
   UserMapper mapper = SqlSessionUtils.getMapper(UserMapper.class);
   User user = new User(null, "12345", "男", "江苏苏州");
   List<User> users = mapper.selectByCondition(user);
   System.out.println(users);
 }
 ```

:::



## where 标签

`<where>` 标签是动态查询的一个保险箱。

::: tip 作用

- 当 `<where>` 标签中有内容时，会自动生成 `where` 关键字，并将 **内容前** 多余的 `and` 或 `or` 等连接关键字去掉；
- 当 `<where>` 标签中没有内容时，此时它没有任何效果，也不会生成 `where` 条件；

:::

::: warning 注意

`<where>` 标签只能去掉内容前的 `and` 等关键字，不能去掉 内容后 的 `and` 等关键字。例如：

```xml
<select id="selectByCondition" resultType="User">
  select * from tb_user
  <where>
    <if test="username != null and username != ''">
      username = #{username} and
    </if>

    <!-- password 不传递时，就会报错 -->
    <if test="password != null and password != ''">
      password = #{password} and
    </if>
  </where>
</select>
```

:::

前面 `<if>` 中使用 where 1 = 1 的方式，也可以使用下面的方式替代：

```xml [UserMapper.xml] {4,17}
<mapper namespace="com.geomind.mapper.UserMapper">
  <select id="selectByCondition" resultType="User">
    select * from tb_user
    <where>
      <if test="username != null and username != ''">
        username = #{username}
      </if>
      <if test="password != null and password != ''">
        and password = #{password}
      </if>
      <if test="gender != null and gender != ''">
        and gender = #{gender}
      </if>
      <if test="addr != null and addr != ''">
        and addr = #{addr}
      </if>
    </where>
  </select>
</mapper>
```



## trim 标签

`<trim>` 标签用于灵活的控制 SQL 语句中的 **前缀和后缀**，并且可以通过配置自动去掉多余的符号（如逗号，`and`、`or` 等）。

该标签有四个属性：

|      属性       | 作用                                                  |
| :-------------: | ----------------------------------------------------- |
|     prefix      | 在生成的 SQL 开头增加一个前缀                         |
|     suffix      | 在生成的 SQL 结尾增加一个后缀                         |
| prefixOverrides | 自动去掉子内容开头的某些关键字，如 `and` 或 `or` 等； |
| suffixOverrides | 自动去掉子内容结尾的某些关键字，如 `and` 或 `or` 等； |

通过 `<trim>` 标签，实现上面 `<where>` 标签的效果：

```xml [UserMapper.xml] {6}
<mapper namespace="com.geomind.mapper.UserMapper">
  <select id="selectByCondition" resultType="User">
    select * from tb_user
    <!-- prefix：表示在 SQL 的前缀增加 where 关键字 -->
    <!-- prefixOverrides：表示如果参数前面出现 and|or 关键字，就自动去掉  -->
    <trim prefix="where" prefixOverrides="and|or">
      <if test="username != null and username != ''">
        username = #{username}
      </if>
      <if test="password != null and password != ''">
        and password = #{password}
      </if>
      <if test="gender != null and gender != ''">
        and gender = #{gender}
      </if>
      <if test="addr != null and addr != ''">
        and addr = #{addr}
      </if>
    </trim>
  </select>
</mapper>
```



## choose 标签

`<choose>` 搭配 `<when>` 和 `<otherwise>` 同时使用，类似于 switch case 的效果。 

::: tip 提示

`<when>` 标签可以出现多次，而 `<otherwise>` 标签只能出现一次。

:::

::: code-group

```java [UserMapper]
public interface UserMapper {
  List<User> selectByCondition(User user);
}
```

```xml [UserMapper.xml] {5,17,7,10,14}
<mapper namespace="com.geomind.mapper.UserMapper">
  <select id="selectByCondition" resultType="User">
    select * from tb_user
    <where>
      <choose>
        <!-- 如果 username 有值的话，就赋值，后续的 when 和 otherwise 都不会再执行 -->
        <when test="username != null and username != ''">
          username = #{username}
        </when>
        <when test="password != null and password != ''">
          password = #{password}
        </when>
        <!-- 前面的条件都不满足时，执行 otherwise -->
        <otherwise>
          1 = 1
        </otherwise>
      </choose>
    </where>
  </select>
</mapper>
```

```java [UserMapperTest]
@Test
public void testSelect() {
  UserMapper mapper = SqlSessionUtils.getMapper(UserMapper.class);
  User user = new User();
  // 情况一：username 有值，password 不会被赋值
  user.setUsername("王一博");
  user.setPassword("");

  // 情况二：username 没有值，password 才会被赋值
  user.setUsername("");
  user.setPassword("12345");

  // 情况三：username 和 password 都没有值，会走 <otherwise> 标签
  user.setUsername("");
  user.setPassword("12345");
  List<User> users = mapper.selectByCondition(user);
  System.out.println(users);
}
```

:::



## foreach 标签

### 批量删除

使用 `<foreach>>` 标签进行批量删除时，可以接收 **数组** 或 **集合** 类型的主键值，此时有两种方式可以删除：

- 通过 `id in (1,2,3)` 的方式；
- 通过 `where id = 1 or where id = 2` 的方式；

|    属性    | 左右                              |
| :--------: | --------------------------------- |
| collection | 集合类型的参数值                  |
|    item    | 循环时，集合中循环到的当前值      |
| separator  | 分隔符，如 `or`、`,` 等 |
|    open    | SQL 左侧要拼接的值，如 `(` |
|   close    | SQL 右侧要拼接的值，如 `)` |

::: code-group

```java [UserMapper]
public interface UserMapper {
  int batchDelete(@Param("ids") List<Integer> ids);
}
```

```xml [UserMapper.xml] {6-10,16-18,24-26}
<mapper namespace="com.geomind.mapper.UserMapper">
  <delete id="batchDelete">
    <!-- 方式一：手动凭借左右的括号 -->
    delete from tb_user
    <where> id in
      (
      <foreach collection="ids" item="id" separator=",">
        #{id}
      </foreach>
      )
    </where>

    <!-- 方式二：通过 open 和 close 属性设置前后缀 -->
    delete from tb_user
    <where> id in
      <foreach collection="ids" item="id" separator="," open="(" close=")">
        #{id}
      </foreach>
    </where>

    <!-- 方式三：通过 where id = 1 or where id = 2 的方式删除 -->
    delete from tb_user
    <where>
      <foreach collection="ids" item="id" separator="or">
        id = #{id}
      </foreach>
    </where>
  </delete>
</mapper>
```

```java [UserMapperTest]
@Test
public void testSelect() {
  UserMapper mapper = SqlSessionUtils.getMapper(UserMapper.class);
  User user = new User();
  // 情况一：username 有值，password 不会被赋值
  user.setUsername("王一博");
  user.setPassword("");

  // 情况二：username 没有值，password 才会被赋值
  user.setUsername("");
  user.setPassword("12345");

  // 情况三：username 和 password 都没有值，会走 <otherwise> 标签
  user.setUsername("");
  user.setPassword("12345");
  List<User> users = mapper.selectByCondition(user);
  System.out.println(users);
}
```

:::



### 批量添加

在使用 `<foreach>` 进行批量删除时，赋值的时候需要使用 `item.属性` 的方式。

::: code-group

```java [UserMapper]
public interface UserMapper {
  int batchInsert(@Param("users") List<User> users);
}
```

```xml [UserMapper.xml] {5-7}
<mapper namespace="com.geomind.mapper.UserMapper">
  <insert id="batchInsert">
    insert into tb_user (username, password, gender, addr)
    values
    <foreach collection="users" item="user" separator=",">
      (#{user.username}, #{user.password}, #{user.gender}, #{user.addr})
    </foreach>
  </insert>
</mapper>
```

```java [UserMapperTest] {8}
@Test
public void testInsert() {
  UserMapper mapper = SqlSessionUtils.getMapper(UserMapper.class);
  User user1 = new User("张三", "12345", "男", "广州");
  User user2 = new User("李四", "12345", "男", "广州");
  User user3 = new User("王五", "12345", "男", "广州");
  List<User> users = Arrays.asList(user1, user2, user3);
  int affectRows = mapper.batchInsert(users);
  System.out.println("affectRows = " + affectRows);
}
```

:::



## sql 标签

`<sql>` 标签用来定义 SQL 片段，它可以预先明确的定义好查询后要返回的列（避免使用 * 的写法），然后搭配 `<include>` 标签实现引用。

::: tip 提示

定义好 SQL 片段的好处是可以统一的管理查询时返回的列，避免新增加一列字段，导致多条查询语句都要进行更新。

:::

::: code-group

```java [UserMapper]
public interface UserMapper {
  List<User> select();
}
```

```xml [UserMapper.xml] {8,3}
<mapper namespace="com.geomind.mapper.UserMapper">
  <!-- 定义 SQL 片段 -->
  <sql id="sqlColumns">id, username, password, gender, addr</sql>

  <select id="select" resultType="User">
    select
    <!-- 使用明确的字段名称来代替 * 的写法 -->
    <include refid="sqlColumns"/>
    from tb_user;
  </select>
</mapper>
```

```java [UserMapperTest] {8}
@Test
public void testSelect() {
  UserMapper mapper = SqlSessionUtils.getMapper(UserMapper.class);
  List<User> users = mapper.select();
  System.out.println(users);
}
```

:::



