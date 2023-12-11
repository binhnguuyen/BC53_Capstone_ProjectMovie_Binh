// nếu là redux mới thì ko còn 3 file type, action, reducer.js nữa là chỉ mỗi file slice.js thôi
import { createSlice } from "@reduxjs/toolkit"
// import { rootReducer } from "../rootReducer"

const initialState = {
    // number: 100,
    chairsBooking: [],
    chairsBooked: [],
}

// Cái hàm createSlice giúp vừa tạo ra reducer vừa tạo ra file action
// ở redux thường thì phải tạo ra 1 reducer.js và 1 action.js
// không cần phải tách ra file action riêng như trong redux thường
export const btMovieBookingSlice = createSlice(
    {
        // cái name này đưa vào root reducer
        name: "BTMovieBooking",
        initialState,
        // nơi bắt các action là trong reducers, ko cần phải tạo ra file action riêng và bắt switch case nhưng trong bài BTPhone
        // trong cái reducers này vừa tạo ra action
        // khi dispatch(đưa action lên store) thì mình dùng cái tên actions đã đặt phía dưới và chấm lên tên của action đặt bên trong reducers chỗ này
        // lúc này trên store sẽ hiểu là mình muốn lấy action nào
        reducers: {
            /*
            // tạo hết các action vào đây để khi mình đi dispatch nó sẽ gợi ý cho mình những action nào có thể sd đc
            // demo: (state, action) => {
            // },
            increaseNumber: (state, action) => {
                // console.log('action: ', action);
                // do đây là action + number, nên mình chấm đến number trong state(obj chứ các thuộc tính khác nhau trong đó có number)
                // số muốn cộng là giá trị của payload trong cái action mà mình dispatch lên trên store
                state.number += action.payload
                // console.log('state.number: ', state.number);
                // immerjs là thư viện tích hợp sẵn trong redux toolkit giúp mình tham chiếu state mới của mình vào 1 ô nhớ mới chứ ko cần phải return{...state} như redux cũ
            }
            */

            // tạo action cho chairsBooking
            setChairsBooking: (state, action) => {
                // document.querySelector("#paymentSuccess").classList.remove("d-block");
                // document.querySelector("#paymentSuccess").classList.add("d-none");
                // bóc tách action trong payload ra thành action luôn
                const { payload } = action;
                // console.log('payload: ', payload);

                // định nghĩa chairsBooking trong state ra thành stateChairsBooking luôn
                const stateChairsBooking = state.chairsBooking;
                // console.log('state.chairsBooking: ', state.chairsBooking);

                // action đưa lên với payload là 1 cái ghế
                // sau đó mình phải push nó vào cái mảng rỗng stateChairsBooking trong initialState
                const index = stateChairsBooking.findIndex((value) => value.maGhe === payload.maGhe)
                // nếu đã có ghế rồi thì xoá đi
                if (index !== -1) {
                    // stateChairsBooking.filter((value) => value.soGhe !== payload.soGhe)
                    // hoặc có thể xoá phần tử tìm đc trong mảng trong mảng như sau
                    alert("Bạn có chắc chắn xoá ghế này ra khỏi danh sách")
                    stateChairsBooking.splice(index, 1)
                }
                // nếu chưa có ghế thì push vào
                else {
                    stateChairsBooking.push(payload);
                }
                console.log('stateChairsBooking: ', {...stateChairsBooking});
            },

            // tạo action cho chairBooked
            setChairsBooked: (state, action) => {
                const { payload } = action;

                // thêm ghế đang chọn vào ghế đã chọn
                if (state.chairsBooking.length != 0) {
                    // document.querySelector("#paymentSuccess").classList.remove("d-none");
                    // document.querySelector("#paymentSuccess").classList.add("d-block");
                    state.chairsBooked = [...state.chairsBooked, ...state.chairsBooking];
                    console.log('state.chairsBooked: ', state.chairsBooked);
                    // alert("Bạn đã thanh toán thành công")
                }
                // sau khi thêm ghé đang chọn vào ghế đã chọn rồi thì ghế đang chọn phải đưa về mảng rỗng
                state.chairsBooking = [];
            }

        },
    }
)

// bóc tách thuộc tính hàm btMovieBookingSlice đc tạo từ createSlice
// có 2 thuộc tính trả về là reducer và action
// vì mình có service trong 1 pj nên sẽ có nhiều reducer và action trong 1 bài nên mình sẽ đặt tên riêng cho từng tính năng
// nên đoạn code ở đây có tổng cộng 2 bước
// B1: bóc tách thành 2 thành phần reducer và action
// B2: đặt lại tên cho reducer và action
// nhớ là reducer đặt ở đây phải cho vào rootReducer
export const { reducer: btMovieBookingReducer, actions: btMovieBookingActions } = btMovieBookingSlice