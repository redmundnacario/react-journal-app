import { useReducer } from "react";

import UserContext from "./userContext";
import UserReducer from "./userReducer";

import { SET_USER, CLEAR_USER, SET_LOADING } from "../types";

let url;

if (process.env.NODE_ENV !== "production") {
    url = process.env.REACT_APP_ROUTE;
} else {
    url = process.env.REACT_APP_ROUTE;
}

const UserState = (props) => {
    const initialState = {
        user: {},
        isLoading: false,
    };

    const [state, dispatch] = useReducer(UserReducer, initialState);

    const logInUser = async (data) => {
        setIsLoading();

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

        if (res.status === 200) {
            alert("Successfully logged in.");
            console.log(res.status);
            console.log(result);

            dispatch({
                type: SET_USER,
                payload: result
            })
        
        } else {
            alert("Unsuccessful login.");
            console.log(res.status);
            console.log(result);
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

        if (res.status === 200) {
            alert("Account successfully created");
            console.log(res.status);
            console.log(result);

            dispatch({
                type: SET_USER,
                payload: result
            })
        } else {
            alert("Unsuccessful account creation");
            console.log(res.status);
            console.log(result);
        }
    };

    const logOutUser = () => {
        setIsLoading();

        dispatch({
            type: CLEAR_USER
        })
        // reroute to home
    };

    // set loading to true
    const setIsLoading = () => {
        dispatch({ type: SET_LOADING });
    };

    return(
        <UserContext.Provider
        value = {{
            user : state.user,
            isLoading : state.isLoading,
            logInUser,
            signUpUser,
            logOutUser,
            setIsLoading
        }}
        >
            {props.children}
        </UserContext.Provider>
    )
};


export default UserState