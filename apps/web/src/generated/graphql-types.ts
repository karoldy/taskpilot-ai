export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: unknown; output: unknown };
};

export type AddProjectMemberInput = {
  /** 成员角色：owner / admin / member / viewer */
  role?: ProjectMemberRole;
  /** 要添加的用户 ID */
  userId: Scalars['String']['input'];
};

export type AiUsageRecord = {
  __typename?: 'AiUsageRecord';
  /** 输出 token 数 */
  completionTokens: Scalars['Float']['output'];
  /** 创建时间 */
  createdAt: Scalars['DateTime']['output'];
  /** 预估费用（美元） */
  estimatedCost: Scalars['Float']['output'];
  /** 记录唯一标识 */
  id: Scalars['ID']['output'];
  /** 模型名称，如 gpt-4、claude-3 */
  modelName: Scalars['String']['output'];
  /** 所属项目 ID */
  projectId?: Maybe<Scalars['String']['output']>;
  /** 输入 token 数 */
  promptTokens: Scalars['Float']['output'];
  /** AI 提供商，如 openai、anthropic */
  provider: Scalars['String']['output'];
  /** 请求耗时（毫秒） */
  requestDurationMs?: Maybe<Scalars['Float']['output']>;
  /** 请求类型：chat / completion / embedding */
  requestType: Scalars['String']['output'];
  /** 所属任务 ID */
  taskId?: Maybe<Scalars['String']['output']>;
  /** 用户 ID */
  userId: Scalars['String']['output'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  /** JWT 访问令牌（有效期 15 分钟） */
  accessToken: Scalars['String']['output'];
  /** 刷新令牌（有效期 7 天） */
  refreshToken: Scalars['String']['output'];
  /** 当前登录用户信息 */
  user: User;
};

export type CreateCommentInput = {
  /** 评论内容 */
  content: Scalars['String']['input'];
  /** 所属任务 ID */
  taskId: Scalars['String']['input'];
};

export type CreateDepartmentInput = {
  /** 部门描述 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** 部门名称（英文/默认语言） */
  name: Scalars['String']['input'];
  /** 部门名称（简体中文） */
  nameSc: Scalars['String']['input'];
  /** 部门名称（繁体中文） */
  nameTc: Scalars['String']['input'];
  /** 上级部门 ID */
  parentDepartmentId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateDocumentInput = {
  /** 文档内容 */
  content?: Scalars['String']['input'];
  /** 所属项目 ID */
  projectId?: InputMaybe<Scalars['String']['input']>;
  /** 文档标题 */
  title: Scalars['String']['input'];
};

export type CreatePositionInput = {
  /** 职位描述 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** 职位名称（英文/默认语言） */
  name: Scalars['String']['input'];
  /** 职位名称（简体中文） */
  nameSc: Scalars['String']['input'];
  /** 职位名称（繁体中文） */
  nameTc: Scalars['String']['input'];
};

export type CreateProjectInput = {
  /** 项目描述 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** 项目名称（英文/默认语言） */
  name: Scalars['String']['input'];
  /** 项目名称（简体中文） */
  nameSc: Scalars['String']['input'];
  /** 项目名称（繁体中文） */
  nameTc: Scalars['String']['input'];
  /** 项目编码，如 EC 表示电商项目，最长 20 字符 */
  projectCode: Scalars['String']['input'];
};

export type CreateSprintInput = {
  /** 结束日期 */
  endDate: Scalars['String']['input'];
  /** Sprint 目标 */
  goal?: InputMaybe<Scalars['String']['input']>;
  /** Sprint 名称（英文/默认语言） */
  name: Scalars['String']['input'];
  /** Sprint 名称（简体中文） */
  nameSc: Scalars['String']['input'];
  /** Sprint 名称（繁体中文） */
  nameTc: Scalars['String']['input'];
  /** 所属项目 ID */
  projectId: Scalars['String']['input'];
  /** 开始日期 */
  startDate: Scalars['String']['input'];
  /** Sprint 状态 */
  status?: SprintStatus;
};

export type CreateTaskInput = {
  /** 负责人用户 ID */
  assigneeId?: InputMaybe<Scalars['String']['input']>;
  /** 任务描述 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** 截止日期 */
  dueDate?: InputMaybe<Scalars['String']['input']>;
  /** 父任务 ID */
  parentTaskId?: InputMaybe<Scalars['String']['input']>;
  /** 任务优先级 */
  priority?: TaskPriority;
  /** 所属项目 ID */
  projectId: Scalars['String']['input'];
  /** 所属 Sprint ID */
  sprintId?: InputMaybe<Scalars['String']['input']>;
  /** 任务业务状态 */
  taskState?: TaskState;
  /** 任务标题 */
  title: Scalars['String']['input'];
};

export type CreateUserInput = {
  /** 所属部门 ID */
  departmentId?: InputMaybe<Scalars['String']['input']>;
  /** 用户显示名称，1-100 字符 */
  displayName: Scalars['String']['input'];
  /** 用户邮箱 */
  email: Scalars['String']['input'];
  /** 英文姓名 */
  nameEn?: InputMaybe<Scalars['String']['input']>;
  /** 中文姓名 */
  nameZh?: InputMaybe<Scalars['String']['input']>;
  /** 用户密码，最少 6 位 */
  password: Scalars['String']['input'];
  /** 所属职位 ID */
  positionId?: InputMaybe<Scalars['String']['input']>;
  /** 用户角色：super_admin / admin / member */
  role?: UserRole;
};

export type Department = {
  __typename?: 'Department';
  /** 子部门列表 */
  childDepartments?: Maybe<Array<Department>>;
  /** 创建时间 */
  createdAt: Scalars['DateTime']['output'];
  /** 部门描述 */
  description?: Maybe<Scalars['String']['output']>;
  /** 部门唯一标识 */
  id: Scalars['ID']['output'];
  /** 部门名称（英文/默认语言） */
  name: Scalars['String']['output'];
  /** 部门名称（简体中文） */
  nameSc: Scalars['String']['output'];
  /** 部门名称（繁体中文） */
  nameTc: Scalars['String']['output'];
  /** 上级部门 */
  parentDepartment?: Maybe<Department>;
  /** 上级部门 ID，支持树形结构 */
  parentDepartmentId?: Maybe<Scalars['String']['output']>;
  /** 最后更新时间 */
  updatedAt: Scalars['DateTime']['output'];
};

export type Document = {
  __typename?: 'Document';
  /** 文档内容 */
  content: Scalars['String']['output'];
  /** 创建时间 */
  createdAt: Scalars['DateTime']['output'];
  /** 创建者用户 ID */
  creatorId: Scalars['String']['output'];
  /** 文档编码，如 EC-DOC-1 */
  documentCode: Scalars['String']['output'];
  /** 文档唯一标识 */
  id: Scalars['ID']['output'];
  /** 所属项目 ID */
  projectId?: Maybe<Scalars['String']['output']>;
  /** 启用状态，true 为启用，false 为停用（软删除） */
  status: Scalars['Boolean']['output'];
  /** 文档标题 */
  title: Scalars['String']['output'];
  /** 最后更新时间 */
  updatedAt: Scalars['DateTime']['output'];
  /** 最后修改者用户 ID */
  updatedBy?: Maybe<Scalars['String']['output']>;
  /** 文档版本列表 */
  versions?: Maybe<Array<DocumentVersion>>;
};

export type DocumentVersion = {
  __typename?: 'DocumentVersion';
  /** 版本内容快照 */
  content: Scalars['String']['output'];
  /** 创建时间 */
  createdAt: Scalars['DateTime']['output'];
  /** 创建者用户 ID */
  createdBy: Scalars['String']['output'];
  /** 所属文档 ID */
  documentId: Scalars['String']['output'];
  /** 版本唯一标识 */
  id: Scalars['ID']['output'];
  /** 版本号 */
  versionNumber: Scalars['Float']['output'];
};

export type ForgotPasswordInput = {
  /** 注册邮箱 */
  email: Scalars['String']['input'];
};

export type LoginInput = {
  /** 用户邮箱 */
  email: Scalars['String']['input'];
  /** 用户密码，最少 6 位 */
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** 向项目添加成员 */
  addProjectMember: ProjectMember;
  /** 为任务添加评论 */
  addTaskComment: TaskComment;
  /** 创建新部门 */
  createDepartment: Department;
  /** 创建新文档，自动生成 documentCode */
  createDocument: Document;
  /** 创建新职位 */
  createPosition: Position;
  /** 创建新项目，创建者自动成为项目拥有者 */
  createProject: Project;
  /** 创建新 Sprint */
  createSprint: Sprint;
  /** 创建新任务 */
  createTask: Task;
  /** 创建新用户（管理员操作） */
  createUser: User;
  /** 忘记密码：发送重置令牌到注册邮箱 */
  forgotPassword: Scalars['Boolean']['output'];
  /** 用户登录，返回 accessToken、refreshToken 及用户信息 */
  login: AuthPayload;
  /** 登出：吊销当前 token */
  logout: Scalars['Boolean']['output'];
  /** 刷新令牌：使用 refreshToken 获取新的 accessToken 和 refreshToken */
  refreshToken: AuthPayload;
  /** 用户注册，返回 accessToken、refreshToken 及用户信息 */
  register: AuthPayload;
  /** 删除部门 */
  removeDepartment: Scalars['Boolean']['output'];
  /** 停用文档（软删除） */
  removeDocument: Document;
  /** 删除职位 */
  removePosition: Scalars['Boolean']['output'];
  /** 停用项目（软删除） */
  removeProject: Project;
  /** 从项目中移除成员 */
  removeProjectMember: ProjectMember;
  /** 删除 Sprint */
  removeSprint: Scalars['Boolean']['output'];
  /** 停用任务（软删除） */
  removeTask: Task;
  /** 删除任务评论 */
  removeTaskComment: Scalars['Boolean']['output'];
  /** 停用用户（软删除） */
  removeUser: User;
  /** 重置密码：使用令牌设置新密码，成功后吊销所有已签发 token */
  resetPassword: Scalars['Boolean']['output'];
  /** 更新部门信息 */
  updateDepartment: Department;
  /** 更新文档，内容变更时自动创建新版本 */
  updateDocument: Document;
  /** 更新职位信息 */
  updatePosition: Position;
  /** 更新项目信息 */
  updateProject: Project;
  /** 更新 Sprint 信息 */
  updateSprint: Sprint;
  /** 更新任务信息 */
  updateTask: Task;
  /** 更新用户信息 */
  updateUser: User;
};

export type MutationAddProjectMemberArgs = {
  input: AddProjectMemberInput;
  projectId: Scalars['ID']['input'];
};

export type MutationAddTaskCommentArgs = {
  input: CreateCommentInput;
};

export type MutationCreateDepartmentArgs = {
  input: CreateDepartmentInput;
};

export type MutationCreateDocumentArgs = {
  input: CreateDocumentInput;
};

export type MutationCreatePositionArgs = {
  input: CreatePositionInput;
};

export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};

export type MutationCreateSprintArgs = {
  input: CreateSprintInput;
};

export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationRefreshTokenArgs = {
  input: RefreshTokenInput;
};

export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type MutationRemoveDepartmentArgs = {
  id: Scalars['ID']['input'];
};

export type MutationRemoveDocumentArgs = {
  id: Scalars['ID']['input'];
};

export type MutationRemovePositionArgs = {
  id: Scalars['ID']['input'];
};

export type MutationRemoveProjectArgs = {
  id: Scalars['ID']['input'];
};

export type MutationRemoveProjectMemberArgs = {
  projectId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type MutationRemoveSprintArgs = {
  id: Scalars['ID']['input'];
};

export type MutationRemoveTaskArgs = {
  id: Scalars['ID']['input'];
};

export type MutationRemoveTaskCommentArgs = {
  id: Scalars['ID']['input'];
};

export type MutationRemoveUserArgs = {
  id: Scalars['ID']['input'];
};

export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};

export type MutationUpdateDepartmentArgs = {
  id: Scalars['ID']['input'];
  input: UpdateDepartmentInput;
};

export type MutationUpdateDocumentArgs = {
  id: Scalars['ID']['input'];
  input: UpdateDocumentInput;
};

export type MutationUpdatePositionArgs = {
  id: Scalars['ID']['input'];
  input: UpdatePositionInput;
};

export type MutationUpdateProjectArgs = {
  id: Scalars['ID']['input'];
  input: UpdateProjectInput;
};

export type MutationUpdateSprintArgs = {
  id: Scalars['ID']['input'];
  input: UpdateSprintInput;
};

export type MutationUpdateTaskArgs = {
  id: Scalars['ID']['input'];
  input: UpdateTaskInput;
};

export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
};

