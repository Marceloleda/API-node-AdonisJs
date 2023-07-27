import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Professor from 'App/Models/Professor'
import { DateTime } from 'luxon'

export default class ProfessorsController {
    public async store({request, response}:HttpContextContract){
        const body = request.body()
        const studentEmailExist = await Professor.findBy('email', body.email)
        const studentRegistrationExist = await Professor.findBy('registration_number', body.registration_number)
        const isValidDate = DateTime.fromISO(body.date_of_birth).isValid;
        if(studentEmailExist || studentRegistrationExist){
            return response.status(409).send({message: "Professor already exist!"})
        }
        if(!isValidDate){
            return response.status(422).send({message: "invalid date!"})
        }

        const professor = await Professor.create(body)
        response.status(201)
        return {
            message: "professor created",
            data: professor
        }   
    }
    public async show({params}:HttpContextContract){
        const professor = await Professor.findOrFail(params.id)
        return {
            data: professor
        }
    }
    public async destroy({params}:HttpContextContract){
        const professor = await Professor.findOrFail(params.id)
        await professor.delete()
        return {
            message: "professor deleted successfully",
            data: professor,
        }
    }
    public async update({params, request}:HttpContextContract){
        const body = request.body()
        const professor = await Professor.findOrFail(params.id)

        professor.name = body.name
        professor.email = body.email
        professor.registration_number = body.registration_number
        professor.date_of_birth = body.date_of_birth

        await professor.save()
        return {
            message: "updated",
            data: professor,
        }
    }
}
