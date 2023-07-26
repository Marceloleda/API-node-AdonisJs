import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public room_number: string

  @column()
  public capacity: number

  @column()
  public is_avaliable: boolean

  @column()
  public professor_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
