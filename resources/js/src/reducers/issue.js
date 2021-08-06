import { GET_ALL_ISSUES, ISSUE_LOADING } from "../actions/types";

const initialState = {
    loading: true,
    issues: [],
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ISSUE_LOADING:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_ISSUES:
            return {
                ...state,
                loading: false,
                ...payload,
            };
        default:
            return state;
    }
};
