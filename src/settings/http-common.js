import axios from "axios";
import {HOST} from "./config";

export default axios.create({
    baseURL: HOST,
    headers: {
        "Content-type": "application/json"
    }
});