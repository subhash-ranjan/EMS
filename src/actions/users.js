import {
    BASE_URL,
    FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILURE,
    POST_USER, POST_USER_SUCCESS, POST_USER_FAILURE,
    VALIDATE_USER_SUCCESS, VALIDATE_USER_FAILURE, VALIDATE_USER,
} from 'src/config/constants'


function fetchUsersFromAPI() {

    let reqObj = getUrlAndBody('', '', '', '', 'fetch')

    return (dispatch) => {

        dispatch(getUserActions(FETCH_USER, ''))

        fetch(reqObj.url)//192.168.43.164
            .then(data => data.json())
            .then(json => {
                dispatch(getUserActions(FETCH_USER_SUCCESS, json))
            })
            .catch(err => {
                dispatch(getUserActions(FETCH_USER_FAILURE, err))
            })
    }
}

//post
function postUsersToAPI(name, email, password, id, action) {

    let reqObj = getUrlAndBody(name, email, password, id, action)

    return (dispatch) => {

        dispatch(getUserActions(POST_USER, ''))

        console.dir(reqObj)

        fetch(reqObj.url, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: reqObj.body
        })
            .then(data => data.json())
            .then(json => {
                dispatch(getUserActions(POST_USER_SUCCESS, json))
            })
            .catch(function (error) {
                dispatch(getUserActions(POST_USER_FAILURE, error))
            });
    }
}

//validate
function validateUserLogin(name) {

    let reqObj = getUrlAndBody(name, '', '', '', 'validate')

    return (dispatch) => {
        dispatch(getUserActions(VALIDATE_USER, ''))
        fetch(reqObj.url)
            .then(data => data.json())
            .then(json => {
                dispatch(getUserActions(VALIDATE_USER_SUCCESS, json))
            })
            .catch(function (error) {
                dispatch(getUserActions(VALIDATE_USER_FAILURE, error))
            });
    }
}

function getUserActions(type, data) {

    switch (type) {
        //fetch
        case FETCH_USER:
            return {
                type: FETCH_USER
            }
            break;

        case FETCH_USER_SUCCESS:
            return {
                type: FETCH_USER_SUCCESS,
                data: data
            }
            break;

        case FETCH_USER_FAILURE:
            return {
                type: FETCH_USER_FAILURE
            }
            break;

        //post
        case POST_USER:
            return {
                type: POST_USER
            }
            break

        case POST_USER_SUCCESS:
            return {
                type: POST_USER_SUCCESS
            }
            break;

        case POST_USER_FAILURE:
            return {
                type: POST_USER_FAILURE
            }
            break;

        //validate
        case VALIDATE_USER:
            return {
                type: VALIDATE_USER
            }
            break

        case VALIDATE_USER_SUCCESS:
            return {
                type: VALIDATE_USER_SUCCESS,
                data: data
            }
            break

        case VALIDATE_USER_FAILURE:
            return {
                type: VALIDATE_USER_FAILURE
            }
            break

        default: break
    }

    return type
}

function getUrlAndBody(name, email, password, id, action) {

    let finalUrl = BASE_URL + 'user/'

    const obj = {
        url: '',
        body: ''
    }

    switch (action) {

        case 'fetch':
            obj.url = finalUrl + 'users'
            break;

        case 'insert':
            obj.url = finalUrl + 'user_create'
            obj.body = 'user_name=' + name + '&user_email=' + email + '&user_password=' + password
            break;

        case 'update':
            obj.url = finalUrl + 'user_update'
            break;

        case 'delete':
            obj.url = finalUrl + 'user_delete'
            obj.body = 'id=' + id
            break;

        case 'validate':
            obj.url = finalUrl + 'validateuser/' + name
            //obj.body = 'name=' + name
            break;

        default: break;
    }

    return obj
}

export {
    fetchUsersFromAPI,
    postUsersToAPI,
    validateUserLogin
}