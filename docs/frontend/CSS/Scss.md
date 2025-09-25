# Scss

Sass 是一个 CSS 预处理器，也是 CSS 的扩展语言，可以帮助我们减少 CSS 重复的代码。

::: info Sass 和 Scss 的关系

Sass 从第三代开始，放弃了缩进式的风格，并且完全向下兼容普通的 CSS 代码，这一代 Sass 也被称为 Scss。

:::



## 变量

变量使用 `$` 符开发，赋值方式和 CSS 属性一致。

> [!NOTE] 变量命名规则
>
> - 变量以 `$` 符开头，后面跟变量名；
> - 变量名不能以数字开头，但变量名可包含字母、数字、下划线、横线等；

```scss
$color: #ffffff;

div {
  color: $color;
}
```



### 变量作用域

变量作用域分为两种：

- **全局变量**：声明在最外层的变量，可以在任何地方使用；
- **局部变量**：嵌套规则内定义的变量，只能在嵌套规则内使用；

> [!NOTE] 局部变量变为全局变量
>
> 想让局部变量变为全局变量，可以使用 `!global` 声明。

```scss
div {
  $color: #ffffff !global;
}

p {
  // 正常使用
  color: $color;
}
```



### 变量数据类型

主要支持 7 种数据类型：

|  类型  | 示例                                                         |
| :----: | ------------------------------------------------------------ |
|  数字  | `1rem`、`100vh`、`10px`                                      |
| 字符串 | `"foo"`                                                      |
|  颜色  | `blue`、`#04a3f9`、`rgba(255, 0, 0, 0.5)`                    |
| 布尔值 | `true`、`false`                                              |
|  空值  | `null` 是其类型的唯一值，表示缺少值，通常由函数返回一表示缺少结果 |
|  数组  | 用空格或逗号分隔，如 `Helvetica, Arial, sans-serif`          |
|  maps  | 相当于 JS 种的 object，如 `key1: value1`                     |

```scss
// 数字
$width: 100px;
// 字符串
$font-weight: bold;
// 数组
$font-family: "Open Sans", Helvetica, Sans-Serif;
$padding: 10px 20px 25px 30px;
// 颜色
$color: rgba(255, 255, 255, 0.5);
// 布尔值
$mode: true;
// 空值
$var: null;

div {
  width: $width;
  font-weight: $font-weight;
  font-family: $font-family;
  padding: $padding;

  @if $mode {
    background-color: #fff;
  } @else {
    background-color: #000;
  }
}
```



### 变量运算符

常见的变量运算符：

|        运算符         | 作用         |
| :-------------------: | ------------ |
|          ==           | 相等运算     |
|          !=           | 不相等运算   |
|           >           | 大于运算     |
|          >=           | 大于等于运算 |
|           <           | 小于运算     |
|          <=           | 小于等于运算 |
|          and          | 并且运算     |
|          or           | 或者运算     |
|          not          | 非运算       |
| + \| - \| * \| / \| % | 数字运算     |

::: code-group

```scss [相等运算符]
$mode: "blue";

div {
  @if $mode == "blue" {
    background-color: blue;
  } @else {
    background-color: #fff;
  }
}
```

```scss [关系运算符]
$width: 40px;

div {
  @if $width > 30px {
    background-color: blue;
  } @else {
    background-color: #fff;
  }
}
```

```scss [布尔运算符]
$width: 40px;
$mode: true;

div {
  @if $width > 30px and $width < 50px {
    background-color: blue;
  } @else {
    background-color: #fff;
  }

  // 如果不是 true
  @if not $mode {
    background-color: blue;
  } @else {
    background-color: #fff;
  }
}
```

:::



## 插值语句

插值语法 `#{}` 主要用来把变量或表达式拼进字符串、选择器、属性名等位置，而不是做数学运算。

::: code-group

```scss [Scss] {12}
$btn: primary;
$side: left;
$font-size: 20;
$img: logo;

.button-#{$btn} {
  // 拼接属性名
  margin-#{$side}: 20px;
  // 拼接单位
  font-size: #{$font-size}px;
  // 拼接路径
  background-image: url("/images/#{$img}.png");
}
```

```css [编译后]
.button-primary {
  color: #fff;
  margin-left: 20px;
  font-size: 20px;
  background-image: url("/images/logo.png");
}
```

:::



## 流程控制

### @if

`@if` 指令的语法和 js 中的类似，基本格式是 `@if...@else if...@else`。

```scss
$theme: dark;

div {
  @if $theme == light {
    background-color: #fff;
  } @else {
    background-color: #000;
  }
}
```



