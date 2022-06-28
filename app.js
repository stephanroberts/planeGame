import * as THREE from './lib/three.module.js';
import { OrbitControls } from './lib/OrbitControls.js';

class App {
    constructor() {
        const container = document.createElement('div');
        document.body.appendChild(container);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
        this.camera.position.set(0, 0, 0);

        this.scene.background = new THREE.Color(0x54BAB9);

        const ambient = new THREE.HemisphereLight( 0xF7ECDE, 0x54BAB9, 0.3 );
        this.scene.add(ambient);

        const light = new THREE.DirectionalLight();

        light.position.set(0.2, 1, 1);
        this.scene.add(light);

        this.renderer = new THREE.WebGLRenderer( { antialias: true});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(this.renderer.domElement);

        const geometry = new THREE.BoxGeometry();
        // const geometry = this.createStarGeometry();
        // const material = new THREE.MeshBasicMaterial({color: 0x18978F});
        // const material = new THREE.MeshStandardMaterial({color: 0x18978F});
        const material = new THREE.MeshPhongMaterial({color: 0x18978F, specular: 0xE9DAC1, shininess: 60});

        // standart Material braucht Licht. Basic Material wird auch ohne Licht angezeigt.
        this.cube = new THREE.Mesh( geometry, material);

        this.scene.add( this.cube );

        const controls = new OrbitControls(this.camera, this.renderer.domElement)

        this.camera.position.z = 5;

        this.renderer.setAnimationLoop(this.render.bind(this));

        window.addEventListener('resize', this.resize.bind(this));
    }

    createStarGeometry(innerRadius= 0.4, outerRadius=0.8, points=5) {
        const shape = new THREE.Shape();
        const PI2 = Math.PI * 2;
        const inc = PI2/(points*2);
        shape.moveTo(outerRadius, 0);
        let inner = true;
        for(let theata=inc; theata<PI2; theata += inc) {
            const radius = (inner) ? innerRadius : outerRadius;
            shape.lineTo(Math.cos(theata) * radius, Math.sin(theata) * radius);
            inner = !inner;
        }
        const extrudeSettings = {
            steps: 1,
            depth: 1,
            bevelEnabled: false,
        }

        return new THREE.ExtrudeGeometry(shape, extrudeSettings);
    }

    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    render() {
        this.cube.rotateY(0.01);
        this.cube.rotateX(0.01);
        // this.cube.rotation.x += 0.01;
        // this.cube.rotation.y += 0.01;
        this.renderer.render( this.scene, this.camera);
    }
}

export {App};