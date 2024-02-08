import React from 'react';

export default function About() {
  return (
    <div className="homepage-container" style={{ textAlign: 'center', padding: '20px' }}>
      <h1 style={{ fontSize: '2em', marginBottom: '10px' }}>Sobre Nosotros</h1>
      <p style={{ fontSize: '1.2em', margin: 'auto', maxWidth: '600px' }}>
        ¡Bienvenido a nuestro proyecto de programación web! 
      </p>
      <p style={{ fontSize: '1.2em', margin: 'auto' }}>
        En este espacio, exploramos las últimas noticias, tendencias y tecnologías en el mundo de la programación web. Nos esforzamos por brindar contenido valioso y educativo para la comunidad de desarrolladores, desde principiantes hasta expertos.
      </p>
      <p style={{ fontSize: '1.2em' }}>
        Gracias por ser parte de nuestra comunidad. ¡Esperamos que disfrutes explorando el fascinante mundo de la programación web con nosotros!
      </p>
    </div>
  );
}

