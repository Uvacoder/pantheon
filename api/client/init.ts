import axios from "axios";

export function init() {
    axios.defaults.withCredentials = true;
}
