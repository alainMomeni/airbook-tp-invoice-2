import { CustomerModel } from "./customer.model"
import { TravelItemModel } from "./travel_item"
import { InvoiceModel } from "./invoice.model"
import { PaymentModel } from "./payment.model"
import { PaymentIdModel } from "./paymentId.model"


export type AllModel = | CustomerModel | TravelItemModel | InvoiceModel | PaymentModel | PaymentIdModel

export * from "./invoice.model"
export * from "./travel_item"
export * from "./customer.model"
export * from "./payment.model"
export * from "./paymentId.model"
export * from "./response"

