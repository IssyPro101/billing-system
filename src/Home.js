import Menu from "./components/Menu/Menu";

function Home({ user }) {
  return (
    <div>
      <h1 className="main-heading">Menu</h1>
      <Menu user={user} />
    </div>

  );
}

export default Home;
