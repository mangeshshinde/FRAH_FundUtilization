import React, {useEffect, useState} from "react";
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import {Grid, Container, Typography, Box, Button} from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import SeatGrid from "../components/FloorMap/SeatGrid";
import Api from "../api/Api";
import DatePicker from "react-datepicker";

// ----------------------------------------------------------------------

const sectors={
    reservedSeats:[{seatId:1,seatName:"Auto Mobile"}, {seatId:2,seatName:"Information Technology"}, {seatId:3,seatName:"Power"}],
    availableSeats:[{seatId:4,seatName:"Agriculture"}, {seatId:5,seatName:"Oil & Gas"}, {seatId:6,seatName:"Aviation"}]
}

export default function BookSeat() {

    const [seats, setSeats] = useState(sectors);
    const [startDate, setStartDate] = useState(new Date());
    const id = sessionStorage.getItem('employeeID')
    console.log('id-----',id)
    useEffect(()=>{
        Api.axiosGetApi(`/employee/${id}/availableSpaces`)
            .then((response) => {
                console.log("response===",response)
                setSeats({...seats,...response.data})
            }).catch(() => {
        })
    },[]);


  return (
      <Page title="Invest Fund">
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>
           Invest Fund
          </Typography>
            <Grid container spacing={3} style={{marginBottom:30}}>
                <Grid item xs={12} sm={6} md={3}>
                From: <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                To:  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Button size="large" variant="contained" onClick={() => {}}>Confirm Investment</Button>
                </Grid>
            </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={12}>
                <SeatGrid seats={seats} />
            </Grid>
          </Grid>
        </Container>
      </Page>
  );
}
