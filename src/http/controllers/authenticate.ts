import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-autheticate-factory-use-cases";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodyShema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { email, password } = authenticateBodyShema.parse(request.body);

    try {
      const authenticateUseCase = makeAuthenticateUseCase()

      await authenticateUseCase.execute({
        email,
        password,
      });
      
    } catch (err) {
      if(err instanceof InvalidCredentialsError){
        return reply.status(400).send({message:err.message});
      }

      throw err
    }

    return reply.status(200).send();
}
