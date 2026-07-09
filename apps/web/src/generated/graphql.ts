// @ts-nocheck — SuspenseQuery overloads are incompatible with Apollo Client 4
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type * as Types from './graphql-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client/react';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
const defaultOptions = {} as const;
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

export type ProjectFieldsFragment = {
  id: string;
  name: string;
  nameSc: string;
  nameTc: string;
  projectCode: string;
  description: string | null;
  status: boolean;
  projectStatus: Types.ProjectStatus;
  ownerId: string;
  createdAt: unknown;
  updatedAt: unknown;
  members: Array<{
    id: string;
    role: Types.ProjectMemberRole;
    userId: string;
    joinedAt: unknown;
  }> | null;
};

export type SprintFieldsFragment = {
  id: string;
  projectId: string;
  name: string;
  nameSc: string;
  nameTc: string;
  goal: string | null;
  status: Types.SprintStatus;
  startDate: unknown;
  endDate: unknown;
  createdAt: unknown;
  updatedAt: unknown;
};

export type TaskFieldsFragment = {
  id: string;
  projectId: string;
  sprintId: string | null;
  parentTaskId: string | null;
  taskCode: string;
  title: string;
  description: string | null;
  status: boolean;
  taskState: Types.TaskState;
  priority: Types.TaskPriority;
  creatorId: string;
  assigneeId: string | null;
  dueDate: unknown;
  startedAt: unknown;
  completedAt: unknown;
  createdAt: unknown;
  updatedAt: unknown;
  childTasks: Array<{
    id: string;
    taskCode: string;
    title: string;
    taskState: Types.TaskState;
    priority: Types.TaskPriority;
  }> | null;
  comments: Array<{ id: string; content: string; authorId: string; createdAt: unknown }> | null;
};

export type UserFieldsFragment = {
  id: string;
  email: string;
  nameEn: string | null;
  nameZh: string | null;
  displayName: string;
  role: Types.UserRole;
  avatarUrl: string | null;
  status: boolean;
  createdAt: unknown;
  updatedAt: unknown;
  department: { id: string; name: string } | null;
  position: { id: string; name: string } | null;
};

export type AiUsageRecordsQueryVariables = Exact<{
  page?: number | null | undefined;
  pageSize?: number | null | undefined;
  sortBy?: string | null | undefined;
  sortOrder?: Types.SortOrder | null | undefined;
}>;

export type AiUsageRecordsQuery = {
  aiUsageRecords: {
    items: Array<{
      id: string;
      userId: string;
      projectId: string | null;
      taskId: string | null;
      provider: string;
      modelName: string;
      requestType: string;
      promptTokens: number;
      completionTokens: number;
      requestDurationMs: number | null;
      estimatedCost: number;
      createdAt: unknown;
    }>;
    meta: { page: number; total: number; hasMore: boolean; pageSize: number };
  };
};

export type MyAiUsageQueryVariables = Exact<{
  page?: number | null | undefined;
  pageSize?: number | null | undefined;
  sortBy?: string | null | undefined;
  sortOrder?: Types.SortOrder | null | undefined;
}>;

export type MyAiUsageQuery = {
  myAiUsage: {
    items: Array<{
      id: string;
      userId: string;
      projectId: string | null;
      taskId: string | null;
      provider: string;
      modelName: string;
      requestType: string;
      promptTokens: number;
      completionTokens: number;
      requestDurationMs: number | null;
      estimatedCost: number;
      createdAt: unknown;
    }>;
    meta: { page: number; total: number; hasMore: boolean; pageSize: number };
  };
};

export type ProjectAiUsageQueryVariables = Exact<{
  projectId: string | number;
  page?: number | null | undefined;
  pageSize?: number | null | undefined;
  sortBy?: string | null | undefined;
  sortOrder?: Types.SortOrder | null | undefined;
}>;

export type ProjectAiUsageQuery = {
  projectAiUsage: {
    items: Array<{
      id: string;
      userId: string;
      projectId: string | null;
      taskId: string | null;
      provider: string;
      modelName: string;
      requestType: string;
      promptTokens: number;
      completionTokens: number;
      requestDurationMs: number | null;
      estimatedCost: number;
      createdAt: unknown;
    }>;
    meta: { page: number; total: number; hasMore: boolean; pageSize: number };
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  me: {
    id: string;
    email: string;
    nameEn: string | null;
    nameZh: string | null;
    displayName: string;
    role: Types.UserRole;
    avatarUrl: string | null;
    status: boolean;
    createdAt: unknown;
    updatedAt: unknown;
    department: { id: string; name: string } | null;
    position: { id: string; name: string } | null;
  };
};

export type LoginMutationVariables = Exact<{
  input: Types.LoginInput;
}>;

export type LoginMutation = {
  login: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      email: string;
      nameEn: string | null;
      nameZh: string | null;
      displayName: string;
      role: Types.UserRole;
      avatarUrl: string | null;
      status: boolean;
      createdAt: unknown;
      updatedAt: unknown;
      department: { id: string; name: string } | null;
      position: { id: string; name: string } | null;
    };
  };
};

export type RegisterMutationVariables = Exact<{
  input: Types.RegisterInput;
}>;

export type RegisterMutation = {
  register: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      email: string;
      nameEn: string | null;
      nameZh: string | null;
      displayName: string;
      role: Types.UserRole;
      avatarUrl: string | null;
      status: boolean;
      createdAt: unknown;
      updatedAt: unknown;
      department: { id: string; name: string } | null;
      position: { id: string; name: string } | null;
    };
  };
};

export type RefreshTokenMutationVariables = Exact<{
  input: Types.RefreshTokenInput;
}>;

export type RefreshTokenMutation = {
  refreshToken: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      email: string;
      nameEn: string | null;
      nameZh: string | null;
      displayName: string;
      role: Types.UserRole;
      avatarUrl: string | null;
      status: boolean;
      createdAt: unknown;
      updatedAt: unknown;
      department: { id: string; name: string } | null;
      position: { id: string; name: string } | null;
    };
  };
};

export type ForgotPasswordMutationVariables = Exact<{
  input: Types.ForgotPasswordInput;
}>;

export type ForgotPasswordMutation = { forgotPassword: boolean };

export type ResetPasswordMutationVariables = Exact<{
  input: Types.ResetPasswordInput;
}>;

export type ResetPasswordMutation = { resetPassword: boolean };

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { logout: boolean };

export type DepartmentsQueryVariables = Exact<{ [key: string]: never }>;

export type DepartmentsQuery = {
  departments: Array<{
    id: string;
    name: string;
    nameSc: string;
    nameTc: string;
    description: string | null;
    parentDepartmentId: string | null;
    createdAt: unknown;
    updatedAt: unknown;
    childDepartments: Array<{ id: string; name: string; nameSc: string; nameTc: string }> | null;
  }>;
};

export type DepartmentQueryVariables = Exact<{
  id: string | number;
}>;

export type DepartmentQuery = {
  department: {
    id: string;
    name: string;
    nameSc: string;
    nameTc: string;
    description: string | null;
    parentDepartmentId: string | null;
    createdAt: unknown;
    updatedAt: unknown;
    parentDepartment: { id: string; name: string } | null;
    childDepartments: Array<{ id: string; name: string; nameSc: string; nameTc: string }> | null;
  };
};

export type CreateDepartmentMutationVariables = Exact<{
  input: Types.CreateDepartmentInput;
}>;

export type CreateDepartmentMutation = {
  createDepartment: {
    id: string;
    name: string;
    nameSc: string;
    nameTc: string;
    description: string | null;
    parentDepartmentId: string | null;
  };
};

export type UpdateDepartmentMutationVariables = Exact<{
  id: string | number;
  input: Types.UpdateDepartmentInput;
}>;

export type UpdateDepartmentMutation = {
  updateDepartment: {
    id: string;
    name: string;
    nameSc: string;
    nameTc: string;
    description: string | null;
    parentDepartmentId: string | null;
  };
};

export type RemoveDepartmentMutationVariables = Exact<{
  id: string | number;
}>;

export type RemoveDepartmentMutation = { removeDepartment: boolean };

export type DocumentsQueryVariables = Exact<{
  projectId: string | number;
  page?: number | null | undefined;
  pageSize?: number | null | undefined;
  sortBy?: string | null | undefined;
  sortOrder?: Types.SortOrder | null | undefined;
}>;

export type DocumentsQuery = {
  documents: {
    items: Array<{
      id: string;
      title: string;
      documentCode: string;
      creatorId: string;
      projectId: string | null;
      status: boolean;
      createdAt: unknown;
      updatedAt: unknown;
    }>;
    meta: { page: number; total: number; hasMore: boolean; pageSize: number };
  };
};

export type DocumentQueryVariables = Exact<{
  id: string | number;
}>;

export type DocumentQuery = {
  document: {
    id: string;
    title: string;
    documentCode: string;
    content: string;
    creatorId: string;
    projectId: string | null;
    status: boolean;
    createdAt: unknown;
    updatedAt: unknown;
    updatedBy: string | null;
    versions: Array<{
      id: string;
      versionNumber: number;
      createdAt: unknown;
      createdBy: string;
    }> | null;
  };
};

