import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const registerBodyShema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = registerBodyShema.parse(request.body);

    try {
      const usersRepository = new PrismaUsersRepository();
      const registerUseCase = new RegisterUseCase(usersRepository);

      await registerUseCase.execute({
        name,
        email,
        password,
      });
    } catch (err) {
      return reply.status(409).send(err);
    }

    return reply.status(201).send("Usuário criado com sucesso");
  } catch (err) {
    return reply.status(404).send({ error: err });
  }
}
