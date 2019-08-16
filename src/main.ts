import axios from 'axios';
import { Utils } from './utils';
import { Engine, World, Render, Body, Bodies, Runner, Common, Constraint, Composites, MouseConstraint } from 'matter-js';


// The window.app is a global pointer to the singleton of this class.

export class MainApp {

    boot() {
        console.log('Hello world!');

        // create engine
        var engine = Engine.create();

        // gravity init
        engine.world.gravity.x = +document.getElementById("x-val").innerHTML;
        engine.world.gravity.y = +document.getElementById("y-val").innerHTML;

        //add a mouse-controlled constraint
        var mouseConstraint = MouseConstraint.create(engine);
        World.add(engine.world, mouseConstraint);

        // create a load of circle bodies
        var stack = Composites.stack(250, 5, 12, 20, 0, 0, function (x: number, y: number, column: number, row: number) {
            return Bodies.circle(x, y, random(5, 15), { friction: .001, restitution: .1, density: 5.5 });
        });

        // add boundaries
        var offset = 5;
        World.add(engine.world, [
            Bodies.rectangle(400, -offset, 800 + 2 * offset, 50, { isStatic: true }),
            Bodies.rectangle(400, 600 + offset, 800 + 2 * offset, 50, { isStatic: true }),
            Bodies.rectangle(800 + offset, 300, 50, 600 + 2 * offset, { isStatic: true }),
            Bodies.rectangle(-offset, 300, 50, 600 + 2 * offset, { isStatic: true })
        ]);

        // add all of the bodies to the world
        World.add(engine.world, stack);

        var x = Common.random();

        // create renderer
        var render = Render.create({
            element: document.body,
            engine: engine,
            options: {
                showVelocity: false,
                wireframes: false
            }
        });

        Render.run(render);

        var runner = Runner.create();
        Runner.run(runner, engine);
    }


}

function random(a:number, b: number) {
    return Math.floor(Math.random() * (b - a)) + a;
}

//********************************************************************
// MAIN ENTRY POINT
// The window will exist in a browser, but will not exist in headless mode (such as jasmine)
//********************************************************************
if (typeof window !== 'undefined') {
    new MainApp().boot();
}