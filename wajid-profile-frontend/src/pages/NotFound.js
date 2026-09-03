import React from 'react';
import { Link } from 'react-router-dom';
import StarField from '../components/StarField';
import NebulaOrbs from '../components/NebulaOrbs';

export default function NotFound() {
  return (
    <>
      <StarField />
      <NebulaOrbs />
      <main className="notfound-wrap">
        <p className="notfound-code">404</p>
        <h1 className="notfound-title">Lost in Space</h1>
        <p className="notfound-text">
          This coordinate doesn't exist in the known universe.
          The page may have drifted into a black hole.
        </p>
        <Link to="/" className="btn-primary">← Return to Base</Link>
      </main>
    </>
  );
}
