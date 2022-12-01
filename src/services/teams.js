import axios from 'axios'
import { BASE_URL, KEY_TOKEN } from '@/.env'

const headers = {
    'Content-Type': 'application/json',
    'Authorization': KEY_TOKEN
}

const getTeams = async () => {
    const res = await axios.get(`${BASE_URL}/teams`, { headers })
    return res.data
}

export {
    getTeams
}