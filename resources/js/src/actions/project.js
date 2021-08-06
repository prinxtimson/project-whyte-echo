import axios from "axios";
import { BASE_URL } from "../utils";
import {
    BACKLOG_LOADING,
    GET_ALL_PROJECT,
    GET_PROJECT,
    ISSUE_LOADING,
    PROJECT_LOADING,
} from "./types";
import { getSprints } from "./sprint";
import { setAlert } from "./alert";
import { getBacklog } from "./backlog";
import { getAllProgramIssues } from "./issue";

export const getProjects = () => async (dispatch) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/projects`);

        dispatch({
            type: GET_ALL_PROJECT,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getProjectById = (id) => async (dispatch) => {
    dispatch({ type: PROJECT_LOADING });
    dispatch({ type: ISSUE_LOADING });
    dispatch({ type: BACKLOG_LOADING });
    try {
        const res = await axios.get(`${BASE_URL}/api/projects/${id}`);

        dispatch(getSprints(res.data.boards[0].id));
        dispatch(getBacklog(res.data.boards[0].id));
        dispatch(getAllProgramIssues(id));

        dispatch({
            type: GET_PROJECT,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const createChannel = (formData, onSubmit) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify(formData);

    try {
        const res = await axios.post(
            `${BASE_URL}/api/projects/user`,
            body,
            config
        );

        console.log(res.data);

        onSubmit();

        dispatch(setAlert("Channel created successfully", "success"));
    } catch (err) {
        console.log(err);
    }
};
