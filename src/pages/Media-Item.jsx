import { Avatar, Divider, Grid, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../http/axios";

export default function MediaItem() {
    const [data, setData] = useState();
    const [insights, setinsights] = useState()
    const [err, setErr] = useState();

    const params = useParams();

    const getData = async (id) => {
        setErr(null);
        try {
            const response = await api.get(`/media/${id}`);
            console.log(response);

            const response1 = await api.get(`/media/${id}/insights`);
            console.log(response1);

            setData(response);
            setinsights(response1.data)
        } catch (e) {
            setErr(e);
        }
    };

    useEffect(() => {
        getData(params.id);
    }, [params]);

    if (err) return <p>Something went wrong</p>;

    return (
        <Stack>
            {data ? (
                <Paper sx={{ p: 2, maxWidth: 800, overflow: "hidden" }}>
                    <Typography
                        fontSize="14px"
                        mb={2}
               
                    >
                        {data.caption}
                    </Typography>
                    <img src={data.media_url} alt="" style={{ maxWidth: 200 }} />
                    <Grid container rowSpacing={2} columnSpacing={2} columns={2}>
                        {insights?.map((insight) => <Grid item xs={1}>
                            <Paper sx={{ p: 2 }}>
                                <Typography>{insight.name}</Typography>
                                <Typography fontSize="40px">{insight.values[0].value}</Typography>
                                <Typography fontSize="12px">{insight.title}</Typography>
                                <Typography fontSize="12px">Period: {insight.period}</Typography>
                            </Paper>
                        </Grid>)}

                    </Grid>


                    <Stack>


                        <Divider sx={{ m: 3 }} />
                        <Typography textAlign={"center"} fontWeight={600}>Comments</Typography>
                        {data?.comments?.data?.map(comment => <Stack m={1}>
                            <Typography fontWeight={600} mt={1}>{comment.username}</Typography>
                            <Typography>{comment.text}</Typography>
                        </Stack>)}

                        <Divider sx={{ m: 3 }} />
                        <Typography textAlign={"center"}>Other info</Typography>
                        {Object.entries(data || {})?.map((obj) => (
                            <Stack>
                                <Typography fontWeight={600} mt={1}>{obj[0]}</Typography>
                                <Typography>{JSON.stringify(obj[1])}</Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Paper>
            ) : (
                <p>No media</p>
            )}
        </Stack>
    );
}
