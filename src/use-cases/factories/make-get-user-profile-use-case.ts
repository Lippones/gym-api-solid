import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserProfileUseCase } from "../get-user-profile";

export function makeGetUserProfileUseCase(){
    const checkInsRepository = new PrismaUsersRepository();
    const useCase = new GetUserProfileUseCase(checkInsRepository);

    return useCase
}