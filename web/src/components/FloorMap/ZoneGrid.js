import {useState} from "react";
import {Box, CardContent, Card, Paper, CardHeader, Typography, Grid, Fade} from "@mui/material";
import "../../style/Seats.css";
import SeatGrid from "./SeatGrid";


const floorData = [
    {
        floorName:"Floor 1",
        count:200,
        isAvailable:false,
        zone:[
            {
                zoneName: "A",
                numberOfSeats:50,
                rangeFrom:19,
                rangeTo:50,
                seats:{
                    seatsReserved:[{id:1,name:"Seat A"}, {id:2,name:"Seat B"}, {id:3,name:"Seat C"}],
                    seatsAvailable:[{id:4,name:"Seat D"}, {id:5,name:"Seat E"}, {id:6,name:"Seat F"}]
                },
                availableSeats:20
            },
            {
                zoneName: "B",
                numberOfSeats:50,
                rangeFrom:51,
                rangeTo:100,
                seats:{
                    seatsReserved:[{id:1,name:"Seat A"}, {id:2,name:"Seat B"}, {id:3,name:"Seat C"}],
                    seatsAvailable:[{id:4,name:"Seat D"}, {id:5,name:"Seat E"}, {id:6,name:"Seat F"}]
                },
                availableSeats:25
            },{
                zoneName: "C",
                numberOfSeats:50,
                rangeFrom:101,
                rangeTo:150,
                seats:{
                    seatsReserved:[{id:1,name:"Seat A"}, {id:2,name:"Seat B"}, {id:3,name:"Seat C"}],
                    seatsAvailable:[{id:4,name:"Seat D"}, {id:5,name:"Seat E"}, {id:6,name:"Seat F"}]
                },
                availableSeats:0
            },
            {
                zoneName: "D",
                numberOfSeats:50,
                rangeFrom:151,
                rangeTo:200,
                seats:{
                    seatsReserved:[{id:1,name:"Seat A"}, {id:2,name:"Seat B"}, {id:3,name:"Seat C"}],
                    seatsAvailable:[{id:4,name:"Seat D"}, {id:5,name:"Seat E"}, {id:6,name:"Seat F"}]
                },
                availableSeats:20
            }
        ]
    },{
        floorName:"Floor 2",
        count:200,
        isAvailable:true,
        zone:[
            {
                zoneName: "A",
                numberOfSeats:50,
                rangeFrom:1,
                rangeTo:50,
                seats:{
                    seatsReserved:[{id:1,name:"Seat A"}, {id:2,name:"Seat B"}, {id:3,name:"Seat C"}],
                    seatsAvailable:[{id:4,name:"Seat D"}, {id:5,name:"Seat E"}, {id:6,name:"Seat F"}]
                },
                availableSeats:20,
                isAvailable:true,
            },
            {
                zoneName: "B",
                numberOfSeats:50,
                rangeFrom:51,
                rangeTo:100,
                seats:{
                    seatsReserved:[{id:1,name:"Seat A"}, {id:2,name:"Seat B"}, {id:3,name:"Seat C"}],
                    seatsAvailable:[{id:4,name:"Seat D"}, {id:5,name:"Seat E"}, {id:6,name:"Seat F"}]
                },
                availableSeats:20,
                isAvailable:true,
            },{
                zoneName: "C",
                numberOfSeats:50,
                rangeFrom:101,
                rangeTo:150,
                seats:{
                    seatsReserved:[{id:1,name:"Seat A"}, {id:2,name:"Seat B"}, {id:3,name:"Seat C"}],
                    seatsAvailable:[{id:4,name:"Seat D"}, {id:5,name:"Seat E"}, {id:6,name:"Seat F"}]
                },
                availableSeats:20,
                isAvailable:true,
            },
            {
                zoneName: "D",
                numberOfSeats:50,
                rangeFrom:151,
                rangeTo:200,
                seats:{
                    seatsReserved:[{id:1,name:"Seat A"}, {id:2,name:"Seat B"}, {id:3,name:"Seat C"}],
                    seatsAvailable:[{id:4,name:"Seat D"}, {id:5,name:"Seat E"}, {id:6,name:"Seat F"}]
                },
                availableSeats:20,
                isAvailable:true,
            }
        ]
    },{
        floorName:"Floor 3",
        count:200,
        isAvailable:true,
        zone:[
            {
                zoneName: "A",
                numberOfSeats:50,
                rangeFrom:1,
                rangeTo:50,
                seats:{
                    seatsReserved:[{id:1,name:"Seat A"}, {id:2,name:"Seat B"}, {id:3,name:"Seat C"}],
                    seatsAvailable:[{id:4,name:"Seat D"}, {id:5,name:"Seat E"}, {id:6,name:"Seat F"}]
                },
                availableSeats:20,
                isAvailable:true,
            },
            {
                zoneName: "B",
                numberOfSeats:50,
                rangeFrom:51,
                rangeTo:100,
                availableSeats:20,
                isAvailable:true,
                seats:{
                    seatsReserved:[{id:1,name:"Seat A"}, {id:2,name:"Seat B"}, {id:3,name:"Seat C"}],
                    seatsAvailable:[{id:4,name:"Seat D"}, {id:5,name:"Seat E"}, {id:6,name:"Seat F"}]
                },
            },{
                zoneName: "C",
                numberOfSeats:50,
                rangeFrom:101,
                rangeTo:150,
                seats:{
                    seatsReserved:[{id:1,name:"Seat A"}, {id:2,name:"Seat B"}, {id:3,name:"Seat C"}],
                    seatsAvailable:[{id:4,name:"Seat D"}, {id:5,name:"Seat E"}, {id:6,name:"Seat F"}]
                },
                availableSeats:20,
                isAvailable:true,
            },
            {
                zoneName: "D",
                numberOfSeats:50,
                rangeFrom:151,
                seats:{
                    seatsReserved:[{id:1,name:"Seat A"}, {id:2,name:"Seat B"}, {id:3,name:"Seat C"}],
                    seatsAvailable:[{id:4,name:"Seat D"}, {id:5,name:"Seat E"}, {id:6,name:"Seat F"}]
                },
                rangeTo:200,
                availableSeats:20,
                isAvailable:false,
            }
        ]
    }
]

