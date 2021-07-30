import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import Container from "../Layouts/Container";
import { getSprintIssues } from "../../actions/sprint";

const Sprints = ({ sprints, getSprintIssues, issues }) => {
    const [todoItems, setTodoItems] = useState([]);
    const [inProgressItems, setInProgressItems] = useState([]);
    const [doneItems, setDoneItems] = useState([]);
    const [initialized, setInitialized] = useState(false);

    const onDragEnd = async (evt) => {
        const { source } = evt;
        let item = {};
        if (source.droppableId == "todoDroppable") {
            item = todoItems[source.index];
            item.done = true;
        } else {
            item = doneItems[source.index];
            item.done = false;
        }
    };

    useEffect(() => {
        issues.map((item) =>
            item.fields.status.id === "10012"
                ? setTodoItems([item, ...todoItems])
                : item.fields.status.id === "10013"
                ? setInProgressItems([item, ...inProgressItems])
                : setDoneItems([item, ...doneItems])
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
        <Container>
            <div className="container p-3">
                <div className="d-flex gap-3 overflow-auto">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="todoDroppable">
                            {(provided, snapshot) => (
                                <div
                                    className="droppable card"
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
                                                                    .parent
                                                                    .fields
                                                                    .summary
                                                            }
                                                        </h6>
                                                        <p className="py-1">
                                                            {
                                                                item.fields
                                                                    .summary
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
                                    className="droppable card"
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
                                                                    .parent
                                                                    .fields
                                                                    .summary
                                                            }
                                                        </h6>
                                                        <p className="py-1">
                                                            {
                                                                item.fields
                                                                    .summary
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
                                    className="droppable card"
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
                                                                    .parent
                                                                    .fields
                                                                    .summary
                                                            }
                                                        </h6>
                                                        <p className="py-1">
                                                            {
                                                                item.fields
                                                                    .summary
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

export default connect(mapStateToProps, { getSprintIssues })(Sprints);
