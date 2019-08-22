import axios from 'axios';
import { Utils } from './utils';
import { Manager, Pinch, Rotate } from 'hammerjs';
import { Engine, World, Render, Body, Bodies, Runner, Constraint, Composites, MouseConstraint } from 'matter-js';


// The window.app is a global pointer to the singleton of this class.

export class MainApp {

    engine: Engine;
    world: World;
    runner: Runner;
    render: Render;
    canvas: HTMLCanvasElement;

    boot() {
        this.createCanvas();
        this.setupEngine();
        this.setupControl();
    }

    setupControl() {
        var myElement = document.getElementById('physics');

        var mc = new Manager(myElement);

        // create a pinch and rotate recognizer
        // these require 2 pointers
        var pinch = new Pinch();
        var rotate = new Rotate();

        // we want to detect both the same time
        pinch.recognizeWith(rotate);

        // add to the Manager
        mc.add([pinch, rotate]);


        mc.on("pinch rotate", function(ev) {
            console.log(ev.type);
        });
    }

    setupEngine() {
        // You are supposed to call Engine.create with an object that has a 
        //property render that has properties element and canvas. If y

        // create engine
        this.engine = Engine.create();
        
        this.world = this.engine.world;

        //add a mouse-controlled constraint
        var mouseConstraint = MouseConstraint.create(this.engine);
        World.add(this.world, mouseConstraint);

        // create a load of circle bodies
        var stack = Composites.stack(250, 5, 12, 2, 0, 0, (x: number, y: number, column: number, row: number) => {
            return Bodies.circle(x, y, random(5, 15), { friction: .001, restitution: .1, density: 5.5 });
        });

        // add boundaries
        var offset = 5;
        World.add(this.world, [
            Bodies.rectangle(400, -offset, 800 + 2 * offset, 50, { isStatic: true }),
            Bodies.rectangle(400, 600 + offset, 800 + 2 * offset, 50, { isStatic: true }),
            Bodies.rectangle(800 + offset, 300, 50, 600 + 2 * offset, { isStatic: true }),
            Bodies.rectangle(-offset, 300, 50, 600 + 2 * offset, { isStatic: true })
        ]);

        // add all of the bodies to the world
        World.add(this.world, stack);

        

        // create renderer
        this.render = Render.create({
            element: document.body,
            engine: this.engine,
            options: {
                hasBounds: true,
                wireframes: false,
                width: this.canvas.width,
                height: this.canvas.height                
            },
            canvas: this.canvas,
        });

        Render.run(this.render);

        this.runner = Runner.create(null);
        Runner.run(this.runner, this.engine);
    }

    createCanvas() {
        this.canvas = <any> document.getElementById('physics');
        this.setCanvasSize();
        window.addEventListener('resize', () => { this.setCanvasSize(); });
    }

    setCanvasSize() {
        this.canvas.width = window.innerWidth - 4;
        this.canvas.height = window.innerHeight - 5;
    }

    onMouseDown(e:MouseEvent) {
        console.log('mouse down ',e);
    }
    onMouseMove(e:MouseEvent) {
        if (e.buttons > 0)
        console.log('drag ',e.buttons);
    }
    onClick(e:MouseEvent) {
        console.log('click ',e);
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
    ((<any>window).app = new MainApp()).boot();
}
