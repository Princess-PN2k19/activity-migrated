import axios from 'axios';

export default {
    getAll: async () => {
        let res = await axios.get('/api/companies');
        return res.data || [];
    },
    create: async (company) => {
        let res = await axios.post('/api/company', {company});
        return res.data || [];
    },
    update: async (company, id) => {
        let res = await axios.put('/api/companies/', {company, id});
        return res.data || {};
    },
    delete: async (id) => {
        let res = await axios.put('/api/companies/', {id});
        return res.data || [];
    }
}