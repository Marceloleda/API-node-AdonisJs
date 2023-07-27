/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import Route from '@ioc:Adonis/Core/Route'



Route.group(()=>{
  Route.get('/', async () => {
    return { hello: 'world teste' }
  })
  Route.get('/health', async ({response}) => {
    const report = await HealthCheck.getReport()
    return report.healthy
      ? response.ok(report)
      : response.badRequest(report)
  })
  Route.get('students/:registration/allocations', 'StudentsController.showAllocations');
  Route.resource("/students", "StudentsController").apiOnly()
  Route.resource("/professors", "ProfessorsController").apiOnly()
  
  Route.post("/rooms/:registration/professor", "RoomsController.store")
  Route.put("/rooms/:registration/professor/:roomNumber", "RoomsController.update")
  Route.delete("/rooms/:registration/professor/:roomNumber", "RoomsController.destroy")
  Route.get("/rooms/:registration/professor/:roomNumber", "RoomsController.show")
  
  Route.get("/allocations/professor/:room", "AllocationsController.index")

  Route.resource("/allocations/professor/", "AllocationsController").apiOnly()
  Route.delete("/allocations/professor/:idStudent/room/:room_number", "AllocationsController.destroy")

}).prefix('/api')