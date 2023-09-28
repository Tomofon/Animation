//esential modules from Matter.js
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

//options
const sceneHeight = 600;
const sceneWidth = 800;
const particleSize = 30;
const particleSpeed = 2;
const particleOptions = {
  restitution: 0.8,
  friction: 0.2,
  frictionAir: 0.0001,
};

function setup() {
    //Create Engine and Renderer
    let engine = Engine.create();
    engine.world.gravity.y = 0;
    let renderer = Render.create(
        {
            element: document.getElementById("areaToRender"),
            engine: engine,
            options: {
                width: 800,
                height: 600,
                wireframes: false
            }
        }
    )

    //create Elements
    let wallRight = Bodies.rectangle(sceneWidth, sceneHeight/2, 1, sceneHeight, {isStatic: true});
        wallLeft = Bodies.rectangle(1, sceneHeight/2, 1, sceneHeight, {isStatic: true});
        wallUp = Bodies.rectangle(sceneWidth/2, sceneHeight, sceneWidth, 1, {isStatic: true});
        wallDown = Bodies.rectangle(sceneWidth/2, 1, sceneWidth, 1, {isStatic: true});

    //add Elements to the world
    Composite.add(engine.world, [wallRight, wallLeft, wallUp, wallDown])

    //create particles
    for (let i = 0; i < 50; i++) {
        let particle = Bodies.circle(Math.random() * sceneWidth, Math.random() * sceneHeight, particleSize, particleOptions);
        const direction = Math.random() * Math.PI * 2;
        Matter.Body.setVelocity(particle, {
          x: Math.sin(direction) * particleSpeed,
          y: Math.cos(direction) * particleSpeed
        });
        Matter.Body.setInertia(particle, 10000);
        // add all of the bodies to the world
        Composite.add(engine.world, particle)
    }

    //Run engine and renderer
    Runner.run(engine);
    Render.run(renderer);
}

function addgravity() {
    engine.world.gravity.y = 1
}



