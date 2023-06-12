import {expect,describe,it, beforeEach} from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository:InMemoryGymsRepository
let sut:CreateGymUseCase

describe("Create Gym Use Case",()=>{
    beforeEach(()=>{
        gymsRepository = new InMemoryGymsRepository()
        sut = new CreateGymUseCase(gymsRepository)
    })
    it('should be to create gym',async()=>{

        const {gym} = await sut.execute({
            title:'Academia 05',
            description:null,
            latitude:-23.5630991,
            longitude:-46.6565712,
            phone:null
        })

        expect(gym.id).toEqual(expect.any(String))
    })
})