import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import { IconButton, Toolbar, Tooltip } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import {
  FirebaseAuthConsumer,
  FirebaseAuthProvider,
} from "@react-firebase/auth";
import fire from "../config/fire";
import firebase from "firebase";
import { AccountCircle, AddCircle, Logout, Public } from "@material-ui/icons";

export default function Navbar() {
  const history = useHistory();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => history.push("/home")}
          >
            Our Community
          </Typography>
          <FirebaseAuthProvider {...fire} firebase={firebase}>
            <FirebaseAuthConsumer>
              {({ isSignedIn, user }) => {
                if (isSignedIn === true)
                  return (
                    <>
                      <Tooltip title="Open map">
                        <div
                          onClick={() => {
                            history.push("/viewMap");
                            localStorage.setItem("email", user.email);
                          }}
                        >
                          <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                          >
                            <Public />
                          </IconButton>
                        </div>
                      </Tooltip>
                      &nbsp;
                      <Tooltip title="Create Post">
                        <div
                          onClick={() => {
                            history.push("/createPost");
                            localStorage.setItem("email", user.email);
                          }}
                        >
                          <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                          >
                            <AddCircle />
                          </IconButton>
                        </div>
                      </Tooltip>
                      &nbsp;
                      <Tooltip title="Account">
                        <div
                          onClick={() => {
                            localStorage.setItem("email", user.email);
                            history.push("/profile");
                          }}
                        >
                          <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                          >
                            <AccountCircle />
                          </IconButton>
                        </div>
                      </Tooltip>
                      &nbsp;
                      <Tooltip title="Logout">
                        <Link to="/signup">
                          <div
                            onClick={
                              (() => firebase.auth().signOut(),
                              sessionStorage.clear(),
                              localStorage.clear())
                            }
                          >
                            <IconButton
                              size="large"
                              aria-label="account of current user"
                              aria-controls="primary-search-account-menu"
                              aria-haspopup="true"
                             // color="inherit"
                            >
                              <Logout color="inherit" />
                            </IconButton>
                          </div>
                        </Link>
                      </Tooltip>
                    </>
                  );
                else
                  return (
                    <Link to="/signup">
                      <Button variant="contained">
                        Sign up
                      </Button>
                    </Link>
                  );
              }}
            </FirebaseAuthConsumer>
          </FirebaseAuthProvider>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
