import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Professor from 'App/Models/Professor'
import Room from 'App/Models/Room'

export default class RoomsController {
    public async store({request,params, response}:HttpContextContract){
        const body= request.body()
        const professorId = params.registration
        const professor = await Professor.findByOrFail('registration_number', professorId);

        const createRoom = {...body, professor_id: professor.id}
        console.log(createRoom)
        const room = await Room.create(createRoom)

        response.status(201)

        return {
            message: "room created",
            data: room
        }
    }
}
