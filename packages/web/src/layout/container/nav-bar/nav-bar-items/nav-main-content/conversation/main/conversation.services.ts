import axios from 'axios';
import { URL_PATHS } from '../../../../../../../helpers/networking/url-paths';

function ConversationServices() {

    let instance: any;

    function init() {
        return {
            getConversationList : async (roomid:string , page: number) => {
                return await axios({
                    method:"GET",
                    url:`http://${process.env.REACT_APP_IP_ADDRESS_API}:${process.env.REACT_APP_IP_ADDRESS_PORT}/${URL_PATHS.GET_CHATLIST}`,
                    params:{
                        roomId:roomid,
                        page:page,
                        pageSize: process.env.REACT_APP_NUM_ITEMS_PER_PAGE
                    },
                    timeout:30000  
                })
                .then((res)=> res)
                .catch((err) => console.log(err))
            },

        }
    };
    
    return {
        getInstance : () => {
            if (!instance) instance = init();
            return instance;
        }
    }
}

export default ConversationServices;