export type PaginatedAiUsage = {
  __typename?: 'PaginatedAiUsage';
  /** AI 用量记录列表 */
  items: Array<AiUsageRecord>;
  /** 分页元数据 */
  meta: PaginatedMetadata;
};

export type PaginatedDocuments = {
  __typename?: 'PaginatedDocuments';
  /** 文档列表 */
  items: Array<Document>;
  /** 分页元数据 */
  meta: PaginatedMetadata;
};

export type PaginatedMetadata = {
  __typename?: 'PaginatedMetadata';
  /** 是否有下一页 */
  hasMore: Scalars['Boolean']['output'];
  /** 当前页码 */
  page: Scalars['Int']['output'];
  /** 每页条数 */
  pageSize: Scalars['Int']['output'];
  /** 总条数 */
  total: Scalars['Int']['output'];
};

export type PaginatedProjects = {
  __typename?: 'PaginatedProjects';
  /** 项目列表 */
  items: Array<Project>;
  /** 分页元数据 */
  meta: PaginatedMetadata;
};

export type PaginatedTasks = {
  __typename?: 'PaginatedTasks';
  /** 任务列表 */
  items: Array<Task>;
  /** 分页元数据 */
  meta: PaginatedMetadata;
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  /** 用户列表 */
  items: Array<User>;
  /** 分页元数据 */
  meta: PaginatedMetadata;
};

