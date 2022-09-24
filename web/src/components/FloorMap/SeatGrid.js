import {useEffect, useState} from "react";
import {Box, CardContent, Card, Paper, CardHeader, Typography, Grid, Fade} from "@mui/material";
import "../../style/Seats.css";

export default function SeatGrid(props){
    const [seats, setSeats] = useState([]);
    const [seatsAvailable, setSeatsAvailable] = useState([]);
    const [seatsReserved, setSeatsReserved] = useState([]);
    const [seatsSelected, setSeatsSelected] = useState([]);

    useEffect(()=>{
        setSeats(Object.keys(props.seats).length > 0 ? [...props.seats['reservedSeats'],...props.seats.availableSeats]:[]);
        setSeatsAvailable(Object.keys(props.seats).length>0?props.seats.availableSeats:[]);
        setSeatsReserved(Object.keys(props.seats).length>0?props.seats['reservedSeats']:[]);
    },[seats])

    const onSeatClickData = (seat) => {
        let isPresent = seatsSelected.some(se => se.seatName === seat.seatName)
        if (!isPresent) {
            setSeatsSelected([seat]);
        }else{
            setSeatsSelected([]);
        }
    }

    const getSeatClass = (selected,reservedSeat, seat)=>{
        let seatPresent = selected.some(set => set.seatName === seat.seatName);
        let seatRes = reservedSeat.some(set => set.seatName === seat.seatName)
        if(seatPresent){
            return "selected";
        }
        if(seatRes){
            return "reserved";
        }
        return "available";
    }
    console.log("Seats===",seats)
    return (
        <Grid>
            <Grid item xs={10} md={10} lg={12}>
                <Fade in={true} {...({ timeout: 2000 })}>
                    <Card>
                        <CardHeader title={"Seat Selector"} />
                        <CardContent>
                            <Box sx={{
                                display: 'grid',
                                gap: 5,
                                gridTemplateColumns: 'repeat(10, 1fr)',
                            }}>
                                {seats.map((seat) => (
                                    <Paper elevation={0} className={getSeatClass(seatsSelected, seatsReserved, seat)} key={seat.seatId} variant="outlined"
                                           sx={{ py: 5, textAlign: 'center' }} onClick={()=>onSeatClickData(seat)}>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            {seat.seatName}
                                        </Typography>
                                    </Paper>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Fade>
            </Grid>
        </Grid>
    );

}