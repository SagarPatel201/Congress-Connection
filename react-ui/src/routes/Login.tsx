import React from "react"
import {Paper, Tab, Box, styled, Grid} from "@mui/material"
import LoginForm from '../components/LoginForm'
import SignUpForm from "../components/SignUpForm"
import TabContext from "@mui/lab/TabContext"
import background from "../assets/images/capitolhill.jpeg"
import {TabList, TabPanel} from "@mui/lab";
import {useNavigate} from "react-router-dom";

const LoginContainer = styled("div") ({
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",

    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
});

const Login = () => {
    const [tab, setTab] = React.useState('login')

    return (
        <div>
            <LoginContainer>
                <Paper
                    style={{
                        width: "20vw",
                        padding: "2rem",
                        margin: "2rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Grid container spacing={2} justifyContent={'center'} >
                        <TabContext value={tab}>
                            <Grid item xs={12}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList
                                        variant = "fullWidth"
                                        onChange={(event: React.SyntheticEvent, tab : string) => setTab(tab)}
                                    >
                                        <Tab label={'Login'} value={'login'}/>
                                        <Tab label={'Sign Up'} value={'signup'}/>
                                    </TabList>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <TabPanel value={'login'}>
                                    <LoginForm navigate={useNavigate()}/>
                                </TabPanel>
                                <TabPanel value={'signup'}>
                                    <SignUpForm />
                                </TabPanel>
                            </Grid>
                        </TabContext>
                    </Grid>
                </Paper>
            </LoginContainer>
        </div>
    );
};

export default Login;