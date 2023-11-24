// thằng memo này bao thằng child lại để khi render bên Memo thì nó sẽ ko render thằng Child này lại
import { Button, Typography } from '@mui/material';
import React, { memo } from 'react'

const Child = ({ count, user, newCount, onResetCount }) => {
    console.log("child re-render");
    return (
        <div>
            Hiển thị 1 chart hoặc 1 list data rất lớn(1 triệu item)
            <Typography>
                Giá trị count từ Child: {count}
            </Typography>
            <Typography sx={{ fontSize: 18 }}>
                Giá trị user từ Child: {user.fullName}
            </Typography>
            <Button onClick={onResetCount}>Reset Count</Button>
        </div>
    )
}

// thằng memo này nó sẽ nhớ
// để khi render bên Memo thì nó sẽ ko render thằng Child này lại
// nhưng nó chỉ phân biệt đc trong TH là 2 dấu bằng ==
// nếu là 1 mảng hoặc 1 obj thì nó ko hiểu đc nên phải dùng useMemo
export default memo(Child)