import {
    ADD_COMMENT,
    BACKLOG_LOADING,
    DEL_COMMENT,
    DEL_ISSUE,
    GET_BACKLOG,
    MOVE_ISSUE,
    SET_CURRENT_ISSUE,
} from "../actions/types";

const initialState = {
    loading: true,
    issues: [],
    issue: null,
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    let issues;
    let issue;
    let index;
    let comments;

    switch (type) {
        case BACKLOG_LOADING:
            return {
                ...state,
                loading: true,
            };
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
            issue = state.issue;
            comments = issue.fields.comment.comments;
            comments = [...comments, payload.comment];
            issue.fields.comment.comments = comments;
            state.issues.splice(index, 1, issue);
            return {
                ...state,
                loading: false,
                issues: [...state.issues],
                issue,
            };
        case DEL_COMMENT:
            index = state.issues.findIndex((item) => item.id === payload.id);
            issue = state.issue;
            comments = issue.fields.comment.comments.filter(
                (item) => item.id !== payload.commentId
            );
            issue.fields.comment.comments = comments;
            state.issues.splice(index, 1, issue);
            return {
                ...state,
                loading: false,
                issues: [...state.issues],
                issue,
            };
        case SET_CURRENT_ISSUE:
            return {
                ...state,
                issue: payload,
            };
        default:
            return state;
    }
};
