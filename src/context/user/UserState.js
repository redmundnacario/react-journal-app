import { useReducer, useEffect } from "react";

import UserContext from "./userContext";
import UserReducer from "./userReducer";

import { SET_USER,
         SET_LOADING,
         SET_MESSAGE
         } from "../types";

import url from '../url';

const UserState = (props) => {
    const initialState = {
        user: null,
        token : null,
        isLoading: false,
        message: null,
    };


    const [state, dispatch] = useReducer(UserReducer, initialState, () =>{
        const tokenLocal = localStorage.getItem('token')
        return tokenLocal ? {...initialState, token: JSON.parse(tokenLocal)} : null
    });

    useEffect(()=>{
        localStorage.setItem('token',JSON.stringify(state.token))
        // eslint-disable-next-line
    }, [state.token])
    
    const logInUser = async (data, cb) => {
        setIsLoading();
        // console.log(process.env.NODE_ENV)
        // console.log("login function");
        // console.log(data);

        let res;
        try {
            res = await fetch(`${url}/login`, {
                method: "POST",
                headers: {
                "Content-type": "application/json",
                },
                body: JSON.stringify(data),
            });
        } catch (error) {
            console.log(error);
        }

        const result = await res.json();
        // console.log(res.status);
        // console.log(result);

        const {status, message} = result
        // console.log(status ,message)

        if (res.status === 200){

            dispatch({
                type: SET_USER,
                payload: result
            })
        }
        
        setMessage({status, message})

        cb({status, message}, res.status)
    };


    const signUpUser = async (data, cb) => {
        setIsLoading();

        // console.log("signup function");
        // console.log(data);

        let res;
        try {
            res = await fetch(`${url}/users`, {
                method: "POST",
                headers: {
                "Content-type": "application/json",
                },
                body: JSON.stringify(data),
            });
        } catch (error) {
            console.log(error);
        }

        const result = await res.json();
        const {status, message} = result
        // console.log(res.status);
        // console.log(result);
        

        dispatch({
            type: SET_USER,
            payload: result.data? result : null
        })
        
        setMessage({status, message})

        cb({status, message}, res.status)
    };


    const autoLogin = async(token) => {
        setIsLoading();

        let res;
        try {
            res = await fetch(`${url}/auto_login`, {
                method: "GET",
                headers: {
                'Authorization': `Bearer ${token}`
                },
            });
        } catch (error) {
            console.log(error);
        }


        const result = await res.json();
        
        dispatch({
            type: SET_USER,
            payload: result.data? {data: result.data, token: token} : null
        })

    }


    const logOutUser = (cb) => {
        setIsLoading();

        dispatch({
            type: SET_USER,
            payload : {data: null, token: null}
        })
        // reroute to home

        const result = {
            status: "Success",
            message: "User Logged out."
        }
        dispatch({
            type: SET_MESSAGE,
            payload: result
        })

        cb(result, 200)
    };


    const setMessage = (data) => {
        dispatch({ type: SET_MESSAGE, payload: data})
    }

    // set loading to true
    const setIsLoading = () => {
        dispatch({ type: SET_LOADING });
    };


    const clearMessage = () => {
        dispatch({type: SET_MESSAGE, payload: null})
    }


    return(
        <UserContext.Provider
        value = {{
            user : state.user,
            token: state.token,
            isLoading : state.isLoading,
            message: state.message,
            logInUser,
            signUpUser,
            autoLogin,
            logOutUser,
            setIsLoading,
            clearMessage
        }}
        >
            {props.children}
        </UserContext.Provider>
    )
};


export default UserState