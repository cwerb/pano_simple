function get_texture(type,x,y) {
    return "static/pano/"+type+"/"+x+"_"+y+"_test.jpg";
}

$(function(){

    var PANO_WIDTH = 2048;
    var PANO_HEIGHT = PANO_WIDTH;
    var TILES_SIZE=512;
    var NEED_TILES_COUNT=PANO_WIDTH/TILES_SIZE;

    var FOV = 35;
    var TO_SCENE_DISTANCE = document.body.clientWidth/(Math.tan( Math.PI * FOV/360));
    var CAMERA_DIST= TILES_SIZE*NEED_TILES_COUNT/2; //(PANO_WIDTH*TO_SCENE_DISTANCE/document.body.clientWidth)/(Math.sqrt(NEED_TILES_COUNT)*2);

    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(document.body.clientWidth, document.body.clientHeight);

    document.body.appendChild(renderer.domElement);

    renderer.setClearColorHex(0xEEEEEE, 1.0);
    renderer.clear();

    var fov = FOV; // угол обзора камеры
    var width = renderer.domElement.width; // ширина сцены
    var height = renderer.domElement.height; // высота сцены
    var aspect = width / height; // соотношение сторон экрана
    var near = 1; // минимальная видимость
    var far = CAMERA_DIST*4; // максимальная видимость

    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.z = 0
    camera.position.x = 0;
    camera.position.y = 0;

    camera.lookAt({
        x: Math.sin(45/180),
        y: 0,
        z: Math.cos(45/180)
    });

    var scene = new THREE.Scene();

    var light = new THREE.AmbientLight( 0xffffff); // soft white light
    scene.add( light );


    function build_cube() {
        var x,y;
        var y_tiles = PANO_HEIGHT/TILES_SIZE;
        // front
        for (x=0;x<NEED_TILES_COUNT;x++) {
            for (y=0;y<y_tiles;y++) {

                // material
                var material = new THREE.MeshLambertMaterial({
                    map: THREE.ImageUtils.loadTexture( get_texture('front',x,y_tiles-y-1),new THREE.UVMapping(),function(){
                    renderer.render(scene, camera);
                    })
                });

                var planeGeo = new THREE.PlaneGeometry(TILES_SIZE, TILES_SIZE, 1, 1);
                var planeMat = new THREE.MeshLambertMaterial(material);
                var plane = new THREE.Mesh(planeGeo, planeMat);
                plane.position.x=x*TILES_SIZE+TILES_SIZE/2 - TILES_SIZE*NEED_TILES_COUNT/2;
                plane.position.y=y*TILES_SIZE+TILES_SIZE/2 - TILES_SIZE*y_tiles/2;
                plane.position.z=-TILES_SIZE*NEED_TILES_COUNT/2;
                scene.add(plane);
            }
        }

        // right
        for (x=0;x<NEED_TILES_COUNT;x++) {
            for (y=0;y<y_tiles;y++) {

                // material
                var material = new THREE.MeshLambertMaterial({
                    map: THREE.ImageUtils.loadTexture( get_texture('right',x,y_tiles-y-1) ,new THREE.UVMapping(),function(){
                        renderer.render(scene, camera);
                    })
                });

                var planeGeo = new THREE.PlaneGeometry(TILES_SIZE, TILES_SIZE, 1, 1);
                var planeMat = new THREE.MeshLambertMaterial(material);
                var plane = new THREE.Mesh(planeGeo, planeMat);
                plane.position.z=x*TILES_SIZE+TILES_SIZE/2 - TILES_SIZE*NEED_TILES_COUNT/2;
                plane.position.y=y*TILES_SIZE+TILES_SIZE/2 - TILES_SIZE*y_tiles/2;
                plane.position.x=TILES_SIZE*NEED_TILES_COUNT/2;
                plane.rotation.y = -Math.PI/2;
                scene.add(plane);
            }
        }

        // left
        for (x=0;x<NEED_TILES_COUNT;x++) {
            for (y=0;y<y_tiles;y++) {

                // material
                var material = new THREE.MeshLambertMaterial({
                    map: THREE.ImageUtils.loadTexture( get_texture('left',NEED_TILES_COUNT-x-1,y_tiles-y-1),new THREE.UVMapping(),function(){
                        renderer.render(scene, camera);
                    })
                });

                var planeGeo = new THREE.PlaneGeometry(TILES_SIZE, TILES_SIZE, 1, 1);
                var planeMat = new THREE.MeshLambertMaterial(material);
                var plane = new THREE.Mesh(planeGeo, planeMat);
                plane.position.z=x*TILES_SIZE+TILES_SIZE/2 - TILES_SIZE*NEED_TILES_COUNT/2;
                plane.position.y=y*TILES_SIZE+TILES_SIZE/2 - TILES_SIZE*y_tiles/2;
                plane.position.x=-TILES_SIZE*NEED_TILES_COUNT/2;
                plane.rotation.y = Math.PI/2;
                scene.add(plane);
            }
        }

        // back
        for (x=0;x<NEED_TILES_COUNT;x++) {
            for (y=0;y<y_tiles;y++) {

                // material
                var material = new THREE.MeshLambertMaterial({
                    map: THREE.ImageUtils.loadTexture( get_texture('back',NEED_TILES_COUNT-x-1,y_tiles-y-1) ,new THREE.UVMapping(),function(){
                        renderer.render(scene, camera);
                    })
                });

                var planeGeo = new THREE.PlaneGeometry(TILES_SIZE, TILES_SIZE, 1, 1);
                var planeMat = new THREE.MeshLambertMaterial(material);
                var plane = new THREE.Mesh(planeGeo, planeMat);
                plane.position.x=x*TILES_SIZE+TILES_SIZE/2 - TILES_SIZE*NEED_TILES_COUNT/2;
                plane.position.y=y*TILES_SIZE+TILES_SIZE/2 - TILES_SIZE*y_tiles/2;
                plane.position.z=TILES_SIZE*NEED_TILES_COUNT/2;
                plane.rotation.y = -Math.PI;
                scene.add(plane);
            }
        }

        // top
        for (x=0;x<NEED_TILES_COUNT;x++) {
            for (y=0;y<NEED_TILES_COUNT;y++) {

                // material
                var material = new THREE.MeshLambertMaterial({
                    map: THREE.ImageUtils.loadTexture( get_texture('top',x,NEED_TILES_COUNT-y-1) ,new THREE.UVMapping(),function(){
                        renderer.render(scene, camera);
                    })
                });

                var planeGeo = new THREE.PlaneGeometry(TILES_SIZE, TILES_SIZE, 1, 1);
                var planeMat = new THREE.MeshLambertMaterial(material);
                var plane = new THREE.Mesh(planeGeo, planeMat);
                plane.position.x=x*TILES_SIZE+TILES_SIZE/2 - TILES_SIZE*NEED_TILES_COUNT/2;
                plane.position.z=y*TILES_SIZE+TILES_SIZE/2 - TILES_SIZE*y_tiles/2;
                plane.position.y=TILES_SIZE*NEED_TILES_COUNT/2;
                plane.rotation.x = Math.PI/2;
                scene.add(plane);
            }
        }

        // bottom
        for (x=0;x<NEED_TILES_COUNT;x++) {
            for (y=0;y<NEED_TILES_COUNT;y++) {

                // material
                var material = new THREE.MeshLambertMaterial({
                    map: THREE.ImageUtils.loadTexture( get_texture('bottom',NEED_TILES_COUNT-x-1,NEED_TILES_COUNT-y-1) ,new THREE.UVMapping(),function(){
                        renderer.render(scene, camera);
                    })
                });

                var planeGeo = new THREE.PlaneGeometry(TILES_SIZE, TILES_SIZE, 1, 1);
                var planeMat = new THREE.MeshLambertMaterial(material);
                var plane = new THREE.Mesh(planeGeo, planeMat);
                plane.position.x=-x*TILES_SIZE-TILES_SIZE/2 + TILES_SIZE*NEED_TILES_COUNT/2;
                plane.position.z=-y*TILES_SIZE-TILES_SIZE/2 + TILES_SIZE*y_tiles/2;
                plane.position.y=-TILES_SIZE*NEED_TILES_COUNT/2;
                plane.rotation.x = -Math.PI/2;
                //plane.rotation.z = Math.PI+0.1;
                scene.add(plane);
            }
        }
    }
    build_cube();

    (function(){
        return false;
        function v(x,y,z){
            return new THREE.Vertex(new THREE.Vector3(x,y,z));
        }

        var lineGeo = new THREE.Geometry();
        lineGeo.vertices.push(
            v(-CAMERA_DIST*2, 0, 0), v(CAMERA_DIST*2, 0, 0),
            v(0, -CAMERA_DIST*2, 0), v(0, CAMERA_DIST*2, 0),
            v(0, 0, -CAMERA_DIST*2), v(0, 0, CAMERA_DIST*2)
        );
        var lineMat = new THREE.LineBasicMaterial({
            color: 0x000000, lineWidth: 1});
        var line = new THREE.Line(lineGeo, lineMat);
        line.type = THREE.Lines;
        scene.add(line);
    })();

    renderer.render(scene, camera);

    (function(){
        var ang = 45;
        var vert_ang=0;
        var ang_delta=5;

        $('body').keydown(function(e) {

            var dy=0;
            var dx=0;
            if (e.keyCode == 38 ) {
                vert_ang=vert_ang+ang_delta;
                rotate_cam();
            }

            if (e.keyCode == 40 ) {
                vert_ang=vert_ang-ang_delta;
                rotate_cam();
            }

            if (e.keyCode == 37 ) {
                ang = ang + ang_delta;
                rotate_cam();
            }

            if (e.keyCode == 39 ) {
                ang = ang - ang_delta;
                rotate_cam();
            }


        });


        function rotate_cam() {
            camera.lookAt({
                x:Math.sin(ang/180),
                y:Math.sin(vert_ang/180),
                z:Math.cos(ang/180)
            });

            renderer.render(scene, camera);
        }
    })();

});