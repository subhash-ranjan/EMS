import {
    FETCH_EMPLOYEE, FETCH_EMPLOYEE_SUCCESS, FETCH_EMPLOYEE_FAILURE,
    POST_EMPLOYEE, POST_EMPLOYEE_SUCCESS, POST_EMPLOYEE_FAILURE,


    FETCH_DEPARTMENT, FETCH_DEPARTMENT_SUCCESS, FETCH_DEPARTMENT_FAILURE,
    POST_DEPARTMENT, POST_DEPARTMENT_SUCCESS, POST_DEPARTMENT_FAILURE,

    FETCH_DESIGNATION, FETCH_DESIGNATION_SUCCESS, FETCH_DESIGNATION_FAILURE,
    POST_DESIGNATION, POST_DESIGNATION_SUCCESS, POST_DESIGNATION_FAILURE,

    FETCH_RATING, FETCH_RATING_SUCCESS, FETCH_RATING_FAILURE,
    POST_RATING, POST_RATING_SUCCESS, POST_RATING_FAILURE,

    FETCH_MASTER, FETCH_MASTER_SUCCESS, FETCH_MASTER_FAILURE,

    FETCH_REPORT, FETCH_REPORT_SUCCESS, FETCH_REPORT_FAILURE,

} from 'src/config/constants'

const initialState = {
    employees: [],
    designations: [],
    departments: [],
    ratings: [],
    masters: [],
    reports: [],

    isFetching: false,
    isCreating: false,
    isCreateSuccess: false,
    error: false,

    mode: '',
    actionType: '',
    postType: '',
}

export default function employeeReducer(state = initialState, action) {


    let _module = action.type.split('_')[1]

    switch (_module) {

        case 'EMPLOYEE':
            return employee(state, action)
            break

        case 'DEPARTMENT':
            return department(state, action)
            break

        case 'DESIGNATION':
            return designation(state, action)
            break

        case 'RATING':
            return rating(state, action)
            break

        case 'MASTER':
            return master(state, action)
            break

        case 'REPORT':
            return report(state, action)
            break


        default: return state; break
    }
}


const employee = (state, action) => {

    switch (action.type) {

        case FETCH_EMPLOYEE:
            return {
                ...state,

                isFetching: true,
                employee: [],
                error: false,

                mode: 'EMPLOYEE',
                actionType: 'FETCH',
            }
            break

        case FETCH_EMPLOYEE_SUCCESS:
            return {
                ...state,

                isFetching: false,
                employees: action.data,
                error: false,

                mode: 'EMPLOYEE',
                actionType: 'FETCH'
            }
            break

        case FETCH_EMPLOYEE_FAILURE:
            return {
                ...state,

                isFetching: false,
                employees: [],
                error: true,

                mode: 'EMPLOYEE',
                actionType: 'FETCH'
            }
            break

        //post
        case POST_EMPLOYEE:
            return {
                ...state,

                isFetching: false,

                isCreating: true,
                isCreateSuccess: false,
                error: false,

                mode: 'EMPLOYEE',
                actionType: 'POST',
                postType: action.data
            }
            break

        case POST_EMPLOYEE_SUCCESS:
            return {
                ...state,

                isFetching: false,

                isCreating: false,
                isCreateSuccess: true,
                error: false,

                mode: 'EMPLOYEE',
                actionType: 'POST',
                postType: action.data
            }
            break

        case POST_EMPLOYEE_FAILURE:
            return {
                ...state,

                isFetching: false,

                isCreating: false,
                isCreateSuccess: false,
                error: true,

                mode: 'EMPLOYEE',
                actionType: 'POST',
                postType: action.data
            }

        default: return state; break
    }
}

const department = (state, action) => {


    switch (action.type) {

        case FETCH_DEPARTMENT:
            return {
                ...state,

                isFetching: true,
                departments: [],
                error: false,

                mode: 'DEPARTMENT',
                actionType: 'FETCH'
            }
            break

        case FETCH_DEPARTMENT_SUCCESS:
            return {
                ...state,

                isFetching: false,
                departments: action.data,
                error: false,

                mode: 'DEPARTMENT',
                actionType: 'FETCH'
            }
            break

        case FETCH_DEPARTMENT_FAILURE:
            return {
                ...state,

                isFetching: false,
                departments: [],
                error: true,

                mode: 'DEPARTMENT',
                actionType: 'FETCH'
            }
            break



        //post
        case POST_DEPARTMENT:
            return {
                ...state,

                isFetching: false,

                isCreating: true,
                isCreateSuccess: false,
                error: false,

                mode: 'DEPARTMENT',
                actionType: 'POST',
                postType: action.data
            }
            break

        case POST_DEPARTMENT_SUCCESS:
            return {
                ...state,

                isFetching: false,

                isCreating: false,
                isCreateSuccess: true,
                error: false,

                mode: 'DEPARTMENT',
                actionType: 'POST',
                postType: action.data
            }
            break

        case POST_DEPARTMENT_FAILURE:
            return {
                ...state,

                isFetching: false,

                isCreating: false,
                isCreateSuccess: false,
                error: true,

                mode: 'DEPARTMENT',
                actionType: 'POST',
                postType: action.data
            }

            break

        default: return state; break
    }
}

