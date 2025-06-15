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

`<trim>` 标签用于灵活的控制 SQL 语句中的**前缀和后缀**，并且可以通过配置自动去掉多余的符号（如逗号，`and`、`or` 等）。

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

