### @for

`@for` 指令用于在条件范围内重复的操作，它包含两种格式：

```scss
/* 条件范围包含 start 和 end 的值，start 和 end 必须是整数 */
@for $i from <start> through <end>

/* 条件范围只包含 start 的值，不包含 end 的值 */
@for $i from <start> to <end>
```

::: code-group

```scss [SCSS]
@for $i from 1 through 3 {
  #loading span:nth-child(#{$i}) {
    width: 20 * ($i - 1) px;
  }
}
```

```css [编译后]
#loading span:nth-child(1) {
  width: 0 px;
}

#loading span:nth-child(2) {
  width: 20 px;
}

#loading span:nth-child(3) {
  width: 40 px;
}
```

:::



### @each

`@each` 指令也用于循环遍历，它的格式是：

```scss
@each $var in $list
```

::: code-group

```scss [SCSS]
$color-list: red green blue;

@each $color in $color-list {
  $index: index($color-list, $color);

  .p#{$index} {
    background-color: $color;
  }
}
```

```css [编译后]
.p1 {
  background-color: red;
}

.p2 {
  background-color: green;
}

.p3 {
  background-color: blue;
}
```

:::



### @while

`@while` 指令循环输出直到表达式返回结果为 false。这样可以实现比 `@for` 更复杂的循环。

例如，可以使用 `@while` 生成栅格化布局：

::: code-group

```scss [SCSS]
$column: 24;

@while $column > 0 {
  .col-sm-#{$column} {
    width: 20px;
  }

  $column: $column - 1;
}
```

```css [编译后]
.col-sm-4 {
  width: 20px;
}

.col-sm-3 {
  width: 20px;
}

.col-sm-2 {
  width: 20px;
}

.col-sm-1 {
  width: 20px;
}
```

:::



## @import

`@import` 允许导入 scss 或 sass 文件，被导入的文件将在合并编译到同一个 css 文件中，被导入的文件中所包含的变量或者混合指令都可以再导入的文件中使用。

::: code-group

```scss [common.scss]
$color: red;

div {
  color: $color;
}
```

```scss [index.scss]
@import "common.scss";

.container {
  // 可以使用 common.scss 中的变量
  color: $color;
}
```

```css [编译后]
div {
  color: red;
}

.container {
  color: red;
}
```

:::

> [!NOTE] 以下情况仅作为普通 css 语句，不会导入 scss 文件
>
> - 文件扩展名为 `.css`；
> - 文件名以 `http://` 开头；
> - 文件通过 `url()` 引入的；
> - `@import` 包含媒体查询时；

```scss
@import "common.css";
@import url(common);
@import "http://xxx.com/xxx";
@import 'landscape' screen and (orientation:landscape);
```

另外，scss 也支持使用一个 `@import` 导入多个 scss 文件：

```scss
@import "common.scss", "element.scss";
```



### @Partials

如果需要导入 scss 文件，但又不希望让其编译为 css 文件，只需要在文件命名时添加 `_` 线，这样会告诉 scss 不要编译这些文件。

> [!CAUTION] 注意
>
> 文件命名时需要以 `_` 开头，但是在 `@import` 导入时，却不需要 `_` 线。

::: code-group

```scss [_common.scss]
$color: red;

div {
  color: $color;
}
```

```scss [index.scss] {2}
// 导入时不需要 _ 线
@import "common.scss";

.container {
  color: $color;
}
```

```css [编译后]
div {
  color: red;
}

.container {
  color: red;
}
```

:::



## @mixin

`@mixin` 混合指令用于定义可重复使用的样式。混合指令可以包含所有的 css 规则，绝大部分的 scss 规则，甚至可以通过参数引入变量，输出多样化的样式。

> [!CAUTION] 注意
>
> 混合命名和变量命名规范一致。

::: code-group

```scss [SCSS] {8}
@mixin block {
  width: 80%;
  margin-left: 10px;
  border-radius: 10px;
}

.container {
  @include block;
}
```

```css [编译后]
.container {
  width: 80%;
  margin-left: 10px;
  border-radius: 10px;
}
```

:::



### 嵌入选择器

在 `@mixin` 中再嵌入一层选择器。

::: code-group

```scss [SCSS]
@mixin warning {
  font-size: 12px;

  // 嵌入选择器
  .warn-text {
    color: rgba(255, 253, 123, 0.5);
    line-height: 20px;
  }
}

.container {
  @include warning;
}
```

```css [编译后]
.container {
  font-size: 12px;
}

.container .warn-text {
  color: rgba(255, 253, 123, 0.5);
  line-height: 20px;
}
```

