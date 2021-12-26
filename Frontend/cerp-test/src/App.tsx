import { Route, Switch, BrowserRouter } from "react-router-dom";
import Lists from "./Components/Lists";
import { Todos } from "./Components/Todos";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Lists />
        </Route>
        <Route exact component={Todos} path="/item/:listId" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
