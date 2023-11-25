# Cấu trúc dự án

- components
    - Chứa những cái component được tái sử dụng, chủ yếu dùng render UI, không bao hồm những logic (call API)
    - Ex: Button, Select, Input, Card...
    - VD:
        - Header
        - Footer

- modules/modules-name
    - Chứa các components cấu thành 1 page, trong các components này sẽ chứa các logic như call API
    - VD: 
        - home
            - Banner
            - Cinema
            - Showing
        - details
            - MovieProfile
            - ShowTimes
        - Signin
        - Signup
        - AddMovie
        - AddUser
        -...
            
- layouts
    - Chứa các components layout
    - VD: 
        - AdminLayout
        - MovieLayout
        - NotFound

- apis
    - Chứa cấu hình mặc định của api
    - Chứa các function định nghĩa api