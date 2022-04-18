import {useState, forwardRef, useImperativeHandle, ReactNode} from "react"
import {Paper, Tab, Box, Grid, Modal} from "@mui/material"
import LoginForm from '../components/LoginForm'
import SignUpForm from "../components/SignUpForm"
import TabContext from "@mui/lab/TabContext"
import {TabList, TabPanel} from "@mui/lab";

const Login = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState('login')
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    useImperativeHandle(ref, () => ({
        openLogin: handleOpen
    }))


    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Paper
                style={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "20vw",
                    padding: "2rem",
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
                                <LoginForm onSuccess={() => setOpen(false)}/>
                            </TabPanel>
                            <TabPanel value={'signup'}>
                                <SignUpForm onSuccess={() => setTab("login")}/>
                            </TabPanel>
                        </Grid>
                    </TabContext>
                </Grid>
            </Paper>
        </Modal>
    );
})

export default Login;