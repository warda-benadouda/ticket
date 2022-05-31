import axios from "axios";
export const URL = `/api/companies`;


export async function getCompany(id){

    const response = await axios.get(`${URL}/${id}`)
    const data = response.data
    if (response.status > 400) {
        throw new Error(data)
      }
      return 'hydra:member' in data ? data["hydra:member"] : data;
}