import { User, Prisma, CheckIn } from "@prisma/client";
import { PrismaUsersRepository } from "../prisma/prisma-users-repository"
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements CheckInsRepository {
    
    public items: CheckIn[] = []


    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn =  {
            id: randomUUID(),
            userId: data.userId,
            gymId: data.gymId,
            validated_at: data.validated_at ? true : null,
            created_at: new Date()
        }

        this.items.push(checkIn)

        return checkIn
    }

}