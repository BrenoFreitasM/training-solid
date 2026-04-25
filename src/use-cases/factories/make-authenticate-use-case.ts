import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-respository"
import { RegisterUseCase } from "../register"
import { AuthenticateUseCase } from "../authenticate"

export function makeAuthenticateUseCase() {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    return authenticateUseCase
}