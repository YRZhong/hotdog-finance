import { Catalog } from './catalog'
import { Payment } from './payment'

export const CatalogPieData = Catalog.map((item) => {
  return {
    id: item.label,
    label: item.label
  }
})

export const PaymentPieData = Payment.map((item) => {
  return {
    id: item.label,
    label: item.label
  }
})
