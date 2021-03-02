import axios from "axios";
import { URL_PATHS } from "../../../../../../../helpers/networking/url-paths";


const CreatePersonalService = () => {
    let instance: any;

    function init() {
        return {
            getCompanyMemberList: async (page: string) => {
                const response =  await axios({
                    method: "GET",
                    url: `http://${process.env.REACT_APP_IP_ADDRESS_API}:${process.env.REACT_APP_IP_ADDRESS_PORT}/${URL_PATHS.GET_COMPANYMEMBERLIST}`,
                    params: {
                        page: page,
                        pageSize: process.env.REACT_APP_NUM_ITEMS_PER_PAGE
                    }
                })
                .then((res)=>  res)
                .catch((err) => console.log(err))

                return response;
            },
            getCompanyMemberListSearch: async (text: string) => {
                const response =  await axios({
                    method: "POST",
                    url: `http://${process.env.REACT_APP_IP_ADDRESS_API}:${process.env.REACT_APP_IP_ADDRESS_PORT}/${URL_PATHS.GET_COMPANYMEMBERLIST_SEARCH}`,
                    data: {
                        text: text
                    }
                })
                .then((res)=>  res)
                .catch((err) => console.log(err))

                return response;
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

export default CreatePersonalService;
