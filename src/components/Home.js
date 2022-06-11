import Card from "./Card";
function Home() {
  return (
    <div id="home" className="home-background">
      <div className="right">
        <Card
          className="card mb-3"
          maxWidth="26rem"
          txtcolor="black"
          header="WELCOME"
          title="BANK SAFELY WITH DANIEL GUTIERREZ 2022"
          text="SECURE AND STUNNING."
          body={<img src="mylogo.png" className="img-fluid" alt="Logo" />}
        />
      </div>
    </div>
  );
}

export default Home;
