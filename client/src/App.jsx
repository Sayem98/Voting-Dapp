import { EthProvider } from "./contexts/EthContext";

import "./App.css";
import Page from "./components/Page";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <Page />
      </div>
    </EthProvider>
  );
}

export default App;
