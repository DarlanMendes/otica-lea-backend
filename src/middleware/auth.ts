import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../domain/entities/user.entity';


interface RequestAuth extends Request{
    user?:User
}


export const authenticateToken = (req: RequestAuth, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401); // Se não há token, retorna não autorizado
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Token inválido, retorna proibido
    }

    req.user = user as User; // Adiciona o usuário ao objeto de request
    next(); // Passa o controle para o próximo middleware
  });
};
