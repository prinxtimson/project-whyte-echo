import React, { useState, useEffect } from "react";
import Container from "../Layouts/Container";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
import moment from "moment";
import { getBurndown } from "../../actions/report";

const BurnupChart = ({ loading, burndown, getBurndown, sprints, params }) => {
    const [state, setState] = useState({});
    const [tableData, setTableData] = useState([]);
    const [totalStoryPoints, setTotalStoryPoints] = useState(0);
    //const [startD, startD] = useState("");

    useEffect(() => {
        getBurndown();
    }, []);

    const handleDownload = () => {
        htmlToImage
            .toPng(document.getElementById("burnup-chart"))
            .then(function (dataUrl) {
                download(dataUrl, "burnup-chart.png");
            });
    };

    useEffect(() => {
        let dates = [];
        let data = [];
        let total = 0;
        let complete = 0;
        let storyPoints = {};
        let currentDate = new Date(burndown.startTime);
        let endDate = new Date(burndown.endTime);
        let completeDate = new Date(burndown.completeTime);

        while (currentDate <= completeDate) {
            dates.push(moment(currentDate).format("ll"));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        if (burndown?.changes) {
            for (let [key, value] of Object.entries(burndown?.changes)) {
                value.map((item) => {
                    if (item.statC?.newValue) {
                        total = total + item.statC.newValue;

                        storyPoints[item.key] = item.statC.newValue || 0;
                    }
                });
            }

            for (let [key, value] of Object.entries(burndown?.changes)) {
                value.map((item) => {
                    if (item.column?.done) {
                        const d = new Date(parseInt(key));
                        const point = storyPoints[item.key] || 0;

                        complete = complete + point;
                        data.push({
                            key: item.key,
                            x: moment(d).format("ll"),
                            storyPoints: point,
                            y: complete,
                        });
                    }
                });
            }
            setTotalStoryPoints(total);
            setState({
                labels: dates,
                datasets: [
                    {
                        label: "Completed works",
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: "#ccc",
                        borderColor: "#aebd7c",
                        borderWidth: 2,
                        stepped: true,
                        data: [
                            {
                                y: 0,
                                x: moment(burndown.startTime).format("ll"),
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
                                y: total,
                                x: moment(endDate).format("ll"),
                            },
                            {
                                y: 0,
                                x: moment(burndown.startTime).format("ll"),
                            },
                        ],
                    },
                ],
            });
        }
    }, [burndown]);

    useEffect(() => {
        let sortable = [];

        if (burndown?.issueToSummary) {
            for (let issue in burndown.issueToSummary) {
                sortable.push([issue, burndown.issueToSummary[issue]]);
            }

            sortable.sort(function (a, b) {
                return a[1] - b[1];
            });
            setTableData(sortable);
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
                        id="burnup-chart"
                        options={{
                            title: {
                                display: true,
                                text: "Burnup Chart",
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
                                    <th>Event Type</th>
                                    <th>Issue</th>
                                    <th>Work completed</th>
                                    <th>Work scope</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((item, index) => (
                                    <tr key={item[0]}>
                                        <td>
                                            {index === 0 &&
                                                moment(
                                                    burndown?.startTime
                                                ).format("L")}
                                        </td>
                                        <td>
                                            {index === 0 && "Sprint started"}
                                        </td>
                                        <td>{`${item[0]} ${item[1]}`}</td>
                                        <td>{index === 0 && 0}</td>
                                        <td>
                                            {index === 0 && totalStoryPoints}
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

export default connect(mapStateToProps, { getBurndown })(BurnupChart);
