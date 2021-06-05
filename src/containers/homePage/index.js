import "./home.scss";
import Header from "../../components/header/header";

import React from "react";

function Home() {
  return (
    <section className="page">
      <Header title="Accueil" />
      <div className="content">Section acceuil</div>
    </section>
  );
}

export default Home;
