import { Action, Selector, State, StateContext } from "@ngxs/store";
import { User } from "../models/user.model";
import { Injectable } from "@angular/core";
import { UserAction } from "../actions/user.action";

export interface UserStateModel{
    LoggedInUser: User
}

@State<UserStateModel>({
    name: 'user',
    defaults :{
        LoggedInUser : {} as User
    }
})

@Injectable()

export class UserSatate{
    @Selector()
    static getUserInfo(state: UserStateModel): User {
      return state.LoggedInUser;
    }
    @Action(UserAction.UserInfo)
    userInfo(ctx: StateContext<UserStateModel>, action: UserAction.UserInfo) {
        const state = ctx.getState();
        ctx.setState({
            ...state,LoggedInUser: action.payload})
    }
}