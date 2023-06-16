import Menu from "./components/Menu/Menu";

function Home({ user }) {
  return (
    <div>
      <h1 className="heading" style={{ textDecoration: "underline" }}>Project Info</h1>
      <p className="heading">
        This is a customer billing system. Simply create an account and buy any items on the menu.<br/>
        Every time you buy an item you receive 5 points.<br/>
        Once you reach 10 points you are eligible for discounts on menu items.<br/>
        Discount System:<br/>
        10 points = 5% discount<br/>
        20 points = 10% discount<br/>
        50+ = 20% discount
      </p>
      <h1 className="heading" style={{ textDecoration: "underline" }}>Menu</h1>
      <Menu user={user} />
    </div>

  );
}

export default Home;
