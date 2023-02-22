import { instance } from "./index.api"

const list = (payload) => instance.get('/tasks', { params: payload });
const update = (id, payload) => instance.patch(`/tasks/${id}`, payload);
const create = (payload) => instance.post('/tasks', payload);
const remove = (id) => instance.delete(`/tasks/${id}`);

export default {
    list,
    update,
    create,
    remove
}
