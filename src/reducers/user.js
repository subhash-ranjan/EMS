import {
    FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILURE,
    POST_USER, POST_USER_SUCCESS, POST_USER_FAILURE,
    VALIDATE_USER_SUCCESS, VALIDATE_USER_FAILURE, VALIDATE_USER
} from 'src/config/constants'

const initialState = {
    users: [],
    isFetching: false,
    isCreating: false,
    isCreateSuccess: false,
    error: false,
    isValidating: false,
    loginStatus: 0,
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {

        //fetch
        case FETCH_USER:
            return {
                ...state,
                users: [],
                isFetching: true
            }
            break

        case FETCH_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                users: action.data
            }
            break

        case FETCH_USER_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
            break

        case POST_USER:
            return {
                ...state,
                isCreating: true,
            }
            break

        //post
        case POST_USER_SUCCESS:
            return {
                ...state,
                isCreating: false,
                isCreateSuccess: true,
            }
            break

        case POST_USER_FAILURE:
            return {
                ...state,
                isCreating: false,
                isCreateSuccess: false,
                error: true
            }

            break

        //validation
        case VALIDATE_USER:
            return {
                ...state,
                isValidating: true,
            }
            break

        case VALIDATE_USER_SUCCESS:
            return {
                ...state,
                isValidating: false,
                loginStatus: action.data,
            }

        case VALIDATE_USER_FAILURE:
            return {
                ...state,
                isValidating: false,
                error: true
            }

            break


        default: return state; break
    }
}