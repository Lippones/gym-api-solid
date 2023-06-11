import { Prisma, User } from "@prisma/client";

export interface UsersRepository{
    create(data:Prisma.UserCreateInput):Promise<User>
    findUserById(id:string):Promise<User | null>
    findUserByEmail(email:string):Promise<User | null>
}