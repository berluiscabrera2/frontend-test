import axios from "axios";

const addressesAPI = axios.create({
    baseURL: 'http://localhost:3000'
})

export const getAddresses = async() => {
    const res = await addressesAPI.get('/addresses');
    return res.data
}