export type CreateDocumentMutationVariables = Exact<{
  input: Types.CreateDocumentInput;
}>;

export type CreateDocumentMutation = {
  createDocument: {
    id: string;
    title: string;
    documentCode: string;
    content: string;
    status: boolean;
    createdAt: unknown;
  };
};

export type UpdateDocumentMutationVariables = Exact<{
  id: string | number;
  input: Types.UpdateDocumentInput;
}>;

export type UpdateDocumentMutation = {
  updateDocument: {
    id: string;
    title: string;
    documentCode: string;
    content: string;
    status: boolean;
    updatedAt: unknown;
  };
};

export type RemoveDocumentMutationVariables = Exact<{
  id: string | number;
}>;

export type RemoveDocumentMutation = {
  removeDocument: { id: string; title: string; documentCode: string };
};

export type PositionsQueryVariables = Exact<{ [key: string]: never }>;

export type PositionsQuery = {
  positions: Array<{
    id: string;
    name: string;
    nameSc: string;
    nameTc: string;
    description: string | null;
    createdAt: unknown;
    updatedAt: unknown;
  }>;
};

export type PositionQueryVariables = Exact<{
  id: string | number;
}>;

export type PositionQuery = {
  position: {
    id: string;
    name: string;
    nameSc: string;
    nameTc: string;
    description: string | null;
    createdAt: unknown;
    updatedAt: unknown;
  };
};

export type CreatePositionMutationVariables = Exact<{
  input: Types.CreatePositionInput;
}>;

export type CreatePositionMutation = {
  createPosition: {
    id: string;
    name: string;
    nameSc: string;
    nameTc: string;
    description: string | null;
  };
};

export type UpdatePositionMutationVariables = Exact<{
  id: string | number;
  input: Types.UpdatePositionInput;
}>;

export type UpdatePositionMutation = {
  updatePosition: {
    id: string;
    name: string;
    nameSc: string;
    nameTc: string;
    description: string | null;
  };
};

export type RemovePositionMutationVariables = Exact<{
  id: string | number;
}>;

export type RemovePositionMutation = { removePosition: boolean };

export type ProjectsQueryVariables = Exact<{
  page?: number | null | undefined;
  pageSize?: number | null | undefined;
  sortBy?: string | null | undefined;
  sortOrder?: Types.SortOrder | null | undefined;
}>;

export type ProjectsQuery = {
  projects: {
    items: Array<{
      id: string;
      name: string;
      nameSc: string;
      nameTc: string;
      projectCode: string;
      description: string | null;
      status: boolean;
      projectStatus: Types.ProjectStatus;
      ownerId: string;
      createdAt: unknown;
      updatedAt: unknown;
      members: Array<{
        id: string;
        role: Types.ProjectMemberRole;
        userId: string;
        joinedAt: unknown;
      }> | null;
    }>;
    meta: { page: number; total: number; hasMore: boolean; pageSize: number };
  };
};

export type ProjectQueryVariables = Exact<{
  id: string | number;
}>;

export type ProjectQuery = {
  project: {
    id: string;
    name: string;
    nameSc: string;
    nameTc: string;
    projectCode: string;
    description: string | null;
    status: boolean;
    projectStatus: Types.ProjectStatus;
    ownerId: string;
    createdAt: unknown;
    updatedAt: unknown;
    members: Array<{
      id: string;
      role: Types.ProjectMemberRole;
      userId: string;
      joinedAt: unknown;
    }> | null;
  };
};

export type MyProjectsQueryVariables = Exact<{
  page?: number | null | undefined;
  pageSize?: number | null | undefined;
  sortBy?: string | null | undefined;
  sortOrder?: Types.SortOrder | null | undefined;
}>;

export type MyProjectsQuery = {
  myProjects: {
    items: Array<{
      id: string;
      name: string;
      nameSc: string;
      nameTc: string;
      projectCode: string;
      description: string | null;
      status: boolean;
      projectStatus: Types.ProjectStatus;
      ownerId: string;
      createdAt: unknown;
      updatedAt: unknown;
      members: Array<{
        id: string;
        role: Types.ProjectMemberRole;
        userId: string;
        joinedAt: unknown;
      }> | null;
    }>;
    meta: { page: number; total: number; hasMore: boolean; pageSize: number };
  };
};

export type CreateProjectMutationVariables = Exact<{
  input: Types.CreateProjectInput;
}>;

export type CreateProjectMutation = {
  createProject: {
    id: string;
    name: string;
    nameSc: string;
    nameTc: string;
    projectCode: string;
    description: string | null;
    status: boolean;
    projectStatus: Types.ProjectStatus;
    ownerId: string;
    createdAt: unknown;
    updatedAt: unknown;
    members: Array<{
      id: string;
      role: Types.ProjectMemberRole;
      userId: string;
      joinedAt: unknown;
    }> | null;
  };
};

export type UpdateProjectMutationVariables = Exact<{
  id: string | number;
  input: Types.UpdateProjectInput;
}>;

export type UpdateProjectMutation = {
  updateProject: {
    id: string;
    name: string;
    nameSc: string;
    nameTc: string;
    projectCode: string;
    description: string | null;
    status: boolean;
    projectStatus: Types.ProjectStatus;
    ownerId: string;
    createdAt: unknown;
    updatedAt: unknown;
    members: Array<{
      id: string;
      role: Types.ProjectMemberRole;
      userId: string;
      joinedAt: unknown;
    }> | null;
  };
};

export type RemoveProjectMutationVariables = Exact<{
  id: string | number;
}>;

export type RemoveProjectMutation = {
  removeProject: {
    id: string;
    name: string;
    nameSc: string;
    nameTc: string;
    projectCode: string;
    description: string | null;
    status: boolean;
    projectStatus: Types.ProjectStatus;
    ownerId: string;
    createdAt: unknown;
    updatedAt: unknown;
    members: Array<{
      id: string;
      role: Types.ProjectMemberRole;
      userId: string;
      joinedAt: unknown;
    }> | null;
  };
};

export type AddProjectMemberMutationVariables = Exact<{
  projectId: string | number;
  input: Types.AddProjectMemberInput;
}>;

export type AddProjectMemberMutation = {
  addProjectMember: {
    id: string;
    role: Types.ProjectMemberRole;
    userId: string;
    joinedAt: unknown;
  };
};

export type RemoveProjectMemberMutationVariables = Exact<{
  projectId: string | number;
  userId: string | number;
}>;

export type RemoveProjectMemberMutation = {
  removeProjectMember: {
    id: string;
    role: Types.ProjectMemberRole;
    userId: string;
    joinedAt: unknown;
  };
};

export type SprintsQueryVariables = Exact<{
  projectId: string | number;
}>;

export type SprintsQuery = {
  sprints: Array<{
    id: string;
    projectId: string;
    name: string;
    nameSc: string;
    nameTc: string;
    goal: string | null;
    status: Types.SprintStatus;
    startDate: unknown;
    endDate: unknown;
    createdAt: unknown;
    updatedAt: unknown;
  }>;
};

export type SprintQueryVariables = Exact<{
  id: string | number;
}>;

export type SprintQuery = {
  sprint: {
    id: string;
    projectId: string;
    name: string;
    nameSc: string;
    nameTc: string;
    goal: string | null;
    status: Types.SprintStatus;
    startDate: unknown;
    endDate: unknown;
    createdAt: unknown;
    updatedAt: unknown;
  };
};

export type CreateSprintMutationVariables = Exact<{
  input: Types.CreateSprintInput;
}>;

export type CreateSprintMutation = {
  createSprint: {
    id: string;
    projectId: string;
    name: string;
    nameSc: string;
    nameTc: string;
    goal: string | null;
    status: Types.SprintStatus;
    startDate: unknown;
    endDate: unknown;
    createdAt: unknown;
    updatedAt: unknown;
  };
};

export type UpdateSprintMutationVariables = Exact<{
  id: string | number;
  input: Types.UpdateSprintInput;
}>;

export type UpdateSprintMutation = {
  updateSprint: {
    id: string;
    projectId: string;
    name: string;
    nameSc: string;
    nameTc: string;
    goal: string | null;
    status: Types.SprintStatus;
    startDate: unknown;
    endDate: unknown;
    createdAt: unknown;
    updatedAt: unknown;
  };
};

export type RemoveSprintMutationVariables = Exact<{
  id: string | number;
}>;

export type RemoveSprintMutation = { removeSprint: boolean };

export type TasksQueryVariables = Exact<{
  projectId: string | number;
  page?: number | null | undefined;
  pageSize?: number | null | undefined;
  sortBy?: string | null | undefined;
  sortOrder?: Types.SortOrder | null | undefined;
}>;

