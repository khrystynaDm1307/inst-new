
import "./App.css";
import FacebookLogin from "react-facebook-login";
import { User } from "./pages/User";
import { Route, Routes } from "react-router-dom";
import Accounts from "./pages/Accounts";
import Account from "./pages/Account";
import Media from "./pages/Media";
import MediaItem from "./pages/Media-Item";
import Stories from "./pages/Stories";
import StoriesItem from "./pages/Stories-Item";

function App() {

  return (

    <Routes>
      <Route path="/" element={<User />} >
        <Route path={`accounts`} element={<Accounts />} />
        <Route path={`accounts/:id`} element={<Account />} />
        <Route path={`ig-accounts/:id/media`} element={<Media />} />
        <Route path={`ig-accounts/:id/stories`} element={<Stories />} />
        <Route path={`media/:id`} element={<MediaItem />} />
        <Route path={`stories/:id`} element={<StoriesItem />} />
      </Route>

    </Routes>
  );
}

export default App;
