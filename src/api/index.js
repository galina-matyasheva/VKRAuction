import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const createAuction = payload => api.post(`/auction`, payload)
export const getAllAuctions = () => api.get(`/auctions`)
export const updateAuctionById = (id, payload) => api.put(`/auction/${id}`, payload)
export const deleteAuctionById = id => api.delete(`/auction/${id}`)// cancel auction
export const getAuctionById = id => api.get(`/auction/${id}`)
export const createBid = payload => api.post(`/auction/bid`, payload)
export const getHighestBid = payload => api.get(`/auction/bid`)

const apis = {
    createAuction,
    getAllAuctions,
    updateAuctionById,
    deleteAuctionById,
    getAuctionById,
    getHighestBid,
    createBid
}

export default apis
