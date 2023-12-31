import User from "./components/User/User";
import Login from "./components/Login/Login";

function Profile({user, setUser}) {
  return (
    <div>
      {user ? <User user={user} setUser={setUser}/> : <Login setUser={setUser}/>}
    </div>

  );
}

export default Profile;
