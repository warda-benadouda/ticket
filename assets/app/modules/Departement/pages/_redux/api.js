import axios from "axios";
export const URL = `/api/departements`;

export async function getDepartements(){

    const response = await axios.get(URL)
    const data = response.data
    if (response.status > 400) {
        throw new Error(data)
      }
      return 'hydra:member' in data ? data["hydra:member"] : data;
}

export async function getDepartement(id , ticket){

  const response = await axios.get(`${URL}/${id}` , ticket)
  const data = response.data
  if (response.status > 400) {
      throw new Error(data)
    }
    return 'hydra:member' in data ? data["hydra:member"] : data;
}