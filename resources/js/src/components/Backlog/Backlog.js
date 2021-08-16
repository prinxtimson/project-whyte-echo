import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Container from "../Layouts/Container";
import AddIssueForm from "./AddIssueForm";
import { createSprint } from "../../actions/sprint";
import { setCurrentIssue } from "../../actions/backlog";
import EditSprint from "./EditSprint";
import Sprint from "./Sprint";
import "./style.css";
import Issue from "./Issue";
import IssueDetails from "./IssueDetails";

const Backlog = ({
    issues,
    issue,
    createSprint,
    sprints,
    project,
    params,
    setCurrentIssue,
}) => {
    const [currentSprint, setCurrentSprint] = useState(null);
    const futureSprint = sprints.filter((item) => item.state === "future");
    const nextSprint = futureSprint.length > 0 ? futureSprint[0].id : null;

    const onCreateSprintClick = () => {
        const data = {
            name: `${project.key} Sprint ${sprints.length + 1}`,
            originBoardId: project?.boards[0]?.id,
        };
        createSprint(data);
    };

    useEffect(() => {
        const backlogIssue = issues.find((item) => item.id === issue?.id);
        const sp = sprints.find(
            (item) => item.id === issue?.fields?.sprint?.id
        );
        const sprintIssue = sp?.issues?.find((item) => item.id === issue?.id);

        if (backlogIssue) {
            setCurrentIssue(backlogIssue);
        }

        if (sprintIssue) {
            setCurrentIssue(sprintIssue);
        }

        if (issue?.fields?.project?.id !== project?.id) {
            setCurrentIssue(null);
        }
    }, [issues, sprints]);

    return (
        <Container params={params}>
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
                                                setCurrentSprint={
                                                    setCurrentSprint
                                                }
                                                nextSprint={nextSprint}
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
                                {issues.map((item) =>
                                    item.fields.issuetype?.name === "Epic" ||
                                    item.fields.parent?.fields.issuetype
                                        .name === "Story" ? null : (
                                        <Issue issue={item} key={item.id} />
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
                                issue ? "d-block" : "d-none"
                            }`}
                            style={{ width: "420px", maxHeight: "89vh" }}
                        >
                            {issue && <IssueDetails />}
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
    issue: state.backlog.issue,
    sprints: state.sprint.sprints,
    boards: state.board.boards,
    project: state.project.project,
});

export default connect(mapStateToProps, {
    createSprint,
    setCurrentIssue,
})(Backlog);
