import require from './require'

const auto = import.meta.env.VITE_APP_Auto
const network = import.meta.env.VITE_APP_NetWork

export const RoleList = function (params) {
  return require({
    url: `${network}/${auto}/role/list`,
    method: 'GET',
    params,
  })
}

export const RoleDelete = function (data) {
  return require({
    url: `${network}/${auto}/role/delete`,
    method: 'POST',
    data,
  })
}

export const RoleUpdate = function (data) {
  return require({
    url: `${network}/${auto}/role/update`,
    method: 'POST',
    data,
  })
}
