import require from './require'

const auto = import.meta.env.VITE_APP_Auto
const network = import.meta.env.VITE_APP_NetWork

interface BaiduResponse {
  name: string;
}
export const baiduHomepage = function (params?:object):Promise<BaiduResponse> {
  return require({
    url: `${network}/${auto}/text.json`,
    method: 'get',
    params,
  })
}