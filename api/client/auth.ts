import axios from "axios";
import { SignInBody, SignInRes } from "../interfaces/auth";
import { init } from "./init";

export function login(body: SignInBody) {
    init();
    return axios.post<SignInRes>("/api/auth", body);
}

export function signOut() {
    init();
    return axios.delete("/api/auth");
}
