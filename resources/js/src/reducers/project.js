import {
    GET_ALL_PROJECT,
    GET_PROJECT,
    PROJECT_LOADING,
} from "../actions/types";

const initialState = {
    loading: true,
    projects: [],
    project: null,
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case PROJECT_LOADING:
            return {
                ...state,
                loading: false,
            };
        case GET_PROJECT:
            return {
                ...state,
                loading: false,
                project: payload,
            };
        case GET_ALL_PROJECT:
            return {
                ...state,
                loading: false,
                projects: payload,
            };
        default:
            return state;
    }
};
