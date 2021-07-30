import {
    ADD_COMMENT,
    DEL_COMMENT,
    DEL_ISSUE,
    GET_BACKLOG,
    MOVE_ISSUE,
} from "../actions/types";

const initialState = {
    loading: true,
    issues: [],
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    let issues;
    let issue;
    let index;
    let comments;

    switch (type) {
        case GET_BACKLOG:
            return {
                ...state,
                loading: false,
                ...payload,
            };
        case MOVE_ISSUE:
            issues = state.issues.filter(
                (item) => item.key !== payload.issue.key
            );
            return {
                ...state,
                issues,
            };
        case DEL_ISSUE:
            issues = state.issues.filter((item) => item.id !== payload);
            return {
                ...state,
                issues,
            };
        case ADD_COMMENT:
            index = state.issues.findIndex((item) => item.id === payload.id);
            issue = state.issues.find((item) => item.id === payload.id);
            issue.fields.comment.comments.push(payload.comment);
            state.issues.splice(index, 1, issue);
            return {
                ...state,
                loading: false,
                issues: [...state.issues],
            };
        case DEL_COMMENT:
            index = state.issues.findIndex((item) => item.id === payload.id);
            issue = state.issues.find((item) => item.id === payload.id);
            comments = issue.fields.comment.comments.filter(
                (item) => item.id !== payload.commentId
            );
            issue.fields.comment.comments = comments;
            state.issues.splice(index, 1, issue);
            return {
                ...state,
                loading: false,
                issues: [...state.issues],
            };
        default:
            return state;
    }
};
