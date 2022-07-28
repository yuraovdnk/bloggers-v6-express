import mongoose, {ObjectId} from "mongoose";
///Reuse types


////////////Blogger Types

export type BloggerInputType = {
    name: string
    youtubeUrl: string
}
export type BloggerSchemaType =
    BloggerInputType &
    {
        _id: mongoose.Types.ObjectId
    }

export type BloggerViewType =
    BloggerInputType &
    {
        id: mongoose.Types.ObjectId
    }
////////////Post Types

export type PostInputType = {
    title: string
    shortDescription: string
    content: string
    bloggerId: mongoose.Types.ObjectId
}
export type PostSchemaType =
    PostInputType &
    {
        _id: mongoose.Types.ObjectId
    }

export type PostViewType =
    PostInputType &
    {
        id: mongoose.Types.ObjectId
        bloggerName: string
    }


////////////////////////User Types

export type UserType = {
    accountData: AccountDataType,
    emailConfirmation: EmailConfirmationType
}
export type UserSchemaType =
    UserType &
    {
        _id: mongoose.Types.ObjectId,
    }

export type UserViewType = {
    id: mongoose.Types.ObjectId
    login: string
}
export type AccountDataType = {
    login: string,
    email: string,
    passwordHash: string,
    createdAt: Date,
}


type EmailConfirmationType = {
    confirmationCode: string,
    expirationDate: Date,
    isConfirmed: boolean
}
//////////////////////////////

export type CommentInputType = {
    content: string,
    userId: mongoose.Types.ObjectId,
    postId: mongoose.Types.ObjectId,
    userLogin: string,
    addedAt: Date
}

export type CommentSchemaType =
    CommentInputType &
    {
        _id: mongoose.Types.ObjectId,
    }
export type CommentViewType =
    {
        id: mongoose.Types.ObjectId,
        content: string,
        userId: mongoose.Types.ObjectId,
        userLogin: string,
        addedAt: Date
    }

export type TokenType = {
    _id: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId
    refreshToken: string
}
