import axios from "axios";
import { URL_PATHS } from "../../../../../../helpers/networking/url-paths";


function DescriptionChatListServices() {

    let instance: any;

    function init() {
        return {
            getDescriptionChatList : async (url:string , page: number , pageSize: number) => {
                // console.log('Token...');
                // const urlParams = new URLSearchParams(window.location.search);
                // const token = urlParams.get('token');
                
                // console.log(token);

                return await axios({
                    method:"GET",
                    url:url,
                    timeout:30000,
                    params:{
                        page: page,
                        pageSize: pageSize
                    }
                })
                .then((res)=>  res)
                .catch((err) => console.log(err));
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

export default DescriptionChatListServices;