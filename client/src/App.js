import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import { EthProvider } from "./contexts/EthContext";
import CustomRoutes from "./components/CustomRoutes";
function App() {
  return (
    <EthProvider>
      <div id="app">
        <NavBar />
        <CustomRoutes />
      </div>
    </EthProvider>
  );
}

export default App;
