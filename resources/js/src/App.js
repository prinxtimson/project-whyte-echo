import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import Projects from "./components/Projects/Projects";
import SingleProject from "./components/SingleProject/SingleProject";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { getProjects } from "./actions/project";

const App = () => {
    useEffect(() => {
        store.dispatch(getProjects());
    }, []);
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/admin" component={Admin} />
                    <Route exact path="/" component={Projects} />
                    <Route
                        exact
                        path="/projects/:projectKey/:pathName?"
                        component={SingleProject}
                    />
                </Switch>
            </Router>
        </Provider>
    );
};

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