export type TasksQuery = {
  tasks: {
    items: Array<{
      id: string;
      projectId: string;
      sprintId: string | null;
      parentTaskId: string | null;
      taskCode: string;
      title: string;
      description: string | null;
      status: boolean;
      taskState: Types.TaskState;
      priority: Types.TaskPriority;
      creatorId: string;
      assigneeId: string | null;
      dueDate: unknown;
      startedAt: unknown;
      completedAt: unknown;
      createdAt: unknown;
      updatedAt: unknown;
      childTasks: Array<{
        id: string;
        taskCode: string;
        title: string;
        taskState: Types.TaskState;
        priority: Types.TaskPriority;
      }> | null;
      comments: Array<{ id: string; content: string; authorId: string; createdAt: unknown }> | null;
    }>;
    meta: { page: number; total: number; hasMore: boolean; pageSize: number };
  };
};

export type TaskQueryVariables = Exact<{
  id: string | number;
}>;

export type TaskQuery = {
  task: {
    id: string;
    projectId: string;
    sprintId: string | null;
    parentTaskId: string | null;
    taskCode: string;
    title: string;
    description: string | null;
    status: boolean;
    taskState: Types.TaskState;
    priority: Types.TaskPriority;
    creatorId: string;
    assigneeId: string | null;
    dueDate: unknown;
    startedAt: unknown;
    completedAt: unknown;
    createdAt: unknown;
    updatedAt: unknown;
    childTasks: Array<{
      id: string;
      taskCode: string;
      title: string;
      taskState: Types.TaskState;
      priority: Types.TaskPriority;
    }> | null;
    comments: Array<{ id: string; content: string; authorId: string; createdAt: unknown }> | null;
  };
};

export type CreateTaskMutationVariables = Exact<{
  input: Types.CreateTaskInput;
}>;

export type CreateTaskMutation = {
  createTask: {
    id: string;
    projectId: string;
    sprintId: string | null;
    parentTaskId: string | null;
    taskCode: string;
    title: string;
    description: string | null;
    status: boolean;
    taskState: Types.TaskState;
    priority: Types.TaskPriority;
    creatorId: string;
    assigneeId: string | null;
    dueDate: unknown;
    startedAt: unknown;
    completedAt: unknown;
    createdAt: unknown;
    updatedAt: unknown;
    childTasks: Array<{
      id: string;
      taskCode: string;
      title: string;
      taskState: Types.TaskState;
      priority: Types.TaskPriority;
    }> | null;
    comments: Array<{ id: string; content: string; authorId: string; createdAt: unknown }> | null;
  };
};

export type UpdateTaskMutationVariables = Exact<{
  id: string | number;
  input: Types.UpdateTaskInput;
}>;

export type UpdateTaskMutation = {
  updateTask: {
    id: string;
    projectId: string;
    sprintId: string | null;
    parentTaskId: string | null;
    taskCode: string;
    title: string;
    description: string | null;
    status: boolean;
    taskState: Types.TaskState;
    priority: Types.TaskPriority;
    creatorId: string;
    assigneeId: string | null;
    dueDate: unknown;
    startedAt: unknown;
    completedAt: unknown;
    createdAt: unknown;
    updatedAt: unknown;
    childTasks: Array<{
      id: string;
      taskCode: string;
      title: string;
      taskState: Types.TaskState;
      priority: Types.TaskPriority;
    }> | null;
    comments: Array<{ id: string; content: string; authorId: string; createdAt: unknown }> | null;
  };
};

export type RemoveTaskMutationVariables = Exact<{
  id: string | number;
}>;

export type RemoveTaskMutation = {
  removeTask: {
    id: string;
    projectId: string;
    sprintId: string | null;
    parentTaskId: string | null;
    taskCode: string;
    title: string;
    description: string | null;
    status: boolean;
    taskState: Types.TaskState;
    priority: Types.TaskPriority;
    creatorId: string;
    assigneeId: string | null;
    dueDate: unknown;
    startedAt: unknown;
    completedAt: unknown;
    createdAt: unknown;
    updatedAt: unknown;
    childTasks: Array<{
      id: string;
      taskCode: string;
      title: string;
      taskState: Types.TaskState;
      priority: Types.TaskPriority;
    }> | null;
    comments: Array<{ id: string; content: string; authorId: string; createdAt: unknown }> | null;
  };
};

export type AddTaskCommentMutationVariables = Exact<{
  input: Types.CreateCommentInput;
}>;

export type AddTaskCommentMutation = {
  addTaskComment: { id: string; content: string; authorId: string; createdAt: unknown };
};

export type RemoveTaskCommentMutationVariables = Exact<{
  id: string | number;
}>;

export type RemoveTaskCommentMutation = { removeTaskComment: boolean };

export type UsersQueryVariables = Exact<{
  page?: number | null | undefined;
  pageSize?: number | null | undefined;
  sortBy?: string | null | undefined;
  sortOrder?: Types.SortOrder | null | undefined;
}>;

export type UsersQuery = {
  users: {
    items: Array<{
      id: string;
      email: string;
      nameEn: string | null;
      nameZh: string | null;
      displayName: string;
      role: Types.UserRole;
      avatarUrl: string | null;
      status: boolean;
      createdAt: unknown;
      updatedAt: unknown;
      department: { id: string; name: string } | null;
      position: { id: string; name: string } | null;
    }>;
    meta: { page: number; total: number; hasMore: boolean; pageSize: number };
  };
};

export type UserQueryVariables = Exact<{
  id: string | number;
}>;

export type UserQuery = {
  user: {
    id: string;
    email: string;
    nameEn: string | null;
    nameZh: string | null;
    displayName: string;
    role: Types.UserRole;
    avatarUrl: string | null;
    status: boolean;
    createdAt: unknown;
    updatedAt: unknown;
    department: { id: string; name: string } | null;
    position: { id: string; name: string } | null;
  };
};

export const ProjectFieldsFragmentDoc = gql`
  fragment ProjectFields on Project {
    id
    name
    nameSc
    nameTc
    projectCode
    description
    status
    projectStatus
    ownerId
    createdAt
    updatedAt
    members {
      id
      role
      userId
      joinedAt
    }
  }
`;
export const SprintFieldsFragmentDoc = gql`
  fragment SprintFields on Sprint {
    id
    projectId
    name
    nameSc
    nameTc
    goal
    status
    startDate
    endDate
    createdAt
    updatedAt
  }
`;
export const TaskFieldsFragmentDoc = gql`
  fragment TaskFields on Task {
    id
    projectId
    sprintId
    parentTaskId
    taskCode
    title
    description
    status
    taskState
    priority
    creatorId
    assigneeId
    dueDate
    startedAt
    completedAt
    createdAt
    updatedAt
    childTasks {
      id
      taskCode
      title
      taskState
      priority
    }
    comments {
      id
      content
      authorId
      createdAt
    }
  }
`;
export const UserFieldsFragmentDoc = gql`
  fragment UserFields on User {
    id
    email
    nameEn
    nameZh
    displayName
    role
    avatarUrl
    status
    department {
      id
      name
    }
    position {
      id
      name
    }
    createdAt
    updatedAt
  }
`;
export const AiUsageRecordsDocument = gql`
  query AiUsageRecords($page: Int, $pageSize: Int, $sortBy: String, $sortOrder: SortOrder) {
    aiUsageRecords(page: $page, pageSize: $pageSize, sortBy: $sortBy, sortOrder: $sortOrder) {
      items {
        id
        userId
        projectId
        taskId
        provider
        modelName
        requestType
        promptTokens
        completionTokens
        requestDurationMs
        estimatedCost
        createdAt
      }
      meta {
        page
        total
        hasMore
        pageSize
      }
    }
  }
`;

/**
 * __useAiUsageRecordsQuery__
 *
 * To run a query within a React component, call `useAiUsageRecordsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAiUsageRecordsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAiUsageRecordsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      sortBy: // value for 'sortBy'
 *      sortOrder: // value for 'sortOrder'
 *   },
 * });
 */
export function useAiUsageRecordsQuery(
  baseOptions?: Apollo.QueryHookOptions<AiUsageRecordsQuery, AiUsageRecordsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AiUsageRecordsQuery, AiUsageRecordsQueryVariables>(
    AiUsageRecordsDocument,
    options,
  );
}
export function useAiUsageRecordsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AiUsageRecordsQuery, AiUsageRecordsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AiUsageRecordsQuery, AiUsageRecordsQueryVariables>(
    AiUsageRecordsDocument,
    options,
  );
}
// @ts-ignore
export function useAiUsageRecordsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<AiUsageRecordsQuery, AiUsageRecordsQueryVariables>,
): Apollo.UseSuspenseQueryResult<AiUsageRecordsQuery, AiUsageRecordsQueryVariables>;
export function useAiUsageRecordsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<AiUsageRecordsQuery, AiUsageRecordsQueryVariables>,
): Apollo.UseSuspenseQueryResult<AiUsageRecordsQuery | undefined, AiUsageRecordsQueryVariables>;
export function useAiUsageRecordsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<AiUsageRecordsQuery, AiUsageRecordsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<AiUsageRecordsQuery, AiUsageRecordsQueryVariables>(
    AiUsageRecordsDocument,
    options,
  );
}
export type AiUsageRecordsQueryHookResult = ReturnType<typeof useAiUsageRecordsQuery>;
export type AiUsageRecordsLazyQueryHookResult = ReturnType<typeof useAiUsageRecordsLazyQuery>;
export type AiUsageRecordsSuspenseQueryHookResult = ReturnType<
  typeof useAiUsageRecordsSuspenseQuery
