import { Gym } from "@prisma/client";

export interface GymsRepository{
    findGymById(id:string):Promise<Gym | null>
}