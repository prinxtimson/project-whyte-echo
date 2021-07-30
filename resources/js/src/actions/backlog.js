import axios from "axios";
import { BASE_URL } from "../utils";
import { GET_BACKLOG } from "./types";

export const getBacklog = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/board/${id}/backlog`);

        dispatch({
            type: GET_BACKLOG,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};
