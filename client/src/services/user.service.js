import API from './api.service'

class UserService {
    async login(data){
        return (await API.post(`user/login`, data));
    }
    async get(){
        return (await API.get(`/user`));
    }
    async getById(id){
        return (await API.get(`/user/${id}`));
    }
    async getByBoPhan(id){
        return (await API.get(`/user/findByBoPhan/${id}`));
    }
    async getByMatter(data){
        return (await API.post(`/user/findByMatter`, data));
    }
    async create(data){
        return (await API.post(`user`, data));
    }
    async update(id, data){
        return (await API.put(`user/${id}`, data));
    }
    async delete(id){
        return (await API.delete(`user/${id}`));
    }
}

let userService = new UserService();
export default userService;