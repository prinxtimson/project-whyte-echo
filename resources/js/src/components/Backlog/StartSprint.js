import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const StartSprint = ({ project, loading, sprint }) => {
    const [formData, setFormData] = useState({
        name: sprint.name || "",
        startDate: sprint.startDate || "",
        endDate: sprint.endDate || "",
        goal: sprint.goal || "",
    });
    // console.log(project);
    const { name, startDate, endDate, goal } = formData;

    const handleOnChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleOnSubmit = (e) => {
        e.preventDefault();
        formData.project = project.id;
        //console.log(formData);
        //createIssue(formData, onSuccess);
    };

    const onSuccess = () => {
        setFormData({
            name: "",
            startDate: "",
            endDate: "",
            goal: "",
            state: "active",
        });
    };

    return (
        <form onSubmit={handleOnSubmit}>
            <div className="mb-3">
                <label htmlFor="floatingInput">Sprint Name</label>
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Sprint Name"
                    name="name"
                    onChange={handleOnChange}
                    id="floatingInput"
                    value={name}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="floatingInput">Start Date</label>
                <input
                    type="datetime"
                    className="form-control form-control-lg"
                    placeholder="Start Date"
                    name="startDate"
                    onChange={handleOnChange}
                    id="floatingInput"
                    value={startDate}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="floatingInput">End Date</label>
                <input
                    type="datetime"
                    className="form-control form-control-lg"
                    placeholder="End Date"
                    name="endDate"
                    onChange={handleOnChange}
                    id="floatingInput"
                    value={endDate}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="floatingInput">Sprint Goal</label>
                <textarea
                    className="form-control"
                    placeholder="Sprint Goal"
                    name="goal"
                    onChange={handleOnChange}
                    id="floatingInput"
                    value={goal}
                    rows="3"
                ></textarea>
            </div>
            <div className="d-grid gap-2 col-12 mx-auto">
                <button
                    className="btn btn-primary btn-lg"
                    data-toggle="modal"
                    data-target="#addIssueForm"
                    type="submit"
                >
                    Start Sprint
                </button>
            </div>
        </form>
    );
};

StartSprint.propTypes = {};

const mapStateToProps = (state) => ({
    project: state.project.project,
    loading: state.project.loading,
});

export default connect(mapStateToProps)(StartSprint);
