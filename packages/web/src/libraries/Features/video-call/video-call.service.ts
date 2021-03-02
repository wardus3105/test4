import { IChat } from "../../../layout/container/nav-bar/nav-bar-items/nav-main-content/conversation/main/conversation.props"
import axios from "axios";
import { URL_PATHS } from '../../../../src/helpers/networking/url-paths';

const videoCallService = () => {

    const sendMessage = async (message: IChat) => {
        debugger
        return axios({
            method: "POST",
            url: `http://${process.env.REACT_APP_IP_ADDRESS_API}:${process.env.REACT_APP_IP_ADDRESS_PORT}/${URL_PATHS.POST_PUSH_STREAM_VIDEO_CALL}`,
            headers: {
                "content-type": 'application/json',
            },
            data: message,
            timeout: 30000
        })
            .then((res) => res)
            .catch((err) => err)

    }


    const getUserById = async (userId: any) => {
        return axios({
            method: "POST",
            url: `http://${process.env.REACT_APP_IP_ADDRESS_API}:${process.env.REACT_APP_IP_ADDRESS_PORT}/${URL_PATHS.POST_GET_USER_BY_ID}`,
            headers: {
                "content-type": 'application/json',
            },
            data: {
                "text":userId
            },
            timeout: 30000
        })
            .then((res) => res)
            .catch((err) => err)
    }
    
    const sendMessageVideo = async (message: IChat) => {
        debugger
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
        sendMessage,
        getUserById,
        sendMessageVideo        
    }
}

export default videoCallService