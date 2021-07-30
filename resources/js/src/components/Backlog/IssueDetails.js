import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { attachFile, moveIssueToEpic, createIssue } from "../../actions/issue";
import Comment from "./Comment";

const IssueDetails = ({
    issue,
    issues,
    attachFile,
    setCurrentIssue,
    moveIssueToEpic,
    createIssue,
    project,
}) => {
    const fileInput = useRef(null);
    const [summary, setSummary] = useState("");

    const handleUploadFile = (selectedFile, id) => {
        const file = new FormData();
        file.append("file", selectedFile);
        attachFile(file, id);
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

    return (
        <div className="card">
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
                                handleUploadFile(e.target.files[0], issue?.id)
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
                                    <div className="d-flex flex-grow-1">
                                        <h6 className="p-1  text-truncate">
                                            {subtask.fields.summary}
                                        </h6>
                                    </div>
                                    <h6 className="p-1 flex-shrink-0">
                                        {subtask.fields.status?.name}
                                    </h6>
                                </div>
                            </div>
                        ))}
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
    project: state.project.project,
});

export default connect(mapStateToProps, {
    attachFile,
    moveIssueToEpic,
    createIssue,
})(IssueDetails);
