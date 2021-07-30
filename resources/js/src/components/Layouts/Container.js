import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Container = ({ children }) => {
    return (
        <Fragment>
            <header
                className="navbar p-3 navbar-dark"
                style={{ backgroundColor: "#293986" }}
            >
                <div className="container">
                    <button
                        className="navbar-toggler mx-3"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navmenu"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link to="/" className="navbar-brand">
                        <strong>Tritek ComHub</strong>
                    </Link>
                    <div className="flex-grow-1">
                        <ul className="navbar-nav col-12 col-lg-auto mb-2 justify-content-center mb-md-0">
                            <li className="nav-item"></li>
                        </ul>
                    </div>

                    <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Search..."
                            aria-label="Search"
                        />
                    </form>

                    <div className="dropdown text-end">
                        <a
                            href="#"
                            className="d-block link-dark text-decoration-none dropdown-toggle"
                            id="dropdownUser1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            role="button"
                        >
                            <img
                                src="https://github.com/mdo.png"
                                alt="mdo"
                                width="32"
                                height="32"
                                className="rounded-circle"
                            />
                        </a>
                        <ul
                            className="dropdown-menu text-small"
                            aria-labelledby="dropdownUser1"
                        >
                            <li>
                                <Link className="dropdown-item" to="#">
                                    New project...
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to="#">
                                    Settings
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to="#">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <Link className="dropdown-item" to="#">
                                    Sign out
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <div className="container-fluid">
                <div className="row">
                    <nav
                        id="sidebarMenu"
                        className="col-md-3 col-lg-2 d-md-block sidebar collapse"
                        style={{ backgroundColor: "#c7a936" }}
                    >
                        <div className="position-sticky pt-3">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <Link
                                        className="nav-link text-light"
                                        aria-current="page"
                                        to="/backlog"
                                    >
                                        Backlog
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link text-light"
                                        to="/sprints"
                                    >
                                        Active Sprint
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link text-light"
                                        to="/"
                                    >
                                        Issues
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <main
                        className="col-md-9 ms-sm-auto col-lg-10"
                        style={{ paddingLeft: 10, paddingRight: 0 }}
                    >
                        {children}
                    </main>
                </div>
            </div>
        </Fragment>
    );
};

export default Container;