>;
export type AiUsageRecordsQueryResult = Apollo.QueryResult<
  AiUsageRecordsQuery,
  AiUsageRecordsQueryVariables
>;
export const MyAiUsageDocument = gql`
  query MyAiUsage($page: Int, $pageSize: Int, $sortBy: String, $sortOrder: SortOrder) {
    myAiUsage(page: $page, pageSize: $pageSize, sortBy: $sortBy, sortOrder: $sortOrder) {
      items {
        id
        userId
        projectId
        taskId
        provider
        modelName
        requestType
        promptTokens
        completionTokens
        requestDurationMs
        estimatedCost
        createdAt
      }
      meta {
        page
        total
        hasMore
        pageSize
      }
    }
  }
`;

/**
 * __useMyAiUsageQuery__
 *
 * To run a query within a React component, call `useMyAiUsageQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyAiUsageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyAiUsageQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      sortBy: // value for 'sortBy'
 *      sortOrder: // value for 'sortOrder'
 *   },
 * });
 */
export function useMyAiUsageQuery(
  baseOptions?: Apollo.QueryHookOptions<MyAiUsageQuery, MyAiUsageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MyAiUsageQuery, MyAiUsageQueryVariables>(MyAiUsageDocument, options);
}
export function useMyAiUsageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MyAiUsageQuery, MyAiUsageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MyAiUsageQuery, MyAiUsageQueryVariables>(MyAiUsageDocument, options);
}
// @ts-ignore
export function useMyAiUsageSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<MyAiUsageQuery, MyAiUsageQueryVariables>,
): Apollo.UseSuspenseQueryResult<MyAiUsageQuery, MyAiUsageQueryVariables>;
export function useMyAiUsageSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyAiUsageQuery, MyAiUsageQueryVariables>,
): Apollo.UseSuspenseQueryResult<MyAiUsageQuery | undefined, MyAiUsageQueryVariables>;
export function useMyAiUsageSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyAiUsageQuery, MyAiUsageQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<MyAiUsageQuery, MyAiUsageQueryVariables>(
    MyAiUsageDocument,
    options,
  );
}
export type MyAiUsageQueryHookResult = ReturnType<typeof useMyAiUsageQuery>;
export type MyAiUsageLazyQueryHookResult = ReturnType<typeof useMyAiUsageLazyQuery>;
export type MyAiUsageSuspenseQueryHookResult = ReturnType<typeof useMyAiUsageSuspenseQuery>;
export type MyAiUsageQueryResult = Apollo.QueryResult<MyAiUsageQuery, MyAiUsageQueryVariables>;
export const ProjectAiUsageDocument = gql`
  query ProjectAiUsage(
    $projectId: ID!
    $page: Int
    $pageSize: Int
    $sortBy: String
    $sortOrder: SortOrder
  ) {
    projectAiUsage(
      projectId: $projectId
      page: $page
      pageSize: $pageSize
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      items {
        id
        userId
        projectId
        taskId
        provider
        modelName
        requestType
        promptTokens
        completionTokens
        requestDurationMs
        estimatedCost
        createdAt
      }
      meta {
        page
        total
        hasMore
        pageSize
      }
    }
  }
`;

/**
 * __useProjectAiUsageQuery__
 *
 * To run a query within a React component, call `useProjectAiUsageQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectAiUsageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectAiUsageQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      sortBy: // value for 'sortBy'
 *      sortOrder: // value for 'sortOrder'
 *   },
 * });
 */
export function useProjectAiUsageQuery(
  baseOptions: Apollo.QueryHookOptions<ProjectAiUsageQuery, ProjectAiUsageQueryVariables> &
    ({ variables: ProjectAiUsageQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProjectAiUsageQuery, ProjectAiUsageQueryVariables>(
    ProjectAiUsageDocument,
    options,
  );
}
export function useProjectAiUsageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProjectAiUsageQuery, ProjectAiUsageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProjectAiUsageQuery, ProjectAiUsageQueryVariables>(
    ProjectAiUsageDocument,
    options,
  );
}
// @ts-ignore
export function useProjectAiUsageSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectAiUsageQuery, ProjectAiUsageQueryVariables>,
): Apollo.UseSuspenseQueryResult<ProjectAiUsageQuery, ProjectAiUsageQueryVariables>;
export function useProjectAiUsageSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<ProjectAiUsageQuery, ProjectAiUsageQueryVariables>,
): Apollo.UseSuspenseQueryResult<ProjectAiUsageQuery | undefined, ProjectAiUsageQueryVariables>;
export function useProjectAiUsageSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<ProjectAiUsageQuery, ProjectAiUsageQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ProjectAiUsageQuery, ProjectAiUsageQueryVariables>(
    ProjectAiUsageDocument,
    options,
  );
}
export type ProjectAiUsageQueryHookResult = ReturnType<typeof useProjectAiUsageQuery>;
export type ProjectAiUsageLazyQueryHookResult = ReturnType<typeof useProjectAiUsageLazyQuery>;
export type ProjectAiUsageSuspenseQueryHookResult = ReturnType<
  typeof useProjectAiUsageSuspenseQuery
>;
export type ProjectAiUsageQueryResult = Apollo.QueryResult<
  ProjectAiUsageQuery,
  ProjectAiUsageQueryVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
// @ts-ignore
export function useMeSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>,
): Apollo.UseSuspenseQueryResult<MeQuery, MeQueryVariables>;
export function useMeSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>,
): Apollo.UseSuspenseQueryResult<MeQuery | undefined, MeQueryVariables>;
export function useMeSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const LoginDocument = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      refreshToken
      user {
        ...UserFields
      }
    }
  }
  ${UserFieldsFragmentDoc}
`;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export const RegisterDocument = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      accessToken
      refreshToken
      user {
        ...UserFields
      }
    }
  }
  ${UserFieldsFragmentDoc}
`;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export const RefreshTokenDocument = gql`
  mutation RefreshToken($input: RefreshTokenInput!) {
    refreshToken(input: $input) {
      accessToken
      refreshToken
      user {
        ...UserFields
      }
    }
  }
  ${UserFieldsFragmentDoc}
`;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRefreshTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(
    RefreshTokenDocument,
    options,
  );
}
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($input: ForgotPasswordInput!) {
    forgotPassword(input: $input)
  }
`;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useForgotPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(
    ForgotPasswordDocument,
    options,
  );
}
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export const ResetPasswordDocument = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input)
  }
`;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(
    ResetPasswordDocument,
    options,
  );
}
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export const DepartmentsDocument = gql`
  query Departments {
    departments {
      id
      name
      nameSc
      nameTc
      description
      parentDepartmentId
      childDepartments {
        id
        name
        nameSc
        nameTc
      }
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useDepartmentsQuery__
 *
 * To run a query within a React component, call `useDepartmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDepartmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDepartmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDepartmentsQuery(
  baseOptions?: Apollo.QueryHookOptions<DepartmentsQuery, DepartmentsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DepartmentsQuery, DepartmentsQueryVariables>(DepartmentsDocument, options);
}
export function useDepartmentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DepartmentsQuery, DepartmentsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DepartmentsQuery, DepartmentsQueryVariables>(
    DepartmentsDocument,
    options,
  );
}
// @ts-ignore
export function useDepartmentsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<DepartmentsQuery, DepartmentsQueryVariables>,
): Apollo.UseSuspenseQueryResult<DepartmentsQuery, DepartmentsQueryVariables>;
export function useDepartmentsSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DepartmentsQuery, DepartmentsQueryVariables>,
): Apollo.UseSuspenseQueryResult<DepartmentsQuery | undefined, DepartmentsQueryVariables>;
export function useDepartmentsSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DepartmentsQuery, DepartmentsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<DepartmentsQuery, DepartmentsQueryVariables>(
    DepartmentsDocument,
    options,
  );
}
export type DepartmentsQueryHookResult = ReturnType<typeof useDepartmentsQuery>;
export type DepartmentsLazyQueryHookResult = ReturnType<typeof useDepartmentsLazyQuery>;
export type DepartmentsSuspenseQueryHookResult = ReturnType<typeof useDepartmentsSuspenseQuery>;
export type DepartmentsQueryResult = Apollo.QueryResult<
  DepartmentsQuery,
  DepartmentsQueryVariables
