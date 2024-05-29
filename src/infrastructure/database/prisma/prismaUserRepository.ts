
import { IUserRepository } from "./../../../domain/repositories/userRepository";
import { User } from "./../../../domain/entities/user.entity";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PrismaUserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
   console.log(user, 'test')
    const createdUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password
      },
    });

    return new User(createdUser.id, createdUser.name, createdUser.email);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    

    return user?new User(user.id, user.name, user.email, user.password):null;
  }
   async findById(id: string): Promise<Omit<User, 'password'>> {
      const user = await prisma.user.findUnique({where:{id}, select:{id:true, name:true, email:true}})
      

    return user?new User(user.id, user.name, user.email):null
  }
  async  findAll(): Promise<User[]> {
      let users = await prisma.user.findMany({select:{id:true, name:true, email:true}}) 

      users = users.map((user)=> new User(user.id, user.name, user.email))
      return users??null
  }
  
  
}
