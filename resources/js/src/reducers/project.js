import { GET_PROJECT } from "../actions/types";

const initialState = {
    loading: true,
    project: null,
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_PROJECT:
            return {
                ...state,
                loading: false,
                project: payload,
            };
        default:
            return state;
    }
};
