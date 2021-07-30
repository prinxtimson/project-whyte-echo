import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Container from "../Layouts/Container";
import AddIssueForm from "./AddIssueForm";
import { getBacklog } from "../../actions/backlog";
import { createSprint } from "../../actions/sprint";
import EditSprint from "./EditSprint";
import Sprint from "./Sprint";
import "./style.css";
import Issue from "./Issue";
import IssueDetails from "./IssueDetails";

const Backlog = ({ issues, getBacklog, createSprint, sprints, project }) => {
    const [currentIssue, setCurrentIssue] = useState(null);
    const [currentSprint, setCurrentSprint] = useState(null);

    useEffect(() => {
        getBacklog(project?.boards[0]?.id);
    }, [project]);

    useEffect(() => {
        if (currentIssue) {
            issues.map((item) => {
                if (item.id === currentIssue.id) {
                    setCurrentIssue(item);
                }
            });
        }
    }, [issues]);

    const handleOnClick = (val) => {
        setCurrentIssue(val);
    };

    const onCreateSprintClick = () => {
        const data = {
            name: `${project.key} Sprint ${sprints.length + 1}`,
            originBoardId: project?.boards[0]?.id,
        };
        createSprint(data);
    };

    return (
        <Container>
            {project && (
                <>
                    <div className="d-flex" style={{ maxHeight: "89vh" }}>
                        <div className="overflow-auto flex-grow-1 p-3 mt-2">
                            <div className="py-2">
                                {sprints.map(
                                    (sprint) =>
                                        sprint.state === "active" && (
                                            <Sprint
                                                sprint={sprint}
                                                handleOnClick={handleOnClick}
                                                setCurrentSprint={
                                                    setCurrentSprint
                                                }
                                                key={sprint.id}
                                            />
                                        )
                                )}
                            </div>
                            <hr />
                            <div className="py-2">
                                {sprints.map(
                                    (sprint) =>
                                        sprint.state === "future" && (
                                            <Sprint
                                                sprint={sprint}
                                                handleOnClick={handleOnClick}
                                                setCurrentSprint={
                                                    setCurrentSprint
                                                }
                                                key={sprint.id}
                                            />
                                        )
                                )}
                            </div>
                            <div className="p-1">
                                <div className="d-grid gap-2 col-12 mx-auto">
                                    <button
                                        className="btn btn-light"
                                        type="button"
                                        onClick={onCreateSprintClick}
                                    >
                                        Create Sprint
                                    </button>
                                </div>
                            </div>
                            <div
                                className="list-group flex-grow-1 border"
                                style={{ minHeight: 50 }}
                            >
                                {issues.map((issue) =>
                                    issue.fields.issuetype.name === "Epic" ||
                                    issue.fields.parent?.fields.issuetype
                                        .name === "Story" ? null : (
                                        <Issue
                                            issue={issue}
                                            handleOnClick={handleOnClick}
                                            key={issue.id}
                                        />
                                    )
                                )}
                            </div>
                            <div className="p-2">
                                <div className="d-grid gap-2 col-12 mx-auto">
                                    <button
                                        className="btn btn-light"
                                        type="button"
                                        data-toggle="modal"
                                        data-target="#addIssueForm"
                                    >
                                        Create Issue
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`p-2 overflow-auto ${
                                currentIssue ? "d-block" : "d-none"
                            }`}
                            style={{ width: "420px", maxHeight: "89vh" }}
                        >
                            {currentIssue && (
                                <IssueDetails
                                    issue={currentIssue}
                                    setCurrentIssue={setCurrentIssue}
                                />
                            )}
                        </div>
                    </div>
                    <div
                        className="modal fade"
                        id="addIssueForm"
                        tabIndex="-1"
                        aria-labelledby="addIssueForm"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content p-4">
                                <AddIssueForm />
                            </div>
                        </div>
                    </div>
                    <div
                        className="modal fade"
                        id="editSprintForm"
                        tabIndex="-1"
                        aria-labelledby="editSprintForm"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content p-4">
                                <EditSprint sprint={currentSprint} />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Container>
    );
};

const mapStateToProps = (state) => ({
    issues: state.backlog.issues,
    sprints: state.sprint.sprints,
    boards: state.board.boards,
    project: state.project.project,
});

export default connect(mapStateToProps, {
    getBacklog,
    createSprint,
})(Backlog);
