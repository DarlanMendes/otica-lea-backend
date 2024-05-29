import { IUserRepository } from "./../../domain/repositories/userRepository";
import { User } from "./../../domain/entities/user.entity"

interface FindUniqueUserRequest {
  id: string;
  
}

export class FindUniqueUser {
  constructor(private userRepository: IUserRepository) {}

   execute(request: FindUniqueUserRequest): Promise<User> {
    if(!request.id){
        throw new Error("id inválido")
    }
   return this.userRepository.findById(request.id);
   
    
  }
}
