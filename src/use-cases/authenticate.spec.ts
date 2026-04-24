import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-respository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-errors'
import { RegisterUseCase } from './register'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        // Sistem Under Teste -> Principal varíavel a ser testada
        sut = new AuthenticateUseCase(usersRepository)
    })
    
    it('should be able to register', async () => {

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

        expect(() => sut.execute({
            email: 'jhondoe@example.com',
            password: '123456'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)

    })

    it('should not be able to authenticate with wrong password', async() => {


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