import api from "../axios"

class CategoryService{
    async create(category){
        const response = await api.post('categories', category);
        if(response.status == 201){
            return response.data;
        }
        return response;
    }
    async get(page){
        const response = await api.get('categories?page='+page);
        if(response.status == 200){
            return response.data;
        }
        return response;
    }
    async put(category_id, category){
        const response = await api.put('category/'+category_id, category);
        if (response.status == 200){
            return response.data;
        }
        return response;
    }
}

export default new CategoryService()