import connectDatabase from './database'

export const StatusCode = {
    // 2xx
    OK: 200,
    CREATED: 201,

    // 4xx
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFICT: 409,

    // 5xx
    INTERNAL_SERVER_ERROR: 500,
} as const
export {
    connectDatabase
}