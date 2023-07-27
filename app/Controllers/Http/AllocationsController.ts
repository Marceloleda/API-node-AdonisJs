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

        if(room.is_avaliable === false){
            return response.status(401).send({message: "it is not possible to relocate students in this room"})
        }
        
        const totalAllocationsInRoom = await Allocation.query().where('room_id', room.id).count('id as count');
        const totalStudentsInRoom = totalAllocationsInRoom[0].$extras.count;
        console.log(totalStudentsInRoom)
        if (totalStudentsInRoom >= room.capacity) {
          return response.status(409).send({ message: 'Room capacity exceeded' });
        }
        
        const allocationStudent = await Allocation.query()
        .where('student_id', student.id)
        .where('room_id', room.id)
        .first();

        if(room.professor_id !== professor.id){
            return response.status(401).send({message: "teacher is not the owner of this room"})
        }
        if (allocationStudent) {
        return response.status(409).send({ message: "student already in this classroom" });
        }

        const createAllocation = {professor_id: professor.id, room_id: room.id, student_id: student.id}
        const allocation = await Allocation.create(createAllocation)

        response.status(201)

        return {
            message: "allocation created",
            data: allocation
        }
    }
    public async destroy({params, response}:HttpContextContract){
        const room = await Room.findByOrFail('room_number', params.room_number);
        const student = await Allocation.query()
        .where('student_id',params.idStudent)
        .where('room_id', room.id)
        .first();

        if (!student) {
            response.status(404)
            return {
              message: 'Student not found in this room',
            };
        }
      
        await student.delete();
        return {
            message: "student deleted successfully",
            data: student,
        }
    }
    public async index({ params, response }: HttpContextContract) {
        const room = await Room.findBy('room_number', params.room);
        if (!room) {
          response.status(404);
          return {
            message: 'Room not found in this room',
          };
        }
        const roomStudents = await Allocation.query().where('room_id', room.id).preload('students');
        const students = roomStudents.map((allocation) => allocation.students);

        return {
          data: students,
        };
    }
}
