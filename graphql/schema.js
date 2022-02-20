import { gql } from 'apollo-server-core'

const typeDefs = gql`
    type Query {
        videosForHome: [Video!]!
        video(id: ID!): Video!
    }
    type Mutation {
        addVideo(input: AddVideoInput!): AddVideoResponse!
        deleteVideo(input: DeleteVideoInput!): DeleteVideoResponse!
    }
    type Video {
        id: ID!
        "Video title"
        title: String!
        thumbnail: String
        description: String
        owner: User!
        length: Int
    }
    type User {
        id: ID!
        name: String!
        email: String!
    }
    type AddVideoResponse {
        success: Boolean!
        message: String!
        video: Video
    }
    type DeleteVideoResponse {
        success: Boolean!
        message: String!
    }
    input AddVideoInput {
        title: String!
        description: String
        thumbnail: String
        length: Int
    }
    input DeleteVideoInput {
        id: ID!
    }
`

export default typeDefs
