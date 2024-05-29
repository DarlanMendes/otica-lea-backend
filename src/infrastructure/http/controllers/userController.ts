import { Request, Response } from "express";
import { CreateUser } from "./../../../application/useCases/createUser.useCase";
import { FindUniqueUser } from "../../../application/useCases/findUserById.useCase";
import { PrismaUserRepository } from "./../../database/prisma/prismaUserRepository";
import { FindAllUsers } from "../../../application/useCases/findAllUsers.useCase";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userRepository = new PrismaUserRepository();
const createUser = new CreateUser(userRepository);
const findUniqueUser  = new FindUniqueUser(userRepository)
const findAllUsers = new FindAllUsers(userRepository)
export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    

    try {
      const hashedPassword = await bcrypt.hash(password,10)
      const user = await createUser.execute({ name, email, password:hashedPassword});
      return res.status(201).json(user);
    } catch (error:any) {
      return res.status(400).json({ error: error.message });
    }
  }
  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
   
    try {
      const user = await userRepository.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      console.log(password, user)
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      console.log(process.env.SECRET_KEY)
      const token = jwt.sign({ userId: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  async findById(req:Request, res:Response):Promise<Response>{
    const {id} = req.params
    try{
      const user = await findUniqueUser.execute({id});
      return res.status(200).json(user);
    }catch(error:any){
      return res.status(400).json({error:error.message})
    }
  }
  async findAll(req:Request, res:Response):Promise<Response>{
    try{
      const users = await findAllUsers.execute();
      return res.status(200).json(users);
    }catch(error:any){
      return res.status(400).json({error:error.message})
    }
  }
}
