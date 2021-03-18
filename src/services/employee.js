import axios from 'axios';

export default {
    getAll: async () => {
        let res = await axios.get('/api/employees');
        return res.data || [];
    },
    create: async (employee) => {
        let res = await axios.post('/api/employee', {employee});
        return res.data || [];
    },
    update: async (employee, id) => {
        let res = await axios.put('/api/employees/', {employee, id});
        return res.data || {};
    },
    delete: async (id) => {
        let res = await axios.put('/api/employees/', {id});
        return res.data || [];
    }
}