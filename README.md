# Cấu trúc dự án

- components
    - Chứa những cái component được tái sử dụng, chủ yếu dùng render UI, không bao hồm những logic (call API)
    - VD: Button, Select, Input, Card...
- modules/modules-name
    - Chứa các components cấu thành 1 page, trong các components này sẽ chứa các logic như call API
    - VD: 
        - home
            - Banner
            - Cenima
            - Showing
- layouts

    - Chứa các components layout

- apis
    - Chứa cấu hình mặc định của api
    - Chứa các function định nghĩa api