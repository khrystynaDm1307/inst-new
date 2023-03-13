import { Avatar, Divider, Grid, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../http/axios";

export default function UserInsights() {
  const [data, setData] = useState();
  const [err, setErr] = useState();

  const params = useParams();

  const getData = async (id) => {
    setErr(null);
    try {
      const response = await api.get(`/ig-accounts/${id}/insights`);
      const newRes = await api.get(`/ig-accounts/${id}/new-insights`);
      console.log({ newRes });
      console.log(response);
      setData(response);
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
      <Paper sx={{ p: 2, mb: 2 }}>
        <Link to={`/ig-accounts/${params.id}/demo-insights`}>
          <Typography fontSize={"30px"}>Demo metrics</Typography>
        </Link>
      </Paper>

      <Divider />
      {data?.day_metric ? (
        <Stack>
          <Typography fontSize={"40px"} mb={2}>
            Day metrics
          </Typography>

          <Grid container rowSpacing={2} columnSpacing={2} columns={3}>
            {data?.day_metric?.map((metric) => (
              <Grid item xs={1}>
                <Paper sx={{ p: 2 }}>
                  <Typography>{metric.name}</Typography>
                  <Typography fontSize={"12px"}>
                    {metric.description}
                  </Typography>
                  <Divider sx={{ m: 2 }}></Divider>
                  <Stack>
                    <Typography>Start: {metric.values[0].value}</Typography>
                    <Typography>End: {metric.values[1].value}</Typography>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Stack>
      ) : (
        <p>Loading</p>
      )}

      {data?.month_metric ? (
        <Stack>
          <Typography fontSize={"40px"} my={2}>
            Month metrics
          </Typography>

          <Grid container rowSpacing={2} columnSpacing={2} columns={3}>
            {data?.month_metric?.map((metric) => (
              <Grid item xs={1}>
                <Paper sx={{ p: 2 }}>
                  <Typography>{metric.name}</Typography>
                  <Typography fontSize={"12px"}>
                    {metric.description}
                  </Typography>
                  <Divider sx={{ m: 2 }}></Divider>
                  <Stack>
                    <Typography>Start: {metric.values[0].value}</Typography>
                    <Typography>End: {metric.values[1].value}</Typography>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Stack>
      ) : (
        <p>Loading</p>
      )}

      {data?.lifetime_metric ? (
        <Stack>
          <Typography fontSize={"40px"} my={2}>
            Lifetime metrics
          </Typography>

          <Grid container rowSpacing={2} columnSpacing={2} columns={3}>
            {data?.lifetime_metric?.map((metric) => (
              <Grid item xs={2}>
                <Paper sx={{ p: 2 }}>
                  <Typography>{metric.name}</Typography>
                  <Typography fontSize={"12px"}>
                    {metric.description}
                  </Typography>
                  <Typography fontSize="40px">{data.follows_count}</Typography>
                  <Divider sx={{ m: 2 }}></Divider>
                  <Stack>
                    {JSON.stringify(metric.values[0].value)
                      .split(",")
                      .map((value, index) => (
                        <>
                          <Typography>{value}</Typography>
                          {index % 2 !== 0 && <Divider />}
                        </>
                      ))}
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Stack>
      ) : (
        <p>Loading</p>
      )}
    </Stack>
  );
}