>;
export const DepartmentDocument = gql`
  query Department($id: ID!) {
    department(id: $id) {
      id
      name
      nameSc
      nameTc
      description
      parentDepartmentId
      parentDepartment {
        id
        name
      }
      childDepartments {
        id
        name
        nameSc
        nameTc
      }
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useDepartmentQuery__
 *
 * To run a query within a React component, call `useDepartmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useDepartmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDepartmentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDepartmentQuery(
  baseOptions: Apollo.QueryHookOptions<DepartmentQuery, DepartmentQueryVariables> &
    ({ variables: DepartmentQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DepartmentQuery, DepartmentQueryVariables>(DepartmentDocument, options);
}
export function useDepartmentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DepartmentQuery, DepartmentQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DepartmentQuery, DepartmentQueryVariables>(
    DepartmentDocument,
    options,
  );
}
// @ts-ignore
export function useDepartmentSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<DepartmentQuery, DepartmentQueryVariables>,
): Apollo.UseSuspenseQueryResult<DepartmentQuery, DepartmentQueryVariables>;
export function useDepartmentSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DepartmentQuery, DepartmentQueryVariables>,
): Apollo.UseSuspenseQueryResult<DepartmentQuery | undefined, DepartmentQueryVariables>;
export function useDepartmentSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DepartmentQuery, DepartmentQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<DepartmentQuery, DepartmentQueryVariables>(
    DepartmentDocument,
    options,
  );
}
export type DepartmentQueryHookResult = ReturnType<typeof useDepartmentQuery>;
export type DepartmentLazyQueryHookResult = ReturnType<typeof useDepartmentLazyQuery>;
export type DepartmentSuspenseQueryHookResult = ReturnType<typeof useDepartmentSuspenseQuery>;
export type DepartmentQueryResult = Apollo.QueryResult<DepartmentQuery, DepartmentQueryVariables>;
export const CreateDepartmentDocument = gql`
  mutation CreateDepartment($input: CreateDepartmentInput!) {
    createDepartment(input: $input) {
      id
      name
      nameSc
      nameTc
      description
      parentDepartmentId
    }
  }
`;

/**
 * __useCreateDepartmentMutation__
 *
 * To run a mutation, you first call `useCreateDepartmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDepartmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDepartmentMutation, { data, loading, error }] = useCreateDepartmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDepartmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateDepartmentMutation,
    CreateDepartmentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateDepartmentMutation, CreateDepartmentMutationVariables>(
    CreateDepartmentDocument,
    options,
  );
}
export type CreateDepartmentMutationHookResult = ReturnType<typeof useCreateDepartmentMutation>;
export type CreateDepartmentMutationResult = Apollo.MutationResult<CreateDepartmentMutation>;
export const UpdateDepartmentDocument = gql`
  mutation UpdateDepartment($id: ID!, $input: UpdateDepartmentInput!) {
    updateDepartment(id: $id, input: $input) {
      id
      name
      nameSc
      nameTc
      description
      parentDepartmentId
    }
  }
`;

/**
 * __useUpdateDepartmentMutation__
 *
 * To run a mutation, you first call `useUpdateDepartmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDepartmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDepartmentMutation, { data, loading, error }] = useUpdateDepartmentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDepartmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateDepartmentMutation,
    UpdateDepartmentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateDepartmentMutation, UpdateDepartmentMutationVariables>(
    UpdateDepartmentDocument,
    options,
  );
}
export type UpdateDepartmentMutationHookResult = ReturnType<typeof useUpdateDepartmentMutation>;
export type UpdateDepartmentMutationResult = Apollo.MutationResult<UpdateDepartmentMutation>;
export const RemoveDepartmentDocument = gql`
  mutation RemoveDepartment($id: ID!) {
    removeDepartment(id: $id)
  }
`;

/**
 * __useRemoveDepartmentMutation__
 *
 * To run a mutation, you first call `useRemoveDepartmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveDepartmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeDepartmentMutation, { data, loading, error }] = useRemoveDepartmentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveDepartmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveDepartmentMutation,
    RemoveDepartmentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveDepartmentMutation, RemoveDepartmentMutationVariables>(
    RemoveDepartmentDocument,
    options,
  );
}
export type RemoveDepartmentMutationHookResult = ReturnType<typeof useRemoveDepartmentMutation>;
export type RemoveDepartmentMutationResult = Apollo.MutationResult<RemoveDepartmentMutation>;
export const DocumentsDocument = gql`
  query Documents(
    $projectId: ID!
    $page: Int
    $pageSize: Int
    $sortBy: String
    $sortOrder: SortOrder
  ) {
    documents(
      projectId: $projectId
      page: $page
      pageSize: $pageSize
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      items {
        id
        title
        documentCode
        creatorId
        projectId
        status
        createdAt
        updatedAt
      }
      meta {
        page
        total
        hasMore
        pageSize
      }
    }
  }
`;

/**
 * __useDocumentsQuery__
 *
 * To run a query within a React component, call `useDocumentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDocumentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDocumentsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      sortBy: // value for 'sortBy'
 *      sortOrder: // value for 'sortOrder'
 *   },
 * });
 */
export function useDocumentsQuery(
  baseOptions: Apollo.QueryHookOptions<DocumentsQuery, DocumentsQueryVariables> &
    ({ variables: DocumentsQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DocumentsQuery, DocumentsQueryVariables>(DocumentsDocument, options);
}
export function useDocumentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DocumentsQuery, DocumentsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DocumentsQuery, DocumentsQueryVariables>(DocumentsDocument, options);
}
// @ts-ignore
export function useDocumentsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<DocumentsQuery, DocumentsQueryVariables>,
): Apollo.UseSuspenseQueryResult<DocumentsQuery, DocumentsQueryVariables>;
export function useDocumentsSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DocumentsQuery, DocumentsQueryVariables>,
): Apollo.UseSuspenseQueryResult<DocumentsQuery | undefined, DocumentsQueryVariables>;
export function useDocumentsSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DocumentsQuery, DocumentsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<DocumentsQuery, DocumentsQueryVariables>(
    DocumentsDocument,
    options,
  );
}
export type DocumentsQueryHookResult = ReturnType<typeof useDocumentsQuery>;
export type DocumentsLazyQueryHookResult = ReturnType<typeof useDocumentsLazyQuery>;
export type DocumentsSuspenseQueryHookResult = ReturnType<typeof useDocumentsSuspenseQuery>;
export type DocumentsQueryResult = Apollo.QueryResult<DocumentsQuery, DocumentsQueryVariables>;
export const DocumentDocument = gql`
  query Document($id: ID!) {
    document(id: $id) {
      id
      title
      documentCode
      content
      creatorId
      projectId
      status
      createdAt
      updatedAt
      updatedBy
      versions {
        id
        versionNumber
        createdAt
        createdBy
      }
    }
  }
`;

