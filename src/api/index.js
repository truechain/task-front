import http from './http.js'
/* eslint-disable */

export const countPartTimeTotalPeople = o => (http.get('/admin/home/countPartTimeTotalPeople', o))
export const countComplateTask        = o => (http.get('/admin/home/countComplateTask', o))
export const countTotalTask           = o => (http.get('/admin/home/countTotalTask', o))
export const getRecommendStats        = o => (http.get('/report/getRecommendStats', o))
export const getRewardStats           = o => (http.get('/report/getRewardStats', o))
export const getTaskStats             = o => (http.get('/report/getTaskStats', o))
export const index                    = o => (http.get('/report/index', o))
export const exporta                  = o => (http.get('/report/export', o))
export const getUserProfilePage       = o => (http.get('/report/getUserProfilePage', o))
export const getUserInfo              = o => (http.get('/user/getUserInfo', o))
export const downLoadResume           = o => (http.get('/user/downLoadResume', o))
export const auditUser                = o => (http.get('/user/auditUser', o))
export const updateUser               = o => (http.get('/user/updateUser', o))
export const getUserPage              = o => (http.get('/user/getUserPage', o))
export const getTaskInfo              = o => (http.get('/task/getTaskInfo', o))
export const updateTask               = o => (http.get('/task/updateTask', o))
export const uploadTaskIcon           = o => (http.get('/task/uploadTaskIcon', o))
export const auditEntryFormUser       = o => (http.get('/task/auditEntryFormUser', o))
export const rewardEntryFromUser      = o => (http.get('/task/rewardEntryFromUser', o))
export const getEntryFormInfo         = o => (http.get('/task/getEntryFormInfo', o))
export const getTaskPage              = o => (http.get('/task/getTaskPage', o))
export const addTask                  = o => (http.get('/task/addTask', o))

export const statisticUserProfilePage = o => (http.get('/report/getUserProfilePage', o))
export const getResourcePageAPI       = o => (http.get('/admin/resource/getResourcePage', o))
export const addResourceAPI           = o => (http.get('/admin/resource/addResource', o))
export const getRolePageAPI           = o => (http.get('/admin/role/getRolePage', o))
export const getUserPageAPI           = o => (http.post('/admin/admin/user/getUserPage', o))
export const getRoleListAPI           = o => (http.post('/admin/unperm/admin/role/getRoleList', o))
export const addUserAPI               = (o, t) => (http.post('/admin/admin/user/addUser', o, t))
export const getUserInfoAPI           = o => (http.post('/admin/admin/user/getUserInfo', o))
export const updateAuthUserAPI        = o => (http.post('/admin/admin/user/updateAuthUser', o))
export const deleteAuthUserAPI        = o => (http.post('/admin/admin/user/deleteAuthUser', o))

export const loginApi                 = o => (http.post('/admin/admin/unauth/account/login', o))
export const TotalPeopleAPI           = o => (http.get('/admin/admin/home/countPartTimeTotalPeople', o))
export const countComplateTaskAPI     = o => (http.get('/admin/admin/home/countComplateTask', o))
export const countTotalTaskAPI        = o => (http.get('/admin/admin/home/countTotalTask', o))


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
