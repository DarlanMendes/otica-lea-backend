import { IUserRepository } from "./../../domain/repositories/userRepository";
import { User } from "./../../domain/entities/user.entity"

interface CreateUserRequest {
  name: string;
  email: string;
  password:string
}

export class CreateUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(request: CreateUserRequest): Promise<User> {
    const userExists = await this.userRepository.findByEmail(request.email);
    if (userExists) {
      throw new Error("User already exists.");
    }

    const user = new User('', request.name, request.email, request.password );
    
    return this.userRepository.create(user);
  }
}
