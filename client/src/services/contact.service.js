import API from './api.service'

class ContactService {
    async get(){
        return (await API.get(`/contact`));
    }
    async getById(id){
        return (await API.get(`/contact/${id}`));
    }
    async findByMatter(data) {
        return (await API.post(`/contact/findByMatter`, data));
    }
    async create(data){
        return (await API.post(`contact`, data));
    }
    async update(id, data){
        return (await API.put(`contact/${id}`, data));
    }
    async delete(id){
        return (await API.delete(`contact/${id}`));
    }
}

let contactService = new ContactService();
export default contactService;