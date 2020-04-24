export interface CatalogType {
  value: string
  lable: string
}

export const Catalog: CatalogType[] = [
  {
    value: 'food',
    lable: '饮食'
  },
  {
    value: 'transport',
    lable: '交通'
  },
  {
    value: 'entertainment',
    lable: '娱乐'
  },
  {
    value: 'phoneBill',
    lable: '通讯费'
  },
  {
    value: 'normal',
    lable: '生活消费'
  },
  {
    value: 'houseRent',
    lable: '房租'
  },
  {
    value: 'houseLoan',
    lable: '房贷'
  },
  {
    value: 'ohters',
    lable: '其他'
  }
]