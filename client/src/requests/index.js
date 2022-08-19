import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`
})

export function PokemonRequest() {
    const response = axiosInstance.get('/Pokemon');
    return response;
}

export function PokemonRequestByID(id) {
    const response = axiosInstance.get(`/Pokemon/${id}`)
    return response;
}

export function TypesRequest() {
    const response = axiosInstance.get('/Types');
    return response;
}

export function PokemonByTypesRequest(id) {
    const response = axiosInstance.get(`/Types/${id}`);
    return response;
}

export function RegisterRequest(username, firstname, password, email, lastname) {
    const response = axiosInstance.post('/Inscription', username, firstname, password, email, lastname);
    return response;
}
export function LoginRequest(email, password) {
    const response = axiosInstance.post('/Connexion', email, password);
    return response;
}

export function userInfosRequest(id) {
    const response = axiosInstance.get(`/User/${id}`)
    return response;
}

export function DeckRequest(id) {
    const response = axiosInstance.get(`/Deck/${id}`);
    return response;
}
export function saveAuthorization(token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function UserUpdateRequest(id, data){
    const response = axiosInstance.put(`/User/${id}`, {username : data.username, firstname: data.firstname, lastname:data.lastname, email:data.email});
    return response;
}

export function UserDeleteRequest(id){
    const response = axiosInstance.delete(`/User/${id}`);
    return response;
}