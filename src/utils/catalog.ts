export interface CatalogType {
  value: string
  label: string
}

export const Catalog: CatalogType[] = [
  {
    value: 'food',
    label: '饮食'
  },
  {
    value: 'transport',
    label: '交通'
  },
  {
    value: 'entertainment',
    label: '娱乐'
  },
  {
    value: 'phoneBill',
    label: '通讯费'
  },
  {
    value: 'normal',
    label: '生活消费'
  },
  {
    value: 'houseRent',
    label: '房租'
  },
  {
    value: 'houseLoan',
    label: '房贷'
  },
  {
    value: 'ohters',
    label: '其他'
  }
]
