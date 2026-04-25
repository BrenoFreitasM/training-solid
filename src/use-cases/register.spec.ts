import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from './errors/users-already-exists-error'
import { makeRegisterUseCase } from './factories/make-register-use-case'

describe('Register Use Case', () => {
    it('should be able to register', async () => {

        const registerUseCase = makeRegisterUseCase()

        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'jhondoe@example.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {

        const registerUseCase = makeRegisterUseCase()

        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'jhondoe@example.com',
            password: '123456'
        })


        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async() => {

        const registerUseCase = makeRegisterUseCase()

        const email = 'johndoe@example.com'

        registerUseCase.execute({
            name: 'John Doe',
            email,
            password: '123456'
        })
        
        await expect(() => 
            registerUseCase.execute({
                name: 'John Doe',
                email,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)

        
    })
})