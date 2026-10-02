/* "Stage dust" — a three.js field of soft gold and lilac light, like dust
   caught in a spotlight. As you scroll down the page the camera flies
   forward through it (z), drifting sideways (x) and down (y); a mouse adds
   a little parallax. Framework-free: pass in the THREE namespace so the
   site (npm "three") and the artifact preview (CDN build) share this code.
   Returns stop() to dispose everything. */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Three = any;

export function startStageDust(THREE: Three, canvas: HTMLCanvasElement) {
  const small = window.innerWidth < 760;
  const COUNT = small ? 260 : 620;
  const DEPTH = 90;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 140);

  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);
  const palette = [new THREE.Color(0xd8b25c), new THREE.Color(0xd8b25c), new THREE.Color(0xc9a04a), new THREE.Color(0xb79ae8), new THREE.Color(0xf3eef8)];
  for (let i = 0; i < COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 26;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
    positions[i * 3 + 2] = 8 - Math.random() * DEPTH;
    const c = palette[(Math.random() * palette.length) | 0];
    colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  // soft round sprite
  const sprite = document.createElement("canvas");
  sprite.width = sprite.height = 64;
  const g = sprite.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.35, "rgba(255,255,255,0.55)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  const map = new THREE.CanvasTexture(sprite);

  const material = new THREE.PointsMaterial({
    size: small ? 0.2 : 0.16,
    map,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  let scrollP = 0;
  let velocity = 0;
  let mx = 0, my = 0, tx = 0, ty = 0;
  let raf = 0;
  let running = true;
  const t0 = performance.now();

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();

  function onPointer(e: PointerEvent) {
    if (e.pointerType !== "mouse") return;
    tx = (e.clientX / window.innerWidth - 0.5) * 2;
    ty = (e.clientY / window.innerHeight - 0.5) * 2;
  }
  function onVisibility() {
    running = !document.hidden;
    if (running) raf = requestAnimationFrame(frame);
  }
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", onPointer, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);

  function frame(now: number) {
    if (!running) return;
    const t = (now - t0) / 1000;
    mx += (tx - mx) * 0.04;
    my += (ty - my) * 0.04;
    // fly forward through the dust as the page scrolls; drift in x and y
    camera.position.z = 8 - scrollP * (DEPTH - 30);
    camera.position.x = Math.sin(scrollP * Math.PI * 2) * 2.2 + mx * 0.6;
    camera.position.y = -scrollP * 5 - my * 0.4;
    camera.rotation.z = Math.max(-0.08, Math.min(0.08, velocity * 0.004));
    points.rotation.y = Math.sin(t * 0.05) * 0.12;
    points.rotation.x = Math.cos(t * 0.04) * 0.05;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  return {
    /** progress 0..1 down the page, and scroll velocity in px/frame */
    setScroll(progress: number, v: number) {
      scrollP = progress;
      velocity = velocity * 0.85 + v * 0.15;
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose(); material.dispose(); map.dispose(); renderer.dispose();
    },
  };
}
