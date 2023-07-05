
import { User } from './User'

export type Order = {
  _id: string
  orderItems: any
  shippingAddress: any
  paymentMethod: string
  user: User
  createdAt: string
  isPaid: boolean
  paidAt: string
  isDelivered: boolean
  deliveredAt: string
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
}