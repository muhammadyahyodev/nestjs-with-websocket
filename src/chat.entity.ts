import { Column, DataType, Table, Model } from 'sequelize-typescript';

@Table({ tableName: 'Chat' })
export class Chat extends Model<Chat> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  text: string;
}
