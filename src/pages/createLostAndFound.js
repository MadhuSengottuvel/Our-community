import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
} from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { Box } from "@material-ui/system";
import React, { useState } from "react";
import fire from "../config/fire";
import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateLostAndFoundPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const db = fire.firestore();
  const storage = fire.storage();
  const history = useHistory();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const createPost = (e) => {
    e.preventDefault();
    storage
      .ref(`images/${fire.auth().currentUser.email}/${image.name}`)
      .put(image)
      .then((val) => {
        val.task.snapshot.ref.getDownloadURL().then((URL) => {
          db.collection("UserPosts")
            .add({
              title: title,
              desc: description,
              location: location,
              createdAt: new Date(),
              type: "Lost And Found",
              url: URL,
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
        });
      });
  };
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            Create Lost and Found Post
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="location"
                  label="Location"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              <input type="file" onChange={handleImageChange} />
            </Button>
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
      </Container>
    </div>
  );
}
