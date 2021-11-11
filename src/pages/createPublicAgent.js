import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { Box } from "@material-ui/system";
import React, { useState, useEffect } from "react";
import fire from "../config/fire";
import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "react-lottie";
import error from "../assets/error.json";
export default function PublicAgent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAgent, setIsAgent] = useState(false);

  const db = fire.firestore();
  const history = useHistory();
  const roles = [
    "Government",
    "Fire Service",
    "Electricity",
    "Politician",
    "Water Service",
    "Doctor",
    "Dietician",
    "Gym Trainer",
    "Plumber"
  ];
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: error,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const db = fire.firestore();
    db.collection("UserDetails")
      .doc(localStorage.getItem("email"))
      .get()
      .then((data) => {
        setIsAgent(roles.includes(data.data().role));
      });
  }, []);
  const createPost = (e) => {
    e.preventDefault();
    db.collection("UserPosts")
      .add({
        title: title,
        desc: description,
        createdAt: new Date(),
        type: "Public Agent",
        createdBy: localStorage.getItem("email"),
      })
      .then(() => {
        toast.success("Post created successfully");
        history.push("/home");
      })
      .catch((error) => {
        alert(error.message);
        toast.error(error.message);
      });
  };
  return (
    <div>
      {isAgent ? (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Card sx={{ minWidth: 275, padding: "25px", marginTop: "20px" }}>
            <CardContent
              style={{
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  marginTop: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1 }}>
                  <AddCircle />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Create Public Agent Post
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={createPost}
                  sx={{ mt: 3, width: 350 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="title"
                        name="title"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="description"
                        label="Description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Create Post
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Container>
      ) : (
        <>
          <Lottie options={defaultOptions} height={400} width={400} />
          <div style={{ textAlign: "center" }}>
            <Typography component="h1" variant="h5">
              You have no authorization.
            </Typography>
          </div>
        </>
      )}
    </div>
  );
}
