import Mock from 'mockjs'

Mock.setup({
  // 延时400请求到数据
  timeout: 400,
})

// 批量导入文件
const importFn = (data) => {
  let mockArr = []
  const dataArr = Object.entries(data) //获取对象数组
  for (const [, value] of dataArr) {
    if (value) {
      mockArr.push(...value)
    } else {
      mockArr.push(value)
    }
  }
  return mockArr
}

//批量加载 Mock 数据模块
function getAllMock() {
  let mocks = []
  if (import.meta.env.VITE_APP_MOCK === 'MOCK') {
    const mockApis = import.meta.glob(['./modules/*.js'], {
      eager: true,
      import: 'default',
    })
    mocks = importFn(mockApis)
  }
  return mocks
}

export const allMock = getAllMock()

allMock.forEach((mock) => {
  Mock.mock(mock.url, mock.type, mock.response);
});
