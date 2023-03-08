import { Avatar, Grid, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../http/axios";

export default function Account() {
    const [data, setData] = useState()
    const [err, setErr] = useState()

    const params = useParams()

    const getData = async (id) => {
        setErr(null)
        try {
            const response = await api.get(`/account/${id}`)
            console.log(response)
            setData(response)
        }
        catch (e) {
            setErr(e)
        }
    }

    useEffect(() => {
        getData(params.id)
    }, [params])

    if (err) return <p>Something went wrong</p>

    return <Stack>
        {data?.id ? <Stack>
            <Stack direction={"row"} alignItems="center" mb={2}>
                <Avatar src={data?.profile_picture_url} />
                <Typography ml={1}>   {data.username}</Typography>
            </Stack>

            <Grid container rowSpacing={2} columnSpacing={2} columns={3}>
                <Grid item xs={1}>
                    <Paper sx={{ p: 2 }}>
                        <Typography>follows_count</Typography>
                        <Typography fontSize="40px">{data.follows_count}</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={1}>
                    <Paper sx={{ p: 2 }}>
                        <Typography>followers_count</Typography>
                        <Typography fontSize="40px">{data.followers_count}</Typography>
                    </Paper>
                </Grid>


                <Grid item xs={1}>
                    <Link to={`/ig-accounts/${data.id}`}>
                        <Paper sx={{ p: 2 }}>
                            <Typography>media_count</Typography>
                            <Typography fontSize="40px">{data.media_count}</Typography>
                        </Paper></Link>

                </Grid>
                <Grid item xs={2}>
                    <Paper sx={{ p: 2 }}>
                        <Typography>biography</Typography>
                        <Typography fontSize="14px">{data.biography}</Typography>
                    </Paper>
                </Grid>

            </Grid>
        </Stack>
            : <p>No Insta account connected to that page</p>}
    </Stack>
}