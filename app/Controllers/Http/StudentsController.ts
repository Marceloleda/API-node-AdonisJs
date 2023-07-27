import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Allocation from 'App/Models/Allocation'

import Student from 'App/Models/Student'

export default class StudentsController {
    public async store({request, response}:HttpContextContract){
        const body = request.body()

        const student = await Student.create(body)
        response.status(201)
        return {
            message: "Student created",
            data: student
        }   
    }
    public async show({params}:HttpContextContract){
        const student = await Student.findOrFail(params.id)
        return {
            data: student
        }
    }
    public async destroy({params}:HttpContextContract){
        const student = await Student.findOrFail(params.id)
        await student.delete()
        return {
            message: "student deleted successfully",
            data: student,
        }
    }
    public async update({params, request}:HttpContextContract){
        const body = request.body()
        const student = await Student.findOrFail(params.id)

        student.name = body.name
        student.email = body.email
        student.registration_number = body.registration_number
        student.date_of_birth = body.date_of_birth

        await student.save()
        return {
            message: "updated",
            data: student,
        }
    }
    public async showAllocations({ params, response }: HttpContextContract) {
        const studentRegistration = params.registration;
        const student = await Student.findBy('registration_number', studentRegistration)
        if (!student) {
            response.status(404);
            return {
              message: 'student not found',
            };
          }

        const allocations = await Allocation.query()
          .where('student_id', student.id)
          .preload('room')
          .preload('professor');
    
        if (allocations.length === 0) {
          response.status(404);
          return {
            message: 'No allocations found for this student',
          };
        }
    
        return {
            student_name: student.name,
            allocations: allocations.map((allocation) => ({
              professor: allocation.professor.name,
              room_number: allocation.room.room_number,
            })),
        };
    }
}
