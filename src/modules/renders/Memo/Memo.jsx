// useMemo và useCallback là chỉ sử dụng khi thật sự cần thiết (có chart, 100.000 item trở lên)
import React, { useState, useMemo, useCallback } from 'react'
import Child from "./Child";
import { Box, Button, Typography } from '@mui/material';

const Memo = () => {
    const [count, setCount] = useState(1);
    const [liked, setLiked] = useState(false);
    console.log("parent re-render");

    // const user = { fullName: "Nguyen Văn A" }; // 0xxx123 // 0xxxx234

    // thằng này viết giống useEffect nhưng cho return (thằng useEffect ko cho return)
    // thằng này giúp cải thiện thằng memo bên Child vì nó ko nhận ra sự thay đổi trong 1 object
    // trong cái mảng rỗng đó, mình có thể bỏ count vào để nó re-render lại nếu muốn
    // nó sẽ return về 1 giá trị
    const user = useMemo(() => {
        return { fullName: "Nguyen Văn A" };
    }, []);
    console.log("user", user);

    // trong cái mảng rỗng đó, mình có thể bỏ count vào để nó re-render lại nếu muốn
    const newCount = useMemo(() => {
        return count;
    }, [count]);
    console.log('newCount: ', newCount);

    // thằng useCallback này return về 1 mảng
    // dùng thằng này để nó ko render bên Child lại dựa vào sự thay đổi khi hàm này bị tạo lại
    // có thể bỏ liked vào trong mảng rỗng thì child cũng sẽ render lại
    const handleResetCount = useCallback(() => {
        setCount(1);
    }, []);

    return (
        <div style={{ marginBottom: "200px" }}>
            <Box sx={{ marginBottom: 10 }}>
                <Button variant="contained" onClick={() => setCount(count + 1)}>Tăng</Button>
                <Typography sx={{ fontSize: 20, fontWeight: 700, color: "green" }}>
                    {count}
                </Typography>
                <Button variant="contained" onClick={() => setCount(count - 1)}>Giảm</Button>
            </Box>
            <Box sx={{ marginBottom: 10 }}>
                <Button variant="contained" onClick={() => setLiked(true)}>Like</Button>
                <Typography sx={{ fontSize: 20, fontWeight: 700, color: "green" }}>
                    {liked ? "Đã Like 👍🏻" : "Chưa like"}
                </Typography>
                <Button variant="contained" onClick={() => setLiked(false)}>Unlike</Button>
            </Box>
            <Child
                count={count}
                user={user}
                newCount={newCount}
                onResetCount={handleResetCount}
            />
        </div>
    )
}

export default Memo