import axios from "axios";
import { BASE_URL } from "../utils";
import { ADD_COMMENT, DEL_COMMENT, DEL_ISSUE, GET_ALL_ISSUES } from "./types";
import { setAlert } from "./alert";
import { getBacklog, setCurrentIssue } from "./backlog";
import store from "../store";
import { getSprints } from "./sprint";

export const getAllProgramIssues = (project) => async (dispatch) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/issues/${project}`);

        dispatch({
            type: GET_ALL_ISSUES,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const addComment = (body, id, onComment) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const data = JSON.stringify({ body });

    try {
        const res = await axios.post(
            `${BASE_URL}/api/issues/${id}/comment`,
            data,
            config
        );
        onComment();
        dispatch({
            type: ADD_COMMENT,
            payload: { comment: res.data, id },
        });
    } catch (err) {
        console.log(err);
    }
};

export const delIssue = (id) => async (dispatch) => {
    try {
        await axios.delete(`${BASE_URL}/api/issues/${id}`);

        dispatch({
            type: DEL_ISSUE,
            payload: id,
        });
    } catch (err) {
        console.log(err);
    }
};

export const delComment = (id, commentId) => async (dispatch) => {
    try {
        const res = await axios.delete(
            `${BASE_URL}/api/issues/${id}/comment/${commentId}`
        );
        console.log(res);
        dispatch({
            type: DEL_COMMENT,
            payload: { id, commentId },
        });
    } catch (err) {
        console.log(err);
    }
};

export const createIssue = (formData, onSuccess) => async (dispatch) => {
    const project = store.getState().project.project;
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({
        fields: formData,
    });

    try {
        const res = await axios.post(`${BASE_URL}/api/issues`, body, config);
        console.log(res.data);
        onSuccess();

        dispatch(setAlert("Issue created successful", "success"));
        dispatch(getBacklog(project?.boards[0]?.id));
        dispatch(getAllProgramIssues());
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

export const attachFile = (file, id) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    };
    try {
        const res = await axios.post(
            `${BASE_URL}/api/issues/${id}/attachments`,
            file,
            config
        );
        console.log(res);
    } catch (err) {
        console.log(err);
    }
};

export const moveIssueToEpic = (issue, id) => async (dispatch) => {
    const project = store.getState().project.project;

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({
        issues: [issue.key],
    });

    try {
        const res = await axios.post(
            `${BASE_URL}/api/epic/${id}/issue`,
            body,
            config
        );
        console.log(res.data);
        //dispatch(getBacklog(project?.boards[0]?.id));
    } catch (err) {
        console.log(err);
    }
};

export const updateStoryPoints = (value, issueId) => async (dispatch) => {
    const project = store.getState().project.project;
    const issue = store.getState().backlog.issue;

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ value });

    try {
        await axios.put(
            `${BASE_URL}/api/issues/story_points/${issueId}/${project?.boards[0]?.id}`,
            body,
            config
        );

        if (issue?.id === issueId) {
            const res = await axios.get(
                `${BASE_URL}/api/issues/issue/${issueId}`
            );
            res.data.fields.sprint = issue.fields.sprint;
            dispatch(setCurrentIssue(res.data));
        }

        dispatch(getBacklog(project?.boards[0]?.id));
        dispatch(getSprints(project?.boards[0]?.id));
    } catch (err) {
        console.log(err);
    }
};
