import {UserSchemaType} from "./types";

declare global{
    declare namespace Express{
        export interface Request {
            user: UserSchemaType | null
        }
    }
}