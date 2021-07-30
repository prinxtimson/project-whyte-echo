import { GET_BOARDS } from "../actions/types";

const initialState = {
    loading: true,
    boards: [],
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_BOARDS:
            return {
                ...state,
                loading: false,
                boards: payload,
            };
        default:
            return state;
    }
};
