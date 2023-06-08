import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import {expect,describe,it} from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe("Register Use Case",()=>{
    it('should be to register',async()=>{
        const usersRepository = new InMemoryUsersRepository
        const registerUseCase = new RegisterUseCase(usersRepository)

        const {user} = await registerUseCase.execute({
            name:'test',
            email:'test@email.com',
            password:'123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration',async()=>{
        const usersRepository = new InMemoryUsersRepository
        const registerUseCase = new RegisterUseCase(usersRepository)

        const {user} = await registerUseCase.execute({
            name:'test',
            email:'test@email.com',
            password:'123456'
        })

        const isPasswordCorrectlyHashed = await compare('123456',user.password)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })
    
    it('Should not be able to register with same email twice',async()=>{
        const usersRepository = new InMemoryUsersRepository
        const registerUseCase = new RegisterUseCase(usersRepository)

        const email = 'test@email.com'

        await registerUseCase.execute({
            name:'test',
            email:email,
            password:'123456'
        })
        
        await expect(()=>registerUseCase.execute({
            name:'test',
            email:email,
            password:'123456'
        })).rejects.toBeInstanceOf(UserAlreadyExistsError)

    })
})