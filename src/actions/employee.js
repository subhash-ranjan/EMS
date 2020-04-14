import {
    BASE_URL,
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


function fetchEmployees(objRequest, id, action, canToken) {
    let reqObj = getEmployeeUrlAndBody(objRequest, id, action)
    return (dispatch) => {
        dispatch(getEmployeeActions(FETCH_EMPLOYEE, ''))
        console.log(reqObj.url)
        fetch(reqObj.url)
            .then(data => data.json())
            .then(json => {
                dispatch(getEmployeeActions(FETCH_EMPLOYEE_SUCCESS, json))
            })
            .catch(err => {
                console.log(err)
                dispatch(getEmployeeActions(FETCH_EMPLOYEE_FAILURE, err))
            })
    }
}

function postEmployee(objRequest, id, action) {

    let reqObj = getEmployeeUrlAndBody(objRequest, id, action)

    return (dispatch) => {

        dispatch(getEmployeeActions(POST_EMPLOYEE, ''))

        fetch(reqObj.url, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: reqObj.body
        })
            .then(data => data.json())
            .then(json => {
                dispatch(getEmployeeActions(POST_EMPLOYEE_SUCCESS, json))
            })
            .catch(function (error) {
                dispatch(getEmployeeActions(POST_EMPLOYEE_FAILURE, error))
            })
    }
}

function getEmployeeActions(type, data) {

    switch (type) {
        //employee
        //fetch
        case FETCH_EMPLOYEE:
            return {
                type: FETCH_EMPLOYEE
            }
            break;

        case FETCH_EMPLOYEE_SUCCESS:
            return {
                type: FETCH_EMPLOYEE_SUCCESS,
                data: data
            }
            break;

        case FETCH_EMPLOYEE_FAILURE:
            return {
                type: FETCH_EMPLOYEE_FAILURE
            }
            break;

        //post
        case POST_EMPLOYEE:
            return {
                type: POST_EMPLOYEE
            }
            break

        case POST_EMPLOYEE_SUCCESS:
            return {
                type: POST_EMPLOYEE_SUCCESS,
                data: data
            }
            break;

        case POST_EMPLOYEE_FAILURE:
            return {
                type: POST_EMPLOYEE_FAILURE
            }
            break;





        //master data:

        //fetch
        case FETCH_MASTER:
            return {
                type: FETCH_MASTER
            }
            break;

        case FETCH_MASTER_SUCCESS:
            return {
                type: FETCH_MASTER_SUCCESS,
                data: data
            }
            break;

        case FETCH_MASTER_FAILURE:
            return {
                type: FETCH_MASTER_FAILURE
            }
            break;
    }

    return type
}

function getEmployeeUrlAndBody(objRequest, id, action) {

    const obj = {
        url: '',
        body: ''
    }

    let finalUrl = BASE_URL + 'employee/'

    switch (action) {

        case 'fetch':
            obj.url = finalUrl + 'employees'
            break;

        case 'insert':
            obj.url = finalUrl + 'employeeCreate'
            obj.body = 'name=' + objRequest[0].val +
                '&dept=' + objRequest[1].val +
                '&designation=' + objRequest[2].val +
                '&email=' + objRequest[3].val +
                '&doj=' + objRequest[4].val
            break;

        case 'update':
            obj.url = finalUrl + 'employeeUpdate'
            obj.body = 'name=' + objRequest[0].val +
                '&dept=' + objRequest[1].val +
                '&designation=' + objRequest[2].val +
                '&email=' + objRequest[3].val +
                '&doj=' + objRequest[4].val +
                '&id=' + id
            break;

        case 'delete':
            obj.url = finalUrl + 'employeeDelete'
            obj.body = 'id=' + id
            break;

        case 'validate':
            obj.url = finalUrl + 'validateuser/' + name
            //obj.body = 'name=' + name
            break;


        //master data
        case 'fetchmaster':
            let strUrl = (id == 0) ? 'master' : 'reports'
            obj.url = finalUrl + strUrl

            break;


    }

    return obj
}




function fetchDesignation(objRequest, id, action, canToken) {

    let reqObj = getDesignationUrlAndBody(objRequest, id, action)

    return (dispatch) => {

        dispatch(getDesignationActions(FETCH_DESIGNATION, ''))

        fetch(reqObj.url)
            .then(data => data.json())
            .then(json => {
                dispatch(getDesignationActions(FETCH_DESIGNATION_SUCCESS, json))
            })
            .catch(err => {
                dispatch(getDesignationActions(FETCH_DESIGNATION_FAILURE, err))
            })
    }
}

function postDesignation(objRequest, id, action) {

    let reqObj = getDesignationUrlAndBody(objRequest, id, action)

    return (dispatch) => {

        dispatch(getDesignationActions(POST_DESIGNATION, ''))

        fetch(reqObj.url, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: reqObj.body
        })
            .then(data => data.json())
            .then(json => {

                dispatch(getDesignationActions(POST_DESIGNATION_SUCCESS, json))
            })
            .catch(function (error) {
                dispatch(getDesignationActions(POST_DESIGNATION_FAILURE, error))
            });
    }
}

