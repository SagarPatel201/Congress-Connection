import {createRef} from "react";
import {AppBar, Button, CssBaseline, Link, List, ListItem, Stack, Toolbar} from "@mui/material"
import {Link as RouterLink} from "react-router-dom";
import Login from "../routes/Login";

function NavigationBar() {
    let loginRef : any = createRef();

    return (
        <AppBar
            position="static"
        >
            <CssBaseline />
            <Toolbar>
                <Login ref={loginRef}/>
                <List
                    component={Stack}
                    direction="row"
                    spacing={4}
                >
                    <ListItem>
                        <Link component={RouterLink} to="/">
                            Home
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link component={RouterLink} to="/politicians">
                            Congressmen
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link component={RouterLink} to="/bills">
                            Bills
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link component={RouterLink} to={'/analytics'}>
                            Analytics
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link component={RouterLink} to="/news">
                            News
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link component={RouterLink} to="/favorites">
                            Favorites
                        </Link>
                    </ListItem>
                </List>
                {localStorage.getItem("JWT") === null ?
                    <Button
                        sx={{
                            backgroundColor: "white",
                            color: "primary.dark",
                            justifySelf: "flex-end",
                            "&:hover": {
                                backgroundColor: "white",
                                color: "primary.dark",
                            },
                        }}
                        variant={'contained'}
                        onClick={() => {
                            loginRef.current.openLogin();
                        }}
                    >
                        Login
                    </Button>
                    :
                    <Button
                        sx={{
                            backgroundColor: "white",
                            color: "primary.dark",
                            justifySelf: "flex-end",
                            "&:hover": {
                                backgroundColor: "white",
                                color: "primary.dark",
                            },
                        }}
                        variant={'contained'}
                        onClick={() => {
                            localStorage.removeItem("JWT");
                            window.location.reload();
                        }}
                    >
                        Logout
                    </Button>}
            </Toolbar>
        </AppBar>
    )
}

export default NavigationBar;