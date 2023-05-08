import API from './api.service'

class TaskService {
    async get(){
        return (await API.get(`/task`));
    }
    async getById(id){
        return (await API.get(`/task/${id}`));
    }
    async findByMatter(data) {
        return (await API.post(`/task/findByMatter`, data));
    }
    async getByStaff(id){
        return (await API.post(`task/findByStaff`, id))
    }
    async getByStaffPhanCong(id){
        return (await API.post(`task/findByStaffPhanCong`, id))
    }
    async getByStatus(status){
        return (await API.post(`task/findByStatus`, status))
    }
    async setStatusPause(data){
        return (await API.patch(`task/setStatusPause`, data))
    }
    async create(data){
        return (await API.post(`task`, data));
    }
    async update(id, data){
        return (await API.put(`task/${id}`, data));
    }
    async delete(id){
        return (await API.delete(`task/${id}`));
    }
}

let taskService = new TaskService();
export default taskService;