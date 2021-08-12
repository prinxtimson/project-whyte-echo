import {
    CLEAR_REPORT,
    REPORT_LOADED,
    SET_BURNDOWN,
    SET_BURNUP,
    SET_VELOCITY,
} from "../actions/types";

const initialState = {
    loading: true,
    velocity: {},
    burnup: {},
    burndown: {},
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case REPORT_LOADED:
            return {
                ...state,
                loading: true,
            };
        case SET_BURNUP:
            return {
                ...state,
                loading: false,
                burnup: payload,
            };
        case SET_BURNDOWN:
            return {
                ...state,
                loading: false,
                burndown: payload,
            };
        case SET_VELOCITY:
            return {
                ...state,
                loading: false,
                velocity: payload,
            };
        case CLEAR_REPORT:
            return {
                loading: true,
                velocity: {},
                burnup: {},
                burndown: {},
            };
        default:
            return state;
    }
};
