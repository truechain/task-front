import http from './http.js'
/* eslint-disable */

export const countPartTimeTotalPeople = (o, t, p) => (http.get('/admin/home/countPartTimeTotalPeople', o, t, p))
export const countComplateTask        = (o, t, p) => (http.get('/admin/home/countComplateTask', o, t, p))
export const countTotalTask           = (o, t, p) => (http.get('/admin/home/countTotalTask', o, t, p))
export const getRecommendStats        = (o, t, p) => (http.post('/admin/report/getRecommendStats', o, t, p))
export const getRewardStats           = (o, t, p) => (http.post('/admin/report/getRewardStats', o, t, p))
export const getTaskStats             = (o, t, p) => (http.post('/admin/report/getTaskStats', o, t, p))
export const getStaticsInfo           = (o, t, p) => (http.post('/admin/report/index', o, t, p))
export const exportTable              = (o, t, p) => (http.get('/admin/report/export', o, t, p))
export const getUserProfilePage       = (o, t, p) => (http.post('/admin/report/getUserProfilePage', o, t, p))
export const getUserInfo              = (o, t, p) => (http.post('/admin/user/getUserInfo', o, t, p))
export const downLoadResume           = (o, t, p) => (http.get('/user/downLoadResume', o, t, p))
export const auditUser                = (o, t, p) => (http.post('/admin/user/auditUser', o, t, p))
export const updateUser               = (o, t, p) => (http.post('/admin/user/updateUser', o, t, p))
export const getUserPage              = (o, t, p) => (http.post('/admin/user/getUserPage', o, t, p))
export const getTaskInfo              = (o, t, p) => (http.post('/admin/task/getTaskInfo', o, t, p))
export const updateTask               = (o, t, p) => (http.post('/admin/task/updateTask', o, t, p))
export const uploadTaskIcon           = (o, t, p) => (http.post('/admin/task/uploadTaskIcon', o, t, p))
export const auditEntryFormUser       = (o, t, p) => (http.post('/admin/task/auditEntryFormUser', o, t, p))
export const rewardEntryFromUser      = (o, t, p) => (http.post('/admin/task/rewardEntryFromUser', o, t, p))
export const getEntryFormInfo         = (o, t, p) => (http.post('/admin/task/getEntryFormInfo', o, t, p))
export const getTaskPage              = (o, t, p) => (http.post('/admin/task/getTaskPage', o, t, p))
export const addTask                  = (o, t, p) => (http.get('/task/addTask', o, t, p))

export const statisticUserProfilePage = (o, t, p) => (http.get('/report/getUserProfilePage', o, t, p))
export const getResourcePageAPI       = (o, t, p) => (http.get('/admin/resource/getResourcePage', o, t, p))
export const addResourceAPI           = (o, t, p) => (http.get('/admin/resource/addResource', o, t, p))
export const getRolePageAPI           = (o, t, p) => (http.get('/admin/role/getRolePage', o, t, p))
export const getUserPageAPI           = (o, t, p) => (http.post('/admin/admin/user/getUserPage', o, t, p))
export const getRoleListAPI           = (o, t, p) => (http.post('/admin/unperm/admin/role/getRoleList', o, t, p))
export const addUserAPI               = (o, t, p) => (http.post('/admin/admin/user/addUser', o, t, p))
export const getUserInfoAPI           = (o, t, p) => (http.post('/admin/admin/user/getUserInfo', o, t, p))
export const updateAuthUserAPI        = (o, t, p) => (http.post('/admin/admin/user/updateAuthUser', o, t, p))
export const deleteAuthUserAPI        = (o, t, p) => (http.post('/admin/admin/user/deleteAuthUser', o, t, p))

export const loginApi                 = (o, t, p) => (http.post('/admin/unauth/account/login', o, t, p))
export const TotalPeopleAPI           = (o, t, p) => (http.get('/admin/admin/home/countPartTimeTotalPeople', o, t, p))
export const countComplateTaskAPI     = (o, t, p) => (http.get('/admin/admin/home/countComplateTask', o, t, p))
export const countTotalTaskAPI        = (o, t, p) => (http.get('/admin/admin/home/countTotalTask', o, t, p))


// 登录API
// export const loginApi = 'http://www.phptrain.cn/admin/unauth/account/login'

// ---------------------首页API开始--------------------------------------------
// 首页兼职总人数
// export const TotalPeopleAPI = 'http://www.phptrain.cn/admin/home/countPartTimeTotalPeople'

// 完成任务统计数API
// export const countComplateTaskAPI = 'http://www.phptrain.cn/admin/home/countComplateTask'

// 获取总任务数
// export const countTotalTaskAPI = 'http://www.phptrain.cn/admin/home/countTotalTask'

// ---------------------首页API结束--------------------------------------------

// --------------------- 统计页面API开始 --------------------------------------
// export const statisticUserProfilePage = '/report/getUserProfilePage'
// --------------------- 统计页面API结束 --------------------------------------

// --------------------- 系统管理之权限管理 API开始 --------------------------------------
// 获取权限管理内容
// export const getResourcePageAPI = '/admin/resource/getResourcePage'

// export const addResourceAPI = '/admin/resource/addResource'
// 角色管理内容
// export const getRolePageAPI = '/admin/role/getRolePage'
// 用户管理
// export const getUserPageAPI = '/admin/user/getUserPage'
// export const getRoleListAPI = '/unperm/admin/role/getRoleList'
// export const addUserAPI = '/admin/user/addUser'
// export const getUserInfoAPI = '/admin/user/getUserInfo'
// export const updateAuthUserAPI = '/admin/user/updateAuthUser'
// export const deleteAuthUserAPI = '/admin/user/deleteAuthUser'

// --------------------- 系统管理之权限管理 API结束 --------------------------------------
// --------------------- 统计页面API开始 --------------------------------------
