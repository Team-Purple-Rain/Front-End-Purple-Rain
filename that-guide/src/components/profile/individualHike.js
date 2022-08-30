import * as React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment';

function IndividualHike(props) {
    const { distance, times, speed, elevationGain, elevationLoss, startingLat, startingLong, endingLat, endingLong, date } = props;

    // if (speed === NaN) {
    //     return "Not enough information to determine pace"
    // };

    let token = localStorage.getItem("auth_token");

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <>
            <h4> {moment(date).format('MMMM Do YYYY, h:mm:ss a')}</h4>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '43%', flexShrink: 0 }}>
                        {expanded ? "Click to Close" : "Open for Details"}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>

                        Distance Hiked: {distance} miles
                        <br />
                        Time Hiking: {times / 60} minutes
                        <br />
                        Average Pace:
                        {speed} mph
                        <br />
                        <br />
                        Elevation Gain: {elevationGain} ft
                        <br />
                        Elevation Loss: {elevationLoss} ft
                        <br />
                        <br />
                        Start Location:
                        <br />
                        Latitude: {startingLat}
                        <br />
                        Longitude: {startingLong}
                        <br />
                        <br />
                        End Location:
                        <br />
                        Latitude: {endingLat}
                        <br />
                        Longitude: {endingLong}
                        <br />
                        <br />
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default IndividualHike