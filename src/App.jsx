import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/home";
import Login from "./components/signin";
import SignUp from "./components/signup";
import Movies from "./components/movies";
import About from "./components/about";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Wrap all routes inside Header */}
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