/**
 * __useDocumentQuery__
 *
 * To run a query within a React component, call `useDocumentQuery` and pass it any options that fit your needs.
 * When your component renders, `useDocumentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDocumentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDocumentQuery(
  baseOptions: Apollo.QueryHookOptions<DocumentQuery, DocumentQueryVariables> &
    ({ variables: DocumentQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DocumentQuery, DocumentQueryVariables>(DocumentDocument, options);
}
export function useDocumentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DocumentQuery, DocumentQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DocumentQuery, DocumentQueryVariables>(DocumentDocument, options);
}
// @ts-ignore
export function useDocumentSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<DocumentQuery, DocumentQueryVariables>,
): Apollo.UseSuspenseQueryResult<DocumentQuery, DocumentQueryVariables>;
export function useDocumentSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DocumentQuery, DocumentQueryVariables>,
): Apollo.UseSuspenseQueryResult<DocumentQuery | undefined, DocumentQueryVariables>;
export function useDocumentSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DocumentQuery, DocumentQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<DocumentQuery, DocumentQueryVariables>(DocumentDocument, options);
}
export type DocumentQueryHookResult = ReturnType<typeof useDocumentQuery>;
export type DocumentLazyQueryHookResult = ReturnType<typeof useDocumentLazyQuery>;
export type DocumentSuspenseQueryHookResult = ReturnType<typeof useDocumentSuspenseQuery>;
export type DocumentQueryResult = Apollo.QueryResult<DocumentQuery, DocumentQueryVariables>;
export const CreateDocumentDocument = gql`
  mutation CreateDocument($input: CreateDocumentInput!) {
    createDocument(input: $input) {
      id
      title
      documentCode
      content
      status
      createdAt
    }
  }
`;

/**
 * __useCreateDocumentMutation__
 *
 * To run a mutation, you first call `useCreateDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDocumentMutation, { data, loading, error }] = useCreateDocumentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDocumentMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateDocumentMutation, CreateDocumentMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateDocumentMutation, CreateDocumentMutationVariables>(
    CreateDocumentDocument,
    options,
  );
}
export type CreateDocumentMutationHookResult = ReturnType<typeof useCreateDocumentMutation>;
export type CreateDocumentMutationResult = Apollo.MutationResult<CreateDocumentMutation>;
export const UpdateDocumentDocument = gql`
  mutation UpdateDocument($id: ID!, $input: UpdateDocumentInput!) {
    updateDocument(id: $id, input: $input) {
      id
      title
      documentCode
      content
      status
      updatedAt
    }
  }
`;

/**
 * __useUpdateDocumentMutation__
 *
 * To run a mutation, you first call `useUpdateDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDocumentMutation, { data, loading, error }] = useUpdateDocumentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDocumentMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateDocumentMutation, UpdateDocumentMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateDocumentMutation, UpdateDocumentMutationVariables>(
    UpdateDocumentDocument,
    options,
  );
}
export type UpdateDocumentMutationHookResult = ReturnType<typeof useUpdateDocumentMutation>;
export type UpdateDocumentMutationResult = Apollo.MutationResult<UpdateDocumentMutation>;
export const RemoveDocumentDocument = gql`
  mutation RemoveDocument($id: ID!) {
    removeDocument(id: $id) {
      id
      title
      documentCode
    }
  }
`;

/**
 * __useRemoveDocumentMutation__
 *
 * To run a mutation, you first call `useRemoveDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeDocumentMutation, { data, loading, error }] = useRemoveDocumentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveDocumentMutation(
  baseOptions?: Apollo.MutationHookOptions<RemoveDocumentMutation, RemoveDocumentMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveDocumentMutation, RemoveDocumentMutationVariables>(
    RemoveDocumentDocument,
    options,
  );
}
export type RemoveDocumentMutationHookResult = ReturnType<typeof useRemoveDocumentMutation>;
export type RemoveDocumentMutationResult = Apollo.MutationResult<RemoveDocumentMutation>;
export const PositionsDocument = gql`
  query Positions {
    positions {
      id
      name
      nameSc
      nameTc
      description
      createdAt
      updatedAt
    }
  }
`;

/**
 * __usePositionsQuery__
 *
 * To run a query within a React component, call `usePositionsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePositionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePositionsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePositionsQuery(
  baseOptions?: Apollo.QueryHookOptions<PositionsQuery, PositionsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PositionsQuery, PositionsQueryVariables>(PositionsDocument, options);
}
export function usePositionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PositionsQuery, PositionsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PositionsQuery, PositionsQueryVariables>(PositionsDocument, options);
}
// @ts-ignore
export function usePositionsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<PositionsQuery, PositionsQueryVariables>,
): Apollo.UseSuspenseQueryResult<PositionsQuery, PositionsQueryVariables>;
export function usePositionsSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PositionsQuery, PositionsQueryVariables>,
): Apollo.UseSuspenseQueryResult<PositionsQuery | undefined, PositionsQueryVariables>;
export function usePositionsSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PositionsQuery, PositionsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<PositionsQuery, PositionsQueryVariables>(
    PositionsDocument,
    options,
  );
}
export type PositionsQueryHookResult = ReturnType<typeof usePositionsQuery>;
export type PositionsLazyQueryHookResult = ReturnType<typeof usePositionsLazyQuery>;
export type PositionsSuspenseQueryHookResult = ReturnType<typeof usePositionsSuspenseQuery>;
export type PositionsQueryResult = Apollo.QueryResult<PositionsQuery, PositionsQueryVariables>;
export const PositionDocument = gql`
  query Position($id: ID!) {
    position(id: $id) {
      id
      name
      nameSc
      nameTc
      description
      createdAt
      updatedAt
    }
  }
`;

/**
 * __usePositionQuery__
 *
 * To run a query within a React component, call `usePositionQuery` and pass it any options that fit your needs.
 * When your component renders, `usePositionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePositionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePositionQuery(
  baseOptions: Apollo.QueryHookOptions<PositionQuery, PositionQueryVariables> &
    ({ variables: PositionQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PositionQuery, PositionQueryVariables>(PositionDocument, options);
}
export function usePositionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PositionQuery, PositionQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PositionQuery, PositionQueryVariables>(PositionDocument, options);
}
// @ts-ignore
export function usePositionSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<PositionQuery, PositionQueryVariables>,
): Apollo.UseSuspenseQueryResult<PositionQuery, PositionQueryVariables>;
export function usePositionSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PositionQuery, PositionQueryVariables>,
): Apollo.UseSuspenseQueryResult<PositionQuery | undefined, PositionQueryVariables>;
export function usePositionSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PositionQuery, PositionQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<PositionQuery, PositionQueryVariables>(PositionDocument, options);
}
export type PositionQueryHookResult = ReturnType<typeof usePositionQuery>;
export type PositionLazyQueryHookResult = ReturnType<typeof usePositionLazyQuery>;
export type PositionSuspenseQueryHookResult = ReturnType<typeof usePositionSuspenseQuery>;
export type PositionQueryResult = Apollo.QueryResult<PositionQuery, PositionQueryVariables>;
export const CreatePositionDocument = gql`
  mutation CreatePosition($input: CreatePositionInput!) {
    createPosition(input: $input) {
      id
      name
      nameSc
      nameTc
      description
    }
  }
`;

/**
 * __useCreatePositionMutation__
 *
 * To run a mutation, you first call `useCreatePositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPositionMutation, { data, loading, error }] = useCreatePositionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePositionMutation(
  baseOptions?: Apollo.MutationHookOptions<CreatePositionMutation, CreatePositionMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreatePositionMutation, CreatePositionMutationVariables>(
    CreatePositionDocument,
    options,
  );
}
export type CreatePositionMutationHookResult = ReturnType<typeof useCreatePositionMutation>;
export type CreatePositionMutationResult = Apollo.MutationResult<CreatePositionMutation>;
export const UpdatePositionDocument = gql`
  mutation UpdatePosition($id: ID!, $input: UpdatePositionInput!) {
    updatePosition(id: $id, input: $input) {
      id
      name
      nameSc
      nameTc
      description
    }
  }
`;

/**
 * __useUpdatePositionMutation__
 *
 * To run a mutation, you first call `useUpdatePositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePositionMutation, { data, loading, error }] = useUpdatePositionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePositionMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdatePositionMutation, UpdatePositionMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdatePositionMutation, UpdatePositionMutationVariables>(
    UpdatePositionDocument,
    options,
  );
}
export type UpdatePositionMutationHookResult = ReturnType<typeof useUpdatePositionMutation>;
export type UpdatePositionMutationResult = Apollo.MutationResult<UpdatePositionMutation>;
export const RemovePositionDocument = gql`
  mutation RemovePosition($id: ID!) {
    removePosition(id: $id)
  }
`;

/**
 * __useRemovePositionMutation__
 *
 * To run a mutation, you first call `useRemovePositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePositionMutation, { data, loading, error }] = useRemovePositionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemovePositionMutation(
  baseOptions?: Apollo.MutationHookOptions<RemovePositionMutation, RemovePositionMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemovePositionMutation, RemovePositionMutationVariables>(
    RemovePositionDocument,
    options,
  );
}
export type RemovePositionMutationHookResult = ReturnType<typeof useRemovePositionMutation>;
export type RemovePositionMutationResult = Apollo.MutationResult<RemovePositionMutation>;
export const ProjectsDocument = gql`
  query Projects($page: Int, $pageSize: Int, $sortBy: String, $sortOrder: SortOrder) {
    projects(page: $page, pageSize: $pageSize, sortBy: $sortBy, sortOrder: $sortOrder) {
      items {
        ...ProjectFields
      }
      meta {
        page
        total
        hasMore
        pageSize
      }
    }
  }
  ${ProjectFieldsFragmentDoc}
`;

/**
 * __useProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      sortBy: // value for 'sortBy'
 *      sortOrder: // value for 'sortOrder'
 *   },
 * });
 */
export function useProjectsQuery(
  baseOptions?: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
}
export function useProjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
}
// @ts-ignore
export function useProjectsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>,
): Apollo.UseSuspenseQueryResult<ProjectsQuery, ProjectsQueryVariables>;
export function useProjectsSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>,
): Apollo.UseSuspenseQueryResult<ProjectsQuery | undefined, ProjectsQueryVariables>;
export function useProjectsSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
}
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>;
export type ProjectsSuspenseQueryHookResult = ReturnType<typeof useProjectsSuspenseQuery>;
export type ProjectsQueryResult = Apollo.QueryResult<ProjectsQuery, ProjectsQueryVariables>;
export const ProjectDocument = gql`
  query Project($id: ID!) {
    project(id: $id) {
      ...ProjectFields
    }
  }
  ${ProjectFieldsFragmentDoc}
`;

/**
 * __useProjectQuery__
 *
 * To run a query within a React component, call `useProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectQuery(
  baseOptions: Apollo.QueryHookOptions<ProjectQuery, ProjectQueryVariables> &
    ({ variables: ProjectQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
}
export function useProjectLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
}
// @ts-ignore
export function useProjectSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectQuery, ProjectQueryVariables>,
): Apollo.UseSuspenseQueryResult<ProjectQuery, ProjectQueryVariables>;
export function useProjectSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectQuery, ProjectQueryVariables>,
): Apollo.UseSuspenseQueryResult<ProjectQuery | undefined, ProjectQueryVariables>;
export function useProjectSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectQuery, ProjectQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
}
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export type ProjectSuspenseQueryHookResult = ReturnType<typeof useProjectSuspenseQuery>;
export type ProjectQueryResult = Apollo.QueryResult<ProjectQuery, ProjectQueryVariables>;
export const MyProjectsDocument = gql`
  query MyProjects($page: Int, $pageSize: Int, $sortBy: String, $sortOrder: SortOrder) {
    myProjects(page: $page, pageSize: $pageSize, sortBy: $sortBy, sortOrder: $sortOrder) {
      items {
        ...ProjectFields
      }
      meta {
        page
        total
        hasMore
        pageSize
      }
    }
  }
  ${ProjectFieldsFragmentDoc}
`;

/**
 * __useMyProjectsQuery__
 *
 * To run a query within a React component, call `useMyProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProjectsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      sortBy: // value for 'sortBy'
 *      sortOrder: // value for 'sortOrder'
 *   },
 * });
 */