export type Position = {
  __typename?: 'Position';
  /** 创建时间 */
  createdAt: Scalars['DateTime']['output'];
  /** 职位描述 */
  description?: Maybe<Scalars['String']['output']>;
  /** 职位唯一标识 */
  id: Scalars['ID']['output'];
  /** 职位名称（英文/默认语言） */
  name: Scalars['String']['output'];
  /** 职位名称（简体中文） */
  nameSc: Scalars['String']['output'];
  /** 职位名称（繁体中文） */
  nameTc: Scalars['String']['output'];
  /** 最后更新时间 */
  updatedAt: Scalars['DateTime']['output'];
};

export type Project = {
  __typename?: 'Project';
  /** 创建时间 */
  createdAt: Scalars['DateTime']['output'];
  /** 项目描述 */
  description?: Maybe<Scalars['String']['output']>;
  /** 项目唯一标识 */
  id: Scalars['ID']['output'];
  /** 项目成员列表 */
  members?: Maybe<Array<ProjectMember>>;
  /** 项目名称（英文/默认语言） */
  name: Scalars['String']['output'];
  /** 项目名称（简体中文） */
  nameSc: Scalars['String']['output'];
  /** 项目名称（繁体中文） */
  nameTc: Scalars['String']['output'];
  /** 项目创建者（拥有者）用户 ID */
  ownerId: Scalars['String']['output'];
  /** 项目编码，如 EC */
  projectCode: Scalars['String']['output'];
  /** 项目业务状态 */
  projectStatus: ProjectStatus;
  /** 启用状态，true 为启用，false 为停用（软删除） */
  status: Scalars['Boolean']['output'];
  /** 最后更新时间 */
  updatedAt: Scalars['DateTime']['output'];
};

