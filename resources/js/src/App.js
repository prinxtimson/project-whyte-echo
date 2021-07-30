import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Backlog from "./components/Backlog/Backlog";
import Issues from "./components/Issues/Issues";
import Sprints from "./components/Sprints/Sprints";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { getProject } from "./actions/project";

const App = () => {
    useEffect(() => {
        store.dispatch(getProject());
    }, []);
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/backlog" component={Backlog} />
                    <Route exact path="/sprints" component={Sprints} />
                    <Route exact path="/" component={Issues} />
                </Switch>
            </Router>
        </Provider>
    );
};

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
