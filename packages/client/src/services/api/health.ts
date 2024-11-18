import { api } from './api'


export const checkServerHealth = async (): Promise<boolean> => {
  try {
    const response = await api.get('/health')
    return response.status === 200
  } catch (error) {
    console.error('Error checking server health:', error)
    return false
  }
}
