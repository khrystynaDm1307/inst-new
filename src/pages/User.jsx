
import { api } from "../http/axios"
import FacebookLogin from "react-facebook-login";
import { useEffect, useState } from "react";
import MenuLayout from "../layouts/Menu-layout";
import { Outlet } from "react-router-dom";

export function User() {
    const user = localStorage.getItem("user_id")
    const [userData, setUserData] = useState()

    const responseFacebook = (response) => {
        console.log(response)
        localStorage.setItem("fb_token", response.accessToken)
        localStorage.setItem("user_id", response.userID)
    };


    const getData = async () => {
        const response = await api.get("/")
        console.log(response)
        setUserData(response)
    }

    useEffect(() => {
        getData()
    }, [user])

    if (!user) {
        return <div className="App">
            <header className="App-header">
                <FacebookLogin
                    appId="371911896837928"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    scope="public_profile,email,instagram_basic,pages_show_list,pages_read_engagement,instagram_manage_insights,read_insights,instagram_shopping_tag_products,pages_read_user_content,pages_manage_metadata"
                />
            </header>
        </div>
    }


    return <MenuLayout userData={userData}> <Outlet /></MenuLayout>

}