import axios from "axios";
import { API_URL } from ".";

export const createUser = async (data: { email: string }) => {
    const response = await axios.post(`${API_URL}/users`, data);
    return response.data;
};
