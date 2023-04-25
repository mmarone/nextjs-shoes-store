import { API_URL } from './urls'

export const fetchData = async (endpoint: string) => {
  const options = {
    method: 'GET',
  }

  const res = await fetch(`${API_URL}/${endpoint}`, options)
  const data = await res.json()

  return data
}
