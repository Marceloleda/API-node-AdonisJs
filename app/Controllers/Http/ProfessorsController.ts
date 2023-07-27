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
    public async show({params, response}:HttpContextContract){
        const professor = await Professor.findBy('registration_number',params.id)
        if(!professor){
            return response.status(404).send({message: "not found professor!"})
        }
        return {
            data: professor
        }
    }
    public async destroy({params, response}:HttpContextContract){
        const professor = await Professor.findBy('registration_number', params.id)
        if(!professor){
            return response.status(404).send({message: "not found professor!"})
        }
        await professor.delete()
        return {
            message: "professor deleted successfully",
            data: professor,
        }
    }
    public async update({params, request, response}:HttpContextContract){
        const body = request.body()
        const professor = await Professor.findBy('registration_number', params.id)
        if(!professor){
            return response.status(404).send({message: "not found professor!"})
        }
        const isValidDate = DateTime.fromISO(body.date_of_birth).isValid;

        if(!isValidDate){
            return response.status(422).send({message: "invalid date!"})
        }
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
