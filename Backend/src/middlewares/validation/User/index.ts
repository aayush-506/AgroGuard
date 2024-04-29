import { check, validationResult } from "express-validator"
import { Request, Response, NextFunction } from "express"
import JWT, { JwtPayload } from "jsonwebtoken"
import { StatusCode } from "#@/utils"
import { JWT_SECRET } from "#@/secrets"
import { UserModel } from "#@/models/User"

export const UserSignupValidator = [
    check("name")
        .isString()
        .withMessage("Invalid: The provided name is invalid.")
        .trim()
        .notEmpty()
        .withMessage("Required: The name is required parameter.")
        .isLength({ min: 3, max: 20 })
        .withMessage("Length: The name must be 3-20 character long."),
    check("email")
        .isEmail()
        .withMessage("Invalid: The provided email is invalid."),
    check("password")
        .trim()
        .notEmpty()
        .withMessage("Required: The password is required paramter.")
        .isLength({ min: 8, max: 20 })
        .withMessage("Length: The password must be 8-20 characters long."),
    check("confirm_password")
        .custom((value, { req }) => value === req.body.password)
        .withMessage("Mismatched: Password and Confirm Password must match.")
]

export const UserSignInValidator = [
    check("email")
        .trim()
        .isEmail()
        .withMessage("Incorrect: Email and Password are required parameter."),
    check("password")
        .trim()
        .notEmpty()
        .withMessage("Incorrect: Email and Password are required parameter."),
]

export function validateUser(request: Request, response: Response, next: NextFunction) {
    const validation_error = validationResult(request)
    if (validation_error.isEmpty()) return next()

    //@ts-ignore
    const error = validation_error.array().map(({ msg, path }) => ({ path, msg }))
    return response.status(StatusCode.BAD_REQUEST).json({ success: false, error })
}

export async function validateToken(request: Request, response: Response, next: NextFunction) {
    const authorization_token = request.headers.authorization?.split(" ")
    if (authorization_token?.length !== 2)
        return response.status(StatusCode.UNAUTHORIZED).json({
            success: false,
            message: "Unauthorized: Authorization Token is missing in the Headers."
        })

    let decode: JwtPayload
    try {
        decode = JWT.verify(authorization_token[ 1 ], JWT_SECRET) as JwtPayload
    } catch (error: any) {
        console.log(error.message, error.name)
        if (error.name === "JsonWebTokenError")
            return response.status(StatusCode.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized: You are not authorized to access this data."
            })
        if (error.name === "TokenExpiredError")
            return response.status(StatusCode.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized: Your Token has expired."
            })
        return response.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "ServerError: Some error(s) occured when handling your request."
        })
    }

    const user = await UserModel.findById(decode.userid)
    if (!user)
        return response.status(StatusCode.UNAUTHORIZED).json({
            success: false,
            message: "Unauthorized: Your Token is invalid (Ownerless). Recheck your Token and try again."
        })
    request.userObject = user
    return next()
}