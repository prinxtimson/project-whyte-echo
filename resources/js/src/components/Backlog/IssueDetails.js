import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import {
    attachFile,
    moveIssueToEpic,
    createIssue,
    updateStoryPoints,
} from "../../actions/issue";
import { setCurrentIssue } from "../../actions/backlog";
import Comment from "./Comment";

const IssueDetails = ({
    issue,
    issues,
    attachFile,
    setCurrentIssue,
    moveIssueToEpic,
    updateStoryPoints,
    createIssue,
    project,
}) => {
    const fileInput = useRef(null);
    const [summary, setSummary] = useState("");
    const [value, setValue] = useState("");
    const [editStoryPoints, setEditStoryPoints] = useState(false);

    const handleUploadFile = (selectedFile, id) => {
        const file = new FormData();
        file.append("file", selectedFile);
        console.log(selectedFile);
        attachFile(file, id);
    };

    const handleEditStoryPointsClick = (val) => {
        setEditStoryPoints(val.id);
        setValue(val.fields.customfield_10016 || "");
    };

    const handleCreateSubtask = (parent) => {
        const issuetype = project?.issueTypes.find(
            (item) => item.name === "Subtask"
        );

        const data = {
            project: {
                id: project?.id,
            },
            summary: summary,
            parent: {
                key: parent,
            },
            issuetype: {
                id: issuetype.id,
            },
        };

        createIssue(data, onSubTask);
    };

    const onSubTask = () => {
        setSummary("");
    };

    const onStoryPointsSubmit = (issueId) => {
        console.log(issueId);
        updateStoryPoints(value, issueId);
        setEditStoryPoints(null);
    };

    return (
        <div className="card border-0">
            <div className="card-header d-flex p-2">
                <div className="flex-shrink-0">
                    {issue?.fields.parent ? (
                        <small>{issue?.fields.parent?.fields.summary}</small>
                    ) : (
                        <div className="dropdown">
                            <button
                                className="btn dropdown-toggle"
                                type="button"
                                id="epicMenu"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                disabled
                            >
                                Epic
                            </button>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="epicMenu"
                            >
                                {issues.map(
                                    (item) =>
                                        item.fields.issuetype.name ===
                                            "Epic" && (
                                            <a
                                                className="dropdown-item"
                                                key={item.id}
                                                href="#"
                                                onClick={() =>
                                                    moveIssueToEpic(
                                                        issue,
                                                        item.key
                                                    )
                                                }
                                            >
                                                {item.fields.summary}
                                            </a>
                                        )
                                )}
                            </div>
                        </div>
                    )}{" "}
                    / <small>{issue?.key}</small>
                </div>
                <div className="flex-grow-1 d-flex justify-content-end">
                    <button
                        type="button"
                        onClick={() => setCurrentIssue(null)}
                        className="close"
                        aria-label="Close"
                    >
                        <i className="bi bi-x"></i>
                    </button>
                </div>
            </div>
            <div
                className="card-body overflow-auto"
                style={{ maxHeight: "60vh" }}
            >
                <div>
                    <h5 className="font-weight-bold">
                        {issue?.fields.summary}
                    </h5>
                    <div className="d-flex">
                        <button
                            type="button"
                            className="btn btn-light btn-sm px-1"
                            onClick={() => fileInput.current?.click()}
                        >
                            <i
                                className="bi bi-paperclip "
                                style={{
                                    fontSize: 20,
                                }}
                            ></i>
                        </button>
                        <button
                            className="btn btn-light btn-sm mx-2"
                            data-toggle="collapse"
                            data-target="#subTaskInput"
                            aria-expanded="false"
                            aria-controls="subTaskInput"
                            type="button"
                        >
                            Sub task
                        </button>
                        <input
                            type="file"
                            ref={fileInput}
                            name="file"
                            id="file"
                            onChange={(e) =>
                                handleUploadFile(e.target.files[0], issue?.key)
                            }
                            className="d-none"
                        />
                    </div>
                </div>

                <div>
                    <small className="font-weight-bold">Description</small>
                    <h6>{issue?.fields.description}</h6>
                </div>
                <div className="py-3">
                    <h6 className="font-weight-bold">Sub tasks</h6>
                    <div className="collapse" id="subTaskInput">
                        <div className="mb-2">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Summary"
                                name="summary"
                                onChange={(e) => setSummary(e.target.value)}
                                id="floatingInput"
                                value={summary}
                                required
                            />
                        </div>
                        <div className="d-grid col-12 ">
                            <button
                                className="btn btn-primary btn-sm"
                                type="button"
                                onClick={() => handleCreateSubtask(issue?.key)}
                                disabled={!summary}
                            >
                                Create
                            </button>
                            <button
                                className="btn btn-light btn-sm mx-2"
                                data-toggle="collapse"
                                data-target="#subTaskInput"
                                aria-expanded="false"
                                aria-controls="subTaskInput"
                                type="button"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                    <div className="py-2">
                        {issue?.fields.subtasks.map((subtask) => (
                            <div
                                className="shadow-sm px-2 mb-2 bg-white rounded border"
                                key={subtask.id}
                            >
                                <div className="d-flex gap-3 align-items-center">
                                    <h6 className="p-1">{subtask.key}</h6>
                                    <div className="d-flex flex-grow-1 overflow-hidden">
                                        <h6 className="p-1  text-truncate">
                                            {subtask.fields.summary}
                                        </h6>
                                    </div>

                                    {/*editStoryPoints === subtask.id ? (
                                        <div
                                            className="d-flex"
                                            style={{ width: 180, zIndex: 100 }}
                                        >
                                            <input
                                                type="number"
                                                name="storyPoints"
                                                value={value}
                                                className="form-control"
                                                onChange={(e) =>
                                                    setValue(e.target.value)
                                                }
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-light btn-sm"
                                                onClick={() =>
                                                    onStoryPointsSubmit(
                                                        subtask.id
                                                    )
                                                }
                                            >
                                                <i className="bi bi-check2"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-light btn-sm"
                                                onClick={() =>
                                                    setEditStoryPoints(null)
                                                }
                                            >
                                                <i className="bi bi-x"></i>
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleEditStoryPointsClick(
                                                    subtask
                                                )
                                            }
                                            className="btn btn-light btn-sm"
                                        >
                                            {subtask.fields.customfield_10016}
                                        </button>
                                        )*/}

                                    <h6 className="p-1 flex-shrink-0">
                                        {subtask.fields.status?.name}
                                    </h6>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="accordion" id="accordionExample">
                    <div className="card">
                        <div
                            className="card-header d-flex justify-content-between"
                            id="headingOne"
                        >
                            <h4 className="mb-0">Details</h4>
                            <button
                                className="btn btn-link btn-block text-left"
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                            ></button>
                        </div>

                        <div
                            id="collapseOne"
                            className="collapse show"
                            aria-labelledby="headingOne"
                            data-parent="#accordionExample"
                        >
                            <div className="card-body">
                                <div className="row py-3">
                                    <div className="col-6 align-items-center">
                                        <h6 className="font-weight-bold">
                                            Sprint
                                        </h6>
                                    </div>
                                    <div className="col-6 align-items-center">
                                        <h6>{issue.fields.sprint?.name}</h6>
                                    </div>
                                </div>
                                <div className="row py-3">
                                    <div className="col-6 align-items-center">
                                        <h6 className="font-weight-bold">
                                            Priority
                                        </h6>
                                    </div>
                                    <div className="col-6 align-items-center">
                                        <h6>{issue.fields.priority?.name}</h6>
                                    </div>
                                </div>
                                <div className="row py-3">
                                    <div className="col-6 align-items-center">
                                        <h6 className="font-weight-bold">
                                            Story point estimate
                                        </h6>
                                    </div>
                                    <div className="col-6 align-items-center">
                                        {editStoryPoints === issue.id ? (
                                            <div
                                                className="d-flex"
                                                style={{ width: "100%" }}
                                            >
                                                <input
                                                    type="number"
                                                    name="storyPoints"
                                                    value={value}
                                                    className="form-control"
                                                    onChange={(e) =>
                                                        setValue(e.target.value)
                                                    }
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-light btn-sm"
                                                    onClick={() =>
                                                        onStoryPointsSubmit(
                                                            issue.id
                                                        )
                                                    }
                                                >
                                                    <i className="bi bi-check2"></i>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-light btn-sm"
                                                    onClick={() =>
                                                        setEditStoryPoints(null)
                                                    }
                                                >
                                                    <i className="bi bi-x"></i>
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleEditStoryPointsClick(
                                                        issue
                                                    )
                                                }
                                                className="btn btn-light btn-sm"
                                            >
                                                {issue.fields.customfield_10016}
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="row py-3">
                                    <div className="col-6 align-items-center">
                                        <h6 className="font-weight-bold">
                                            Reporter
                                        </h6>
                                    </div>
                                    <div className="col-6 align-items-center">
                                        <h6>
                                            {issue.fields.reporter?.displayName}
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <Comment
                    comments={issue?.fields.comment.comments}
                    issueId={issue?.id}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    issues: state.backlog.issues,
    issue: state.backlog.issue,
    project: state.project.project,
});

export default connect(mapStateToProps, {
    attachFile,
    moveIssueToEpic,
    createIssue,
    setCurrentIssue,
    updateStoryPoints,
})(IssueDetails);
