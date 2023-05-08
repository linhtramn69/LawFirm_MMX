import {
    SET_USERS,
    SET_MATTERS,
    SET_TYPE_SERVICES,
    SET_SERVICES,
    SET_QUOTES,
    SET_MATTER,
    SET_TASKS,
    SET_STEP,
    SET_STEPS,
    SET_FILES,
    SET_FEES,
    SET_USER,
    SET_BILLS,
    SET_BILL
} from './constants'
export const setUser = payload => (
    {
        type: SET_USER,
        payload
    }
)
export const setUsers = payload => (
    {
        type: SET_USERS,
        payload
    }
)
export const setMatters = payload => (
    {
        type: SET_MATTERS,
        payload
    }
)
export const setTypeServices = payload => (
    {
        type: SET_TYPE_SERVICES,
        payload
    }
)
export const setServices = payload => (
    {
        type: SET_SERVICES,
        payload
    }
)
export const setQuotes = payload => (
    {
        type: SET_QUOTES,
        payload
    }
)
export const setMatter = payload => (
    {
        type: SET_MATTER,
        payload
    }
)
export const setTasks = payload => (
    {
        type: SET_TASKS,
        payload
    }
)
export const setStep = payload => (
    {
        type: SET_STEP,
        payload
    }
)
export const setSteps = payload => (
    {
        type: SET_STEPS,
        payload
    }
)
export const setFiles = payload => (
    {
        type: SET_FILES,
        payload
    }
)
export const setFees = payload => (
    {
        type: SET_FEES,
        payload
    }
)
export const setBills = payload => (
    {
        type: SET_BILLS,
        payload
    }
)
export const setBill = payload => (
    {
        type: SET_BILL,
        payload
    }
)
