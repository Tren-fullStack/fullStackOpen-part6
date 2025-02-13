import { createSlice, current } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        notification(state, action) {
            state = `${action.payload}`
            return state
        },
        reset(state){
            state = null
            return state
        }
    }
})

export const { notification, reset } = notificationSlice.actions

export const setNotification = (action, seconds) => {
    let milliseconds = seconds*1000

    return (dispatch) => {
      dispatch(notification(action))
      setTimeout(() => {
        dispatch(reset())
      }, milliseconds)
    }
}

export default notificationSlice.reducer