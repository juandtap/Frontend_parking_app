import { Vehiculo } from "./vehiculo"

export class Ticket {
    id?: number
    horaEntrada?: Date
    horaSalida?: Date
    tiempoParqueo: number =0
    estadoSalida: boolean = false

    vehiculo!: Vehiculo
}
