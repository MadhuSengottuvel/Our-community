import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import {
  CardContent,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Card,
} from "@material-ui/core";
import fire from "../config/fire";
import { useHistory } from "react-router-dom";
import MapboxAutocomplete from "react-mapbox-autocomplete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AccountBoxRounded } from "@material-ui/icons";
toast.configure();

export default function Signup() {
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");
  const history = useHistory();
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  }, []);
  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fire
      .firestore()
      .collection("UserDetails")
      .doc(fire.auth().currentUser.email)
      .update({
        location: location,
        address: address,
        role: role,
        createdAt: Date.now(),
        verified: false,
        latitude: lat,
        longitude: lng,
      });
    toast.success("Saved successfully");
    history.push("/home");
  };

  const suggestionSelect = (result, lat, lng, text) => {
    // console.log(result, lat, lng, text);
    setLat(lat);
    setLng(lng);
    setAddress(result);
    setLocation(text);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Card sx={{ minWidth: 275, padding: "25px", marginTop: "20px" }}>
        <CardContent style={{ textAlign: "center" }}>
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <AccountBoxRounded />
            </Avatar>
            <Typography component="h1" variant="h5">
              More about you
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3, width: 350 }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <div>
                    <MapboxAutocomplete
                      publicKey="pk.eyJ1Ijoia2F0aGlydmVsY2hhbmRyYXNla2FyYW4iLCJhIjoiY2tsaXVsMDVvMGdvcTJwbm14MDF5encydyJ9.TPeBIYPfIVfrSby4mlSMRw"
                      inputClass="form-control search"
                      onSuggestionSelect={suggestionSelect}
                      country="in"
                      resetSearch={false}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ width: 350 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Role
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={role}
                      label="Role"
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Government"}>Government</MenuItem>
                      <MenuItem value={"Fire Service"}>Fire Service</MenuItem>
                      <MenuItem value={"Electricity"}>Electricity</MenuItem>
                      <MenuItem value={"Politician"}>Politician</MenuItem>
                      <MenuItem value={"Water Service"}>Water Service</MenuItem>
                      <MenuItem value={"Doctor"}>Doctor</MenuItem>
                      <MenuItem value={"Gym Trainer"}>Gyn Trainer</MenuItem>
                      <MenuItem value={"Dietician"}>Dietician</MenuItem>
                      <MenuItem value={"Plumber"}>Plumber</MenuItem>
                      <MenuItem value={"Lawyer"}>Lawyer</MenuItem>
                      <MenuItem value={"IT"}>IT</MenuItem>
                      <MenuItem value={"Pilot"}>Pilot</MenuItem>
                      <MenuItem value={"Entrepreneur"}>Entrepreneur</MenuItem>
                      <MenuItem value={"Home maker"}>Home maker</MenuItem>
                      <MenuItem value={"Employed"}>Employed</MenuItem>
                      <MenuItem value={"Student"}>Student</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                // disabled={loading}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
