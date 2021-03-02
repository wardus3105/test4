
import { URL_PATHS } from '../../helpers/networking/url-paths';
import axios from "axios";
import { IChat } from "../../layout/container/nav-bar/nav-bar-items/nav-main-content/conversation/main/conversation.props"

const videoCallService=()=>{
    const sendMessageVideo = async (message: IChat) => {
        return axios({
            method: "POST",
            url: `http://${process.env.REACT_APP_IP_ADDRESS_API}:${process.env.REACT_APP_IP_ADDRESS_PORT}/${URL_PATHS.POST_CREATE_MESSGAE_STATUS_VIDEO_CALL}`,
            headers: {
                "content-type": 'application/json',
            },
            data: message,
            timeout: 30000
        })
            .then((res) => res)
            .catch((err) => err)

    }
    return {
        sendMessageVideo
    }
}

export default videoCallService