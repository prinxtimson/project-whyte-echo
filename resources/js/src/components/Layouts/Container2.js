import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Container2 = ({ children }) => {
    return (
        <div className="mh-100" style={{ maxHeight: "100vh" }}>
            <nav
                className="navbar p-3 navbar-dark"
                style={{ backgroundColor: "#293986" }}
            >
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
                    <ul className="nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin">
                                Admin
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Projects
                            </Link>
                        </li>
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
            </nav>
            <div className="container-fluid">
                <main className="ms-auto">{children}</main>
            </div>
        </div>
    );
};

export default Container2;
