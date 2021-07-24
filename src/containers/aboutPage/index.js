import "./about.scss";
import Header from "../../components/header/header";
import "./style.js";

function About() {
  return (
    <section className="page">
      <Header title="A propos" />
      <section className="content">La section About</section>
    </section>
  );
}

export default About;
