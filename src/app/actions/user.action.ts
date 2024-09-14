import { User } from "../models/user.model";


export namespace UserAction{
    export class UserInfo{
        static readonly type = `[User] User Info`;
        constructor(public payload: User) {
            
        }
    }
}