import { Schema, Model, Document, model } from "mongoose"
import bcrypt from "bcrypt"

/**
 * @description How to type Statics and Methods in TypeScript
 * @link https://mongoosejs.com/docs/typescript/statics-and-methods.html
 */

export interface IUser extends Document {
    name: string
    email: string
    password: string
    profilePicture?: string
    tokens?: {
        token: string
        signedAt: string
    }[]
}

type UserSchemaAsJson = {
    name: string
    email: string
    profilePicture?: string
}

interface IUserMethods {
    comparePassword: (password: string) => Promise<boolean>
    asjson: () => UserSchemaAsJson
}

interface IUserModel extends Model<IUser, {}, IUserMethods> {
    isEmailRedundant: (email: string) => Promise<boolean>
}

const UserSchema = new Schema<IUser, IUserModel, IUserMethods>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: false,
    },
    tokens: [ { type: Object } ]
})

UserSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        bcrypt.hash(this.password, 8, (error, hash) => {
            if (error) return next(error)
            this.password = hash
            next()
        })
    }
})

UserSchema.statics.isEmailRedundant = async function (
    email: string
): Promise<boolean> {
    if (!email) throw new Error("Invalid Email Provided")

    try {
        const user = await this.findOne({ email })
        return user ? true : false
    } catch (error: any) {
        console.error(error.message)
        return false
    }
}

UserSchema.methods.comparePassword = async function (
    password: string
): Promise<boolean> {
    if (!password) throw new Error("Password parameter is required.")

    try {
        return await bcrypt.compare(password, this.password)
    } catch (error: any) {
        console.error(error.message)
        return false
    }
}

UserSchema.methods.asjson = function (): UserSchemaAsJson {
    return {
        name: this.name,
        email: this.email,
        profilePicture: this.profilePicture,
    }
}

const UserModel = model<IUser, IUserModel>("User", UserSchema, "Users")
export { UserModel }
