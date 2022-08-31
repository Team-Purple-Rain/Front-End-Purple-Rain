import * as React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment';

function IndividualHike(props) {
    const { times, startingElevation, endingElevation, date, startingLat, startingLong, endingLat, endingLong, mileMarker } = props;

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const timeHikingRounded = (((times) / 60).toFixed(2))


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
                        Time Hiking: {times / 60} minutes
                        <br />
                        Mile Marker: {mileMarker}
                        <br />
                        <br />
                        Starting Elevation: {startingElevation} ft
                        <br />
                        Elevation Loss: {endingElevation} ft
                        <br />
                        <br />
                        Starting Location: {startingLat}, {startingLong}
                        <br />
                        Ending Location: {endingLat}, {endingLong}
                        <br />
                        <br />
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default IndividualHike