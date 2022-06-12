import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
