import { API_URL } from './urls'

export const fetchData = async <T>(endpoint: string): Promise<T> => {
  const options = {
    method: 'GET',
  }

  const res = await fetch(`${API_URL}/${endpoint}`, options)
  const data = await res.json()

  return data
}
