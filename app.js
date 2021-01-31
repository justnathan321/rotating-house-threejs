//Variables for setup
let container;
let camera;
let renderer;
let scene;
let house;

function init(){
    container = document.querySelector('.scene');

    //Create scene
    scene = new THREE.Scene();

    //field of view
    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    
    //Mirror clipping
    const near = 0.1;
    const far = 500;

    //Camera setup
    camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
    //x,y,z positions of camera
    camera.position.set(-8,25,200);

    //Lightning
    const ambient = new THREE.AmbientLight(0x404040,3);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff,1);
    light.position.set(10,10,30);
    scene.add(light);


    //Renderer
    renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    //Load model
    let loader = new THREE.GLTFLoader();
    loader.load('./3d/scene.gltf', function(gltf){
        scene.add(gltf.scene);
        house = gltf.scene.children[0];
        animate();
    });
}

//Animate the 3d object
function animate(){
    requestAnimationFrame(animate);
    house.rotation.z += 0.005;
    renderer.render(scene,camera);
}

init();
