import{Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Products{
    @PrimaryGeneratedColumn()
    id
    @Column({unique:true, type: 'varchar'})
    title

    @Column({type:'varchar',nullable:true})
    description

    @Column({type:'int',nullable:false})
    price

    @Column({type:'date'})
    created_at
  


}