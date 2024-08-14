import "./App.css";
import { Header } from "./components/header";
import { Home } from "./components/home";
import { ChartProvider } from "./components/context/ChartContext";

function App() {
  return (
    <ChartProvider>
      <div>
        <Header />
        <Home />
      </div>
    </ChartProvider>
  );
}

export default App;
