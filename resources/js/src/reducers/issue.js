import { GET_ALL_ISSUES } from "../actions/types";

const initialState = {
    loading: true,
    issues: [],
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
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
