import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/base.css"
import { Provider } from 'react-redux';
import { store } from './store/index.js'

// import './index.css'

// TanStack Query giúp quản lý các trạng thái của API
const queryClient = new QueryClient({
  defaultOptions: {
    // get sẽ là queries
    queries: {
      // cái này là khi user nhấn chuột qua tag khác rồi trở về lại tab ứng dụng thì mặc định sẽ call lại API
      refetchOnWindowFocus: false,
      // khi mất mạng cẫn cho mình lướt nội dung cũ (giống facebook), khi có mạng lại nó sẽ call API lại
      refetchOnReconnect: true,

      // khi call API vị lỗi sẽ call xxx lần trước khi báo lỗi
      // sửa fetcher rồi qua Network sẽ thấy nó chạy lại
      retry: 3,
    },
    // put, post, delete, pass sẽ là mutations
    // mutations: ,
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </Provider>

)
