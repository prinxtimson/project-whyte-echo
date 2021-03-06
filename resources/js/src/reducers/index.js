import { combineReducers } from "redux";
import issue from "./issue";
import project from "./project";
import alert from "./alert";
import board from "./board";
import sprint from "./sprint";
import backlog from "./backlog";
import report from "./report";

export default combineReducers({
    issue,
    project,
    alert,
    board,
    sprint,
    backlog,
    report,
});
