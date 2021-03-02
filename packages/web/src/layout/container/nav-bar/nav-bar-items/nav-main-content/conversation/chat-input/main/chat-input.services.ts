import { URL_PATHS } from './../../../../../../../../helpers/networking/url-paths';
import axios from "axios";
import { IChat } from "../../main/conversation.props";

const ChatInputServices = () => {
    let instance: any;

    function init() {
        return {
            postMessage : async (data: FormData , url: string) => {
                return await axios({
                    method:"POST",
                    url:url,
                    headers: { 
                        "content-type": 'multipart/form-data',
                    },
                    timeout:30000,
                    data:data
                })
                .then((res)=>  res)
                .catch((err) => console.log(err));
            },

            sendMessage: (message: IChat) => {
                return axios({
                    method:"POST",
                    url:`http://${process.env.REACT_APP_IP_ADDRESS_API}:${process.env.REACT_APP_IP_ADDRESS_PORT}/${URL_PATHS.POST_MESSAGE}`,
                    headers: { 
                        "content-type": 'application/json',
                    },
                    data: message,
                    timeout:30000  
                })
                .then((res)=> res)
                .catch((err) => console.log(err))
            },

            editMessage: async (message: IChat) => {
                return await axios({
                    method:"PUT",
                    url:`http://${process.env.REACT_APP_IP_ADDRESS_API}:${process.env.REACT_APP_IP_ADDRESS_PORT}/${URL_PATHS.PUT_UPDATE_MESSAGE}`,
                    headers: { 
                        "content-type": 'application/json',
                    },
                    data: message,
                    timeout:30000  
                })
                .then((res)=> res)
                .catch((err) => console.log(err))
            },

            sendFile: async (formData: FormData) => {
                return axios({
                    method:"POST",
                    url:`http://${process.env.REACT_APP_IP_ADDRESS_API}:${process.env.REACT_APP_IP_ADDRESS_PORT}/${URL_PATHS.POST_FILE}`,
                    headers: { 
                        "content-type": 'multipart/form-data',
                    },
                    data: formData,
                    timeout:30000  
                })
                .then((res)=> res)
                .catch((err) => console.log(err))
            }
        }
    }
    
    return {
        getInstance : () => {
            if (!instance) instance = init();
            return instance;
        }
    }
}

export default ChatInputServices;
