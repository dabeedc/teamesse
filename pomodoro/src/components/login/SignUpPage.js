import { CustomCard } from "../CustomCard"
import { Box, Button, Typography, Input, Stack, Link, Icon } from "@mui/material";

const CARD_SIZE_WIDTH = 475;
const CARD_SIZE_HEIGHT = 675;

const SignUpPage = () => {
    return (
        <CustomCard sx={{ m: 20 }}>
            <Box sx={{ width: CARD_SIZE_WIDTH, height: CARD_SIZE_HEIGHT }}>
                <Typography sx={{ color: "common.first", pt: 5 }} variant="h3">Let's collaborate.</Typography>
                <Box sx={{pt:15}}>
                    
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Input placeholder="Email">asdasd</Input>
                        <Input placeholder="Full Name">asdasd</Input>
                        <Input placeholder="Username">asdasd</Input>
                        <Input placeholder="Password">asdasd</Input>
                    </Stack>
                    <Stack>
                        <Button>Sign Up!</Button>
                    </Stack>
                    <Stack>
                    <Typography sx={{ pt: 25 }} variant="button text">
                            Already have an Account?
                            <br />
                            <Link sx={{ color: "common.second" }} href="login">Sign in</Link>
                        </Typography>
                    </Stack>
                </Box>

            </Box>
        </CustomCard>
    )
}

export default SignUpPage;