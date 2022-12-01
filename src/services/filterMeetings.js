import axios from 'axios'
import { BASE_URL, KEY_TOKEN } from '@/.env'


const headers = {
    'Content-Type': 'application/json',
    'Authorization': KEY_TOKEN
}
const filterMeetings = async (period, search) => {
    const params = {
        period,
        search
    }
    const config = {
        headers,
        params
    }
    const res = await axios.get(`${BASE_URL}/meetings`, config)
    return res.data
}

const getAllMembers = async () => {
    const res = await axios.get(`${BASE_URL}/users`, { headers })
    return res.data
}

const addMember = async (to, id, action, userId) => {
    const params = {
        action,
        userId
    }
    let config = {
        headers,
        params
    }
    const res = await axios.patch(`${BASE_URL}/${to}/${id}`, {}, config)
    return res.data
}

const excuseYourself = async (to, id, action) => {
    const params = {
        action
    }
    let config = {
        headers,
        params
    }
    const res = await axios.patch(`${BASE_URL}/${to}/${id}`, {}, config)
    return res.data
}

export {
    filterMeetings,
    getAllMembers,
    addMember,
    excuseYourself
}