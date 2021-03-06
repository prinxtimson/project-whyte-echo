import {
    CHANGE_STATUS,
    CLEAR_SPRINT_ISSUES,
    GET_SPRINTS,
    GET_SPRINT_ISSUES,
    MOVE_ISSUE,
    ON_CREATE_SPRINT,
    ON_EDIT_SPRINT,
} from "../actions/types";

const initialState = {
    loading: true,
    sprints: [],
    issues: [],
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    let sprint;

    switch (type) {
        case GET_SPRINTS:
            return {
                ...state,
                loading: false,
                sprints: payload,
            };
        case GET_SPRINT_ISSUES:
            return {
                ...state,
                loading: false,
                issues: payload,
            };
        case ON_CREATE_SPRINT:
            return {
                ...state,
                loading: false,
                sprints: [...state.sprints, payload],
            };
        case CLEAR_SPRINT_ISSUES:
            return {
                ...state,
                loading: false,
                sprints: [],
            };
        case ON_EDIT_SPRINT:
            const index = state.sprints.findIndex(
                (item) => item.id === payload.id
            );
            sprint = state.sprints[index];
            payload.issues = sprint.issues;
            state.sprints.splice(index, 1, payload);
            return {
                ...state,
                loading: false,
                sprints: [...state.sprints],
            };
        case MOVE_ISSUE:
            const index2 = state.sprints.findIndex(
                (item) => item.id === payload.id
            );
            sprint = state.sprints.find((item) => item.id === payload.id);
            sprint.issues.push(payload.issue);
            state.sprints.splice(index2, 1, sprint);
            return {
                ...state,
                loading: false,
                sprints: [...state.sprints],
            };
        default:
            return state;
    }
};
