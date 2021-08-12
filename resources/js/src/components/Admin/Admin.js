import React, { useState } from "react";
import Container2 from "../Layouts/Container2";
import { connect } from "react-redux";
import { createChannel } from "../../actions/project";

const Admin = ({ createChannel, alerts }) => {
    const [formData, setFormData] = useState({
        channelName: "",
        channelEmail: "",
        description: "",
    });

    const { channelEmail, channelName, description } = formData;

    const handleOnChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleOnSubmit = (e) => {
        e.preventDefault();
        createChannel(formData, onSuccess);
    };

    const onSuccess = () => {
        setFormData({
            channelName: "",
            channelEmail: "",
            description: "",
        });
    };

    return (
        <Container2>
            <div className="container py-5" style={{ minHeight: "89vh" }}>
                {alerts.map((alert) => (
                    <div
                        className={`alert alert-${alert.alertType}`}
                        role="alert"
                        key={alert.id}
                    >
                        {alert.msg}
                    </div>
                ))}
                <form onSubmit={handleOnSubmit}>
                    <div className="mb-3">
                        <label htmlFor="floatingInput">Channel Name</label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Channel Name"
                            name="channelName"
                            onChange={handleOnChange}
                            id="floatingInput"
                            value={channelName}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="floatingInput">Channel Email</label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Channel Email"
                            name="channelEmail"
                            onChange={handleOnChange}
                            id="floatingInput"
                            value={channelEmail}
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
                    <div className="d-grid gap-2 col-12 mx-auto">
                        <button
                            className="btn btn-primary btn-lg"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </Container2>
    );
};

const mapStateToProps = (state) => ({
    alerts: state.alert,
});

export default connect(mapStateToProps, { createChannel })(Admin);
