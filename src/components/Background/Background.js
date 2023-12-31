import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Particle = ()=>{
    const particlesInit = async (main) => {
        console.log(main);
    
        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(main);
      };
    
    return(
        <Particles
        className="particle"
        id="tsparticles"
        init={particlesInit}
  
        options={{
          "fullScreen": {
              "enable": true,
              "zIndex": 1
          },
          "particles": {
              "number": {
                  "value": 30,
                  "density": {
                      "enable": true,
                      "value_area": 800
                  }
              },
              "color": {
                  "value": "#fff"
              },
              "shape": {
                  "type": "bubble",
                  "options": {
                      "sides": 5
                  }
              },
              "opacity": {
                  "value": 0.8,
                  "random": false,
                  "anim": {
                      "enable": false,
                      "speed": 1,
                      "opacity_min": 0.1,
                      "sync": false
                  }
              },
              "size": {
                  "value": 4,
                  "random": false,
                  "anim": {
                      "enable": false,
                      "speed": 40,
                      "size_min": 0.1,
                      "sync": false
                  }
              },
              "rotate": {
                  "value": 0,
                  "random": true,
                  "direction": "clockwise",
                  "animation": {
                      "enable": true,
                      "speed": 5,
                      "sync": false
                  }
              },
              "line_linked": {
                  "enable": true,
                  "distance": 600,
                  "color": "#ffffff",
                  "opacity": 0.4,
                  "width": 2
              },
              "move": {
                  "enable": true,
                  "speed": 2,
                  "direction": "none",
                  "random": false,
                  "straight": false,
                  "out_mode": "out",
                  "attract": {
                      "enable": false,
                      "rotateX": 600,
                      "rotateY": 1200
                  }
              }
          },
          "interactivity": {
              "events": {
                  "onhover": {
                      "enable": true,
                      "mode": ["grab"]
                  },
                  "onclick": {
                      "enable": false,
                      "mode": "bubble"
                  },
                  "resize": true
              },
              "modes": {
                  "grab": {
                      "distance": 400,
                      "line_linked": {
                          "opacity": 1
                      }
                  },
                  "bubble": {
                      "distance": 400,
                      "size": 40,
                      "duration": 2,
                      "opacity": 8,
                      "speed": 3
                  },
                  "repulse": {
                      "distance": 200
                  },
                  "push": {
                      "particles_nb": 4
                  },
                  "remove": {
                      "particles_nb": 2
                  }
              }
          },
          "retina_detect": true,
        //  background: linear-gradient(90deg,rgba(2,0,36,1) 0%,rgba(9,75,121,1) 35%,rgba(0,212,255,1) 100%);
        "background": {
                  "color": "#FF5EDF #04C8DE",
                  "image": "",
                  "position": "0% 100%",
                  "repeat": "no-repeat",
                  "size": "cover",
                  "rotate":"89deg"
              }
      }}
      />
    )
}
export default Particle