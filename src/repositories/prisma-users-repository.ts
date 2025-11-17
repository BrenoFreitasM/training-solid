import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client"
import { UsersRepository } from "./users-repository"; // Importar a Abstração

export class PrismaUsersRepository {
    // Implementação do novo método
    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        return user 
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = await prisma.user.create({
            data
        })

        return user
    }
}