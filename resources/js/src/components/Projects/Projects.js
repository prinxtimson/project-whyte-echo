import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Container2 from "../Layouts/Container2";

const Projects = ({ projects, loading }) => {
    if (loading) {
        return (
            <Container2>
                <div className="container p-5" style={{ minHeight: "89vh" }}>
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </Container2>
        );
    }

    return (
        <Container2>
            <div className="container p-5" style={{ minHeight: "89vh" }}>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Key</th>
                                <th>Type key</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <Link to={`/projects/${item.key}`}>
                                            {item.name}
                                        </Link>
                                    </td>
                                    <td>{item.key}</td>
                                    <td>{item.projectTypeKey}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Container2>
    );
};

const mapStateToProps = (state) => ({
    projects: state.project.projects,
    loading: state.project.loading,
});

export default connect(mapStateToProps)(Projects);
