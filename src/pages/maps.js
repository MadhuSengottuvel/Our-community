import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import fire from "../config/fire";
import { Box } from "@material-ui/system";
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

function Maps() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [place, setPlace] = useState("");
  const [centerState, setCenterState] = useState({});
  const [places, setPlaces] = useState([]);
  const [userData, setUserData] = useState([]);

  const db = fire.firestore();

  useEffect(() => {
    const tempUserData = [];
    var id;
    userData.map((item) => {
      id = item.location;
    });

    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          setCenterState({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
      }
    }) 
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <LoadScript googleMapsApiKey="AIzaSyDX-xbfYjbgsMDWuX75zPTW1l9hyJ5iLwQ">
        {/* <LoadScript googleMapsApiKey="AIzaSyAdA0CSpmGuB0j39VE_qQCKzH-D6C1lj1I"> */}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={centerState}
          zoom={15}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      </LoadScript>
      {/* <Container component="main" maxWidth="xs">
        <Box
          component="form"
          noValidate
          onSubmit={suggestPlace}
          sx={{ mt: 3, width: 350 }}
        >
          <Typography component="h1" variant="h5">
            Suggest some place to visit
          </Typography>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="title"
                name="title"
                required
                fullWidth
                id="title"
                label="Suggest Place"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                autoFocus
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Suggest place
          </Button>
        </Box>
        <Grid item xs={6}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <br />
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <br />
              <br />
              {places.map((item) => {
                return (
                  <div>
                    <br />

                    <Typography component="h1" variant="h5">
                      {item}
                    </Typography>
                  </div>
                );
              })}
            </Box>
          </Container>
        </Grid>
      </Container> */}
    </div>
  );
}
export default React.memo(Maps);


 // //   db.collection("UserDetails")
  //     .where("email", "==", localStorage.getItem("email"))
  //     .get()
  //     .then((snap) => {
  //       snap.forEach((doc) => {
  //         let obj = {
  //           id: doc.id,
  //           ...doc.data(),
  //         };
  //         tempUserData.push(obj);
  //       });
  //       setUserData(tempUserData);
  //     });
  //   db.collection("PlacesSuggestions")
  //     .doc(id)
  //     .get()
  //     .then((doc) => {
  //       setPlaces(doc.data().place);
  //     });
  // }, []);

  // const suggestPlace = (e) => {
  //   e.preventDefault();
  //   var id;
  //   userData.map((item) => {
  //     id = item.location;
  //   });
  //   db.collection("PlacesSuggestions")
  //     .doc(id)
  //     .update({
  //       place: firebase.firestore.FieldValue.arrayUnion(place),
  //     })
  //     .then(() => {
  //       toast.success("Post created successfully");
  //     })
  //     .catch((error) => {
  //       alert(error.message);
  //       toast.error(error.message);
  //     });
  // };