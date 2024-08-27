import "./App.css";
import { Header } from "./components/header";
import { Home } from "./components/home";
import { ChartProvider } from "./components/context/ChartContext";
import { SearchProvider } from "./components/context/SearchContext";

function App() {
  return (
    <SearchProvider>
      <ChartProvider>
        <div>
          <Header />
          <Home />
        </div>
      </ChartProvider>
    </SearchProvider>
  );
}

export default App;
