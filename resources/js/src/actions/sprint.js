import axios from "axios";
import { BASE_URL } from "../utils";
import {
    CHANGE_STATUS,
    CLEAR_SPRINT_ISSUES,
    GET_BOARDS,
    GET_SPRINTS,
    GET_SPRINT_ISSUES,
    MOVE_ISSUE,
    ON_CREATE_SPRINT,
    ON_EDIT_SPRINT,
} from "./types";
import { setAlert } from "./alert";

export const getSprints = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/board/${id}/sprint`);

        dispatch({
            type: GET_SPRINTS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const createSprint = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify(data);

    try {
        const res = await axios.post(`${BASE_URL}/api/sprint`, body, config);

        dispatch({
            type: ON_CREATE_SPRINT,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const editSprint =
    (data, id, onSuccess = null) =>
    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const body = JSON.stringify(data);

        try {
            const res = await axios.put(
                `${BASE_URL}/api/sprint/${id}`,
                body,
                config
            );
            onSuccess && onSuccess();
            dispatch({
                type: ON_EDIT_SPRINT,
                payload: res.data,
            });
        } catch (err) {
            console.log(err);
        }
    };

export const getSprintIssues = (id) => async (dispatch) => {
    try {
        // const board = await axios.get(`${BASE_URL}/api/board`);
        const res = await axios.get(`${BASE_URL}/api/sprint/${id}/issue`);

        dispatch({
            type: GET_SPRINT_ISSUES,
            payload: res.data.issues,
        });
    } catch (err) {
        console.log(err);
    }
};

export const clearIssue = () => (dispatch) => {
    dispatch({ type: CLEAR_SPRINT_ISSUES });
};

export const moveIssueToSprint = (issue, id) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({
        issues: [issue.key],
    });

    try {
        await axios.post(`${BASE_URL}/api/sprint/${id}/issue`, body, config);

        dispatch({
            type: MOVE_ISSUE,
            payload: { issue, id },
        });
    } catch (err) {
        console.log(err);
    }
};

export const changeIssueStatus = (issueId, statusId) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({
        transition: {
            id: statusId,
        },
    });

    try {
        const res = await axios.post(
            `${BASE_URL}/api/issues/${issueId}/transitions`,
            body,
            config
        );
        console.log(res);
    } catch (err) {
        const { errorMessages } = err.response.data;
        console.log(errorMessages);

        if (errorMessages) {
            errorMessages.forEach((error) =>
                dispatch(setAlert(error, "danger"))
            );
        }
    }
};
