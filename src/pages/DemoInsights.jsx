import {
  Avatar,
  Button,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../http/axios";

export default function DemoInsights() {
  const [data, setData] = useState();
  const [err, setErr] = useState();
  const [age, setAge] = React.useState("");
  const [age1, setAge1] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleChange1 = (event) => {
    setAge1(event.target.value);
  };

  const params = useParams();

  const getData = async () => {
    console.log(age, age1);
    setErr(null);
    try {
      const response = await api.get(
        `/ig-accounts/${params.id}/demo-insights?metric=${age1}&breakdown=${age}`
      );
      console.log(response);
      setData(response[0]);
    } catch (e) {
      setErr(e);
    }
  };



  return (
    <Stack>
      <Typography fontSize={"40px"} mb={2}>
        Demo metrics
      </Typography>
      <Select
        value={age1}
        label="Metric"
        onChange={handleChange1}
        sx={{ mb: 2 }}
      >
        <MenuItem value={"engaged_audience_demographics"}>
          Engaged audience demographics
        </MenuItem>
        <MenuItem value={"reached_audience_demographics"}>
          Reached audience demographics
        </MenuItem>
        <MenuItem value={"follower_demographics"}>
          Follower demographics
        </MenuItem>
      </Select>

      <Select
        value={age}
        label="Breakdown"
        onChange={handleChange}
        sx={{ mb: 2 }}
      >
        <MenuItem value={"age"}>By age</MenuItem>
        <MenuItem value={"city"}>By city</MenuItem>
        <MenuItem value={"country"}>By country</MenuItem>
        <MenuItem value={"gender"}>By gender</MenuItem>
      </Select>

      <Button onClick={getData} variant="contained">
        Get data
      </Button>

      {err && <>Something went wrong</>}

      {data ? (
        <Stack>
          <Typography fontSize={"25px"} my={2}>
            {data?.name} by {age}
          </Typography>
          <Typography fontSize={"16px"} mb={2}>
            {data?.description}
          </Typography>
          <Typography fontSize={"16px"} mb={2}>
            {data?.title}
          </Typography>
          <Grid container rowSpacing={2} columnSpacing={2} columns={3}>
            {data?.total_value?.breakdowns?.map((metric) => (
              <Grid item xs={1}>
                <Paper sx={{ p: 2 }}>
                  {metric?.results?.map((result) => (
                    <>
                      <Typography>
                        {result.dimension_values[0]} : {result.value}
                      </Typography>
                    </>
                  ))}
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
