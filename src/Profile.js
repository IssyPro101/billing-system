import User from "./components/User/User";
import Login from "./components/Login/Login";

function Profile({user}) {
  return (
    <div>
      {user ? <User/> : <Login/>}
    </div>

  );
}

export default Profile;
