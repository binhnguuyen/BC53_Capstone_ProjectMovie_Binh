import { btMovieBookingReducer } from './Chair/slice'
import { combineReducers } from 'redux'


// thằng này tổng hợp hết các reducer đc phân chia theo service
// bài demo chỉ có 1 reducer là demoReduxReducer thôi
// cái trước dấu ":" là tên gì cũng đc nhưng đạt cho dễ hiểu và liên quan đến serice mình đang làm, sau dấu ":" là tên của reducer
export const rootReducer = combineReducers({
    btMovieBooking: btMovieBookingReducer,
})

