import React, { useState, useEffect } from "react";
import {
  FirebaseAuthConsumer,
  FirebaseAuthProvider,
} from "@react-firebase/auth";
import fire from "../config/fire";
import firebase from "firebase";

import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Button, Card, CardContent, Grid, Tooltip } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export const Profile = () => {
  const [userData, setUserData] = useState([]);
  const [location, setLocation] = useState("");
  const [loadVerification, setLoadVerification] = useState(true);
  const [locationUserData, setLocationUserData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const tempUserData = [];
    const db = fire.firestore();
    db.collection("UserDetails")
      .where("email", "==", localStorage.getItem("email"))
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          let obj = {
            id: doc.id,
            ...doc.data(),
          };
          tempUserData.push(obj);
        });
        setUserData(tempUserData);
      });
  }, []);

  const loadVerificationData = () => {
    console.log(location);

    const tempLocationUserData = [];
    const db = fire.firestore();
    db.collection("UserDetails")
      .where("location", "==", location)
      .where("verified", "==", false)
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          let obj = {
            id: doc.id,
            ...doc.data(),
          };
          tempLocationUserData.push(obj);
        });
        setLocationUserData(tempLocationUserData);
      });
    setLoadVerification(false);
  };
  return (
    <div>
      <FirebaseAuthProvider {...fire} firebase={firebase}>
        <FirebaseAuthConsumer>
          {({ isSignedIn, user }) => {
            if (isSignedIn === true)
              return (
                <>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid
                      // container
                      // rowSpacing={3}
                      // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      container
                      spacing={1}
                    >
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
                            <Avatar
                              sx={{ width: 150, height: 150 }}
                              src="https://e7.pngegg.com/pngimages/9/692/png-clipart-social-media-computer-icons-avatar-user-internet-social-media-computer-network-logo.png"
                              alt="Profile"
                            />
                            <br />
                            <br />
                            {userData.map((obj) => {
                              setLocation(obj.location);
                              return (
                                <>
                                  <Grid
                                    container
                                    spacing={0}
                                    direction="column"
                                    alignItems="center"
                                    justify="center"
                                  >
                                    <Grid item xs={3}>
                                      <Card
                                        sx={{ minWidth: 275, padding: "25px" }}
                                      >
                                        <CardContent
                                          style={{ textAlign: "center" }}
                                        >
                                          <Typography
                                            variant="h5"
                                            component="div"
                                          >
                                            {obj.name}
                                          </Typography>
                                          <Typography variant="body2">
                                            <br />
                                          </Typography>
                                          <Typography
                                            variant="h5"
                                            component="div"
                                          >
                                            {obj.email}
                                          </Typography>
                                          <Typography variant="body2">
                                            <br />
                                          </Typography>
                                          <Typography
                                            variant="h5"
                                            component="div"
                                          >
                                            {obj.location}
                                          </Typography>
                                          <Typography variant="body2">
                                            <br />
                                          </Typography>
                                          <Typography
                                            variant="h5"
                                            component="div"
                                          >
                                            {obj.role}
                                          </Typography>
                                        </CardContent>
                                      </Card>
                                    </Grid>
                                  </Grid>
                                </>
                              );
                            })}
                          </Box>
                        </Container>
                      </Grid>
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
                            {loadVerification ? (
                              <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={loadVerificationData}
                                sx={{ mt: 3, mb: 2 }}
                              >
                                Load Details
                              </Button>
                            ) : (
                              <>
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
                                    {locationUserData.map((obj) => {
                                      return (
                                        <>
                                          <Typography
                                            variant="h5"
                                            component="div"
                                          >
                                            Pending verification users
                                          </Typography>
                                          <br />
                                          <Grid
                                            container
                                            spacing={0}
                                            direction="column"
                                            alignItems="center"
                                            justify="center"
                                          >
                                            <Grid item xs={3}>
                                              <Card
                                                sx={{
                                                  minWidth: 275,
                                                  padding: "25px",
                                                }}
                                              >
                                                <CardContent
                                                  style={{
                                                    textAlign: "center",
                                                  }}
                                                >
                                                  <Typography
                                                    variant="h5"
                                                    component="div"
                                                  >
                                                    {obj.name}
                                                  </Typography>
                                                  <Typography variant="body2">
                                                    <br />
                                                  </Typography>
                                                  <Typography
                                                    variant="h5"
                                                    component="div"
                                                  >
                                                    {obj.email}
                                                  </Typography>
                                                  <Typography variant="body2">
                                                    <br />
                                                  </Typography>
                                                  <Typography
                                                    variant="h5"
                                                    component="div"
                                                  >
                                                    {obj.location}
                                                  </Typography>
                                                  <Typography variant="body2">
                                                    <br />
                                                  </Typography>
                                                  <Typography
                                                    variant="h5"
                                                    component="div"
                                                  >
                                                    {obj.role}
                                                  </Typography>
                                                </CardContent>
                                                <Tooltip title="Clicking this will verify this account">
                                                  <Button
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    onClick={
                                                      (fire
                                                        .firestore()
                                                        .collection(
                                                          "UserDetails"
                                                        )
                                                        .doc(obj.id)
                                                        .update({
                                                          verified: true,
                                                        }),
                                                      () =>
                                                        history.push("/home"))
                                                    }
                                                    sx={{ mt: 3, mb: 2 }}
                                                  >
                                                    You know this person
                                                  </Button>
                                                </Tooltip>
                                              </Card>
                                            </Grid>
                                          </Grid>
                                        </>
                                      );
                                    })}
                                  </Box>
                                </Container>
                              </>
                            )}
                          </Box>
                        </Container>
                      </Grid>
                    </Grid>
                  </Box>
                </>
              );
          }}
        </FirebaseAuthConsumer>
      </FirebaseAuthProvider>
    </div>
  );
};
