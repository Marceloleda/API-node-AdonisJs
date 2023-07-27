import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Allocation from 'App/Models/Allocation'

import Student from 'App/Models/Student'
import { DateTime } from 'luxon'

export default class StudentsController {
    public async store({request, response}:HttpContextContract){
        const body = request.body()
        const studentEmailExist = await Student.findBy('email', body.email)
        const studentRegistrationExist = await Student.findBy('registration_number', body.registration_number)
        const isValidDate = DateTime.fromISO(body.date_of_birth).isValid;
        if(studentEmailExist || studentRegistrationExist){
            return response.status(409).send({message: "Student already exist!"})
        }
        if(!isValidDate){
            return response.status(422).send({message: "invalid date!"})
        }
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
    public async destroy({params, response}:HttpContextContract){
        const student = await Student.findBy('id', params.id)
        if(!student){
            return response.status(404).send({message: "not found student!"})
        }
        await student.delete()
        return {
            message: "student deleted successfully",
            data: student,
        }
    }
    public async update({params, request, response}:HttpContextContract){
        const body = request.body()
        const student = await Student.findBy('id', params.id)
        if(!student){
            return response.status(404).send({message: "not found student!"})
        }
        const isValidDate = DateTime.fromISO(body.date_of_birth).isValid;

        if(!isValidDate){
            return response.status(422).send({message: "invalid date!"})
        }
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
