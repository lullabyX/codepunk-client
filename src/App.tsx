import { Provider } from "react-redux";
import CellList from "./components/Cell/CellList";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <CellList />
    </Provider>
  );
}

export default App;
