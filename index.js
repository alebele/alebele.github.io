import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

//creating a renderer
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//creating a scene to add all elements
const scene = new THREE.Scene();

//loading the astronaut, the space rocket, the robotR2, and baby Ioda
const loader = new GLTFLoader();
let cute_astronaut;
let space_rocket2;
let robotR2;
let baby_ioda;

loader.load('./assets/cute_astronaut.glb',function(glb){
    console.log(glb)
    cute_astronaut = glb.scene;
    cute_astronaut.scale.set(4, 4, 4)
    cute_astronaut.position.x += 75
    cute_astronaut.position.y -= 20
    cute_astronaut.position.z -= 120
  
    cute_astronaut.castShadow = true;
    cute_astronaut.receiveShadow = true;

    scene.add(cute_astronaut);
}, function(xhr){
    console.log((xhr.loaded/xhr.total*100) + "% loaded")
}, function(error){
    console.log('An error occurred')
});

loader.load('./assets/space_rocket2.glb',function(glb){
  console.log(glb)
  space_rocket2 = glb.scene;
  space_rocket2.scale.set(1, 1, 1)
  space_rocket2.position.x += 55
  space_rocket2.position.y -= 40
  space_rocket2.position.z -= 100

  space_rocket2.castShadow = true;
  space_rocket2.receiveShadow = true;

  scene.add(space_rocket2);
}, function(xhr){
  console.log((xhr.loaded/xhr.total*100) + "% loaded")
}, function(error){
  console.log('An error occurred')
});

loader.load('./assets/robotR2.glb',function(glb){
  console.log(glb)
  robotR2 = glb.scene;
  robotR2.scale.set(0.03, 0.03, 0.03)
  robotR2.position.x += 75
  robotR2.position.y -= 20
  robotR2.position.z -= 120

  robotR2.castShadow = true;
  robotR2.receiveShadow = true;

  scene.add(robotR2);
}, function(xhr){
  console.log((xhr.loaded/xhr.total*100) + "% loaded")
}, function(error){
  console.log('An error occurred')
});

loader.load('./assets/baby_ioda.glb',function(glb){
  console.log(glb)
  baby_ioda = glb.scene;
  baby_ioda.scale.set(20, 20, 20)
  baby_ioda.position.x += 55
  baby_ioda.position.y -= 40
  baby_ioda.position.z -= 100

  baby_ioda.castShadow = true;
  baby_ioda.receiveShadow = true;

  scene.add(baby_ioda);
}, function(xhr){
  console.log((xhr.loaded/xhr.total*100) + "% loaded")
}, function(error){
  console.log('An error occurred')
});

//get the audio element
const backgroundMusic = document.getElementById('background-music');

//play the background music
backgroundMusic.play();

//pause the background music
backgroundMusic.pause();

//creating a camera instance
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,1000
);

//setting up texture loader
const cubeTextureLoader = new THREE.CubeTextureLoader();
const texture = cubeTextureLoader.load([
  './assets/background.jpg',
  './assets/background.jpg',
  './assets/background.jpg',
  './assets/background.jpg',
  './assets/background.jpg',
  './assets/background.jpg'
]);
scene.background = texture;

//setting up orbit control
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-90, 140, 140);
orbit.update();

//create a new HemisphereLight
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
scene.add(hemisphereLight);

//loading planets
const textureload = new THREE.TextureLoader();

