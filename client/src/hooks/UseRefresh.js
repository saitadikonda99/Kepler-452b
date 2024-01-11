import axios from 'axios'
import useAuth from './UseAuth'

const useRefresh = () => {
    const { setAuth } = useAuth()


    const refresh = async () => {
        const host = process.env.REACT_APP_HOST;
        console.log(host)
        const response = await axios.get( `${host}/refresh`, {
            withCredentials: true
        });
        
        setAuth( (prev) => {
            
            return {
                ...prev,
                id : response.data.id,
                role : response.data.role,
                user : response.data.username,
                accessToken: response.data.accessToken
            }
        })
        return response.data.accessToken;
    }
    
  return refresh;
}

export default useRefresh