import pkg from 'mongoose'
const { Schema, model } = pkg

const VideoSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        thumbnail: {
            type: String,
        },
        length: {
            type: Number,
        },
        owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { collection: 'video', timestamps: true }
)

export const Video = model('Video', VideoSchema)

export const getVideoById = async (id) => Video.findOne({ _id: id }).lean()

//You might want to add pagination to this in the future
export const getVideosByOwnerId = async (id) => Video.find({ owner: id }).lean()
export const deleteVideoById = async (id) => Video.findByIdAndDelete(id)
export const createVideo = async ({
    title,
    description,
    owner,
    thumbnail,
    length,
}) => {
    const video = await Video.create({
        title,
        description,
        owner: owner._id,
        thumbnail,
        length,
    })
    return video
}
