import { Prisma, User } from "@prisma/client"

// Interface que define o contrato do Repositório de Usuário (Abstrações)
export interface UsersRepository {
    // Novo método para buscar um usuário por email
    findByEmail(email: string): Promise<User |null>

    // Método de criação já existente
    create(data: Prisma.UserCreateInput): Promise<User>
}