import axios from 'axios'
import { BASE_URL, KEY_TOKEN } from '@/.env'

const addMeeting = async (data) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': KEY_TOKEN
    }
    const response = await axios.post(`${BASE_URL}/meetings`, data, { headers })
    return response.data
}

export {
    addMeeting as default
}