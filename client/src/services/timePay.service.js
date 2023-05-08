import API from './api.service'

class TimePayService {
    async get(){
        return (await API.get(`/time-pay`));
    }
    async getById(id){
        return (await API.get(`/time-pay/${id}`));
    }
    async create(data){
        return (await API.post(`time-pay`, data));
    }
    async update(id, data){
        return (await API.put(`time-pay/${id}`, data));
    }
    async delete(id){
        return (await API.delete(`time-pay/${id}`));
    }
}

let timePayService = new TimePayService();
export default timePayService;