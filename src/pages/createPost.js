import { Paper, Tab, Tabs, Typography } from "@material-ui/core";
import { Box } from "@material-ui/system";
import React, { useState } from "react";
import CreateBusinessPost from "./createBusinessPost";
import CreateLostAndFoundPost from "./createLostAndFound";
import {
  FirebaseAuthConsumer,
  FirebaseAuthProvider,
} from "@react-firebase/auth";
import fire from "../config/fire";
import firebase from "firebase";
import PublicAgent from "./createPublicAgent";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function CreatePost() {
  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <FirebaseAuthProvider {...fire} firebase={firebase}>
        <FirebaseAuthConsumer>
          {({ isSignedIn, user }) => {
            if (isSignedIn === true)
              return (
                <Paper square alignItems="center">
                  <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    aria-label="disabled tabs example"
                    centered
                  >
                    <Tab label="Business" />
                    <Tab label="Lost and found" />
                    <Tab label="Public Agent Post" />
                  </Tabs>
                  <TabPanel value={value} index={0}>
                    <CreateBusinessPost />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <CreateLostAndFoundPost />
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <PublicAgent />
                  </TabPanel>
                </Paper>
              );
          }}
        </FirebaseAuthConsumer>
      </FirebaseAuthProvider>
    </div>
  );
}
