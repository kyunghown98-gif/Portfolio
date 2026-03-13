import React from 'react';
import UnicornScene from 'unicornstudio-react';
import '../css/intro.css';

const Intro = () => {
  return (
    <div className="intro-container intro-scene">
      <div className="unicorn-wrapper">
        <UnicornScene
          projectId="LYxUbGOhuz5TEex4AMej"
          width="100%"
          height="100%"
          scale={1}
          dpi={1}
        />
      </div>
      <div className="grid-bg"></div>
    </div>
  );
};

export default Intro;