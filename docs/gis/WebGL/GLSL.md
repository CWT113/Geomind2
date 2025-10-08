# GLSL



## 变量

GLSL 语法中，变量的命名建议使用驼峰式，以下是命名规范：

- 可以使用字母、数字和下划线，但是不能以数字开头；
- `gl_` 作为保留前缀，只能用于内部变量；
- 还有其他内置函数名称也不能作为变量名称；



### 基本类型

| 数据类型 | 描述                       |
| :------: | -------------------------- |
| void     | 表示空类型                 |
| bool     | 布尔类型                   |
| int      | 整型，表示 16 位的有符号整数 |
| float | 浮点型 |
| bvec2 | 包含 2 个布尔类型的向量（b 表示 bool） |
| bvec3 | 包含 3 个布尔类型的向量 |
| bvec4 | 包含 4 个布尔类型的向量 |
| ivec2 | 包含 2 个整型的向量（i 表示 int） |
| ivec3 | 包含 3 个整型的向量 |
| ivec4 | 包含 4 个整型的向量 |
| mat2 或 mat2x2 | 2 x 2 的浮点数矩阵类型 |
| mat3 或 mat3x3 | 3 x 3 的浮点数矩阵类型 |
| mat mxn | m x n 的浮点数矩阵类型（m：列；n：行） |
| sampler1D | 用于内建的纹理函数中引用特定的一维纹理句柄 |
| sampler2D | 二维纹理句柄 |
| sampler3D | 三维纹理句柄 |
| sampler1DShadow | 一维深度纹理句柄 |
| sampler2DShadow | 二维深度纹理句柄 |



### 内置变量

**顶点着色器** 可用的内置变量如下：

| 名称                   | 类型  | 描述                                     |
| :--------------------- | :---: | ---------------------------------------- |
| gl_Position            | vec4  | 表示顶点的位置，所有顶点着色器必须有该值 |
| gl_Color               | vec4  | 表示顶点的主颜色                         |
| gl_SecondaryColor      | vec4  | 表示顶点的辅助颜色                       |
| gl_FrontColor          | vec4  | 表示正面主颜色的 varying 输出            |
| gl_FrontSecondaryColor | vec4  | 表示正面辅助颜色的 varying 输出          |
| gl_BackColor           | vec4  | 表示背面主颜色的 varying 输出            |
| gl_BackSecondaryColor  | vec4  | 表示背面辅助颜色的 varying 输出          |
| gl_Vertex              | vec4  | 表示物体空间的顶点位置                   |
| gl_ClipVertex          | vec4  | 表示用户裁剪平面的裁剪                   |
| gl_MultiTexCoordn      | vec4  | 表示顶点的第 n 个纹理的坐标              |
| gl_TexCorrd []          | vec4  | 表示纹理坐标数组的 varying 输出          |
| gl_Normal              | vec3  | 表示顶点的法向值                         |
| gl_PointSize           | float | 表示顶点的大小                           |
| gl_FogCoord            | float | 表示顶点的雾坐标                         |
| gl_FogFragCorrd        | float | 表示雾坐标的 varying 输出                |

**片段着色器** 可用的内置变量如下：

| 名称              | 类型  | 描述                     |
| :---------------- | :---: | ------------------------ |
| gl_Color          | vec4  | 表示主颜色的插值（只读） |
| gl_SecondaryColor | vec4  | 表示辅助颜色的插值       |
| gl_TexCorrd []     | vec4  | 表示纹理坐标数组的插值   |
| gl_FragCorrd      | vec4  | 窗口的 x、y、z 和 1/w    |
| gl_FogFragCoord  | float | 表示雾坐标的插值         |
| gl_FrontFacing | bool | 如果是窗口正面图元的一部分，该值为true |
| gl_PointCoord | vec2 | 点精灵的二维空间坐标范围，在 (0,0) 到 (1,1) 之间，仅用于点图元和点精灵开启的情况下 |
| gl_FragData[] | vec4 | 使用 glDrawBuffers 输出的数据数组。不能与 gl_FragColor 结合使用 |
| gl_FragColor | vec4 | 表示输出的颜色，用于随后的像素操作 |
| gl_FragDepth | float | 表示输出的深度，用于随后的像素操作 |













