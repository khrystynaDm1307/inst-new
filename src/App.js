
import "./App.css";
import FacebookLogin from "react-facebook-login";
import { User } from "./pages/User";

function App() {
  const user = localStorage.getItem("user_id")

  const responseFacebook = (response) => {
    localStorage.setItem("fb_token", response.accessToken)
    localStorage.setItem("user_id", response.userID)
  };

  if (user) {
    return <User />
  }

  return (
    <div className="App">
      <header className="App-header">
        <FacebookLogin
          appId="371911896837928"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          scope="public_profile,email,instagram_basic,pages_show_list,pages_read_engagement"
        />
      </header>
    </div>
  );
}

export default App;
