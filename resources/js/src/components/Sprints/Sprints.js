import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import Container from "../Layouts/Container";
import { getSprintIssues, changeIssueStatus } from "../../actions/sprint";
import axios from "axios";
import { BASE_URL } from "../../utils";

const Sprints = ({
    sprints,
    getSprintIssues,
    issues,
    params,
    changeIssueStatus,
}) => {
    const [todoItems, setTodoItems] = useState([]);
    const [inProgressItems, setInProgressItems] = useState([]);
    const [doneItems, setDoneItems] = useState([]);
    const [transitions, setTransitions] = useState([]);

    const onDragEnd = async (evt) => {
        const { source, destination } = evt;
        let item = {};
        console.log(evt);
        if (destination.droppableId == "todoDroppable") {
            item = todoItems[source.index];
            setDoneItems([item, ...todoItems]);
        } else if (destination.droppableId == "progressDroppable") {
            item = inProgressItems[source.index];
            setInProgressItems([item, ...inProgressItems]);
        } else {
            item = doneItems[source.index];
            // setDoneItems([item, ...doneItems]);
        }
    };

    useEffect(() => {
        if (issues.length > 0) {
            getTransitions(issues[0]);
        }
    }, [issues]);

    const getTransitions = async (issueId) => {
        try {
            const res = await axios.get(
                `${BASE_URL}/api/issues/${issueId}/transitions`
            );

            setTransitions(res.data.transitions);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setTodoItems(
            issues.filter((item) => item.fields.status.name === "To Do")
        );
        setInProgressItems(
            issues.filter((item) => item.fields.status.name === "In Progress")
        );
        setDoneItems(
            issues.filter((item) => item.fields.status.name === "Done")
        );
    }, [issues]);

    useEffect(() => {
        if (sprints.length > 0) {
            const activeSprint = sprints.filter(
                (item) => item.state === "active"
            )[0];

            getSprintIssues(activeSprint.id);
        }
    }, [sprints]);

    return (
        <Container params={params}>
            <div className="container p-3">
                <div className="d-flex gap-3 overflow-auto">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="todoDroppable">
                            {(provided, snapshot) => (
                                <div
                                    className="droppable card mx-3"
                                    ref={provided.innerRef}
                                    style={{
                                        minWidth: "282px",
                                        maxWidth: "282px",
                                        minHeight: "70vh",
                                    }}
                                >
                                    &nbsp;
                                    <h6 className="text-primary m-2 fw-bold">
                                        TO DO
                                    </h6>
                                    <div className="list-group">
                                        {todoItems.map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        className="list-group-item p-2 m-2"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <h6 className="py-1">
                                                            {
                                                                item.fields
                                                                    ?.parent
                                                                    ?.fields
                                                                    ?.summary
                                                            }
                                                        </h6>
                                                        <p className="py-1">
                                                            {
                                                                item.fields
                                                                    ?.summary
                                                            }
                                                        </p>
                                                        <h5 className="fw-bold">
                                                            {item.key}
                                                        </h5>
                                                        <a>
                                                            <i className="fa fa-close"></i>
                                                        </a>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    </div>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <Droppable droppableId="progressDroppable">
                            {(provided, snapshot) => (
                                <div
                                    className="droppable card mx-3"
                                    ref={provided.innerRef}
                                    style={{
                                        minWidth: "282px",
                                        maxWidth: "282px",
                                        minHeight: "70vh",
                                    }}
                                >
                                    &nbsp;
                                    <h6 className="text-warning m-2 fw-bold">
                                        IN PROGRESS
                                    </h6>
                                    <div className="list-group">
                                        {inProgressItems.map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        className="list-group-item p-2 m-2"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <h6 className="py-1">
                                                            {
                                                                item.fields
                                                                    ?.parent
                                                                    ?.fields
                                                                    ?.summary
                                                            }
                                                        </h6>
                                                        <p className="py-1">
                                                            {
                                                                item.fields
                                                                    ?.summary
                                                            }
                                                        </p>
                                                        <h5 className="fw-bold">
                                                            {item.key}
                                                        </h5>
                                                        <a>
                                                            <i className="fa fa-close"></i>
                                                        </a>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    </div>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <Droppable droppableId="doneDroppable">
                            {(provided, snapshot) => (
                                <div
                                    className="droppable card  mx-3"
                                    ref={provided.innerRef}
                                    style={{
                                        minWidth: "282px",
                                        maxWidth: "282px",
                                        minHeight: "70vh",
                                    }}
                                >
                                    &nbsp;
                                    <h6 className="text-success m-2 fw-bold">
                                        DONE
                                    </h6>
                                    <div className="list-group">
                                        {doneItems.map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        className="list-group-item p-2 m-2"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <h6 className="py-1">
                                                            {
                                                                item.fields
                                                                    ?.parent
                                                                    ?.fields
                                                                    ?.summary
                                                            }
                                                        </h6>
                                                        <p className="py-1">
                                                            {
                                                                item.fields
                                                                    ?.summary
                                                            }
                                                        </p>
                                                        <h5 className="fw-bold">
                                                            {item.key}
                                                        </h5>
                                                        <a>
                                                            <i className="fa fa-close"></i>
                                                        </a>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    </div>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    sprints: state.sprint.sprints,
    issues: state.sprint.issues,
});

export default connect(mapStateToProps, { getSprintIssues, changeIssueStatus })(
    Sprints
);
