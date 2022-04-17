import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import Homepage from "./routes/Homepage";
import Favorites from "./routes/Favorites";
import Politicians from "./routes/Politicians";
import Bills from "./routes/Bills";
import News from "./routes/News";
const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="home" element={<Homepage />} />
      <Route path="favorites" element={<Favorites />} />
      <Route path="politicians" element={<Politicians />} />
      <Route path="bills" element={<Bills />} />
      <Route path="news" element={<News />} />
      <Route path="logout" element={<App />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);