export type ProjectMember = {
  __typename?: 'ProjectMember';
  /** 成员记录唯一标识 */
  id: Scalars['ID']['output'];
  /** 加入时间 */
  joinedAt: Scalars['DateTime']['output'];
  /** 所属项目 ID */
  projectId: Scalars['String']['output'];
  /** 成员角色 */
  role: ProjectMemberRole;
  /** 用户 ID */
  userId: Scalars['String']['output'];
};

/** 项目成员角色：owner(拥有者) / admin(管理员) / member(成员) / viewer(只读) */
export type ProjectMemberRole = 'ADMIN' | 'MEMBER' | 'OWNER' | 'VIEWER';

/** 项目业务状态：active(进行中) / archived(已归档) / completed(已完成) */
export type ProjectStatus = 'ACTIVE' | 'ARCHIVED' | 'COMPLETED';

export type Query = {
  __typename?: 'Query';
  /** 获取所有 AI 用量记录（支持分页） */
  aiUsageRecords: PaginatedAiUsage;
  /** 根据 ID 获取单个部门详情 */
  department: Department;
  /** 获取所有部门列表（含父子层级） */
  departments: Array<Department>;
  /** 根据 ID 获取单个文档详情（含版本历史） */
  document: Document;
  /** 获取指定项目的文档列表（支持分页和排序） */
  documents: PaginatedDocuments;
  /** 获取当前登录用户信息 */
  me: User;
  /** 获取当前用户的 AI 用量记录 */
  myAiUsage: PaginatedAiUsage;
  /** 获取当前登录用户参与的项目列表（支持分页） */
  myProjects: PaginatedProjects;
  /** 根据 ID 获取单个职位详情 */
  position: Position;
  /** 获取所有职位列表 */
  positions: Array<Position>;
  /** 根据 ID 获取单个项目详情 */
  project: Project;
  /** 获取指定项目的 AI 用量记录 */
  projectAiUsage: PaginatedAiUsage;
  /** 获取所有项目列表（支持分页） */
  projects: PaginatedProjects;
  /** 根据 ID 获取单个 Sprint */
  sprint: Sprint;
  /** 获取指定项目的所有 Sprint */
  sprints: Array<Sprint>;
  /** 根据 ID 获取单个任务详情 */
  task: Task;
  /** 获取指定项目的任务列表（支持分页和排序） */
  tasks: PaginatedTasks;
  /** 根据 ID 获取单个用户 */
  user: User;
  /** 获取用户列表（支持分页） */
  users: PaginatedUsers;
};

export type QueryAiUsageRecordsArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<SortOrder>;
};

export type QueryDepartmentArgs = {
  id: Scalars['ID']['input'];
};

export type QueryDocumentArgs = {
  id: Scalars['ID']['input'];
};

export type QueryDocumentsArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  projectId: Scalars['ID']['input'];
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<SortOrder>;
};

export type QueryMyAiUsageArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<SortOrder>;
};

export type QueryMyProjectsArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<SortOrder>;
};

export type QueryPositionArgs = {
  id: Scalars['ID']['input'];
};

export type QueryProjectArgs = {
  id: Scalars['ID']['input'];
};

export type QueryProjectAiUsageArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  projectId: Scalars['ID']['input'];
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<SortOrder>;
};

export type QueryProjectsArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<SortOrder>;
};

export type QuerySprintArgs = {
  id: Scalars['ID']['input'];
};

export type QuerySprintsArgs = {
  projectId: Scalars['ID']['input'];
};

export type QueryTaskArgs = {
  id: Scalars['ID']['input'];
};

export type QueryTasksArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  projectId: Scalars['ID']['input'];
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<SortOrder>;
};

export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type QueryUsersArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<SortOrder>;
};

export type RefreshTokenInput = {
  /** 刷新令牌 */
  refreshToken: Scalars['String']['input'];
};

export type RegisterInput = {
  /** 用户显示名称，1-100 字符 */
  displayName: Scalars['String']['input'];
  /** 用户邮箱 */
  email: Scalars['String']['input'];
  /** 用户密码，6-100 位 */
  password: Scalars['String']['input'];
};

export type ResetPasswordInput = {
  /** 新密码，最少 6 位 */
  newPassword: Scalars['String']['input'];
  /** 邮箱收到的重置令牌 */
  token: Scalars['String']['input'];
};

/** 排序方向：asc(升序) / desc(降序) */
export type SortOrder = 'ASC' | 'DESC';

export type Sprint = {
  __typename?: 'Sprint';
  /** 创建时间 */
  createdAt: Scalars['DateTime']['output'];
  /** 结束日期 */
  endDate: Scalars['DateTime']['output'];
  /** Sprint 目标 */
  goal?: Maybe<Scalars['String']['output']>;
  /** Sprint 唯一标识 */
  id: Scalars['ID']['output'];
  /** Sprint 名称（英文/默认语言） */
  name: Scalars['String']['output'];
  /** Sprint 名称（简体中文） */
  nameSc: Scalars['String']['output'];
  /** Sprint 名称（繁体中文） */
  nameTc: Scalars['String']['output'];
  /** 所属项目 ID */
  projectId: Scalars['String']['output'];
  /** 开始日期 */
  startDate: Scalars['DateTime']['output'];
  /** Sprint 状态 */
  status: SprintStatus;
  /** 最后更新时间 */
  updatedAt: Scalars['DateTime']['output'];
};