export function useMyProjectsQuery(
  baseOptions?: Apollo.QueryHookOptions<MyProjectsQuery, MyProjectsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MyProjectsQuery, MyProjectsQueryVariables>(MyProjectsDocument, options);
}
export function useMyProjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MyProjectsQuery, MyProjectsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MyProjectsQuery, MyProjectsQueryVariables>(
    MyProjectsDocument,
    options,
  );
}
// @ts-ignore
export function useMyProjectsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<MyProjectsQuery, MyProjectsQueryVariables>,
): Apollo.UseSuspenseQueryResult<MyProjectsQuery, MyProjectsQueryVariables>;
export function useMyProjectsSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyProjectsQuery, MyProjectsQueryVariables>,
): Apollo.UseSuspenseQueryResult<MyProjectsQuery | undefined, MyProjectsQueryVariables>;
export function useMyProjectsSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyProjectsQuery, MyProjectsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<MyProjectsQuery, MyProjectsQueryVariables>(
    MyProjectsDocument,
    options,
  );
}
export type MyProjectsQueryHookResult = ReturnType<typeof useMyProjectsQuery>;
export type MyProjectsLazyQueryHookResult = ReturnType<typeof useMyProjectsLazyQuery>;
export type MyProjectsSuspenseQueryHookResult = ReturnType<typeof useMyProjectsSuspenseQuery>;
export type MyProjectsQueryResult = Apollo.QueryResult<MyProjectsQuery, MyProjectsQueryVariables>;
export const CreateProjectDocument = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      ...ProjectFields
    }
  }
  ${ProjectFieldsFragmentDoc}
`;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProjectMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(
    CreateProjectDocument,
    options,
  );
}
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export const UpdateProjectDocument = gql`
  mutation UpdateProject($id: ID!, $input: UpdateProjectInput!) {
    updateProject(id: $id, input: $input) {
      ...ProjectFields
    }
  }
  ${ProjectFieldsFragmentDoc}
`;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProjectMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(
    UpdateProjectDocument,
    options,
  );
}
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export const RemoveProjectDocument = gql`
  mutation RemoveProject($id: ID!) {
    removeProject(id: $id) {
      ...ProjectFields
    }
  }
  ${ProjectFieldsFragmentDoc}
`;

/**
 * __useRemoveProjectMutation__
 *
 * To run a mutation, you first call `useRemoveProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProjectMutation, { data, loading, error }] = useRemoveProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveProjectMutation(
  baseOptions?: Apollo.MutationHookOptions<RemoveProjectMutation, RemoveProjectMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveProjectMutation, RemoveProjectMutationVariables>(
    RemoveProjectDocument,
    options,
  );
}
export type RemoveProjectMutationHookResult = ReturnType<typeof useRemoveProjectMutation>;
export type RemoveProjectMutationResult = Apollo.MutationResult<RemoveProjectMutation>;
export const AddProjectMemberDocument = gql`
  mutation AddProjectMember($projectId: ID!, $input: AddProjectMemberInput!) {
    addProjectMember(projectId: $projectId, input: $input) {
      id
      role
      userId
      joinedAt
    }
  }
`;

/**
 * __useAddProjectMemberMutation__
 *
 * To run a mutation, you first call `useAddProjectMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProjectMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProjectMemberMutation, { data, loading, error }] = useAddProjectMemberMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddProjectMemberMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddProjectMemberMutation,
    AddProjectMemberMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddProjectMemberMutation, AddProjectMemberMutationVariables>(
    AddProjectMemberDocument,
    options,
  );
}
export type AddProjectMemberMutationHookResult = ReturnType<typeof useAddProjectMemberMutation>;
export type AddProjectMemberMutationResult = Apollo.MutationResult<AddProjectMemberMutation>;
export const RemoveProjectMemberDocument = gql`
  mutation RemoveProjectMember($projectId: ID!, $userId: ID!) {
    removeProjectMember(projectId: $projectId, userId: $userId) {
      id
      role
      userId
      joinedAt
    }
  }
`;

/**
 * __useRemoveProjectMemberMutation__
 *
 * To run a mutation, you first call `useRemoveProjectMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProjectMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProjectMemberMutation, { data, loading, error }] = useRemoveProjectMemberMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRemoveProjectMemberMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveProjectMemberMutation,
    RemoveProjectMemberMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveProjectMemberMutation, RemoveProjectMemberMutationVariables>(
    RemoveProjectMemberDocument,
    options,
  );
}
export type RemoveProjectMemberMutationHookResult = ReturnType<
  typeof useRemoveProjectMemberMutation
>;
export type RemoveProjectMemberMutationResult = Apollo.MutationResult<RemoveProjectMemberMutation>;
export const SprintsDocument = gql`
  query Sprints($projectId: ID!) {
    sprints(projectId: $projectId) {
      ...SprintFields
    }
  }
  ${SprintFieldsFragmentDoc}
`;

/**
 * __useSprintsQuery__
 *
 * To run a query within a React component, call `useSprintsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSprintsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSprintsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useSprintsQuery(
  baseOptions: Apollo.QueryHookOptions<SprintsQuery, SprintsQueryVariables> &
    ({ variables: SprintsQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SprintsQuery, SprintsQueryVariables>(SprintsDocument, options);
}
export function useSprintsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SprintsQuery, SprintsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SprintsQuery, SprintsQueryVariables>(SprintsDocument, options);
}
// @ts-ignore
export function useSprintsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<SprintsQuery, SprintsQueryVariables>,
): Apollo.UseSuspenseQueryResult<SprintsQuery, SprintsQueryVariables>;
export function useSprintsSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SprintsQuery, SprintsQueryVariables>,
): Apollo.UseSuspenseQueryResult<SprintsQuery | undefined, SprintsQueryVariables>;
export function useSprintsSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SprintsQuery, SprintsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<SprintsQuery, SprintsQueryVariables>(SprintsDocument, options);
}
export type SprintsQueryHookResult = ReturnType<typeof useSprintsQuery>;
export type SprintsLazyQueryHookResult = ReturnType<typeof useSprintsLazyQuery>;
export type SprintsSuspenseQueryHookResult = ReturnType<typeof useSprintsSuspenseQuery>;
export type SprintsQueryResult = Apollo.QueryResult<SprintsQuery, SprintsQueryVariables>;
export const SprintDocument = gql`
  query Sprint($id: ID!) {
    sprint(id: $id) {
      ...SprintFields
    }
  }
  ${SprintFieldsFragmentDoc}
`;

/**
 * __useSprintQuery__
 *
 * To run a query within a React component, call `useSprintQuery` and pass it any options that fit your needs.
 * When your component renders, `useSprintQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSprintQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSprintQuery(
  baseOptions: Apollo.QueryHookOptions<SprintQuery, SprintQueryVariables> &
    ({ variables: SprintQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SprintQuery, SprintQueryVariables>(SprintDocument, options);
}
export function useSprintLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SprintQuery, SprintQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SprintQuery, SprintQueryVariables>(SprintDocument, options);
}
// @ts-ignore
export function useSprintSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<SprintQuery, SprintQueryVariables>,
): Apollo.UseSuspenseQueryResult<SprintQuery, SprintQueryVariables>;
export function useSprintSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SprintQuery, SprintQueryVariables>,
): Apollo.UseSuspenseQueryResult<SprintQuery | undefined, SprintQueryVariables>;
export function useSprintSuspenseQuery(
  baseOptions?:
    Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SprintQuery, SprintQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<SprintQuery, SprintQueryVariables>(SprintDocument, options);
}
export type SprintQueryHookResult = ReturnType<typeof useSprintQuery>;
export type SprintLazyQueryHookResult = ReturnType<typeof useSprintLazyQuery>;
export type SprintSuspenseQueryHookResult = ReturnType<typeof useSprintSuspenseQuery>;
export type SprintQueryResult = Apollo.QueryResult<SprintQuery, SprintQueryVariables>;
export const CreateSprintDocument = gql`
  mutation CreateSprint($input: CreateSprintInput!) {
    createSprint(input: $input) {
      ...SprintFields
    }
  }
  ${SprintFieldsFragmentDoc}
`;

/**
 * __useCreateSprintMutation__
 *
 * To run a mutation, you first call `useCreateSprintMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSprintMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSprintMutation, { data, loading, error }] = useCreateSprintMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSprintMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateSprintMutation, CreateSprintMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateSprintMutation, CreateSprintMutationVariables>(
    CreateSprintDocument,
    options,
  );
}
export type CreateSprintMutationHookResult = ReturnType<typeof useCreateSprintMutation>;
export type CreateSprintMutationResult = Apollo.MutationResult<CreateSprintMutation>;
export const UpdateSprintDocument = gql`
  mutation UpdateSprint($id: ID!, $input: UpdateSprintInput!) {
    updateSprint(id: $id, input: $input) {
      ...SprintFields
    }
  }
  ${SprintFieldsFragmentDoc}
`;

/**
 * __useUpdateSprintMutation__
 *
 * To run a mutation, you first call `useUpdateSprintMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSprintMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSprintMutation, { data, loading, error }] = useUpdateSprintMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSprintMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateSprintMutation, UpdateSprintMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateSprintMutation, UpdateSprintMutationVariables>(
    UpdateSprintDocument,
    options,
  );
}
export type UpdateSprintMutationHookResult = ReturnType<typeof useUpdateSprintMutation>;
export type UpdateSprintMutationResult = Apollo.MutationResult<UpdateSprintMutation>;
export const RemoveSprintDocument = gql`
  mutation RemoveSprint($id: ID!) {
    removeSprint(id: $id)
  }
`;

/**
 * __useRemoveSprintMutation__
 *
 * To run a mutation, you first call `useRemoveSprintMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSprintMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSprintMutation, { data, loading, error }] = useRemoveSprintMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveSprintMutation(
  baseOptions?: Apollo.MutationHookOptions<RemoveSprintMutation, RemoveSprintMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveSprintMutation, RemoveSprintMutationVariables>(
    RemoveSprintDocument,
    options,
  );
}
export type RemoveSprintMutationHookResult = ReturnType<typeof useRemoveSprintMutation>;
export type RemoveSprintMutationResult = Apollo.MutationResult<RemoveSprintMutation>;
export const TasksDocument = gql`
  query Tasks($projectId: ID!, $page: Int, $pageSize: Int, $sortBy: String, $sortOrder: SortOrder) {
    tasks(
      projectId: $projectId
      page: $page
      pageSize: $pageSize
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      items {
        ...TaskFields
      }
      meta {
        page
        total
        hasMore
        pageSize
      }
    }
  }
  ${TaskFieldsFragmentDoc}
`;

/**
 * __useTasksQuery__
 *
 * To run a query within a React component, call `useTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTasksQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      sortBy: // value for 'sortBy'
 *      sortOrder: // value for 'sortOrder'
 *   },
 * });
 */
