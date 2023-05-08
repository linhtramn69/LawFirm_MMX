import API from './api.service'

class BillService {
    async get(){
        return (await API.get(`/bill`));
    }
    async getById(id){
        return (await API.get(`/bill/${id}`));
    }
    async findByMatter(data) {
        return (await API.post(`/bill/findByMatter`, data));
    }
    async findByMonthYearAndType(data) {
        return (await API.post(`/bill/findByMonth`, data));
    }
    async create(data){
        return (await API.post(`bill`, data));
    }
    async update(id, data){
        return (await API.put(`bill/${id}`, data));
    }
    async delete(id){
        return (await API.delete(`bill/${id}`));
    }
}

let billService = new BillService();
export default billService;