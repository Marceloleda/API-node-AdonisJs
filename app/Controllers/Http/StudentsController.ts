import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Student from 'App/Models/Student'

export default class StudentsController {
    public async store({request, response}:HttpContextContract){
        const body = request.body()
        // const findStudentbyEmail = await Student.firstOrNew(body.email)
        // const findStudentbyRegistration = await Student.firstOrNew(body.registration_number)
        // if(findStudentbyEmail || findStudentbyRegistration){
        //     return response.status(409)
        // }
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
}
