import "./app.scss";

import { BrowserRouter, Route, Switch } from "react-router-dom";
// import ScrollToTop from "./component/scrollToTop";

import Create from "./pages/Create";
// import Details from "./pages/Details";
import Summary from "./pages/Summary";


function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/create">
            <Create />
          </Route>
          <Route exact path="/summary">
            <Summary />
          </Route>

          {/* <Route exact path="/details">
            <Details />
          </Route> */}

          <Route>
            <h1>Not found!</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
