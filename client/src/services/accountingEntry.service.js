import API from './api.service'

class AccountingEntryService {
    async get(){
        return (await API.get(`/accounting-entry`));
    }
    async getById(id){
        return (await API.get(`/accounting-entry/${id}`));
    }
    async create(data){
        return (await API.post(`accounting-entry`, data));
    }
    async update(id, data){
        return (await API.put(`accounting-entry/${id}`, data));
    }
    async delete(id){
        return (await API.delete(`accounting-entry/${id}`));
    }
}

let accountingEntry = new AccountingEntryService();
export default accountingEntry;