import api from "../axios"

class MessageService{
    async getMessageTypes(){
        const response = await api.get('message_types');
        if(response.status == 200){
            return response.data;
        }
        return response;
    }
    async getMessageCategories(){
        const response = await api.get('message_categories');
        if(response.status == 200){
            return response.data;
        }
        return response;
    }
    async postMessage(message){
        const response = await api.post('messages', message);
        if(response.status == 201){
            return response.data;
        }
        return response;
    }

    async updateMessage(message){
        const response = await api.put('message/'+message[0], message[1]);
        if(response.status == 200){
            return response.data;
        }
        return response;
    }
    async getMessages(m_type){
        const response = await api.get('messages?is_video='+m_type)
        if(response.status == 200){
            return response.data;
        }
        return response;
    }

}

export default new MessageService();