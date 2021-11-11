import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { Box } from "@material-ui/system";
import React, { useState, useEffect } from "react";
import fire from "../config/fire";
import { CategoryRounded } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import {
  FirebaseAuthConsumer,
  FirebaseAuthProvider,
} from "@react-firebase/auth";
import firebase from "firebase";
import Lottie from "react-lottie";
import error from "../assets/error.json";

export default function Home() {
  const history = useHistory();
  const [email, setEmail] = useState("");

  const [businessData, setBusinessData] = useState([]);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: error,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    const tempBusinessData = [];
    const db = fire.firestore();

    db.collection("UserPosts")
      .orderBy("createdAt", "desc")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          let obj = {
            id: doc.id,
            ...doc.data(),
          };
          tempBusinessData.push(obj);
        });
        setBusinessData(tempBusinessData);
      });
  }, []);
  return (
    <div
      style={{
        position: "relative",
        textAlign: "center",
      }}
    >
      <FirebaseAuthProvider {...fire} firebase={firebase}>
        <FirebaseAuthConsumer>
          {({ isSignedIn, user }) => {
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
                  console.log(obj.verified);
                  setEmail(obj.verified);
                });
              });
            if (isSignedIn === true)
              return (
                <>
                  {email ? (
                    <>
                      <div style={{ paddingTop: "5em" }}>
                        <Container>
                          <Grid container justifyItems="center">
                            <Grid item xs>
                              <Button
                                variant="contained"
                                // color="secondary"
                                startIcon={<CategoryRounded />}
                                onClick={() => history.push("/viewBusiness")}
                              >
                                Business
                              </Button>
                            </Grid>
                            <Grid item xs>
                              <Button
                                variant="contained"
                                // color="secondary"
                                startIcon={<CategoryRounded />}
                                onClick={() =>
                                  history.push("/viewLostAndFound")
                                }
                              >
                                Lost And Found
                              </Button>
                            </Grid>
                            <Grid item xs>
                              <Button
                                variant="contained"
                                // color="secondary"
                                startIcon={<CategoryRounded />}
                                onClick={() => history.push("/viewAgent")}
                              >
                                Public Agent
                              </Button>
                            </Grid>
                          </Grid>
                        </Container>
                      </div>
                      <Box>
                        <Grid container spacing={1} padding={6}>
                          {businessData.map((data) => {
                            return (
                              <Grid item xs={6}>
                                <Card sx={{ maxWidth: 500 }}>
                                  <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="140"
                                    image={
                                      data.url
                                        ? data.url
                                        : "https://image.freepik.com/free-vector/business-team-brainstorm-idea-lightbulb-from-jigsaw-working-team-collaboration-enterprise-cooperation-colleagues-mutual-assistance-concept-pinkish-coral-bluevector-isolated-illustration_335657-1651.jpg"
                                    }
                                  />
                                  <CardContent>
                                    <Typography
                                      gutterBottom
                                      variant="h5"
                                      component="div"
                                    >
                                      {data.title}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      height="150px"
                                    >
                                      {data.desc}
                                    </Typography>
                                    {data.category ? (
                                      <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                      >
                                        {data.category}
                                      </Typography>
                                    ) : null}

                                    <Chip
                                      label={data.type}
                                      variant="outlined"
                                    />
                                  </CardContent>
                                </Card>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Lottie
                        options={defaultOptions}
                        height={400}
                        width={400}
                      />
                      <div>
                        <Typography component="h1" variant="h5">
                          Please wait one of your neighbor will verify you!
                        </Typography>
                      </div>
                    </>
                  )}
                </>
              );
          }}
        </FirebaseAuthConsumer>
      </FirebaseAuthProvider>
    </div>
  );
}
