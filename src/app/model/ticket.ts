import { Vehiculo } from "./vehiculo"

export class Ticket {
    id?: number
    horaEntrada: any
    horaSalida: any
    tiempoParqueo: number =0
    estadoSalida: boolean = false

    vehiculo!: Vehiculo
}
