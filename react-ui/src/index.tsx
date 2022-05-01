import {render} from "react-dom";
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import App from "./App";
import Homepage from "./routes/Homepage";
import Favorites from "./routes/Favorites";
import Politicians from "./routes/Politicians";
import Bills from "./routes/Bills";
import News from "./routes/News";
import NavigationBar from "./components/NavigationBar";
import {ThemeProvider} from "@mui/material/styles";
import {colorTheme} from "./theme/colorTheme";
import Analytics from "./routes/Analytics";
import Users from "./routes/Users";

const rootElement = document.getElementById("root");

render(
    <BrowserRouter>
        <ThemeProvider theme={colorTheme}>
            <NavigationBar/>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="home" element={<Homepage/>}/>
                <Route path="favorites" element={<Favorites/>}/>
                <Route path="politicians" element={<Politicians/>}/>
                <Route path="bills" element={<Bills/>}/>
                <Route path="news" element={<News/>}/>
                <Route path="logout" element={<App/>}/>
                <Route path="analytics" element={<Analytics/>}/>
                <Route path ="users" element={<Users/>}/>
            </Routes>
        </ThemeProvider>
    </BrowserRouter>,
    rootElement
);