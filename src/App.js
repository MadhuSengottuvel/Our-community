import Navbar from "./components/navbar";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Home from "./pages/home";
import UserDetails from "./pages/userDetails";
import firebase from "firebase";

import {
  FirebaseAuthConsumer,
  FirebaseAuthProvider,
} from "@react-firebase/auth";
import fire from "./config/fire";
import CreateBusinessPost from "./pages/createBusinessPost";
import ViewBusiness from "./pages/viewBusiness";
import CreatePost from "./pages/createPost";
import ViewLostAndFound from "./pages/viewLostAndFound";
import ViewPublicAgent from "./pages/viewPublicAgent";
import PublicAgent from "./pages/createPublicAgent";
import { Profile } from "./pages/profile";
import Maps from "./pages/maps";

const theme = createTheme({
  palette: {
    primary: {
      // main: deepPurple[600],
      //main: "rgba(108, 72, 183)",
      main: "rgba(219,76,64)",
    },
    secondary: {
      main: deepPurple[600],
    },
  },
  shadows: ["none"],
});

const authentication = {
  isLoggedIn: sessionStorage.getItem("loggedIn"),
  getLogInStatus() {
    return this.isLoggedIn;
  },
};
function SecuredRoute(props) {
  return (
    <Route
      path={props.path}
      render={(data) =>
        authentication.getLogInStatus() != null ? (
          <props.component {...data}></props.component>
        ) : (
          <Redirect to={{ pathname: "/" }}></Redirect>
        )
      }
    ></Route>
  );
}

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <SecuredRoute exact path="/" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <FirebaseAuthProvider {...fire} firebase={firebase}>
              <FirebaseAuthConsumer>
                {({ isSignedIn }) => {
                  if (isSignedIn === true) return <Home />;
                  else return <h1>Not signed in</h1>;
                }}
                <Route exact path="/home" component={Home} />
                <Route exact path="/userDetails" component={UserDetails} />
                <Route
                  exact
                  path="/createBusiness"
                  component={CreateBusinessPost}
                />
                <Route exact path="/createPost" component={CreatePost} />
                <Route exact path="/viewBusiness" component={ViewBusiness} />
                <Route
                  exact
                  path="/viewLostAndFound"
                  component={ViewLostAndFound}
                />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/publicAgent" component={PublicAgent} />
                <Route exact path="/viewAgent" component={ViewPublicAgent} />
                <Route exact path="/viewMap" component={Maps} />
              </FirebaseAuthConsumer>
            </FirebaseAuthProvider>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
