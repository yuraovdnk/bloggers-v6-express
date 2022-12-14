import mongoose from "mongoose";
///Reuse types


////////////Blogger Types

export type BloggerInputType = {
    name: string
    youtubeUrl: string
}
export type BloggerSchemaType =
    {
        _id: mongoose.Types.ObjectId
        name: string
        youtubeUrl: string

    }

export type BloggerViewType =
    {
        id: mongoose.Types.ObjectId
        name: string
        youtubeUrl: string
    }
////////////Post Types

export type PostInputType = {
    title: string
    shortDescription: string
    content: string
    bloggerId: mongoose.Types.ObjectId

}
export type PostSchemaType =
    {
        _id: mongoose.Types.ObjectId
        title: string
        shortDescription: string
        content: string
        bloggerId: mongoose.Types.ObjectId
        blogger: BloggerSchemaType
    }

export type PostViewType =
    {
        id: mongoose.Types.ObjectId
        title: string
        shortDescription: string
        content: string
        bloggerId: mongoose.Types.ObjectId
        bloggerName: string
    }


////////////////////////User Types

export type UserType = {
    accountData: AccountDataType,
    emailConfirmation: EmailConfirmationType
}
export type UserSchemaType =
    {
        _id: mongoose.Types.ObjectId,
        accountData: AccountDataType,
        emailConfirmation: EmailConfirmationType
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
    {
        _id: mongoose.Types.ObjectId,
        content: string,
        userId: mongoose.Types.ObjectId,
        postId: mongoose.Types.ObjectId,
        userLogin: string,
        addedAt: Date
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
