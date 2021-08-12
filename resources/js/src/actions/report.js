import axios from "axios";
import { BASE_URL } from "../utils";
import { setAlert } from "./alert";
import { SET_BURNDOWN, SET_BURNUP, SET_VELOCITY } from "./types";

export const getVelocity = () => async (dispatch) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/report/velocity`);
        console.log(res);

        dispatch({
            type: SET_VELOCITY,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getBurnup = () => async (dispatch) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/report/burnup`);

        dispatch({
            type: SET_BURNUP,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getBurndown = () => async (dispatch) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/report/burndown`);

        dispatch({
            type: SET_BURNDOWN,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};
