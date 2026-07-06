export interface RouteConfig {
  id: string;
  key?: string;
  path: string;
  icon?: string;
  group?: string;
  order?: number;
  fontSize?: string;
  children?: RouteConfig[];
}

export const ROOT_PATH: RouteConfig[] = [
  {
    id: 'dashboard',
    path: 'dashboard',
    key: 'navmenu__home',
    icon: 'icon-24:home',
    fontSize: '1.25rem',
  },
  {
    id: 'tasks',
    path: 'tasks',
    key: 'navmenu__task',
    icon: 'icon-24:task_list',
    fontSize: '1.125rem',
  },
  {
    id: 'staffs',
    path: 'staffs',
    key: 'navmenu__staff',
    icon: 'icon-24:staff',
    fontSize: '1.125rem',
  },
  {
    id: 'schedule',
    path: 'schedules',
    key: 'navmenu__schedule',
    icon: 'icon-24:date_off',
    fontSize: '1.125rem',
  },
  {
    id: 'report',
    path: 'reports/taskSummary',
    key: 'navmenu__report',
    icon: 'icon-24:report',
    fontSize: '1.125rem',
  },
  {
    id: 'documents',
    path: 'documents',
    key: 'navmenu__doc',
    icon: 'icon-24:document',
    fontSize: '1.125rem',
  },
  {
    id: 'location',
    path: 'locations',
    key: 'navmenu__location',
    icon: 'icon-24:location',
    fontSize: '1.125rem',
  },
];

export const TaskSettingRoutes = [
  {
    id: 'categories',
    key: 'web_taskmanage_config__taskcategory_title',
    path: '/tasks/categories',
    toolbar: true,
    status: true,
  },
  {
    id: 'subCategories',
    key: 'web_taskmanage_confic__tasksubcategory_title',
    path: '/tasks/subCategories',
    toolbar: true,
    status: true,
  },
  {
    id: 'templates',
    key: 'web_taskmanage_config__tasktemplate_title',
    path: '/tasks/templates',
    toolbar: true,
    status: false,
  },
];

export const ScheduleSettingRoutes = [
  {
    id: 'setting',
    key: 'web_schedule_configshift__subtitle',
    path: '/schedules/setting',
    toolbar: true,
  },
];

export const ReportSettingRoutes = [
  {
    id: 'taskSummary',
    key: 'web_report_tasksummary__subtitle_tasksummary',
    path: '/reports/taskSummary',
  },
  {
    id: 'task',
    key: 'web_report_tasksummary__subtitle_taskreport',
    path: '/reports/task',
  },
  {
    id: 'taskActivities',
    key: 'web_report_tasksummary__subtitle_taskactivities',
    path: '/reports/taskActivities',
  },
  {
    id: 'attendance',
    key: 'web_report_tasksummary__subtitle_attendance',
    path: '/reports/attendance',
  },
  {
    id: 'patrol',
    key: 'web_report_tasksummary__subtitle_patrol',
    path: '/reports/patrol',
  },
];

export const SystemSettingRouters = [
  {
    id: 'userRoles',
    key: 'web_config_setting_user_role',
    path: '/setting/userRoles',
    toolbar: false,
  },
  {
    id: 'permissions',
    key: 'web_config_setting_access_control',
    path: '/setting/permissions',
    toolbar: false,
  },
  {
    id: 'maintenanceNotification',
    key: 'web_config_setting_system_maintenance',
    path: '/setting/maintenanceNotification',
    toolbar: false,
  },
  {
    id: 'systemControl',
    key: 'web_config_setting_system_control_title',
    path: '/setting/systemControl',
    toolbar: false,
  },
];

export const ContractSettingRouters = [
  {
    id: 'contracts',
    key: 'web_config_setting_contract',
    path: '/setting/contracts',
    isAaAdmin: true,
    toolbar: true,
  },
  {
    id: 'department',
    key: 'web_config_setting_department',
    path: '/setting/department',
    isAaAdmin: true,
    toolbar: true,
  },
  {
    id: 'sections',
    key: 'web_config_setting_section',
    path: '/setting/sections',
    isAaAdmin: true,
    toolbar: true,
  },
  {
    id: 'companies',
    key: 'web_config_setting_company',
    path: '/setting/companies',
    isAaAdmin: false,
    toolbar: true,
  },
  {
    id: 'jobTitle',
    key: 'web_config_setting_job_title',
    path: '/setting/jobTitle',
    isAaAdmin: false,
    toolbar: true,
  },
  {
    id: 'serviceTypes',
    key: 'web_config_setting_service_type',
    path: '/setting/serviceTypes',
    isAaAdmin: true,
    toolbar: true,
  },
  {
    id: 'pushNotification',
    key: 'web_config_setting_reminder_pn',
    path: '/setting/pushNotification',
    isAaAdmin: false,
    toolbar: true,
  },
];

export const FixedLocationRouters = [
  {
    id: 'common',
    key: 'web_location_config__publiclocation_title',
    path: '/locations/common',
    toolbar: false,
  },
  {
    id: 'custom',
    key: 'web_location_config__customlocation_title',
    path: '/locations/custom',
    toolbar: true,
  },
  {
    id: 'zone',
    key: 'web_location_config__regionallocation_title',
    path: '/locations/zone',
    toolbar: true,
  },
];

export const MultiLocationRouters = [
  {
    id: 'route',
    key: 'web_location_config__routelocation_title',
    path: '/locations/route',
    toolbar: true,
  },
];
