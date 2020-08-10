import api from "../axios"

class CategoryService{
    async create(category){
        const response = await api.post('category', category);
        if(response.status == 201){
            return response.data;
        }
        return response.error;
    }
    async get(page){
        const response = await api.get('categories?page='+page);
        if(response.status == 200){
            return response.data;
        }
        return response.error;
    }
    async put(category_id, category){
        const response = await api.put('category/'+category_id, category);
        if (response.status == 200){
            return response.data;
        }
        return response.data.message;
    }
}

export default new CategoryService()