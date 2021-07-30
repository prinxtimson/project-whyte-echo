import React, { useState } from "react";
import { connect } from "react-redux";
import { editSprint } from "../../actions/sprint";

const EditSprint = ({ editSprint, sprint }) => {
    const [formData, setFormData] = useState({
        name: sprint?.name || "",
        startDate: sprint?.startDate || "",
        endDate: sprint?.endDate || "",
        goal: sprint?.goal || "",
    });

    const { name, startDate, endDate, goal } = formData;

    const handleOnChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleOnSubmit = (e) => {
        e.preventDefault();

        editSprint(formData, sprint?.id, onSuccess);
    };

    const onSuccess = () => {
        setFormData({
            name: "",
            startDate: "",
            endDate: "",
            goal: "",
        });
    };

    return (
        <form onSubmit={handleOnSubmit}>
            <div className="mb-3">
                <label htmlFor="floatingInput">Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
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
                    className="form-control"
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
                    className="form-control"
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
                    data-target="#editSprintForm"
                    type="submit"
                >
                    Start
                </button>
            </div>
        </form>
    );
};

export default connect(null, { editSprint })(EditSprint);