:::



### 传递参数

使用 `@mixin` 时，还可以传递单个或多个参数：

::: code-group

```scss [SCSS]
@mixin flex-align($width, $height: 100px, $color: #fff) {
  width: $width;
  height: $height;
  color: $color;
}

.container1 {
  @include flex-align(100px);
}

.container2 {
  @include flex-align(100px, 200px);
}

.container3 {
  // 跳过某个参数，命名指定后续参数
  @include flex-align(100px, $color: #000);
}
```

```css [编译后]
.container1 {
  width: 100px;
  height: 100px;
  color: #fff;
}

.container2 {
  width: 100px;
  height: 200px;
  color: #fff;
}

.container3 {
  width: 100px;
  height: 100px;
  color: #000;
}
```

:::



## @function

`@function` 用于封装复杂的操作，可以很容易地以一种可读的方式抽象出通用公式和行为，函数提供返回值，常用来做计算方面的工作。

> [!CAUTION] 注意
>
> - 函数命名和变量命名规则一致；
> - `@return` 只能返回一个值，但是这个值可以是 list 或 map；

::: code-group

```scss
@function square($base) {
  @return $base * $base * 1px;
}

.container {
  margin-left: square(5);
}
```

```css [编译后]
.container {
  margin-left: 25px;
}
```

:::



### 可选参数

::: code-group

```scss [SCSS]
@function double($width, $height: 100px, $color: #fff) {
  @return $width + $height $color;
}

.box {
  // 通过 nth() 取值
  width: nth(double(100px), 1);
  // 注意参数命名的写法
  color: nth(double(100px, $color: #000), 2);
}
```

```css [编译后]
.box {
  width: 200px;
  color: #000;
}
```

:::



## @extend

`@extend` 用来继承已经存在的样式。

::: code-group

```scss [SCSS] {7,14}
.button {
  width: 100px;
  height: 40px;
}

.btn-default {
  @extend .button;

  color: #fff;
  background-color: #316dca;
}

.btn-danger {
  @extend .button;

  color: #fff;
  background-color: #e33c2f;
}
```

```css [编译后]
.button, .btn-danger, .btn-default {
  width: 100px;
  height: 40px;
}

.btn-default {
  color: #fff;
  background-color: #316dca;
}

.btn-danger {
  color: #fff;
  background-color: #e33c2f;
}
```

:::



## @use

`@use` 是 scss 1.23.0 版本以上新增的，它真正意义上实现了模块化，可以从其他的 scss 文件中加载 mixin、function 和变量，并将多个样式表组合在一起。

> [!NOTE] `@import` 的缺点
>
> 在没有 `@use` 之前，导入其他模块使用 `@import`，它存在很多问题：
>
> - 多出导入，容易出现样式重复加载；
> - 因为没有命名空间的概念，所以 mixin、function、变量的命名容易冲突；
> - 没有私有函数的概念，样式完全暴露在使用 import 的地方，对 ui 组件库不友好；

::: code-group

```scss [common.scss]
$radius: 10px;

@mixin rounded {
  border-radius: $radius;
}
```

```scss [index.scss] {1}
@use "common.scss";

.button {
  @include common.rounded;

  padding: 5px + common.$radius;
}
```

```css [编译后]
.button {
  border-radius: 10px;
  padding: 15px;
}
```

:::



### 命名空间

::: code-group

```scss [common.scss]
$radius: 10px;

@mixin rounded {
  border-radius: $radius;
}
```

```scss [index.scss] {1}
@use "common.scss" as myCommon;

.button {
  @include myCommon.rounded;

  padding: 5px + myCommon.$radius;
}
```

```css [编译后]
.button {
  border-radius: 10px;
  padding: 15px;
}
```

:::



### as *

`as *` 表示当前模块处于全局命名空间。

::: code-group

```scss [common.scss]
$radius: 10px;

@mixin rounded {
  border-radius: $radius;
}
```

```scss [index.scss] {1}
@use "common.scss" as *;

.button {
  @include rounded;

  padding: 5px + $radius;
}
```

```css [编译后]
.button {
  border-radius: 10px;
  padding: 15px;
}
```

:::



### 私有模块

私有模块需要在定义变量是以 `$-` 开头。

::: code-group

```scss [common.scss]
$-radius: 10px;

@mixin rounded {
  border-radius: $-radius;
}
```

```scss [index.scss] {1}
@use "common.scss";

.button {
  @include common.rounded;

  // Error: 私有变量不能被访问
  padding: 5px + common.$-radius;
}
```

:::
