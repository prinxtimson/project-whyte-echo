import React from "react";
import { connect } from "react-redux";
import { setCurrentIssue } from "../../actions/backlog";
import { editSprint } from "../../actions/sprint";

const Sprint = ({
    sprint,
    sprints,
    setCurrentIssue,
    setCurrentSprint,
    nextSprint,
    editSprint,
}) => {
    const onCompleteSprint = () => {
        const data = {
            name: sprint.name,
            startDate: sprint.startDate,
            endDate: sprint.endDate,
            state: "closed",
            completeDate: new Date(),
        };

        editSprint(data, sprint.id);
    };

    return (
        <div className="mb-2 card bg-light">
            <div className="card-header d-flex justify-content-between">
                <h6 className="font-weight-bold">{sprint.name}</h6>
                <div>
                    {sprint.state === "active" ? (
                        <button
                            className="btn btn-light"
                            type="button"
                            onClick={onCompleteSprint}
                        >
                            Complete Sprint
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary"
                            type="button"
                            data-toggle="modal"
                            data-target="#editSprintForm"
                            onClick={() => setCurrentSprint(sprint)}
                            disabled={
                                nextSprint !== sprint.id ||
                                sprints.find(
                                    (item) => item.state === "active"
                                ) ||
                                sprint.issues.length === 0
                            }
                        >
                            Start Sprint
                        </button>
                    )}
                </div>
            </div>
            <div className="card-body">
                <div className="list-group">
                    {sprint.issues?.map((issue, index) => (
                        <a
                            href="#"
                            className={`p-1 list-group-item list-group-item-action ${
                                index % 2 === 0 && "list-group-item-primary"
                            }`}
                            aria-current="true"
                            key={issue.id}
                            onClick={() => setCurrentIssue(issue)}
                        >
                            <div className="d-flex gap-3 w-100">
                                <h5 className="p-1">{issue.key}</h5>
                                <div className="d-flex flex-grow-1">
                                    <h5 className="p-1  text-truncate">
                                        {issue.fields.summary}
                                    </h5>
                                    <h5 className="p-1 flex-shrink-0 text-primary font-weight-bold">
                                        {issue.fields.parent?.fields.summary}
                                    </h5>
                                </div>
                                <h5 className="p-1 flex-shrink-0">
                                    {issue.fields.status?.name}
                                </h5>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    issues: state.backlog.issues,
    sprints: state.sprint.sprints,
    boards: state.board.boards,
    project: state.project.project,
});

export default connect(mapStateToProps, { setCurrentIssue, editSprint })(
    Sprint
);
