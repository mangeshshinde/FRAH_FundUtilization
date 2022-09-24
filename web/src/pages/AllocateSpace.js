import React, {useEffect, useState} from "react";
// @mui
import { useTheme } from '@mui/material/styles';
import {Grid, Container, Typography, TextField, Autocomplete, Button, Box} from '@mui/material';
// components
import Page from '../components/Page';
// sections
import ZoneGrid from "../components/FloorMap/ZoneGrid";
import Api from "../api/Api";
import Slider from "@mui/material/Slider";

// ----------------------------------------------------------------------

export default function AllocateSpace() {
    const theme = useTheme();

    const [employeeData,setEmployeeData] = useState([])
    const [sliderValue, setSliderValue] = React.useState([20, 37]);

    useEffect(()=> {
            Api.axiosGetApi('/employee')
                .then((response) => {
                    console.log("response===",response)
                    const empD= response.data.map((item)=>{
                        return {
                            label:item.fname + " " +item.lname,
                            id: item.id

                        }
                    })
                     setEmployeeData(empD)

                   }).catch(() => {

            })

    },[])
    const handleChange = (event, newValue) => {
        setSliderValue(newValue);
    };

    return (
        <Page title="Allocate Space">
            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                   Allocate Space
                </Typography>
                <Grid container spacing={3} style={{marginBottom:10}}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Autocomplete
                    id="combo-box-demo"
                    options={employeeData}
                    sx={{ width: 300}}
                    renderInput={(params) => <TextField {...params} label="Employee..." />}/>
                    </Grid>
                    <Grid item xs={14} sm={8} md={6} style={{paddingLeft:100}}>
                        Seats
                    <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={sliderValue}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Button size="large" variant="contained" onClick={() => {}}>Confirm Booking</Button>
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item xs={10} md={10} lg={12}>
                        <ZoneGrid />
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}
