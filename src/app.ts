import fastify from "fastify";
import { appRoute } from "./http/route";

export const app = fastify()

app.register(appRoute)