function threeAnimation() {
// Pobieranie elementu canvas
var canvas = document.getElementById('roller');

// Inicjalizacja sceny
var scene = new THREE.Scene();

// Inicjalizacja kamery
var camera = new THREE.PerspectiveCamera(15, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
camera.position.z = 25;

// Inicjalizacja renderera z przeźroczystym tłem
var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
renderer.setClearAlpha(0); // Ustawienie przezroczystego tła

// Tworzenie walca
var geometry = new THREE.CylinderGeometry(2, 2, 5, 32);
var material = new THREE.MeshPhongMaterial({ color: 0x111111 });
var cylinder = new THREE.Mesh(geometry, material);
scene.add(cylinder);

// Dodawanie świateł
var light1 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(-1, 1, 1); // Światło z lewej góry
scene.add(light1);

var light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(1, 1, 1); // Światło z prawej góry
scene.add(light2);

var light3 = new THREE.DirectionalLight(0xffffff, 1);
light3.position.set(0, -1, 0); // Światło z dołu
scene.add(light3);

// Funkcja aktualizująca wymiary renderera i kamery
function updateSize() {
  var width = canvas.offsetWidth;
  var height = canvas.offsetHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);

  // Przesunięcie walca na skos
  // cylinder.rotation.x = Math.PI / 1; // Obrót o 45 stopni wzdłuż osi X
  cylinder.rotation.z = Math.PI / 4; // Obrót o 45 stopni wzdłuż osi Z
}

// Wywołanie funkcji aktualizującej wymiary przy zmianie rozmiaru ekranu
window.addEventListener('resize', updateSize);

// Zmienna przechowująca aktualną rotację walca
var rotation = { x: 0, y: 0 };

// Funkcja aktualizująca rotację walca na podstawie pozycji kursora
function updateRotation(event) {
  // Pobieranie pozycji kursora w zależności od rozmiarów canvasa
  var mouseX = event.clientX / canvas.offsetWidth;
  var mouseY = event.clientY / canvas.offsetHeight;

  // Obliczanie rotacji walca na podstawie pozycji kursora
  var targetRotationX = (mouseY - 0.5) * Math.PI * 0.5;
  var targetRotationY = (mouseX - 0.5) * Math.PI;

  // Używanie GSAP do płynnego obracania walca
  gsap.to(rotation, {
    x: targetRotationX,
    y: targetRotationY,
    duration: 1, // Zwiększamy czas trwania animacji
    ease: 'power2.easeOut', // Dostosowujemy krzywą animacji
    onUpdate: function () {
      // Aktualizacja rotacji walca
      cylinder.rotation.x = rotation.x;
      cylinder.rotation.y = rotation.y;
    }
  });
}

// Funkcja resetująca rotację walca do pozycji wyjściowej
function resetRotation() {
  // Używanie GSAP do płynnego resetowania rotacji walca
  gsap.to(rotation, {
    x: 0,
    y: 0,
    duration: 1, // Zwiększamy czas trwania animacji
    ease: 'power2.easeOut', // Dostosowujemy krzywą animacji
    onUpdate: function () {
      // Aktualizacja rotacji walca
      cylinder.rotation.x = rotation.x;
      cylinder.rotation.y = rotation.y;
    }
  });
}

// Dodawanie nasłuchiwania na ruch myszy
canvas.addEventListener('mousemove', updateRotation);
canvas.addEventListener('mouseout', resetRotation); // Dodanie obsługi zjechania myszą z obszaru walca

// Renderowanie sceny
function render() {
  requestAnimationFrame(render);

  renderer.render(scene, camera);
}

// Wywołanie funkcji renderującej
updateSize();
render();

}