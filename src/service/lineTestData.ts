import {Catalog} from '@/utils/catalog'

const keys = Catalog.map(item => item.label)

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
  return keys.map(item => {
    return {
      id: item,
      data: arr.map(p => {
        return {
          x: p,
          y: Math.round(Math.random() * 300)
        }
      })
    }
  })
}

const getTotalRandomData = (arr: string[]) => {
  return [
    {
      id: '总花费',
      data: arr.map((item) => {
        return {
          x: item,
          y: Math.round(Math.random() * 1000)
        }
      })
    }
  ]
}

export const testData = {
  week: getRandomData(weekArr),
  month: getRandomData(monthArr),
  year: getRandomData(yearArr),
  weekTotal: getTotalRandomData(weekArr),
  monthTotal: getTotalRandomData(monthArr),
  yearTotal: getTotalRandomData(yearArr)
}
