import axios from "axios";
export const LOGIN_URL = `/api/login`;

export function login(email, password) {
    
    return axios.post(LOGIN_URL, { email, password } );

}
  