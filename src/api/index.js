import http from './http.js'
/* eslint-disable */

export const getResourcePageAPI       = (o, t, p) => (http.get('/admin/resource/getResourcePage', o, t, p))
export const addResourceAPI           = (o, t, p) => (http.get('/admin/resource/addResource', o, t, p))
export const getRolePageAPI           = (o, t, p) => (http.get('/admin/role/getRolePage', o, t, p))
export const getUserPageAPI           = (o, t, p) => (http.post('/admin/user/getUserPage', o, t, p))
export const getRoleListAPI           = (o, t, p) => (http.post('/admin/unperm/admin/role/getRoleList', o, t, p))

export const countPartTimeTotalPeople = (o, t, p) => (http.get('/home/countPartTimeTotalPeople', o, t, p))
export const countTotalTask           = (o, t, p) => (http.get('/home/countTotalTask', o, t, p))
export const countComplateTask        = (o, t, p) => (http.get('/home/countComplateTask', o, t, p))

export const getRewardList              = (o, t, p) => (http.post('/report/getRewardList', o, t, p))
export const exportTable              = (o, t, p) => (http.get('/report/export', o, t, p))
export const getRecommendStats        = (o, t, p) => (http.post('/report/getRecommendStats', o, t, p))
export const getRewardStats           = (o, t, p) => (http.post('/report/getRewardStats', o, t, p))
export const getTaskStats             = (o, t, p) => (http.post('/report/getTaskStats', o, t, p))
export const getStaticsInfo           = (o, t, p) => (http.post('/report/index', o, t, p))
export const getUserProfilePage       = (o, t, p) => (http.post('/report/getUserProfilePage', o, t, p))

export const downLoadResume           = (o, t, p) => (http.get('/user/downLoadResume', o, t, p))
export const getUserInfo              = (o, t, p) => (http.post('/user/getUserInfo', o, t, p))
export const auditUser                = (o, t, p) => (http.post('/user/auditUser', o, t, p))
export const updateUser               = (o, t, p) => (http.post('/user/updateUser', o, t, p))
export const getUserPage              = (o, t, p) => (http.post('/user/getUserPage', o, t, p))
export const addUserAPI               = (o, t, p) => (http.post('/user/addUser', o, t, p))
export const getUserInfoAPI           = (o, t, p) => (http.post('/user/getUserInfo', o, t, p))
export const updateAuthUserAPI        = (o, t, p) => (http.post('/user/updateAuthUser', o, t, p))
export const deleteAuthUserAPI        = (o, t, p) => (http.post('/user/deleteAuthUser', o, t, p))
export const updateUserBlank        = (o, t, p) => (http.post('/user/updateUserBlank', o, t, p))
export const updateUserLevel        = (o, t, p) => (http.post('/user/updateUserLevel', o, t, p))
export const checkRecommendShareCode        = (o, t, p) => (http.post('/user/checkRecommendShareCode', o, t, p))

export const getTaskInfo              = (o, t, p) => (http.post('/task/getTaskInfo', o, t, p))
export const updateTask               = (o, t, p) => (http.post('/task/updateTask', o, t, p))
export const uploadTaskIcon           = (o, t, p) => (http.post('/task/uploadTaskIcon', o, t, p))
export const auditEntryFormUser       = (o, t, p) => (http.post('/task/auditEntryFormUser', o, t, p))
export const rewardEntryFromUser      = (o, t, p) => (http.post('/task/rewardEntryFromUser', o, t, p))
export const getEntryFormInfo         = (o, t, p) => (http.post('/task/getEntryFormInfo', o, t, p))
export const getTaskPage              = (o, t, p) => (http.post('/task/getTaskPage', o, t, p))
export const addTask                  = (o, t, p) => (http.post('/task/addTask', o, t, p))

export const statisticUserProfilePage = (o, t, p) => (http.get('/report/getUserProfilePage', o, t, p))
export const loginApi                 = (o, t, p) => (http.post('/unauth/account/login', o, t, p))

export const addManage                = (o, t, p) => (http.post('/manage/addManage', o, t, p))
export const deleteManage                = (o, t, p) => (http.post('/manage/deleteManage', o, t, p))
export const getTaskPageManage        = (o, t, p) => (http.post('/manage/getTaskPage', o, t, p))
export const updateManage             = (o, t, p) => (http.post('/manage/updateManage', o, t, p))
