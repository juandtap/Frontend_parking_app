import { Vehiculo } from "./vehiculo"

export class Ticket {
    id?: number
    horaEntrada: any
    horaSalida: any
    tiempoParqueo?: number
    estadoSalida: boolean = false

    vehiculo!: Vehiculo
}
