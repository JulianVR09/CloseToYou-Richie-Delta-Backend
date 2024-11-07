import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid'

@Entity()
export class Contact {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;
    
    @Column()
    phone: string;

    @Column()
    email: string;

    @ManyToOne(() => User)
    @JoinColumn({
        name: 'userId',
        referencedColumnName: 'id'
    })
    user: User

    constructor(){
        if(!this.id){
            this.id = uuidv4();
        }
    }
}
