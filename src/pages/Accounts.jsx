
import { api } from "../http/axios"
import { useEffect, useState } from "react";
import MenuLayout from "../layouts/Menu-layout";
import { Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";

export default function Accounts() {
    const user = localStorage.getItem("user_id")
    const [userData, setUserData] = useState()
    const [err, setErr] = useState()

    const getData = async () => {
        setErr(null)
        
        try {
            const response = await api.get("/")
            console.log(response)
            setUserData(response)
        }
        catch (e) {
            setErr(e)
        }
    }

    useEffect(() => {
        getData()
    }, [user])

    if (!user) return
    if (err) return <p>Something went wrong</p>

    return <div className="App">

        {userData?.accounts?.length ? <Stack>
            {userData?.accounts.map(acc => <Stack m={2} maxWidth={400} component={Paper} padding={2}>
                <Link to={`/accounts/${acc.id}`}> <Typography>{acc.name}</Typography></Link>
                <Typography>{acc.category}</Typography>
                <Typography>{acc.category_list.map(cat => <span>{cat.name}, </span>)}</Typography>
            </Stack>

            )}
        </Stack> : <Typography>No accounts</Typography>}

    </div>
}