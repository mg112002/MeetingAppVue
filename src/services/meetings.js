import axios from 'axios'
import { BASE_URL, KEY_TOKEN } from '@/.env'


const getCalMeetings = async (date) => {
    const dateObj = new Date(date)
    date = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': KEY_TOKEN
    }
    const params = {
        date: date
    }
    let config = {
        headers: headers,
        params: params
    }
    const response = await axios.get(`${BASE_URL}/calendar`, config)
    return response.data
}

export {
    getCalMeetings,
}