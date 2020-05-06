const weekArr = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

let monthArr = []
for (let i = 1; i <= 30; i++) {
  monthArr.push(i.toString())
}

let yearArr = []
for (let i = 1; i <= 12; i++) {
  yearArr.push(i.toString() + '月')
}

const getRandomData = (arr: string[]) => {
  return arr.map((item) => {
    return {
      time: item,
      饮食: Math.round(Math.random() * 300),
      交通: Math.round(Math.random() * 300),
      娱乐: Math.round(Math.random() * 300),
      通讯费: Math.round(Math.random() * 300),
      生活消费: Math.round(Math.random() * 300),
      房租: Math.round(Math.random() * 300),
      房贷: Math.round(Math.random() * 300),
      其他: Math.round(Math.random() * 300)
    }
  })
}

export const testData = {
  week: getRandomData(weekArr),
  month: getRandomData(monthArr),
  year: getRandomData(yearArr)
}
