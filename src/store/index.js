// import { createStore } from "redux"
import { rootReducer } from "./rootReducer"
import { configureStore } from '@reduxjs/toolkit'


// Đây là Redux cũ
// export const store = createStore(
//     // creareStore nhận vào 2 tham số
//     rootReducer,
//     // lấy dòng dưới này từ GitHUB của Redux Devtools về
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )


// đối với Redux mới thì mình dùng hàm sau
export const store = configureStore ({
    reducer: rootReducer,
})

