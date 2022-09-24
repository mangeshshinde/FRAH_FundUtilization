// @mui
import PropTypes from 'prop-types';
import {Box, Card, Paper, Typography, CardHeader, CardContent, Fade} from '@mui/material';
import "../../../style/Seats.css"
// utils

// ----------------------------------------------------------------------

AppTrafficBySite.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
    checktrue: PropTypes.func,
    onClickData: PropTypes.func,
    selected:PropTypes.array,
    reservedSeat:PropTypes.array
};

export default function AppTrafficBySite({ title, subheader, list, checktrue, onClickData, selected, reservedSeat, ...other }) {

    function getClass(selected, reservedSeat, site){
        if(selected.indexOf(site) > -1){
            return "selected";
        }
        if(reservedSeat.indexOf(site) > -1){
            return "reserved";
        }
        return "available";
    }

    function onClickSeat(seat) {
        console.log("clicked onClickSeat",seat);
       onClickData(seat);
    }
    // function checkTrue(seat) {
    //     console.log("clicked checkTrue",seat);
    //     checktrue(seat);
    // }
  return (
      <Fade in={true} {...({ timeout: 2000 })}>
      <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <CardContent>
          <Box sx={{
                  display: 'grid',
                  gap: 5,
                  gridTemplateColumns: 'repeat(10, 1fr)',
              }}>
              {list.map((site) => (
                  <Paper elevation={0} className={getClass(selected, reservedSeat, site)} key={site} variant="outlined" sx={{ py: 5, textAlign: 'center' }} onClick={()=>onClickSeat(site)}>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {site}
                      </Typography>
                  </Paper>
              ))}
          </Box>
      </CardContent>
  </Card>
      </Fade>);

}
