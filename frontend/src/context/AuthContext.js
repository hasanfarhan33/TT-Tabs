import {createContext, useReducer, useEffect} from 'react'; 

export const AuthContext = createContext(); 

export const authReducer = (state, action) => {
    switch (action.type) {
        case `LOGIN`: 
            return {...state, user: action.payload}
        case `LOGOUT`: 
            return {...state, user: null}
        default: 
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: JSON.parse(localStorage.getItem("user")) || null, 
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))

        // If there is a user in local storage, then we log in 
        if (user) {
            const fetchUpdatedUserData = async () => {
                try {
                    const response = await fetch(`/api/auth/${user._id}`, {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }); 

                    const updatedUser = await response.json(); 
                    if(response.ok) {
                        const userWithToken = {...updatedUser, token: user.token}
                        localStorage.setItem("user", JSON.stringify(userWithToken)); 
                        dispatch({type: `LOGIN`, payload: userWithToken})
                    } else {
                        console.error("Failed to fetch updated user data"); 
                    }
                } catch (error) {
                    localStorage.removeItem("user"); 
                    dispatch({type: "LOGOUT"}); 
                }
            }

            fetchUpdatedUserData(); 
        }
    }, []); 


    return (
        <AuthContext.Provider value={{...state, dispatch}}>{children}</AuthContext.Provider>
    )

}