/** Sprint 状态：planning(规划中) / active(进行中) / completed(已完成) */
export type SprintStatus = 'ACTIVE' | 'COMPLETED' | 'PLANNING';

export type Task = {
  __typename?: 'Task';
  /** 负责人用户 ID */
  assigneeId?: Maybe<Scalars['String']['output']>;
  /** 子任务列表 */
  childTasks?: Maybe<Array<Task>>;
  /** 任务评论列表 */
  comments?: Maybe<Array<TaskComment>>;
  /** 完成时间 */
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  /** 创建时间 */
  createdAt: Scalars['DateTime']['output'];
  /** 创建者用户 ID */
  creatorId: Scalars['String']['output'];
  /** 任务描述 */
  description?: Maybe<Scalars['String']['output']>;
  /** 截止日期 */
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  /** 任务唯一标识 */
  id: Scalars['ID']['output'];
  /** 父任务 ID（支持子任务） */
  parentTaskId?: Maybe<Scalars['String']['output']>;
  /** 任务优先级 */
  priority: TaskPriority;
  /** 所属项目 ID */
  projectId: Scalars['String']['output'];
  /** 所属 Sprint ID */
  sprintId?: Maybe<Scalars['String']['output']>;
  /** 开始时间 */
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  /** 启用状态，true 为启用，false 为停用（软删除） */
  status: Scalars['Boolean']['output'];
  /** 状态变更日志 */
  statusLogs?: Maybe<Array<TaskStatusLog>>;
  /** 任务编码，如 EC-1 */
  taskCode: Scalars['String']['output'];
  /** 任务业务状态 */
  taskState: TaskState;
  /** 任务标题 */
  title: Scalars['String']['output'];
  /** 最后更新时间 */
  updatedAt: Scalars['DateTime']['output'];
};

export type TaskComment = {
  __typename?: 'TaskComment';
  /** 评论者用户 ID */
  authorId: Scalars['String']['output'];
  /** 评论内容 */
  content: Scalars['String']['output'];
  /** 创建时间 */
  createdAt: Scalars['DateTime']['output'];
  /** 评论唯一标识 */
  id: Scalars['ID']['output'];
  /** 所属任务 ID */
  taskId: Scalars['String']['output'];
  /** 最后更新时间 */
  updatedAt: Scalars['DateTime']['output'];
};

/** 任务优先级：low / medium / high / urgent */
export type TaskPriority = 'HIGH' | 'LOW' | 'MEDIUM' | 'URGENT';

/** 任务状态：todo / in_progress / in_review / done */
export type TaskState = 'DONE' | 'IN_PROGRESS' | 'IN_REVIEW' | 'TODO';

export type TaskStatusLog = {
  __typename?: 'TaskStatusLog';
  /** 变更时间 */
  changedAt: Scalars['DateTime']['output'];
  /** 变更人用户 ID */
  changedBy: Scalars['String']['output'];
  /** 变更前状态 */
  fromState?: Maybe<Scalars['String']['output']>;
  /** 日志唯一标识 */
  id: Scalars['ID']['output'];
  /** 所属任务 ID */
  taskId: Scalars['String']['output'];
  /** 变更后状态 */
  toState: Scalars['String']['output'];
};

