import { Tarifa } from "./tarifa"
import { Ticket } from "./ticket"

export class Factura {
    id?: number
    numero: string = ""
    fecha:any
    total?:number
    ticket!:Ticket
    tarifa!:Tarifa

}
