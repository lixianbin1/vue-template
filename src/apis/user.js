import require from './require'

const auto = import.meta.env.VITE_APP_Auto
const network = import.meta.env.VITE_APP_NetWork

export const Userlogin = function (data) {
  return require({
    url: `${network}/${auto}/user/login`,
    method: 'POST',
    data,
  })
}

export const UserList = function (params) {
  return require({
    url: `${network}/${auto}/user/list`,
    method: 'GET',
    params,
  })
}

export const UserAdd = function (data) {
  return require({
    url: `${network}/${auto}/user/create`,
    method: 'POST',
    data,
  })
}

export const UserInfo = function (params) {
  return require({
    url: `${network}/${auto}/user/info`,
    method: 'GET',
    params,
  })
}

export const UserLgout = function (params) {
  return require({
    url: `${network}/${auto}/user/exit`,
    method: 'GET',
    params,
  })
}

export const UserDelete = function (data) {
  return require({
    url: `${network}/${auto}/user/delete`,
    method: 'POST',
    data,
  })
}

export const UserUpdate = function (data) {
  return require({
    url: `${network}/${auto}/user/updata`,
    method: 'POST',
    data,
  })
}