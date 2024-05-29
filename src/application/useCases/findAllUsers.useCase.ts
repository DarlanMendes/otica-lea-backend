import { IUserRepository } from "../../domain/repositories/userRepository";
import { User } from "../../domain/entities/user.entity";

export class FindAllUsers{
    constructor(private userRepository:IUserRepository){}
    async execute():Promise<User[]>{
        return  this.userRepository.findAll()
    }
}