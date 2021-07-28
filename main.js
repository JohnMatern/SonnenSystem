//import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const scene = new THREE.Scene();
//Camera(field ov view, aspect Ratio(user window size), view frustrum(viewsize used from camera lens))
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.querySelector('#bg'),

});

//adjust renderers resolution to users device resolution
renderer.setPixelRatio(window.devicePixelRatio);
//set renderer size to screensize
renderer.setSize(window.innerWidth, window.innerHeight);
/* camera.position.setZ(-60);
camera.position.setX(30); */
// Render Scene 
renderer.render(scene, camera);


// set Lightning
const ambientLight = new THREE.AmbientLight(0xffffff,0.6);
//ambientLight.position.set(5,20,50);
scene.add(ambientLight);


//THREE helper Methods
/* const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(300, 50);
const cameraHelper = new THREE.CameraHelper(camera);
scene.add(lightHelper, gridHelper);
const gridHelper = new THREE.GridHelper(300, 50);
scene.add(gridHelper); */

//Orbit Controls
//const controls = new OrbitControls(camera, renderer.domElement);

// generate Star Elements
function addStar() {
  const geometry = new THREE.SphereGeometry(0.15, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color:0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(150));
  star.position.set(x,y,z);
  scene.add(star);
}

Array(500).fill().forEach(addStar);

// load background texture
import backURL from './assets/milkyway.jpg';
const backTexture = new THREE.TextureLoader().load(backURL);
scene.background = backTexture;

//Sun
import sunURL from './assets/sun.jpg';
const sunTexture = new THREE.TextureLoader().load(sunURL);
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(60,32,32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    roughness: 1.0,
  })
);

scene.add(sun);
sun.position.set(120,0,-500);

//Sun Pointlight
const sunLight = new THREE.PointLight(0xffb0ab,2);
sunLight.position.set(120,20,-500);
scene.add(sunLight);

//Mercury
import mercUrl from './assets/mercury.jpg';
const mercTexture = new THREE.TextureLoader().load(mercUrl);
const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(2.4,32,32),
  new THREE.MeshStandardMaterial({
    map: mercTexture,
  })
);
scene.add(mercury);
mercury.position.setX(0);
mercury.position.setZ(0);

//Venus
import venusURL from './assets/venus2.jpg';
const venusTexture = new THREE.TextureLoader().load(venusURL);
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(5.9,32,32),
  new THREE.MeshStandardMaterial({
    map: venusTexture,
  })
);
scene.add(venus);

venus.position.setX(5);
venus.position.setZ(15);

//Earth
import earthURL from './assets/earth.jpg';
import earthNormalURL from './assets/earthnormal.png';
import earthSpecularURL from './assets/earthspecular.png';

const earthTexture = new THREE.TextureLoader().load(earthURL);
const earthNormal = new THREE.TextureLoader().load(earthNormalURL);
const earthSpecular = new THREE.TextureLoader().load(earthSpecularURL);
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(6,32,32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: earthNormal,
    specularMap: earthSpecular,
  })
);

//Earth Clouds
import cloudURL from './assets/earthclouds.png';
const cloudTexture = new THREE.TextureLoader().load(cloudURL);
const clouds = new THREE.Mesh(
  new THREE.SphereGeometry(6.15, 32, 32),
  new THREE.MeshStandardMaterial({
    map: cloudTexture,
    transparent: true,
  })
);
scene.add(earth, clouds);

earth.position.setX(-15);
earth.position.setZ(30);
clouds.position.setX(-15);
clouds.position.setZ(30);

// Moon 
import moonURL from './assets/moon.jpg';
import moonNormalURL from './assets/moonnormal.jpg';

const moonTexture = new THREE.TextureLoader().load(moonURL);
const moonNormal = new THREE.TextureLoader().load(moonNormalURL);
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1.7,32,32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: moonNormal,
  })
);
const moonLight = new THREE.PointLight(0xffb0ab, 0.5, 100);
scene.add(moon, moonLight);
//moon.position.set(-35,0,60);
const lightHelper = new THREE.PointLightHelper(moonLight);
//scene.add(lightHelper);
//Moon lightning

//moonLight.position.set(-35,0,60);
//scene.add(moonLight);

//Mars
import marsURL from './assets/mars.jpg';
import marsNormalURL from './assets/reflections.png'
const marsTexture = new THREE.TextureLoader().load(marsURL);
const stoneRefMap = new THREE.TextureLoader().load(marsNormalURL);
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(3.3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
    normalMap: stoneRefMap,
  })
);

scene.add(mars);

mars.position.setX(5);
mars.position.setZ(45);

var r = 12; // Radius to middle of earth
var r2 = 14;
var theta = 0;
var dTheta = 2 * Math.PI / 1000;


function animate() {
  requestAnimationFrame(animate);
/*   torus.rotation.x += 0.001;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.001; */
  mars.rotation.y += 0.005;
  earth.rotation.y += 0.002;
  clouds.rotation.y += 0.0027;
  venus.rotation.y -= 0.003; // Venus rotates in Opposite direction!
  mercury.rotation.y += 0.003;
  moon.rotation.y += 0.002;
  sun.rotation.y += 0.004;
  sun.rotation.z += 0.002;
  //controls.update();

  //Math for Moon Orbit
         
  theta += dTheta;
  moon.position.x = -15 + r * Math.cos(theta);
  moon.position.z = 30 + r * Math.sin(theta);
  //Moving Pointlight to project earth shadow
  moonLight.position.x = -15 + r2 * Math.cos(theta);
  moonLight.position.z = 30 + r2 * Math.sin(theta);
  renderer.render(scene, camera);
}

animate();

function cameraScroll() {
  //get the clients Viewport
  const t = document.body.getBoundingClientRect().top;

  //move camera based on viewport distance to top
  camera.position.z = t * -0.01; //divide by negative due to scrolling down
  camera.position.x = t * -0.0001;
  camera.rotation.y = t * -0.00005;
}

document.body.onscroll = cameraScroll;

cameraScroll();


//Button Animation

const SUBMIT = document.querySelector('#submit');

const submitForm = ($event) => {
    if (!$event.target.classList.contains('active')) {
        $event.target.classList.add('active');
        setTimeout(() => {
            $event.target.classList.remove('active');
            $event.target.classList.add('done');
            $event.target.innerHTML = 'Abgeschickt';
            $event.target.disabled = true;
            document.getElementById('input').value='';
            document.getElementById('input').classList.add('done');
            document.getElementById('input').placeholder='Danke Dir!';
            document.getElementById('input').disabled=true;
        }, 1000); //Timeout funktion damit die Animation abgespielt werden kann bevor die Klasse geändert wird
    }
}

SUBMIT.addEventListener('click', submitForm);

