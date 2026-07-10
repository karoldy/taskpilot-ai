# Components

`components/` 目录遵循 **Atomic Design（原子设计）** 方法论，将 UI 组件按粒度分为五个层级。当前项目中使用其中四个层级：

```
components/
├── atoms/          # 原子 — 不可再分的基础 UI 单元
├── molecules/      # 分子 — 由多个原子组合而成的复合组件
├── organisms/      # 有机体 — 由分子/原子组成的完整功能区块（待建设）
├── layouts/        # 布局 — 页面级结构框架
└── README.md
```

## 层级说明

### Atoms（原子）

最基础的 UI 构建块，通常直接封装 MUI 或其他第三方基础组件，赋予项目统一的设计语言。

| 组件     | 路径                     | 说明                                                                           |
| -------- | ------------------------ | ------------------------------------------------------------------------------ |
| `Switch` | `atoms/Switch/index.tsx` | 基于 MUI Switch 的 iOS 风格开关，使用设计 Token 统一样式                       |
| `Table`  | `atoms/Table/index.tsx`  | 通用数据表格组件，支持排序、加载骨架屏、空状态、自定义列渲染、Tooltip 溢出提示 |

### Molecules（分子）

由多个原子或基础元素组合而成，具备独立业务含义的可复用组件。

| 组件                 | 路径                                     | 说明                                                                                                                                |
| -------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `FilterCard`         | `molecules/FilterCard/index.tsx`         | 任务筛选卡片，支持计数显示、primary/error 状态、毛玻璃背景效果、渐变色边框                                                          |
| `IllustrationCard`   | `molecules/IllustrationCard/index.tsx`   | 通用插图卡片，通过 `type`/`size`/`name` 动态加载 SVG 插图，支持 info/success/error 三种 variant，常用于空状态、错误提示等场景       |
| `FeedbackDialog` | `organisms/FeedbackDialog/index.tsx` | 通用反馈弹窗，监听事件总线（eventBus）中的 `graphql:error:*` 事件，按类型展示对应的插图提示（Forbidden / Server / Network） |

### Organisms（有机体）

由分子和原子组成的完整功能区块，代表页面中一个独立的、可自包含的 UI 区域。

| 组件               | 路径                                     | 说明                                                                     |
| ------------------ | ---------------------------------------- | ------------------------------------------------------------------------ |
| `FeedbackDialog`   | `organisms/FeedbackDialog/index.tsx`     | 通用反馈弹窗，按事件类型展示对应的插图提示（Forbidden / Server / Network） |
| `RegisterDialog`   | `organisms/RegisterDialog/index.tsx`     | 注册表单弹窗，含表单验证、密码显隐、服务条款确认                            |

### Layouts（布局）

控制页面的宏观结构，定义插槽区域（如顶栏、侧边栏、内容区、底栏）及全局级别的错误/404 处理。

| 组件            | 路径                        | 说明                                                                     |
| --------------- | --------------------------- | ------------------------------------------------------------------------ |
| `Layout`        | `layouts/index.tsx`         | 主布局框架，组合 Navbar + `<Outlet />` + Footer，支持 ScrollRestoration  |
| `Navbar`        | `layouts/Navbar.tsx`        | 固定顶栏导航，滚动联动（渐变背景 + 模糊 + 阴影随滚动进度变化）           |
| `Header`        | `layouts/Header.tsx`        | 页面级横幅组件，含背景图片，根据 Navbar 高度（64px）自动留出内边距       |
| `Footer`        | `layouts/Footer.tsx`        | 页面底栏                                                                 |
| `ErrorBoundary` | `layouts/ErrorBoundary.tsx` | 路由级错误边界，捕获渲染异常后展示 IllustrationCard 错误页，提供重试按钮 |
| `NotFound`      | `layouts/NotFound.tsx`      | 404 页面，3 秒倒计时自动返回上一页或首页                                 |

## 设计原则

1. **单向依赖**：上层可依赖下层（如 Molecules 可引用 Atoms），反之不可。Layouts 可引用任意层级组件。
2. **原子优先**：新增组件时，先从最小粒度考量 — 是否为不可再分的原子？是否需要组合为分子？是否构成独立业务区块（有机体）？
3. **命名规范**：每个组件一个目录，入口文件统一为 `index.tsx`。组件使用 `React.FC<Props>` 类型签名，并设置显式 `displayName`。
4. **样式方式**：通过 MUI `sx` 属性设置样式，直接引用 `@/tokens/base` 中的设计 Token，保持视觉一致性。
5. **导入路径**：跨层级引用使用 `@/` 路径别名，保持导入清晰可维护。
