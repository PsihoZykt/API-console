import {SET_AUTH_RESULT, SET_IS_LOADING, SetAuthResultAction, SetIsLoadingAction} from "../../actions/login";
import {createAction} from "../../helpers/helper";
import {AuthResult} from "../../reducers/loginReducer";

export function createSetIsLoadingAction(
    isLoading: boolean
): SetIsLoadingAction {
    return createAction(SET_IS_LOADING, isLoading)
}

export function createSetAuthResultAction(
    authResult: AuthResult
): SetAuthResultAction {
    return createAction(SET_AUTH_RESULT, authResult)
}