export default function ZoneGrid(){

    const [floorSelected, setFloorSelected] = useState(false);
    const [zoneSelected, setZoneSelected] = useState(false);

    const [floors, setFloors] = useState(floorData);
    const [floorsAvailable, setFloorsAvailable] = useState(floorData.filter(fl=>fl.isAvailable));
    const [floorsReserved, setFloorsReserved] = useState(floorData.filter(fl=>!fl.isAvailable));
    const [floorsSelected, setFloorsSelected] = useState([]);

    const [zones, setZones] = useState([]);
    const [zonesAvailable, setZonesAvailable] = useState([]);
    const [zonesReserved, setZonesReserved] = useState([]);
    const [zonesSelected, setZonesSelected] = useState([]);

    const [zoneSeats, setZoneSeats] = useState({});

    const onFloorClickData = (flr) => {
        let isPresent = floorsSelected.some(fs => fs.floorName === flr.floorName)
        if (!isPresent) {
            setFloorsSelected([flr]);
            setZones([...flr.zone])
            setZonesAvailable(flr.zone.filter(zo=>zo.isAvailable))
            setZonesReserved(flr.zone.filter(zo=>!zo.isAvailable))
            setZonesSelected([]);
            setFloorSelected(true);
            setZoneSelected(false);
        }else{
            setFloorsSelected([]);
            setZones([])
            setFloorSelected(false);
        }
    }

    const onZoneClickData = (zone) => {
        let isPresent = zonesSelected.some(zn => zn.zoneName === zone.zoneName)
        if (!isPresent) {
            setZonesSelected([zone]);
            setZoneSeats(zone.seats)
            setZoneSelected(true);
        }else{
            setZonesSelected([]);
            setZoneSelected(false);
        }
    }


    const getFlrClass = (selected,reservedSeat, site)=>{
        let flrPresent = selected.some(flr => flr.floorName === site.floorName);
        let flrRes = reservedSeat.some(flr => flr.floorName === site.floorName)
        if(flrPresent){
            return "selected";
        }
        if(flrRes){
            return "reserved";
        }
        return "available";
    }

    const getZoneClass = (selected,reservedSeat, site)=>{
        let zonPresent = selected.some(zon => zon.zoneName === site.zoneName);
        let zonRes = reservedSeat.some(zon => zon.zoneName === site.zoneName)
        if(zonPresent){
            return "selected";
        }
        if(zonRes){
            return "reserved";
        }
        return "available";
    }

    return (
        <Grid>
            <Grid item xs={10} md={10} lg={12}>
                <Fade in={true} {...({ timeout: 2000 })}>
                    <Card>
                        <CardHeader title={"Floor Selector"} />
                        <CardContent>
                            <Box sx={{
                                display: 'grid',
                                gap: 5,
                                gridTemplateColumns: 'repeat(10, 1fr)',
                            }}>
                                {floors.map((floor) => (
                                    <Paper elevation={0} className={getFlrClass(floorsSelected, floorsReserved, floor)} key={floor.floorName} variant="outlined"
                                           sx={{ py: 5, textAlign: 'center' }} onClick={()=>onFloorClickData(floor)}>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            {floor.floorName}
                                        </Typography>
                                    </Paper>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Fade>
        </Grid>
        <Grid item xs={10} md={10} lg={12} hidden={!floorSelected}>
            <Fade in={floorSelected} {...({ timeout: 2000 })}>
            <Card>
                <CardHeader title={"Zone Selector"} />
                <CardContent>
                    <Box sx={{
                        display: 'grid',
                        gap: 5,
                        gridTemplateColumns: 'repeat(10, 1fr)',
                    }}>
                        {zones.map((zone) => (
                            <Paper elevation={0} className={getZoneClass(zonesSelected, zonesReserved, zone)} key={zone.zoneName} variant="outlined"
                                   sx={{ py: 5, textAlign: 'center' }} onClick={()=>onZoneClickData(zone)}>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {zone.zoneName}
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