function getDesignationActions(type, data) {

    switch (type) {
        //fetch
        case FETCH_DESIGNATION:
            return {
                type: FETCH_DESIGNATION
            }
            break;

        case FETCH_DESIGNATION_SUCCESS:
            return {
                type: FETCH_DESIGNATION_SUCCESS,
                data: data
            }
            break;

        case FETCH_DESIGNATION_FAILURE:
            return {
                type: FETCH_DESIGNATION_FAILURE
            }
            break;

        //post
        case POST_DESIGNATION:
            return {
                type: POST_DESIGNATION
            }
            break

        case POST_DESIGNATION_SUCCESS:
            return {
                type: POST_DESIGNATION_SUCCESS
            }
            break;

        case POST_DESIGNATION_FAILURE:
            return {
                type: POST_DESIGNATION_FAILURE
            }
            break;

        default: break
    }

    return type
}

function getDesignationUrlAndBody(objRequest, id, action) {

    const obj = {
        url: '',
        body: ''
    }

    let finalUrl = BASE_URL + 'employee/'

    switch (action) {

        case 'fetch':
            obj.url = finalUrl + 'Designations'
            break;

        case 'insert':
            obj.url = finalUrl + 'DesignationCreate'
            obj.body = 'name=' + objRequest.name
            break;

        case 'update':
            obj.url = finalUrl + 'DesignationUpdate'
            break;

        case 'delete':
            obj.url = finalUrl + 'DesignationDelete'
            obj.body = 'id=' + id
            break;

        default: break;
    }

    return obj
}





function fetchDepartment(objRequest, id, action, canToken) {

    let reqObj = getDepartmentUrlAndBody(objRequest, id, action)

    return (dispatch) => {

        dispatch(getDepartmentActions(FETCH_DEPARTMENT, ''))

        fetch(reqObj.url)
            .then(data => data.json())
            .then(json => {
                dispatch(getDepartmentActions(FETCH_DEPARTMENT_SUCCESS, json))
            })
            .catch(err => {
                console.log(err)

                dispatch(getDepartmentActions(FETCH_DEPARTMENT_FAILURE, err))
            })
    }
}

function postDepartment(objRequest, id, action) {

    let reqObj = getDepartmentUrlAndBody(objRequest, id, action)

    return (dispatch) => {

        dispatch(getDepartmentActions(POST_DEPARTMENT, ''))

        fetch(reqObj.url, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: reqObj.body
        })
            .then(data => data.json())
            .then(json => {

                dispatch(getDepartmentActions(POST_DEPARTMENT_SUCCESS, json))
            })
            .catch(function (error) {
                dispatch(getDepartmentActions(POST_DEPARTMENT_FAILURE, error))
            });
    }
}

function getDepartmentActions(type, data) {

    switch (type) {
        //fetch
        case FETCH_DEPARTMENT:
            return {
                type: FETCH_DEPARTMENT
            }
            break;

        case FETCH_DEPARTMENT_SUCCESS:
            return {
                type: FETCH_DEPARTMENT_SUCCESS,
                data: data
            }
            break;

        case FETCH_DEPARTMENT_FAILURE:
            return {
                type: FETCH_DEPARTMENT_FAILURE
            }
            break;

        //post
        case POST_DEPARTMENT:
            return {
                type: POST_DEPARTMENT
            }
            break

        case POST_DEPARTMENT_SUCCESS:
            return {
                type: POST_DEPARTMENT_SUCCESS
            }
            break;

        case POST_DEPARTMENT_FAILURE:
            return {
                type: POST_DEPARTMENT_FAILURE
            }
            break;

        default: break
    }

    return type
}

function getDepartmentUrlAndBody(objRequest, id, action) {

    const obj = {
        url: '',
        body: ''
    }

    let finalUrl = BASE_URL + 'Employee/'

    switch (action) {

        case 'fetch':
            obj.url = finalUrl + 'Departments'
            break;

        case 'insert':
            obj.url = finalUrl + 'departmentCreate'
            obj.body = 'name=' + objRequest.name
            break;

        case 'update':
            obj.url = finalUrl + 'departmentUpdate'
            break;

        case 'delete':
            obj.url = finalUrl + 'departmentDelete'
            obj.body = 'id=' + id
            break;

        default: break;
    }

    return obj
}



function fetchRatingAndSalary(objRequest, id, action, canToken) {

    let reqObj = getRatingUrlAndBody(objRequest, id, action)//fetchrating

    return (dispatch) => {

        dispatch(getRatingActions(FETCH_RATING, ''))

        fetch(reqObj.url)
            .then(data => data.json())
            .then(json => {
                dispatch(getRatingActions(FETCH_RATING_SUCCESS, json))
            })
            .catch(err => {
                dispatch(getRatingActions(FETCH_RATING_FAILURE, err))
            })

    }
}

