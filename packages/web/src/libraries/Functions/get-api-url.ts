export default function getApiUrl(id: string){
    if(id){
        return process.env.REACT_APP_IP_ADDRESS_FILE + "" + process.env.REACT_APP_IP_ADDRESS_FILE_PATH + id;
    }
    return process.env.REACT_APP_IP_ADDRESS_FILE + "" + process.env.REACT_APP_IP_ADDRESS_FILE_PATH

}