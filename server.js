import { ApolloServer } from 'apollo-server-express'
import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core'
import http from 'http'
import dotenv from 'dotenv'
import resolvers from './graphql/resolver.js'
import app from './app.js'
import connectToMongo from './mongo.js'
import typeDefs from './graphql/schema.js'
import applyAuthMiddleware from './middlewares/auth.js'
import { getAndVerifyJWT } from './jwt.js'

dotenv.config()

async function startServer() {
    await connectToMongo()

    const httpServer = http.createServer(app)

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
        context: ({ req }) => {
            const payload = getAndVerifyJWT(req)
            let user = payload?.user
            //console.log(user)
            return {
                user,
                req,
            }
        },
    })
    await server.start()
    server.applyMiddleware({ app })
    await new Promise((resolve) =>
        httpServer.listen({ port: process.env.PORT || 8080 }, resolve)
    )
    console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
}

startServer()
