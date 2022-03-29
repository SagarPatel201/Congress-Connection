import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import Homepage from "./routes/Homepage";
import Favorites from "./routes/Favorites";
import Politicans from "./routes/Politicians";
import Bills from "./routes/Bills";
import News from "./routes/News";
import SignupRoute from "./routes/SignupRoute";
const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="home" element={<Homepage />} />
      <Route path="favorites" element={<Favorites />} />
      <Route path="politicans" element={<Politicans />} />
      <Route path="bills" element={<Bills />} />
      <Route path="news" element={<News />} />
      <Route path="logout" element={<App />} />
      <Route path="signup" element={<SignupRoute />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);