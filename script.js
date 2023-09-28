

let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
Bodies = Matter.Bodies,
Composite = Matter.Composite,
Composites = Matter.Composites,
Constraint = Matter.Constraint,
Mouse = Matter.Mouse,
MouseConstraint = Matter.MouseConstraint,
Events = Matter.Events;

let engine;
let render;
let runner;
let wallDown;
let wallRight;
let wallLeft;
let wallUp;

const sceneHeight = 500;
const sceneWidth = 800;
const particleSize = 30;
const particleSpeed = 2;
const particleOptions = {
  restitution: 0.8,
  friction: 0.2,
  frictionAir: 0.0001,
};

function init() {
  setup();
} 

function setup() {
    // create an engine
    engine = Engine.create();
    engine.world.gravity.y = 0;

   

    // create a renderer
    render = Render.create({
    element: document.getElementById("areaToRender"),
    engine: engine,
    options: {
    width: 800,
    height: 600,
    pixelRatio: 1,
    background: '#fafafa',
    wireframes: false // <-- important
    }
    });
   
    // run the renderer
    Render.run(render);
   
    // create runner
    runner = Runner.create();
   
    // run the engine
    Runner.run(runner, engine);

    //add mouse constrait
    Composite.add(engine.world, [mouseConstraint]);
    Engine.update(engine);
   }

function simulation() {
    // add mouse control
    let mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
        stiffness: 0.6,
        render: {
        visible: false
      }
 }
 });
    // create particles;

    for (let i = 0; i < 50; i++) {
      let particle = Bodies.circle(Math.random() * sceneWidth, Math.random() * sceneHeight, particleSize, particleOptions);
      const direction = Math.random() * Math.PI * 2;
      Matter.Body.setVelocity(particle, {
        x: Math.sin(direction) * particleSpeed,
        y: Math.cos(direction) * particleSpeed
      });
      Matter.Body.setInertia(particle, 10000);
      // add all of the bodies to the world
      Composite.add(engine.world, [particle, mouseConstraint]);
      Engine.update(engine);
    }
   }

function createWalls() {
  wallRight = Bodies.rectangle(sceneWidth, sceneHeight/2, 1, sceneHeight, {isStatic: true});
  wallLeft = Bodies.rectangle(1, sceneHeight/2, 1, sceneHeight, {isStatic: true});
  wallUp = Bodies.rectangle(sceneWidth/2, sceneHeight, sceneWidth, 1, {isStatic: true});
  wallDown = Bodies.rectangle(sceneWidth/2, 1, sceneWidth, 1, {isStatic: true});

  Composite.add(engine.world, [wallDown, wallLeft, wallRight, wallUp]);
  Engine.update(engine);
}

function activateGravity() {
  engine.world.gravity.y = 1;
}



function secondStage() {
  Composite.remove(engine.world, wallDown);
  Engine.update(engine);
}



