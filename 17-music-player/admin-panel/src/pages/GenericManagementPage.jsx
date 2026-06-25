import React from 'react';

const GenericManagementPage = ({ title, description }) => {
  return (
    <section>
      <h1>{title}</h1>
      <article className="panel">
        <p>{description}</p>
        <p>This screen is phase-ready and connected to the admin route map.</p>
      </article>
    </section>
  );
};

export default GenericManagementPage;
