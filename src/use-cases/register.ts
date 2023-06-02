import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: any) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const prismaUsersRepositoty = new PrismaUsersRepository();

    const password_hash = await hash(password, 6);

    const userWithSameEmail = await prismaUsersRepositoty.findUserById(email);

    if (userWithSameEmail) {
      throw new Error("Email already exists.");
    }

    this.usersRepository.create({
      name,
      email,
      password: password_hash,
    });
  }
}
