import {useSelector} from "react-redux";

export  function useAuth () {
    const {email, token} = useSelector(state => state.user);
    return {
        isAuth: !!email,
        email,
        token
    }
}

