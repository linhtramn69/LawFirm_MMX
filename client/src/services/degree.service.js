import API from './api.service'

class DegreeService {
    async get(){
        return (await API.get(`/degree`));
    }
    async getById(id){
        return (await API.get(`/degree/${id}`));
    }
    async findByStaff(staff) {
        return (await API.get(`/degree/findByStaff/${staff}`));
    }
    async create(data){
        return (await API.post(`degree`, data));
    }
    async update(id, data){
        return (await API.patch(`degree/${id}`, data));
    }
    async delete(id){
        return (await API.delete(`degree/${id}`));
    }
}

let degreeService = new DegreeService();
export default degreeService;