import axios from "axios";
import { BASE_URL } from "../utils";
import { GET_PROJECT } from "./types";
import { getSprints } from "./sprint";

export const getProject = () => async (dispatch) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/projects`);

        dispatch(getSprints(res.data.boards[0].id));

        dispatch({
            type: GET_PROJECT,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};
