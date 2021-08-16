import React from "react";
import { connect } from "react-redux";
import Container from "../Layouts/Container";
import AddIssueForm from "./AddIssueForm";

const Issues = ({ issues, loading, params }) => {
    if (loading) {
        return (
            <Container>
                <div className="container p-5" style={{ minHeight: "89vh" }}>
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
    return (
        <Container params={params}>
            <div className="p-3">
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
                <div className="p-2 d-flex">
                    <div className="list-group flex-grow-1">
                        {issues.map((issue) =>
                            issue.fields.issuetype.name === "Epic" ? (
                                <div
                                    className="p-1 list-group-item list-group-item-action"
                                    key={issue.id}
                                >
                                    <div className="d-flex gap-3 w-100">
                                        <h5 className="p-1">{issue.key}</h5>
                                        <div className="d-flex flex-grow-1">
                                            <h5 className="p-1 flex-shrink-0 text-primary font-weight-bold">
                                                {issue.fields.summary}
                                            </h5>
                                        </div>
                                        <h5 className="p-1 flex-shrink-0">
                                            {issue.fields.status?.name}
                                        </h5>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="p-1 list-group-item list-group-item-action"
                                    key={issue.id}
                                >
                                    <div className="d-flex gap-3 w-100">
                                        <h5 className="p-1">{issue.key}</h5>
                                        <div className="d-flex flex-grow-1">
                                            <h5 className="p-1  text-truncate">
                                                {issue.fields.summary}
                                            </h5>
                                            <h5 className="p-1 flex-shrink-0 text-primary font-weight-bold">
                                                {
                                                    issue.fields.parent?.fields
                                                        .summary
                                                }
                                            </h5>
                                        </div>
                                        <h5 className="p-1 flex-shrink-0">
                                            {issue.fields.status?.name}
                                        </h5>
                                    </div>
                                </div>
                            )
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
            </div>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    issues: state.issue.issues,
    loading: state.issue.loading,
});

export default connect(mapStateToProps)(Issues);
