import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Professor from 'App/Models/Professor'
import Room from 'App/Models/Room'
import Student from 'App/Models/Student'


export default class Allocation extends BaseModel {
  @hasMany(() => Student)
  public student: HasMany<typeof Student>

  @column({ isPrimary: true })
  public id: number

  @column()
  public professor_id: number
  
  @column()
  public room_id: number
  
  @column()
  public student_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Professor, {
    foreignKey: 'professor_id', 
  })
  public professor: BelongsTo<typeof Professor>;

  @belongsTo(() => Room, {
    foreignKey: 'room_id', 
  })
  public room: BelongsTo<typeof Room>;

  @belongsTo(() => Student, {
    foreignKey: 'student_id', 
  })
  public students: BelongsTo<typeof Student>;

}
