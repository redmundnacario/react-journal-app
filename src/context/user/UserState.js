import { useReducer } from "react";

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
        isLoading: false,
        message: null,
    };


    const [state, dispatch] = useReducer(UserReducer, initialState);

    
    const logInUser = async (data) => {
        setIsLoading();
        console.log(process.env.NODE_ENV)
        console.log("login function");
        console.log(data);

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
        console.log(res.status);
        console.log(result);

        const {status, message} = result
        console.log(status ,message)

        if (res === 200){
            dispatch({
                type: SET_USER,
                payload: result
            })
        } else {
            setMessage({status, message})
        }
    };


    const signUpUser = async (data) => {
        setIsLoading();

        console.log("signup function");
        console.log(data);

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
        console.log(res.status);
        console.log(result);
        
        if (res === 200){
            dispatch({
                type: SET_USER,
                payload: result
            })
        } else {
            const {status, message} = result
            dispatch({
                type: SET_MESSAGE,
                payload: {status, message}
            })
        }
    };


    const logOutUser = () => {
        setIsLoading();

        dispatch({
            type: SET_USER,
            payload : null
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
            isLoading : state.isLoading,
            message: state.message,
            logInUser,
            signUpUser,
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