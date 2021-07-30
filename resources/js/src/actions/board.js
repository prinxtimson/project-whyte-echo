import axios from "axios";
import { BASE_URL } from "../utils";
import { GET_BOARDS } from "./types";
import { setAlert } from "./alert";

export const getBoards = () => async (dispatch) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/board`);

        dispatch({
            type: GET_BOARDS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};