function postRatingAndSalary(objRequest, id, action) {

    let reqObj = getRatingUrlAndBody(objRequest, id, action)

    return (dispatch) => {

        dispatch(getRatingActions(POST_RATING, ''))

        fetch(reqObj.url, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: reqObj.body
        })
            .then(data => data.json())
            .then(json => {
                dispatch(getRatingActions(POST_RATING_SUCCESS, json))
            })
            .catch(function (error) {
                dispatch(getRatingActions(POST_RATING_FAILURE, error))
            })
    }
}

function getRatingActions(type, data) {

    switch (type) {

        //fetch
        case FETCH_RATING:
            return {
                type: FETCH_RATING
            }
            break

        case FETCH_RATING_SUCCESS:
            return {
                type: FETCH_RATING_SUCCESS,
                data: data
            }
            break

        case FETCH_RATING_FAILURE:
            return {
                type: FETCH_RATING_FAILURE
            }
            break


        //post
        case POST_RATING:
            return {
                type: POST_RATING
            }
            break

        case POST_RATING_SUCCESS:
            return {
                type: POST_RATING_SUCCESS
            }
            break

        case POST_RATING_FAILURE:
            return {
                type: POST_RATING_FAILURE
            }
            break

        default: break
    }

    return type
}

function getRatingUrlAndBody(objRequest, id, action) {

    const obj = {
        url: '',
        body: ''
    }

    let finalUrl = BASE_URL + 'Employee/'

    switch (action) {


        //rating $ salary

        case 'fetchrating':
            let str = id > 0 ? '/' + id : ''
            obj.url = finalUrl + 'employeeAndRatings' + str

            break

        case 'insertrating':
            obj.url = finalUrl + 'employeeRatingCreate'
            obj.body = 'rating=' + objRequest.rating +
                '&salary=' + objRequest.salary +
                '&year=' + objRequest.year +
                '&employeeId=' + objRequest.employee
            break

        default: break
    }

    return obj
}




function fetchMaster(objRequest, id, action, canToken) {

    let reqObj = getMasterUrlAndBody(objRequest, id, action)//fetchmaster

    return (dispatch) => {

        dispatch(getMasterActions(FETCH_MASTER, ''))

        fetch(reqObj.url)
            .then(data => data.json())
            .then(json => {

                dispatch(getMasterActions(FETCH_MASTER_SUCCESS, json))
            })
            .catch(err => {
                console.log(err)

                dispatch(getMasterActions(FETCH_MASTER_FAILURE, err))
            })
    }
}

function getMasterActions(type, data) {

    switch (type) {

        //fetch
        case FETCH_MASTER:
            return {
                type: FETCH_MASTER
            }
            break;

        case FETCH_MASTER_SUCCESS:
            return {
                type: FETCH_MASTER_SUCCESS,
                data: data
            }
            break;

        case FETCH_MASTER_FAILURE:
            return {
                type: FETCH_MASTER_FAILURE
            }
            break

        default: break
    }

    return type
}

function getMasterUrlAndBody(objRequest, id, action) {

    const obj = {
        url: '',
        body: ''
    }

    let finalUrl = BASE_URL + 'employee/'

    switch (action) {

        case 'fetchmaster':
            let strUrl = 'master'
            obj.url = finalUrl + strUrl

            break;

        default: break;
    }

    return obj
}




function fetchReport(objRequest, id, action, canToken) {

    let reqObj = getReportUrlAndBody(objRequest, id, action)//fetchmaster

    return (dispatch) => {

        dispatch(getReportActions(FETCH_REPORT, ''))

        fetch(reqObj.url)
            .then(data => data.json())
            .then(json => {

                dispatch(getReportActions(FETCH_REPORT_SUCCESS, json))
            })
            .catch(err => {
                console.log(err)

                dispatch(getReportActions(FETCH_REPORT_FAILURE, err))
            })
    }
}

function getReportActions(type, data) {

    switch (type) {

        //fetch
        case FETCH_REPORT:
            return {
                type: FETCH_REPORT
            }
            break;

        case FETCH_REPORT_SUCCESS:
            return {
                type: FETCH_REPORT_SUCCESS,
                data: data
            }
            break;

        case FETCH_REPORT_FAILURE:
            return {
                type: FETCH_REPORT_FAILURE
            }
            break

        default: break
    }

    return type
}

function getReportUrlAndBody(objRequest, id, action) {

    const obj = {
        url: '',
        body: ''
    }

    let finalUrl = BASE_URL + 'employee/'

    switch (action) {

        case 'fetchreport':
            let strUrl = 'reports'
            obj.url = finalUrl + strUrl

            break;

        default: break;
    }

    return obj
}

export {
    fetchEmployees,
    postEmployee,

    fetchDesignation,
    postDesignation,

    fetchDepartment,
    postDepartment,

    fetchRatingAndSalary,
    postRatingAndSalary,

    fetchMaster,
    fetchReport

}