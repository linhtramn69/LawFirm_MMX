import API from './api.service'

class QuoteService {
    async get(){
        return (await API.get(`/quote-form`));
    }
    async getById(id){
        return (await API.get(`/quote-form/${id}`));
    }
    async create(data){
        return (await API.post(`quote-form`, data));
    }
    async findByTypeServiceAndYear(data){
        return (await API.post(`quote-form/findByTypeServiceAndYear`, data));
    }
    async sendMail(data){
        return (await API.post(`quote-form/sendMail`, data));
    }
    async update(id, data){
        return (await API.put(`quote-form/${id}`, data));
    }
    async delete(id){
        return (await API.delete(`quote-form/${id}`));
    }
}

let quoteService = new QuoteService();
export default quoteService;