export function useTasksQuery(
  baseOptions: Apollo.QueryHookOptions<TasksQuery, TasksQueryVariables> &
    ({ variables: TasksQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TasksQuery, TasksQueryVariables>(TasksDocument, options);
}
export function useTasksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TasksQuery, TasksQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TasksQuery, TasksQueryVariables>(TasksDocument, options);
}
// @ts-ignore
export function useTasksSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<TasksQuery, TasksQueryVariables>,
): Apollo.UseSuspenseQueryResult<TasksQuery, TasksQueryVariables>;
export function useTasksSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TasksQuery, TasksQueryVariables>,
): Apollo.UseSuspenseQueryResult<TasksQuery | undefined, TasksQueryVariables>;
export function useTasksSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TasksQuery, TasksQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<TasksQuery, TasksQueryVariables>(TasksDocument, options);
}
export type TasksQueryHookResult = ReturnType<typeof useTasksQuery>;
export type TasksLazyQueryHookResult = ReturnType<typeof useTasksLazyQuery>;
export type TasksSuspenseQueryHookResult = ReturnType<typeof useTasksSuspenseQuery>;
export type TasksQueryResult = Apollo.QueryResult<TasksQuery, TasksQueryVariables>;
export const TaskDocument = gql`
  query Task($id: ID!) {
    task(id: $id) {
      ...TaskFields
    }
  }
  ${TaskFieldsFragmentDoc}
`;

/**
 * __useTaskQuery__
 *
 * To run a query within a React component, call `useTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTaskQuery(
  baseOptions: Apollo.QueryHookOptions<TaskQuery, TaskQueryVariables> &
    ({ variables: TaskQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TaskQuery, TaskQueryVariables>(TaskDocument, options);
}
export function useTaskLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TaskQuery, TaskQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TaskQuery, TaskQueryVariables>(TaskDocument, options);
}
// @ts-ignore
export function useTaskSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<TaskQuery, TaskQueryVariables>,
): Apollo.UseSuspenseQueryResult<TaskQuery, TaskQueryVariables>;
export function useTaskSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TaskQuery, TaskQueryVariables>,
): Apollo.UseSuspenseQueryResult<TaskQuery | undefined, TaskQueryVariables>;
export function useTaskSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TaskQuery, TaskQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<TaskQuery, TaskQueryVariables>(TaskDocument, options);
}
export type TaskQueryHookResult = ReturnType<typeof useTaskQuery>;
export type TaskLazyQueryHookResult = ReturnType<typeof useTaskLazyQuery>;
export type TaskSuspenseQueryHookResult = ReturnType<typeof useTaskSuspenseQuery>;
export type TaskQueryResult = Apollo.QueryResult<TaskQuery, TaskQueryVariables>;
export const CreateTaskDocument = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      ...TaskFields
    }
  }
  ${TaskFieldsFragmentDoc}
`;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTaskMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(
    CreateTaskDocument,
    options,
  );
}
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export const UpdateTaskDocument = gql`
  mutation UpdateTask($id: ID!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      ...TaskFields
    }
  }
  ${TaskFieldsFragmentDoc}
`;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTaskMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(
    UpdateTaskDocument,
    options,
  );
}
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export const RemoveTaskDocument = gql`
  mutation RemoveTask($id: ID!) {
    removeTask(id: $id) {
      ...TaskFields
    }
  }
  ${TaskFieldsFragmentDoc}
`;

/**
 * __useRemoveTaskMutation__
 *
 * To run a mutation, you first call `useRemoveTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTaskMutation, { data, loading, error }] = useRemoveTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveTaskMutation(
  baseOptions?: Apollo.MutationHookOptions<RemoveTaskMutation, RemoveTaskMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveTaskMutation, RemoveTaskMutationVariables>(
    RemoveTaskDocument,
    options,
  );
}
export type RemoveTaskMutationHookResult = ReturnType<typeof useRemoveTaskMutation>;
export type RemoveTaskMutationResult = Apollo.MutationResult<RemoveTaskMutation>;
export const AddTaskCommentDocument = gql`
  mutation AddTaskComment($input: CreateCommentInput!) {
    addTaskComment(input: $input) {
      id
      content
      authorId
      createdAt
    }
  }
`;

/**
 * __useAddTaskCommentMutation__
 *
 * To run a mutation, you first call `useAddTaskCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTaskCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTaskCommentMutation, { data, loading, error }] = useAddTaskCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddTaskCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<AddTaskCommentMutation, AddTaskCommentMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddTaskCommentMutation, AddTaskCommentMutationVariables>(
    AddTaskCommentDocument,
    options,
  );
}
export type AddTaskCommentMutationHookResult = ReturnType<typeof useAddTaskCommentMutation>;
export type AddTaskCommentMutationResult = Apollo.MutationResult<AddTaskCommentMutation>;
export const RemoveTaskCommentDocument = gql`
  mutation RemoveTaskComment($id: ID!) {
    removeTaskComment(id: $id)
  }
`;

/**
 * __useRemoveTaskCommentMutation__
 *
 * To run a mutation, you first call `useRemoveTaskCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTaskCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTaskCommentMutation, { data, loading, error }] = useRemoveTaskCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveTaskCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveTaskCommentMutation,
    RemoveTaskCommentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveTaskCommentMutation, RemoveTaskCommentMutationVariables>(
    RemoveTaskCommentDocument,
    options,
  );
}
export type RemoveTaskCommentMutationHookResult = ReturnType<typeof useRemoveTaskCommentMutation>;
export type RemoveTaskCommentMutationResult = Apollo.MutationResult<RemoveTaskCommentMutation>;
export const UsersDocument = gql`
  query Users($page: Int, $pageSize: Int, $sortBy: String, $sortOrder: SortOrder) {
    users(page: $page, pageSize: $pageSize, sortBy: $sortBy, sortOrder: $sortOrder) {
      items {
        ...UserFields
      }
      meta {
        page
        total
        hasMore
        pageSize
      }
    }
  }
  ${UserFieldsFragmentDoc}
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      sortBy: // value for 'sortBy'
 *      sortOrder: // value for 'sortOrder'
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
}
export function useUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
}
// @ts-ignore
export function useUsersSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<UsersQuery, UsersQueryVariables>,
): Apollo.UseSuspenseQueryResult<UsersQuery, UsersQueryVariables>;
export function useUsersSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UsersQuery, UsersQueryVariables>,
): Apollo.UseSuspenseQueryResult<UsersQuery | undefined, UsersQueryVariables>;
export function useUsersSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UsersQuery, UsersQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersSuspenseQueryHookResult = ReturnType<typeof useUsersSuspenseQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const UserDocument = gql`
  query User($id: ID!) {
    user(id: $id) {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(
  baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables> &
    ({ variables: UserQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export function useUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
// @ts-ignore
export function useUserSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>,
): Apollo.UseSuspenseQueryResult<UserQuery, UserQueryVariables>;
export function useUserSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>,
): Apollo.UseSuspenseQueryResult<UserQuery | undefined, UserQueryVariables>;
export function useUserSuspenseQuery(
  baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserSuspenseQueryHookResult = ReturnType<typeof useUserSuspenseQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
