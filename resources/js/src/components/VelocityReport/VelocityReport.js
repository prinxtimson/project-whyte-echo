import React, { useState, useEffect } from "react";
import Container from "../Layouts/Container";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import { getVelocity } from "../../actions/report";

const VelocityReport = ({ loading, velocity, params, getVelocity }) => {
    const [state, setState] = useState({});

    const handleDownload = () => {
        htmlToImage
            .toPng(document.getElementById("velocity-chart"))
            .then(function (dataUrl) {
                download(dataUrl, "velocity-chart.png");
            });
    };

    useEffect(() => {
        getVelocity();
    }, []);

    useEffect(() => {
        let labels = [];
        let estimated = [];
        let completed = [];

        if (velocity?.velocityStatEntries) {
            labels = velocity?.sprints?.map((item) => item.name);
            for (let [key, value] of Object.entries(
                velocity?.velocityStatEntries
            )) {
                estimated.push(value?.estimated?.value);
                completed.push(value?.completed?.value);
            }
        }

        const data = [
            {
                label: "Completed",
                backgroundColor: "green",
                borderColor: "green",
                borderWidth: 2,
                data: completed,
            },
            {
                label: "Commitment",
                backgroundColor: "#cccccc",
                borderColor: "#cccccc",
                borderWidth: 2,
                data: estimated,
            },
        ];
        setState({ labels, datasets: data.reverse() });
    }, [velocity]);

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
            <div className="container p-5" style={{ minHeight: "89vh" }}>
                <div className="p-5">
                    <div className="py-3">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={handleDownload}
                        >
                            Download
                        </button>
                    </div>
                    <Bar
                        data={state}
                        id="velocity-chart"
                        options={{
                            title: {
                                display: true,
                                text: "Velocity Chart",
                                fontSize: 20,
                            },
                            legend: {
                                display: true,
                                position: "right",
                            },
                        }}
                    />
                </div>
                <div className="p-5">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Sprint</th>
                                    <th>Commitment</th>
                                    <th>Completed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {velocity?.sprints?.reverse().map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>
                                            {
                                                velocity?.velocityStatEntries[
                                                    item.id
                                                ]?.estimated?.value
                                            }
                                        </td>
                                        <td>
                                            {
                                                velocity?.velocityStatEntries[
                                                    item.id
                                                ]?.completed?.value
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    velocity: state.report.velocity,
    loading: state.report.loading,
});

export default connect(mapStateToProps, { getVelocity })(VelocityReport);