//sun
const sunGeo = new THREE.SphereGeometry(12, 25, 20);
const sunMat = new THREE.MeshBasicMaterial({
  map:textureload.load('./assets/sun.jpg')
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

//adding point light
const pointLight = new THREE.PointLight(0xffffff , 2 , 500);
scene.add(pointLight);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-200, -200, 100); 
scene.add(light);

//loading another planets
function createPlanet(size, texture,position, ring){
    const geometry = new THREE.SphereGeometry(size, 25, 20);
    const material = new THREE.MeshStandardMaterial({
      map:textureload.load(texture)
    });
    const planet = new THREE.Mesh(geometry, material);
    const planetObj = new THREE.Object3D;
    planetObj.add(planet);
    scene.add(planetObj);
    planet.position.x = position;

    if(ring)
{
  const RingGeo = new THREE.RingGeometry(
    ring.innerRadius,
    ring.outerRadius, 30
  );
  const RingMat = new THREE.MeshStandardMaterial({
    map:textureload.load(ring.texture),
    side : THREE.DoubleSide
  });
  const Ring = new THREE.Mesh(RingGeo, RingMat);
  planetObj.add(Ring);

  Ring.position.x = position;
  Ring.rotation.x = -0.5 *Math.PI;
}
return {planet, planetObj};
}

const mercury = new createPlanet(4,'./assets/mercury.jpg',20);
const venus = new createPlanet(5,'./assets/venus.jpg',40);
const earth = new createPlanet(5.56,'./assets/earth.jpg',60);
const mars = new createPlanet(5,'./assets/mars.jpg',80);
const jupiter = new createPlanet(6,'./assets/jupiter.jpg',100);
const saturn = new createPlanet(8,'./assets/saturn.jpg',150,{
  innerRadius: 10,
  outerRadius: 20,
  texture: './assets/saturn ring.png'
});
const uranus = new createPlanet(8.2,'./assets/uranus.jpg',200,{
  innerRadius: 10,
  outerRadius: 20,
  texture: './assets/uranus ring.png'
});
const neptune = new createPlanet(5,'./assets/neptune.jpg',240);

let angle = 0; 
let radius = 70; 
let speed = 0.01;

const newtexture = new THREE.TextureLoader().load('assets/img2.jpg');
newtexture.wrapS = THREE.RepeatWrapping;
newtexture.wrapT = THREE.RepeatWrapping;
newtexture.repeat.set(1, 1);

//create a large sphere to surround the elements
const surroundingSphereGeo = new THREE.SphereGeometry(300, 50, 50);
const surroundingSphereMat = new THREE.MeshBasicMaterial({
  map: newtexture,
  side: THREE.DoubleSide,
  // color: 0xffffff,
  // transparent: true,
  // opacity: 0.5
});
const surroundingSphere = new THREE.Mesh(surroundingSphereGeo, surroundingSphereMat);
scene.add(surroundingSphere);

//set the position of the surrounding sphere to the center of the scene
surroundingSphere.position.set(0, 0, 0);

function animate(){
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const y = 0; 

  //set the new position and rotation to the astronaut
  if(cute_astronaut){
      cute_astronaut.position.set(x, y, z);
      cute_astronaut.rotation.y = -angle;
  }

  const x2 = -Math.cos(angle) * radius;
  const z2 = -Math.sin(angle) * radius;
  const y2 = 0; 

  //set the new position and rotation to the space rocket
  if(space_rocket2){
    space_rocket2.position.set(x2+30, y2+30, z2+30);
    space_rocket2.rotation.y = -angle;
  }

  const x3 = Math.cos(angle) * radius;
  const z3 = -Math.sin(angle) * radius;
  const y3 = -Math.sin(angle) * radius; 

  //set the new position and rotation to the robotR2
  if(robotR2){
    robotR2.position.set(x3+10, y3+10, z3+10);
    robotR2.rotation.y = -angle;
  }

  const x4 = -Math.cos(angle) * radius;
  const z4 = Math.sin(angle) * radius;
  const y4 = 0; 

  //set the new position and rotation to the baby Ioda
  if(baby_ioda){
    baby_ioda.position.set(x3+20, y3+20, z3+20);
    baby_ioda.rotation.y = -angle;
  }
    
  //increment the angle
  angle += speed;

  //calculate the position and rotation of the robotR2
  const robotR2Position = robotR2 ? robotR2.position.clone() : new THREE.Vector3();
  const robotR2Rotation = robotR2 ? robotR2.rotation.clone() : new THREE.Euler();

  //update the position and rotation of the baby_ioda
  if (baby_ioda) {
    //move the baby_ioda in the opposite direction of the robotR2
    baby_ioda.position.copy(robotR2Position).multiplyScalar(-1);

    //set the rotation of the baby_ioda to the opposite of the robotR2's rotation
    baby_ioda.rotation.set(-robotR2Rotation.x, -robotR2Rotation.y, -robotR2Rotation.z);
  }
  
  sun.rotateY(0.002);
  mercury.planet.rotateY(0.001);
  mercury.planetObj.rotateY(0.001);
  venus.planet.rotateY(0.0012);
  venus.planetObj.rotateY(0.0015);
  earth.planet.rotateY(0.012);
  earth.planetObj.rotateY(0.0012);
  mars.planet.rotateY(0.013);
  mars.planetObj.rotateY(0.0019);
  jupiter.planet.rotateY(0.04);
  jupiter.planetObj.rotateY(0.0023);
  saturn.planet.rotateY(0.01);
  saturn.planetObj.rotateY(0.0021);
  uranus.planet.rotateY(0.01);
  uranus.planetObj.rotateY(0.0015);
  neptune.planet.rotateY(0.01);
  neptune.planetObj.rotateY(0.001);
  surroundingSphere.rotateY(0.005);

  renderer.render(scene, camera);

}
renderer.setAnimationLoop(animate);

//setting window size
window.addEventListener('resize', function(){
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
});