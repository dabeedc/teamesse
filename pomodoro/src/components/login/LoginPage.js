import { useState } from "react";
import { CustomCard } from "../CustomCard"
import { Box, Button, Typography, Input, Stack, Link, Icon } from "@mui/material";
import VisibilityOffSharpIcon from '@mui/icons-material/VisibilityOffSharp';
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/slices/account";

const CARD_SIZE_WIDTH = 475;
const CARD_SIZE_HEIGHT = 675;

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState(true)
    const [eye, setEye] = useState(false);
    const dispatch = useDispatch();

    const eyeControl = () => {
        setEye(!eye);
        setPasswordVisibility(!passwordVisibility);
    };

    return (
        <CustomCard sx={{ m: 20 }}>
            <Box sx={{ width: CARD_SIZE_WIDTH, height: CARD_SIZE_HEIGHT }}>
                <Typography sx={{ color: "common.first", pt: 5 }} variant="h3">teamesse</Typography>
                <Box sx={{ pt: 15 }} >
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <Input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} type={passwordVisibility ? "password" : "text:"} />
                        <Icon onClick={eyeControl}>
                            {eye ? <VisibilityOffSharpIcon onClick={eyeControl} /> : <VisibilitySharpIcon onClick={eyeControl} />}
                        </Icon>
                    </Stack>
                    <Stack>
                        <Button onClick={() => dispatch(userLogin({ username, password }))}>Sign In</Button>
                        <Link sx={{ color: "common.second" }} href="">Forgot your password?</Link>
                        <br />
                        <Typography sx={{ pt: 25 }} variant="button text">
                            Don't have an Account?
                            <br />
                            <Link sx={{ color: "common.second" }} href="signup">Sign up</Link>
                        </Typography>
                    </Stack>
                </Box>
            </Box>
        </CustomCard>
    )
}

export default LoginPage;