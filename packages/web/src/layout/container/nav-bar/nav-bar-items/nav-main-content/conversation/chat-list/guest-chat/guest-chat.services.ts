import axios from "axios";
import { URL_PATHS } from "../../../../../../../../helpers/networking/url-paths";
import { IChat } from "../../main/conversation.props";

function GuestChatServices(){
    let instance: any;


    function init() {
        return {
            editMessage: async (message: IChat) => {
                return axios({
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

        }
    }
    
    return {
        getInstance : () => {
            if (!instance) instance = init();
            return instance;
        }
    }
}

export default GuestChatServices;