const designation = (state, action) => {

    switch (action.type) {

        //fetch
        case FETCH_DESIGNATION:
            return {
                ...state,

                isFetching: true,
                designations: [],
                error: false,

                mode: 'DESIGNATION',
                actionType: 'FETCH'
            }
            break

        case FETCH_DESIGNATION_SUCCESS:
            return {
                ...state,

                isFetching: false,
                designations: action.data,
                error: false,

                mode: 'DESIGNATION',
                actionType: 'FETCH'
            }
            break

        case FETCH_DESIGNATION_FAILURE:
            return {
                ...state,

                isFetching: false,
                designations: [],
                error: true,

                mode: 'DESIGNATION',
                actionType: 'FETCH'
            }
            break

        //post
        case POST_DESIGNATION:
            return {
                ...state,

                isFetching: false,

                isCreating: true,
                isCreateSuccess: false,
                error: false,

                mode: 'DESIGNATION',
                actionType: 'POST',
                postType: action.data
            }
            break

        case POST_DESIGNATION_SUCCESS:
            return {
                ...state,

                isFetching: false,

                isCreating: false,
                isCreateSuccess: true,
                error: false,

                mode: 'DESIGNATION',
                actionType: 'POST',
                postType: action.data
            }
            break

        case POST_DESIGNATION_FAILURE:
            return {
                ...state,

                isFetching: false,

                isCreating: false,
                isCreateSuccess: false,
                error: true,

                mode: 'DESIGNATION',
                actionType: 'POST',
                postType: action.data
            }

            break

        default: return state; break
    }
}

const rating = (state, action) => {

    switch (action.type) {

        case FETCH_RATING:
            return {
                ...state,

                isFetching: true,
                ratings: [],
                error: false,

                mode: 'RATING',
                actionType: 'FETCH'
            }
            break

        case FETCH_RATING_SUCCESS:
            return {
                ...state,

                isFetching: false,
                ratings: action.data,
                error: false,

                mode: 'RATING',
                actionType: 'FETCH'
            }
            break

        case FETCH_RATING_FAILURE:
            return {
                ...state,

                isFetching: false,
                ratings: [],
                error: true,

                mode: 'RATING',
                actionType: 'FETCH'
            }
            break



        //post
        case POST_RATING:
            return {
                ...state,

                isFetching: false,

                isCreating: true,
                isCreateSuccess: false,
                error: false,

                mode: 'RATING',
                actionType: 'POST',
                postType: action.data
            }
            break

        case POST_RATING_SUCCESS:
            return {
                ...state,

                isFetching: false,

                isCreating: false,
                isCreateSuccess: true,
                error: false,

                mode: 'RATING',
                actionType: 'POST',
                postType: action.data
            }
            break

        case POST_RATING_FAILURE:
            return {
                ...state,

                isFetching: false,

                isCreating: false,
                isCreateSuccess: false,
                error: true,

                mode: 'RATING',
                actionType: 'POST',
                postType: action.data
            }

            break



        default: return state; break
    }
}

const master = (state, action) => {

    switch (action.type) {

        case FETCH_MASTER:
            return {
                ...state,

                isFetching: true,
                masters: [],
                error: false,

                mode: 'MASTER',
                actionType: 'FETCH'
            }
            break

        case FETCH_MASTER_SUCCESS:
            return {
                ...state,

                isFetching: false,

                masters: action.data,
                error: false,

                mode: 'MASTER',
                actionType: 'FETCH'
            }
            break

        case FETCH_MASTER_FAILURE:
            return {
                ...state,

                isFetching: false,
                masters: [],
                error: true,

                mode: 'MASTER',
                actionType: 'FETCH'
            }
            break

        default: return state; break
    }
}

const report = (state, action) => {

    switch (action.type) {

        case FETCH_REPORT:
            return {
                ...state,

                isFetching: true,
                reports: [],
                error: false,

                mode: 'REPORT',
                actionType: 'FETCH'
            }
            break

        case FETCH_REPORT_SUCCESS:
            return {
                ...state,

                isFetching: false,

                reports: action.data,
                error: false,

                mode: 'REPORT',
                actionType: 'FETCH'
            }
            break

        case FETCH_REPORT_FAILURE:
            return {
                ...state,

                isFetching: false,
                reports: [],
                error: true,

                mode: 'REPORT',
                actionType: 'FETCH'
            }
            break

        default: return state; break
    }
}