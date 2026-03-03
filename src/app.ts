import fastify from "fastify";
import { env } from "./env";
import { appRoute } from "./http/route";
import { ZodError } from "zod";

export const app = fastify()

app.register(appRoute)

app.setErrorHandler((error, request, reply) => {
    if ( error instanceof ZodError) {
        return reply
        .status(400)
        .send({ message: 'Validation error', issues: error.format() })
    }

    if (env.NODE_ENV !== 'production') {
        console.log(error)
    }

    return reply.status(500).send({ message: 'Internal server error'})
})