import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { editSprint } from "../../actions/sprint";

const EditSprint = ({ editSprint, sprint }) => {
    const [formData, setFormData] = useState({
        name: "",
        startDate: "",
        endDate: "",
        goal: "",
        state: "active",
    });
    const [duration, setDuration] = useState("custom");

    useEffect(() => {
        setFormData({
            ...formData,
            name: sprint?.name || "",
            startDate: sprint?.startDate || new Date().toISOString(),
            endDate: sprint?.endDate || "",
            goal: sprint?.goal || "",
        });
    }, [sprint]);

    const { name, startDate, endDate, goal } = formData;

    useEffect(() => {
        const d = new Date(startDate);
        if (duration === "1 Week") {
            d.setDate(d.getDate() + 1 * 7);
            setFormData({ ...formData, endDate: d.toISOString() });
        } else if (duration === "2 Week") {
            d.setDate(d.getDate() + 2 * 7);
            setFormData({ ...formData, endDate: d.toISOString() });
        } else if (duration === "3 Week") {
            d.setDate(d.getDate() + 3 * 7);
            setFormData({ ...formData, endDate: d.toISOString() });
        } else if (duration === "4 Week") {
            d.setDate(d.getDate() + 4 * 7);
            setFormData({ ...formData, endDate: d.toISOString() });
        }
    }, [duration, startDate]);

    const handleOnChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleOnSubmit = (e) => {
        e.preventDefault();

        editSprint(formData, sprint?.id, onSuccess);
    };

    const onSuccess = () => {
        setFormData({
            name: "",
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
            goal: "",
        });
        setDuration("custom");
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
                <label htmlFor="floatingInput">Duration</label>
                <select
                    className="form-control form-control-lg"
                    name="duration"
                    onChange={(e) => setDuration(e.target.value)}
                    value={duration}
                    required
                >
                    <option value="custom">Custom</option>
                    <option value="1 Week">1 Week</option>
                    <option value="2 Week">2 Week</option>
                    <option value="3 Week">3 Week</option>
                    <option value="4 Week">4 Week</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="floatingInput">Start Date</label>
                <input
                    type="date"
                    className="form-control"
                    placeholder="Start Date"
                    name="startDate"
                    onChange={handleOnChange}
                    id="floatingInput"
                    value={startDate?.split("T")[0]}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="floatingInput">End Date</label>
                <input
                    type="date"
                    className="form-control"
                    placeholder="End Date"
                    name="endDate"
                    onChange={handleOnChange}
                    id="floatingInput"
                    value={endDate?.split("T")[0]}
                    disabled={duration !== "custom"}
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
