import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import { Box } from "@material-ui/system";
import React, { useState, useEffect } from "react";
import fire from "../config/fire";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function ViewPublicAgent() {
  const [businessData, setBusinessData] = useState([]);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const db = fire.firestore();

  useEffect(() => {
    const tempBusinessData = [];
    const db = fire.firestore();

    db.collection("UserPosts")
      .where("type", "==", "Public Agent")
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
  const updatePost = (e) => {
    e.preventDefault();
    var id;
    businessData.map((item) => {
      id = item.id;
    });
    db.collection("UserPosts")
      .doc(id)
      .update({
        title: title,
        desc: description,
      })
      .then(() => {
        toast.success("Post edited successfully");
        history.push("/home");
      })
      .catch((error) => {
        alert(error.message);
        toast.error(error.message);
      });
  };
  return (
    <div
      style={{
        position: "relative",
        textAlign: "center",
      }}
    >
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
                    <Typography gutterBottom variant="h5" component="div">
                      {data.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      height="150px"
                    >
                      {data.desc}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      {data.category}
                    </Typography>
                    <Chip label={data.type} variant="outlined" />
                  </CardContent>
                  {localStorage.getItem("email") == data.createdBy ? (
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => {
                          fire
                            .firestore()
                            .collection("UserPosts")
                            .doc(data.id)
                            .delete();
                          history.push("/home");
                        }}
                      >
                        Delete
                      </Button>
                      <Button size="small" onClick={handleOpen}>
                        Edit
                      </Button>
                    </CardActions>
                  ) : null}
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} component="form" noValidate onSubmit={updatePost}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                  Create Public Agent Post
                </Typography>
                <br />
                <br />

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
              Edit Post
            </Button>
          </Box>
        </Modal>
      </Box>
    </div>
  );
}
