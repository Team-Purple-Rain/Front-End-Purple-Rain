import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
// Material UI Imports below:
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import Button from "@mui/material/Button"
import SaveIcon from '@mui/icons-material/Save';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import "./profile.css";


function EditProfile() {

    let token = localStorage.getItem("auth_token");
    let username = localStorage.getItem("username")
    const navigate = useNavigate();
    const handleDiscardChanges = (event) => {
        navigate("/profile");
    }
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [preferredPace, setPreferredPace] = useState(null);
    const [experience, setExperience] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);

    const handleSaveChanges = (event) => {
        axios
            .patch(`https://thatguide.herokuapp.com/users/me/`, {
                email: email,
                phone: phone,
                pace_list: preferredPace,
                experience_list: experience,
                first_name: firstName,
                last_name: lastName
            },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                }
            )
            .then((res) => {
                console.log("changes made");
                // setFirstName("");
                // setLastName("");
                // setEmail("");
                navigate("/profile")
            })
    }

// MUI consts
const experiences = [
    {
      value: 'beginner',
      label: 'Beginner',
    },
    {
      value: 'medium',
      label: 'Moderate',
    },
    {
      value: 'advanced',
      label: 'Advanced',
    },
  ];



  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const preferredPaces = [
    {
      value: 'leisure',
      label: 'Leisure ( 20-30 minute mile / 2-3mph )',
    },
    {
      value: 'powerwalk',
      label: 'Powerwalk ( 12-15 minute mile / 4-5mph )',
    },
    {
      value: 'chased by bear',
      label: 'Chased By Bear ( 10 minute mile and faster / 6mph )',
    },
  ];

    return (
        <>
        <div className="personal-info">
            <h1>Edit Profile</h1>
            <h2> Username:  {username} </h2>
                <br />
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <div>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <OutlinedInput
                    required
                    id="outlined-required"
                    type="text"
                    name="first"
                    aria-describedby="outlined-first-name-helper-text"
                    value={firstName}
                    // placeholder={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                />
                <FormHelperText id="outlined-weight-helper-text">First Name</FormHelperText>
                </FormControl>
                
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <OutlinedInput
                    required
                    id="outlined-required"
                    type="text"
                // placeholder={lastName}
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                />
                <FormHelperText id="outlined-weight-helper-text">Last Name</FormHelperText>
                </FormControl>
                <br/>
            </div>
            <div>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <OutlinedInput
                    id="outlined-adornment-weight"
                    type="text"
                    value={email}
                    placeholder={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <FormHelperText id="outlined-weight-helper-text">Email</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <OutlinedInput
                    id="outlined-adornment-weight"
                    type="text"
                    placeholder={phone}
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                />
                <FormHelperText id="outlined-weight-helper-text">Phone Number</FormHelperText>
                </FormControl>
                <br/>
            </div>
            </Box>
            <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
            name="selectList" 
            id="selectList"
            select
            label="Select"
            helperText="Experience Level"
            value={experience}
            onChange={(event) => setExperience(event.target.value)}
        >
            {experiences.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
            name="selectList" 
            id="selectList"
            select
            label="Select"
            helperText="Preferred Hiking Pace"
            value={preferredPace}
            onChange={(event) => setPreferredPace(event.target.value)}
        >
            {preferredPaces.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      </Box>
      </div>
      <div className="results-buttons">
        <Button
          startIcon={<SaveIcon />}
          variant="contained"
          style={{
            borderRadius: 10,
            backgroundColor: "#62b378",
            padding: "10px",
            fontSize: "calc(.5vw + .5vh + .5vmin)",
            margin: "8px",
            border: "1px solid white",
            float: "left"
          }}
          onClick={handleSaveChanges}>Save Changes</Button>
        <Button
          startIcon={<DeleteOutlineIcon />}
          variant="contained"
          style={{
            borderRadius: 10,
            backgroundColor: "#d95252",
            padding: "10px",
            fontSize: "calc(.5vw + .5vh + .5vmin)",
            margin: "8px",
            border: "1px solid white",
            float: "left"
          }}
          onClick={handleDiscardChanges}>Discard Changes</Button>
      </div>

        </>
    )
}

export default EditProfile