import { CustomCard } from "../CustomCard"
import { Box, Button, Typography, Input, Stack, Link } from "@mui/material";
import "./login.css";

const CARD_SIZE_WIDTH = 475;
const CARD_SIZE_HEIGHT = 675;

const LoginPage = () => {
    return (
        <CustomCard sx={{ m: 20 }}>
            <Box sx={{ width: CARD_SIZE_WIDTH, height: CARD_SIZE_HEIGHT }}>
                <Typography sx={{ color: "common.first", pt:5}} variant="h3">teamesse</Typography>
                <Box sx={{ pt: 15 }} >
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Input placeholder="Username">asdasd</Input>
                        <Input placeholder="Password">asdasd</Input>
                    </Stack>
                    <Stack>
                        <Button>Sign In</Button>
                        <Link sx={{ color: "common.second" }} href="">Forgot your password?</Link>
                        <br />
                        <Typography sx={{pt:25}}variant="button text">
                            Don't have an Account?
                            <br />
                            <Link sx={{ color: "common.second" }} href="">Sign up</Link>
                        </Typography>
                    </Stack>
                </Box>
            </Box>
        </CustomCard>
    )
}

export default LoginPage;