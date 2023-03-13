import { Avatar, Divider, Grid, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../http/axios";

export default function Media() {
    const [data, setData] = useState()
    const [err, setErr] = useState()

    const params = useParams()

    const getData = async (id) => {
        setErr(null)
        try {
            const response = await api.get(`/ig-accounts/${id}/media`)
            console.log(response)
            setData(response?.data)
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
        {data?.length ?

            <Grid container rowSpacing={2} columnSpacing={2} columns={5}>
                {data.map(media => <Grid item xs={1}>
                    <Link to={`/media/${media.id}`}>
                        <Paper sx={{ p: 2, height: 400, overflow: "hidden" }}>
                            <img src={media.media_product_type !== "REELS" ? media.media_url : media.thumbnail_url} alt="" style={{ maxWidth: 200 }} />
                            <Stack>
                                <Typography fontSize="14px" mb={2} maxHeight={100} overflow="hidden">{media.caption}</Typography>
                                <Divider />
                                <Divider />
                                <Typography> {media.like_count} - likes</Typography>
                                <Typography>{media.comments_count} - comments</Typography>
                            </Stack>
                        </Paper></Link>

                </Grid>)}


            </Grid>

            : <p>No media</p>}
    </Stack>
}