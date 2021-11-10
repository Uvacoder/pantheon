import axios from "axios";
import { IdRes } from "../interfaces/common";
import { CreateBody } from "../interfaces/user";
import { init } from "./init";

export function create(body: CreateBody) {
    init();
    return axios.post<IdRes>("/api/users", body);
}
