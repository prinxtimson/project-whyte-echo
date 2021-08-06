import React, { useState } from "react";
import { connect } from "react-redux";
import { delIssue, updateStoryPoints } from "../../actions/issue";
import { moveIssueToSprint } from "../../actions/sprint";
import { setCurrentIssue } from "../../actions/backlog";

const Issue = ({
    issue,
    sprints,
    delIssue,
    moveIssueToSprint,
    setCurrentIssue,
    updateStoryPoints,
}) => {
    const [value, setValue] = useState("");
    const [editStoryPoints, setEditStoryPoints] = useState(false);

    const handleEditStoryPointsClick = () => {
        setEditStoryPoints(true);
        setValue(issue.fields.customfield_10016 || "");
    };

    const onStoryPointsSubmit = () => {
        updateStoryPoints(value, issue.id);
        setEditStoryPoints(false);
    };

    return (
        <div className="p-1 list-group-item list-group-item-action">
            <div className="d-flex gap-3 w-100 align-items-center">
                <a
                    href="#"
                    aria-current="true"
                    className="d-flex gap-3 align-items-center list-group-item-action"
                    onClick={() => setCurrentIssue(issue)}
                >
                    <h5 className="p-1 mb-0">{issue.key}</h5>
                    <div className="d-flex flex-grow-1">
                        <h5 className="p-1 mb-0 text-truncate">
                            {issue.fields.summary}
                        </h5>
                        <h5 className="p-1 mb-0 flex-shrink-0 text-primary font-weight-bold">
                            {issue.fields.parent?.fields.summary}
                        </h5>
                    </div>
                </a>
                <div style={{ zIndex: 100 }}>
                    {!editStoryPoints ? (
                        <button
                            type="button"
                            onClick={handleEditStoryPointsClick}
                            className="btn btn-light btn-sm"
                        >
                            {issue.fields.customfield_10016}
                        </button>
                    ) : (
                        <div className="d-flex" style={{ width: "100%" }}>
                            <input
                                type="number"
                                name="storyPoints"
                                value={value}
                                className="form-control"
                                onChange={(e) => setValue(e.target.value)}
                            />
                            <button
                                type="button"
                                className="btn btn-light btn-sm"
                                onClick={onStoryPointsSubmit}
                            >
                                <i className="bi bi-check2"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-light btn-sm"
                                onClick={() => setEditStoryPoints(false)}
                            >
                                <i className="bi bi-x"></i>
                            </button>
                        </div>
                    )}
                </div>
                <h5 className="p-1 mb-0 flex-shrink-0">
                    {issue.fields.status?.name}
                </h5>

                <div className="dropleft">
                    <button
                        className="btn dropdown-toggle py-0"
                        type="button"
                        id="dropdownMenu1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <i
                            className="bi bi-three-dots"
                            style={{ fontSize: 25 }}
                        ></i>
                    </button>
                    <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenu1"
                    >
                        <button
                            className="btn dropdown-item"
                            onClick={() => delIssue(issue.id)}
                        >
                            Delete
                        </button>
                        <small className="text-secondary px-3">MOVE TO</small>
                        {sprints.map(
                            (sprint) =>
                                sprint.state === "future" && (
                                    <a
                                        key={sprint.id}
                                        className="dropdown-item"
                                        href="#"
                                        onClick={() =>
                                            moveIssueToSprint(issue, sprint.id)
                                        }
                                    >
                                        {sprint.name}
                                    </a>
                                )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    sprints: state.sprint.sprints,
});

export default connect(mapStateToProps, {
    delIssue,
    moveIssueToSprint,
    setCurrentIssue,
    updateStoryPoints,
})(Issue);
