import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Professor from 'App/Models/Professor'
import Room from 'App/Models/Room'

export default class RoomsController {
    public async store({request,params, response}:HttpContextContract){
        const body= request.body()
        const registration = params.registration
        const professor = await Professor.findBy('registration_number', registration);
        if(!professor){
            return response.status(404).send({message: "not found professor"})
        }

        const existingRoom = await Room.query()
        .where('room_number', body.room_number)
        .where('professor_id', professor.id)
        .first();   

        if (existingRoom) {
            return response.status(409).send({ message: "The professor already has a room with this number" });
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

        const professor = await Professor.findBy('registration_number', registration);
        const room = await Room.findBy("room_number", roomNumber)
        if(!professor){
            return response.status(404).send({message: "not found professor"})
        }
        if(!room){
            return response.status(404).send({message: "not found room"})
        }
        if(professor.id !== room.professor_id){
            response.status(401).send({message: "unauthorized access"})
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
            response.status(401).send({message: "this room does not belong to you"})
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
