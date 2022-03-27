import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Navigation } from "./Navigation/Navigation";
import { Header } from "./components/Header/Header";
import { store } from "./store/Store";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <div className="app-wrapper">
          <Navigation />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
