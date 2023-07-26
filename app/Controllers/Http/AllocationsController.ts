import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Allocation from 'App/Models/Allocation';

import Professor from "App/Models/Professor";
import Room from 'App/Models/Room';
import Student from 'App/Models/Student';

export default class AllocationsController {
    public async store({request, response}:HttpContextContract){
        const body= request.body()
        const professor = await Professor.findByOrFail('registration_number', body.registration_professor);
        const room = await Room.findByOrFail('room_number', body.room_number);
        const student = await Student.findByOrFail('email', body.email_student);

        const createAllocation = {professor_id: professor.id, room_id: room.id, student_id: student.id}
        console.log(createAllocation)
        const allocation = await Allocation.create(createAllocation)

        response.status(201)

        return {
            message: "allocation created",
            data: allocation
        }
    }
}
