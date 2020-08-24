import {Request, Response} from 'express';
import db from '../database/connection';

export default class UsersController{
   
    async index(request: Request, response: Response) {
        const totalUsers = await db('users').count('* as total');

        const { total } = totalUsers[0];

        return response.json({ total });
    }
   
    async create(request: Request, response: Response) {
        const { id, name, avatar, whatsapp, bio } = request.body;

        await db('users').insert({
            id,
            name,
            avatar,
            whatsapp, 
            bio,
        });
        return response.status(201).send();
    }

    async delete(request: Request, response: Response) {
        const deleteUser = request.params.id;
        
        await db('users').delete(deleteUser);
            //Retornar erro quando não conseguir apagar no banco de dados
            if(deleteUser) return response.status(400).json({
                error: true,
                message: "Error: Usuário não foi deletado com sucesso!"
            });
            //Retornar mensagem de sucesso quando excluir o registro com sucesso no banco de dados
            return response.json({
                error: false,
                message: "Usuário deletado com sucesso!"
            });
    }
}