export type UpdateDepartmentInput = {
  /** 部门描述 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** 部门名称（英文/默认语言） */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 部门名称（简体中文） */
  nameSc?: InputMaybe<Scalars['String']['input']>;
  /** 部门名称（繁体中文） */
  nameTc?: InputMaybe<Scalars['String']['input']>;
  /** 上级部门 ID */
  parentDepartmentId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDocumentInput = {
  /** 文档内容（保存即创建新版本） */
  content?: InputMaybe<Scalars['String']['input']>;
  /** 启用/停用状态（软删除） */
  status?: InputMaybe<Scalars['Boolean']['input']>;
  /** 文档标题 */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePositionInput = {
  /** 职位描述 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** 职位名称（英文/默认语言） */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 职位名称（简体中文） */
  nameSc?: InputMaybe<Scalars['String']['input']>;
  /** 职位名称（繁体中文） */
  nameTc?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProjectInput = {
  /** 项目描述 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** 项目名称（英文/默认语言） */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 项目名称（简体中文） */
  nameSc?: InputMaybe<Scalars['String']['input']>;
  /** 项目名称（繁体中文） */
  nameTc?: InputMaybe<Scalars['String']['input']>;
  /** 项目业务状态：active / archived / completed */
  projectStatus?: InputMaybe<ProjectStatus>;
  /** 启用/停用状态，true 为启用，false 为停用（软删除） */
  status?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateSprintInput = {
  /** 结束日期 */
  endDate?: InputMaybe<Scalars['String']['input']>;
  /** Sprint 目标 */
  goal?: InputMaybe<Scalars['String']['input']>;
  /** Sprint 名称（英文/默认语言） */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Sprint 名称（简体中文） */
  nameSc?: InputMaybe<Scalars['String']['input']>;
  /** Sprint 名称（繁体中文） */
  nameTc?: InputMaybe<Scalars['String']['input']>;
  /** 开始日期 */
  startDate?: InputMaybe<Scalars['String']['input']>;
  /** Sprint 状态 */
  status?: InputMaybe<SprintStatus>;
};

export type UpdateTaskInput = {
  /** 负责人用户 ID */
  assigneeId?: InputMaybe<Scalars['String']['input']>;
  /** 任务描述 */
  description?: InputMaybe<Scalars['String']['input']>;
  /** 截止日期 */
  dueDate?: InputMaybe<Scalars['String']['input']>;
  /** 父任务 ID */
  parentTaskId?: InputMaybe<Scalars['String']['input']>;
  /** 任务优先级 */
  priority?: InputMaybe<TaskPriority>;
  /** 所属 Sprint ID */
  sprintId?: InputMaybe<Scalars['String']['input']>;
  /** 启用/停用状态（软删除） */
  status?: InputMaybe<Scalars['Boolean']['input']>;
  /** 任务业务状态 */
  taskState?: InputMaybe<TaskState>;
  /** 任务标题 */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  /** 所属部门 ID */
  departmentId?: InputMaybe<Scalars['String']['input']>;
  /** 用户显示名称，最长 100 字符 */
  displayName?: InputMaybe<Scalars['String']['input']>;
  /** 英文姓名 */
  nameEn?: InputMaybe<Scalars['String']['input']>;
  /** 中文姓名 */
  nameZh?: InputMaybe<Scalars['String']['input']>;
  /** 所属职位 ID */
  positionId?: InputMaybe<Scalars['String']['input']>;
  /** 用户角色：super_admin / admin / member */
  role?: InputMaybe<UserRole>;
  /** 启用/停用状态，true 为启用，false 为停用（软删除） */
  status?: InputMaybe<Scalars['Boolean']['input']>;
};

export type User = {
  __typename?: 'User';
  /** 头像 URL */
  avatarUrl?: Maybe<Scalars['String']['output']>;
  /** 创建时间 */
  createdAt: Scalars['DateTime']['output'];
  /** 所属部门 */
  department?: Maybe<Department>;
  /** 用户显示名称 */
  displayName: Scalars['String']['output'];
  /** 用户邮箱 */
  email: Scalars['String']['output'];
  /** 用户唯一标识 */
  id: Scalars['ID']['output'];
  /** 英文姓名 */
  nameEn?: Maybe<Scalars['String']['output']>;
  /** 中文姓名 */
  nameZh?: Maybe<Scalars['String']['output']>;
  /** 所属职位 */
  position?: Maybe<Position>;
  /** 用户角色 */
  role: UserRole;
  /** 启用状态，true 为启用，false 为停用（软删除） */
  status: Scalars['Boolean']['output'];
  /** 最后更新时间 */
  updatedAt: Scalars['DateTime']['output'];
};

/** 用户角色：super_admin(超级管理员) / admin(管理员) / member(普通成员) */
export type UserRole = 'ADMIN' | 'MEMBER' | 'SUPER_ADMIN';
