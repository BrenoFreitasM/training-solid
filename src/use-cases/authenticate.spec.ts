import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-respository'
import { hash } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-errors'

describe('Authenticate Use Case', () => {
    it('should be able to register', async () => {

        const usersRepository = new InMemoryUsersRepository()
        // Sistem Under Teste -> Principal varíavel a ser testada
        const sut = new AuthenticateUseCase(usersRepository)

        await usersRepository.create({
            name: 'John Doe',
            email: 'jhondoe@example.com',
            password_hash: await hash('123456', 6)
        })
    
        const { user } = await sut.execute({
            email: 'jhondoe@example.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async() => {

        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        expect(() => sut.execute({
            email: 'jhondoe@example.com',
            password: '123456'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)

    })

    it('should not be able to authenticate with wrong password', async() => {

        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        await usersRepository.create({
            name: 'John Doe',
            email: 'jhondoe@example.com',
            password_hash: await hash('123456', 6)
        })

        expect(() => sut.execute({
            email: 'jhondoe@example.com',
            password: '123'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)

    })
})