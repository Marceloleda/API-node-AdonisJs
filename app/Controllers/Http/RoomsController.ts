import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Professor from 'App/Models/Professor'
import Room from 'App/Models/Room'

export default class RoomsController {
    public async store({request,params, response}:HttpContextContract){
        const body= request.body()
        const registration = params.registration
        const professor = await Professor.findByOrFail('registration_number', registration);
        const roomExist = await Room.findBy('room_number', body.room_number)

        if(roomExist && roomExist.professor_id === professor.id){
            return response.status(409).send({message: "the teacher already has this room"})
        }
        const createRoom = {...body, professor_id: professor.id}
        console.log(createRoom)
        const room = await Room.create(createRoom)

        response.status(201)

        return {
            message: "room created",
            data: room
        }
    }
    public async update({params, request, response}:HttpContextContract){
        const body = request.body()
        const {registration, roomNumber} = params

        const professor = await Professor.findByOrFail('registration_number', registration);
        const room = await Room.findByOrFail("room_number", roomNumber)
        if(professor.id !== room.professor_id){
            response.status(401)
            return
        }
        room.room_number = body.room_number
        room.capacity = body.capacity
        room.is_avaliable = body.is_avaliable

        await room.save()
        return {
            message: "updated",
            data: room,
        }
    }
    public async destroy({params, response}:HttpContextContract){
        const {registration, idRoom} = params
        const professor = await Professor.findByOrFail('registration_number', registration);
        const room = await Room.findOrFail(idRoom)
        if(professor.id !== room.professor_id){
            response.status(401)
            return
        } 
        await room.delete()
        return {
            message: "room deleted successfully",
            data: room,
        }
    }
    public async show({params, response}:HttpContextContract){
        const {registration, idRoom} = params
        const professor = await Professor.findByOrFail('registration_number', registration);
        const room = await Room.findOrFail(idRoom)
        if(professor.id !== room.professor_id){
            response.status(401)
            return
        } 
        return {
            data: room
        }
    }
}
