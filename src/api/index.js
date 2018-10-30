import http from './http.js'
/* eslint-disable */

export const countPartTimeTotalPeople = (o, t) => (http.get('/admin/home/countPartTimeTotalPeople', o, t))
export const countComplateTask        = (o, t) => (http.get('/admin/home/countComplateTask', o, t))
export const countTotalTask           = (o, t) => (http.get('/admin/home/countTotalTask', o, t))
export const getRecommendStats        = (o, t) => (http.get('/report/getRecommendStats', o, t))
export const getRewardStats           = (o, t) => (http.get('/report/getRewardStats', o, t))
export const getTaskStats             = (o, t) => (http.get('/report/getTaskStats', o, t))
export const index                    = (o, t) => (http.get('/report/index', o, t))
export const exporta                  = (o, t) => (http.get('/report/export', o, t))
export const getUserProfilePage       = (o, t) => (http.get('/report/getUserProfilePage', o, t))
export const getUserInfo              = (o, t) => (http.get('/user/getUserInfo', o, t))
export const downLoadResume           = (o, t) => (http.get('/user/downLoadResume', o, t))
export const auditUser                = (o, t) => (http.post('/admin/user/auditUser', o, t))
export const updateUser               = (o, t) => (http.post('/admin/user/updateUser', o, t))
export const getUserPage              = (o, t) => (http.post('/admin/user/getUserPage', o, t))
export const getTaskInfo              = (o, t) => (http.get('/task/getTaskInfo', o, t))
export const updateTask               = (o, t) => (http.get('/task/updateTask', o, t))
export const uploadTaskIcon           = (o, t) => (http.get('/task/uploadTaskIcon', o, t))
export const auditEntryFormUser       = (o, t) => (http.get('/task/auditEntryFormUser', o, t))
export const rewardEntryFromUser      = (o, t) => (http.get('/task/rewardEntryFromUser', o, t))
export const getEntryFormInfo         = (o, t) => (http.get('/task/getEntryFormInfo', o, t))
export const getTaskPage              = (o, t) => (http.get('/task/getTaskPage', o, t))
export const addTask                  = (o, t) => (http.get('/task/addTask', o, t))

export const statisticUserProfilePage = (o, t) => (http.get('/report/getUserProfilePage', o, t))
export const getResourcePageAPI       = (o, t) => (http.get('/admin/resource/getResourcePage', o, t))
export const addResourceAPI           = (o, t) => (http.get('/admin/resource/addResource', o, t))
export const getRolePageAPI           = (o, t) => (http.get('/admin/role/getRolePage', o, t))
export const getUserPageAPI           = (o, t) => (http.post('/admin/admin/user/getUserPage', o, t))
export const getRoleListAPI           = (o, t) => (http.post('/admin/unperm/admin/role/getRoleList', o, t))
export const addUserAPI               = (o, t) => (http.post('/admin/admin/user/addUser', o, t))
export const getUserInfoAPI           = (o, t) => (http.post('/admin/admin/user/getUserInfo', o, t))
export const updateAuthUserAPI        = (o, t) => (http.post('/admin/admin/user/updateAuthUser', o, t))
export const deleteAuthUserAPI        = (o, t) => (http.post('/admin/admin/user/deleteAuthUser', o, t))

export const loginApi                 = (o, t) => (http.post('/admin/unauth/account/login', o, t))
export const TotalPeopleAPI           = (o, t) => (http.get('/admin/admin/home/countPartTimeTotalPeople', o, t))
export const countComplateTaskAPI     = (o, t) => (http.get('/admin/admin/home/countComplateTask', o, t))
export const countTotalTaskAPI        = (o, t) => (http.get('/admin/admin/home/countTotalTask', o, t))


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
