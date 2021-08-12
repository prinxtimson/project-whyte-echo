import React, { useState, useEffect } from "react";
import Container from "../Layouts/Container";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
import { getBurnup } from "../../actions/report";

const BurnupChart = ({ loading, burndown, getBurnup, sprints, params }) => {
    const [state, setState] = useState({});

    useEffect(() => {
        getBurnup();
    }, []);

    const handleDownload = () => {
        htmlToImage
            .toPng(document.getElementById("burndown-chart"))
            .then(function (dataUrl) {
                download(dataUrl, "burndown-chart.png");
            });
    };

    useEffect(() => {
        let dates = [];
        let data = [];
        let totalStoryPoints = 0;
        let remaining;
        let storyPoints = {};
        let currentDate = new Date(burndown.startTime);
        let endDate = new Date(burndown.endTime);
        let completeDate = new Date(burndown.completeTime);
        while (currentDate <= completeDate) {
            dates.push(currentDate.toDateString());
            currentDate.setDate(currentDate.getDate() + 1);
        }
        if (burndown?.changes) {
            for (let [key, value] of Object.entries(burndown?.changes)) {
                value.map((item) => {
                    if (item.statC?.newValue) {
                        totalStoryPoints =
                            totalStoryPoints + item.statC.newValue;
                        storyPoints[item.key] = item.statC.newValue || 0;
                    }
                });
            }
            remaining = totalStoryPoints;
            for (let [key, value] of Object.entries(burndown?.changes)) {
                value.map((item) => {
                    if (item.column?.done) {
                        const d = new Date(parseInt(key));
                        const point = storyPoints[item.key] || 0;

                        remaining = remaining - point;
                        data.push({
                            key: item.key,
                            x: d.toDateString(),
                            storyPoints: point,
                            y: remaining,
                        });
                    }
                });
            }
            setState({
                labels: dates,
                datasets: [
                    {
                        label: "Remaining Values",
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: "#ccc",
                        borderColor: "red",
                        borderWidth: 2,
                        stepped: true,
                        data: [
                            {
                                y: totalStoryPoints,
                                x: new Date(burndown.startTime).toDateString(),
                            },
                            ...data,
                        ],
                    },
                    {
                        label: "Guideline",
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: "#cccccc",
                        borderColor: "#cccccc",
                        borderWidth: 2,
                        data: [
                            {
                                y: totalStoryPoints,
                                x: new Date(burndown.startTime).toDateString(),
                            },
                            { y: 0, x: endDate.toDateString() },
                        ],
                    },
                ],
            });
        }
    }, [burndown]);

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

    console.log(state);

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
                    <Line
                        data={state}
                        id="burndown-chart"
                        options={{
                            title: {
                                display: true,
                                text: "Burndown Chart",
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
                                    <th>Date</th>
                                    <th>Issue</th>
                                    <th>Event Type</th>
                                    <th>Event Details</th>
                                    <th>Inc.</th>
                                    <th>Dec.</th>
                                    <th>Remaining</th>
                                </tr>
                            </thead>
                            <tbody>
                                {burndown?.sprints?.map((item) => (
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
    burndown: state.report.burndown,
    sprints: state.sprint.sprints,
    loading: state.report.loading,
});

export default connect(mapStateToProps, { getBurnup })(BurnupChart);
