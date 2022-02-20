import { ForbiddenError } from 'apollo-server-core'
import { getUserById } from '../models/user.js'
import {
    createVideo,
    getVideoById,
    deleteVideoById,
    getVideosByOwnerId,
} from '../models/video.js'
import { requireUser } from '../permissions.js'

const resolvers = {
    Video: {
        id: (parent) => parent._id.toString(),
        owner: (parent, args, ctx, info) => {
            return getUserById(parent.owner || parent.owner._id)
        },
    },
    User: {
        id: (parent) => parent._id.toString(),
    },
    Query: {
        videosForHome: requireUser((parent, args, ctx, info) => {
            return getVideosByOwnerId(ctx.user._id)
        }),
        video: (parent, { id }, ctx, info) => {
            return getVideoById(id)
        },
    },

    Mutation: {
        addVideo: requireUser(async (_, args, ctx, info) => {
            const { title, description, thumbnail, length } = args.input
            const owner = ctx.user

            if (title.trim() === '' || title.length < 3)
                return {
                    success: false,
                    message: `title is too short`,
                }

            const newVideo = await createVideo({
                title,
                description,
                thumbnail,
                length,
                owner,
            })

            return {
                success: true,
                message: `Video created successfully`,
                video: newVideo,
            }
        }),
        deleteVideo: requireUser(async (_, args, ctx, info) => {
            const { id } = args.input
            const owner = ctx.user

            const video = await getVideoById(id)
            if (!video)
                return {
                    success: false,
                    message: `Video does not exist`,
                }

            if (video.owner.toString() !== owner._id.toString())
                throw ForbiddenError('Cannot update this resource')

            await deleteVideoById(id)
            return {
                success: true,
                message: `Video deleted successfully`,
            }
        }),
    },
}

export default resolvers
