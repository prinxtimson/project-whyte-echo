import React, { useState } from "react";
import { connect } from "react-redux";
import { createIssue } from "../../actions/issue";

const AddIssueForm = ({ project, loading, createIssue, issues }) => {
    const [formData, setFormData] = useState({
        issuetype: "",
        summary: "",
        parent: "",
        labels: "",
        description: "",
    });
    // console.log(project);
    const { issuetype, summary, parent, description } = formData;

    const handleOnChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (formData.priority) {
            const data = {
                project: {
                    id: project.id,
                },
                summary: summary,
                parent: {
                    key: parent,
                },
                issuetype: {
                    id: issuetype,
                },
                priority: {
                    id: formData.priority,
                },
                description: description,
            };
            createIssue(data, onSuccess);
        } else {
            const data = {
                project: {
                    id: project.id,
                },
                summary: summary,
                parent: {
                    key: parent,
                },
                issuetype: {
                    id: issuetype,
                },
                description: description,
            };
            createIssue(data, onSuccess);
        }
    };

    const onSuccess = () => {
        setFormData({
            issuetype: "",
            summary: "",
            issue: "",
            parent: "",
            description: "",
        });
    };

    return (
        <form onSubmit={handleOnSubmit}>
            <div className="mb-3">
                <label htmlFor="floatingInput">Issue Type</label>
                <select
                    className="form-control form-control-lg"
                    id="issueType"
                    name="issuetype"
                    onChange={handleOnChange}
                    value={issuetype}
                    required
                >
                    <option value="">Select Issue Type</option>
                    {!loading &&
                        project?.issueTypes.map((issue) =>
                            issue.name === "Subtask" ? null : (
                                <option key={issue.id} value={issue.id}>
                                    {issue.name}
                                </option>
                            )
                        )}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="floatingInput">Summary</label>
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Summary"
                    name="summary"
                    onChange={handleOnChange}
                    id="floatingInput"
                    value={summary}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="floatingInput">Description</label>
                <textarea
                    className="form-control"
                    placeholder="Description"
                    name="description"
                    onChange={handleOnChange}
                    id="floatingInput"
                    value={description}
                    rows="3"
                ></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="floatingInput">Parent Issue</label>
                <select
                    className="form-control form-control-lg"
                    id="parent"
                    name="parent"
                    onChange={handleOnChange}
                    value={parent}
                    disabled={issuetype === "10012"}
                >
                    <option value="">Select Parent Issue</option>
                    {!loading &&
                        issues.map(
                            (issue) =>
                                issue.fields.issuetype.name === "Epic" && (
                                    <option key={issue.id} value={issue.key}>
                                        {issue.fields.summary}
                                    </option>
                                )
                        )}
                </select>
            </div>
            {issuetype === "10009" && (
                <div className="mb-3">
                    <label htmlFor="floatingInput">Priority</label>
                    <select
                        className="form-control form-control-lg"
                        id="priority"
                        name="priority"
                        onChange={handleOnChange}
                        value={formData.priority}
                    >
                        <option value="">Select Priority</option>
                        {!loading &&
                            project?.priority.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                    </select>
                </div>
            )}
            <div className="d-grid gap-2 col-12 mx-auto">
                <button
                    className="btn btn-primary btn-lg"
                    data-toggle="modal"
                    data-target="#addIssueForm"
                    type="submit"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

const mapStateToProps = (state) => ({
    project: state.project.project,
    loading: state.project.loading,
    issues: state.issue.issues,
});

export default connect(mapStateToProps, { createIssue })(AddIssueForm);
