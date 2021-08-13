import React, { useEffect } from "react";
import { connect } from "react-redux";
import Container from "../Layouts/Container";
import Issues from "../Issues/Issues";
import Backlog from "../Backlog/Backlog";
import Sprints from "../Sprints/Sprints";
import { getProjectById } from "../../actions/project";
import { clearIssue } from "../../actions/sprint";
import VelocityReport from "../VelocityReport/VelocityReport";
import BurndownChart from "../BurndownChart/BurndownChart";
import BurnupChart from "../BurnupChart/BurnupChart";

const SingleProject = ({
    match: { params },
    project: { loading },
    getProjectById,
    clearIssue,
}) => {
    useEffect(() => {
        getProjectById(params.projectKey);
        clearIssue();
    }, [params.projectKey]);

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

    switch (params.pathName) {
        case "backlog":
            return <Backlog params={params} />;
        case "active-sprint":
            return <Sprints params={params} />;
        case "velocity-chart":
            return <VelocityReport params={params} />;
        case "burndown-chart":
            return <BurndownChart params={params} />;
        case "burnup-chart":
            return <BurnupChart params={params} />;
        default:
            return <Issues params={params} />;
    }
};

const mapStateToProps = (state) => ({
    project: state.project,
});

export default connect(mapStateToProps, { getProjectById, clearIssue })(
    SingleProject
);
