import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { UsersRepository } from "@/repositories/users-repository"; // Depende da Abstração

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

// SOLID 

// D - Dependency Inversion Principle

export class RegisterUseCase {
  // O construtor agora tipa a dependência como a Interface UsersRepository
  // O Use Case (Alto Nível) depende da Abstração (Interface)
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6);

    // Usando o novo método findByEmail através da Interface
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      // Recomenda-se criar erros de domínio específicos, mas para o exemplo:
      throw new Error('E-mail already exist.')
    }

    // const prismaUsersRepository = new PrismaUsersRepository()

    await this.usersRepository.create({
      name,
      email,
      password_hash
    })
  } 
}
