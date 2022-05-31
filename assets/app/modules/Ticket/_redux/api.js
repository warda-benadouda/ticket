import axios from "axios";

export const URL = `/api/tickets`; 

export async function getAdminTickets( filter) {
    let url =  URL + (filter ? filter : "")
    const response = await axios.get( URL);
    const data = response.data;
    if (response.status > 400) {
      throw new Error(data)
    }
    return data;
  }