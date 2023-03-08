
import "./App.css";
import FacebookLogin from "react-facebook-login";
import { User } from "./pages/User";
import { Route, Routes } from "react-router-dom";
import Accounts from "./pages/Accounts";
import Account from "./pages/Account";
import Media from "./pages/Media";
import MediaItem from "./pages/Media-Item";

function App() {

  return (

    <Routes>
      <Route path="/" element={<User />} >
        <Route path={`accounts`} element={<Accounts />} />
        <Route path={`accounts/:id`} element={<Account />} />
        <Route path={`ig-accounts/:id`} element={<Media />} />
        <Route path={`media/:id`} element={<MediaItem />} />
      </Route>

    </Routes>
  );
}

export default App;
