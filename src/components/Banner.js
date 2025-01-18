
import React from "react";
import "./Banner.css";

const Banner = () => {
  return (
    <section className="banner">
      <div className="banner__content">
        <div className="banner__badge">Front End</div>
        <h1 className="banner__title">Challenge React</h1>
        <p className="banner__description">
          Este challenge es una forma de aprendizaje. Es un mecanismo donde podrás comprometerte en la resolución de un problema para poder aplicar todos los conocimientos adquiridos en la formación React.
        </p>
      </div>
      <div className="banner__image">
        <iframe
          src="https://www.youtube.com/embed/ov7vA5HFe6w"
          title="Video destacado: ¿Qué significa pensar como programador?"
          className="banner__video"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          alt ="Un video de Youtube sobre programación"
        ></iframe>
      </div>
    </section>
  );
};

export default Banner;
