
import axios from "axios";
import { URL_PATHS } from "../../../../../../helpers/networking/url-paths";


const CompanyMemberListServices = () => {
    let instance: any;
    
    const createChatRoom = (formData: any) => {
        return axios({
            method:"POST",
            url:`http://${process.env.REACT_APP_IP_ADDRESS_API}:${process.env.REACT_APP_IP_ADDRESS_PORT}/api/chat-rooms/`,
            headers: { 
                "content-type": 'application/json',
            },
            data: formData,
            timeout:30000  
        })
        .then((res)=> res)
        .catch((err) => console.log(err))
    }


    function init() {
        return {
            getCompanyMemberList : async (page: string) => {
                return await axios({
                    method:"GET",
                    url:`http://${process.env.REACT_APP_IP_ADDRESS_API}:${process.env.REACT_APP_IP_ADDRESS_PORT}/${URL_PATHS.GET_COMPANYMEMBERLIST}/${page}/${process.env.REACT_APP_NUM_ITEMS_PER_PAGE}`,
                    timeout:30000  
                })
                .then((res)=>  res)
                .catch((err) => console.log(err))
            },

            getCompanyMemberListByQuery : async (data: any) => {
                return await axios({
                    method:"POST",
                    url:`http://${process.env.REACT_APP_IP_ADDRESS_API}:${process.env.REACT_APP_IP_ADDRESS_PORT}/${URL_PATHS.GET_COMPANYMEMBERLIST_BYQUERY}`,
                    headers: { 
                        "content-type": 'application/json',
                    },
                    data: data,
                    timeout:30000  
                })
                .then((res)=> res)
                .catch((err) => console.log(err))
            }
        }
    };
    
    return {
        getInstance : () => {
            if (!instance) instance = init();
            return instance;
        } ,
        createChatRoom
    }
}

export default CompanyMemberListServices;
