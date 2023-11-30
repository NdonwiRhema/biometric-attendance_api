import { Column, Entity,PrimaryGeneratedColumn } from "../../../node_modules/typeorm/index";


@Entity()
export class Biometrics {
    @PrimaryGeneratedColumn()
    id
    @Column({type:'int',nullable:true})
    print_id

    @Column({type:'varchar',unique:false,nullable:true})
    device_id

    @Column({type:'varchar',unique:true,nullable:true})
    owner_id

    @Column({type:'blob',nullable:true,width:16383})
    printTemplate
    
    @Column({type:'varchar',nullable:true})
    template_extract

    @Column({type:'int'})  // will either be Idle or Await
    device_status

    @Column({type:'datetime'})
    created_at

}