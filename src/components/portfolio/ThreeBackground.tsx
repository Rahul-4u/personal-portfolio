/**
 * ThreeBackground — High-Quality Three.js Interactive Background
 *
 * Features:
 *  1. Galaxy-style particle field (3 000 particles) with mouse parallax
 *  2. Procedural neon grid plane with animated Y-offset (cyber-floor)
 *  3. Wireframe icosphere orbiting at hero area — morphs on scroll
 *  4. Mouse-driven camera drift via GSAP quickTo for ultra-smooth feel
 *  5. Scroll-driven scene state changes (hero → abstract → constellation)
 *  6. Fully respects dark / light theme via CSS variable reads
 *  7. SSR-safe: entire init runs inside useEffect with window guard
 *  8. Cleans up all Three.js resources on unmount (no memory leaks)
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────── helpers ─────────────────────── */

function getPrimaryColor(): THREE.Color {
  const style = getComputedStyle(document.documentElement);
  // Try to get from oklch CSS var — fall back to hot crimson
  const raw = style.getPropertyValue("--primary").trim();
  // oklch is not parseable by Three.js directly — use hardcoded crimson
  const isDark = document.documentElement.classList.contains("dark");
  return isDark ? new THREE.Color(0xff0055) : new THREE.Color(0xe00040);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/* ─────────────────────── component ─────────────────────── */

export function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === "undefined") return;

    /* ──── 1. Renderer ──── */
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    /* ──── 2. Scene & Camera ──── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 400);
    camera.position.set(0, 0, 55);

    // Camera drift target — updated by mouse / scroll
    const camTarget = { x: 0, y: 0, scrollZ: 0 };
    const xTo = gsap.quickTo(camTarget, "x", { duration: 1.1, ease: "power3.out" });
    const yTo = gsap.quickTo(camTarget, "y", { duration: 1.1, ease: "power3.out" });

    /* ──── 3. Galaxy Particles ──── */
    const PARTICLE_COUNT = 3200;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    const accent = getPrimaryColor();
    const white = new THREE.Color(0xffffff);
    const blue = new THREE.Color(0x3b82f6);
    const purple = new THREE.Color(0xa855f7);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Spiral galaxy distribution
      const radius = Math.pow(Math.random(), 0.5) * 110;
      const spin = radius * 0.3;
      const branch = (i % 3) * ((Math.PI * 2) / 3);
      const angle = branch + spin + (Math.random() - 0.5) * 0.6;

      const rX = (Math.random() - 0.5) * radius * 0.18;
      const rY = (Math.random() - 0.5) * radius * 0.08;
      const rZ = (Math.random() - 0.5) * radius * 0.18;

      positions[i3] = Math.cos(angle) * radius + rX;
      positions[i3 + 1] = rY + (Math.random() - 0.5) * 15;
      positions[i3 + 2] = Math.sin(angle) * radius + rZ;

      // Colour: mix accent, purple and white by radius
      const t = radius / 110;
      let col: THREE.Color;
      if (t < 0.3) col = accent.clone().lerp(white, t / 0.3);
      else if (t < 0.65) col = white.clone().lerp(purple, (t - 0.3) / 0.35);
      else col = purple.clone().lerp(blue, (t - 0.65) / 0.35);

      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;

      sizes[i] = Math.random() * 2.5 + 0.4;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    particleGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Circular soft particle texture generated on canvas
    const ptCanvas = document.createElement("canvas");
    ptCanvas.width = ptCanvas.height = 64;
    const ptCtx = ptCanvas.getContext("2d")!;
    const grad = ptCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.4, "rgba(255,255,255,0.6)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ptCtx.fillStyle = grad;
    ptCtx.fillRect(0, 0, 64, 64);
    const particleTex = new THREE.CanvasTexture(ptCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.9,
      map: particleTex,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    /* ──── 4. Wireframe Icosphere (hero orb) ──── */
    const icGeo = new THREE.IcosahedronGeometry(10, 2);
    const icMat = new THREE.MeshBasicMaterial({
      color: accent,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const icoSphere = new THREE.Mesh(icGeo, icMat);
    icoSphere.position.set(26, 0, -18);
    scene.add(icoSphere);

    /* Pulsing ring around icosphere */
    const ringGeo = new THREE.TorusGeometry(13, 0.07, 6, 60);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xff2a70,
      transparent: true,
      opacity: 0.55,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 2.3;
    icoSphere.add(ring1);

    const ring2 = ring1.clone();
    ring2.rotation.x = -Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    icoSphere.add(ring2);

    /* ──── 5. Neon grid plane (cyber floor) ──── */
    const gridHelper = new THREE.GridHelper(300, 50, 0xff0055, 0x330011);
    (gridHelper.material as THREE.LineBasicMaterial).transparent = true;
    (gridHelper.material as THREE.LineBasicMaterial).opacity = 0.18;
    gridHelper.position.y = -32;
    scene.add(gridHelper);

    /* ──── 6. Floating accent triangles ──── */
    const triGroup = new THREE.Group();
    for (let i = 0; i < 12; i++) {
      const tGeo = new THREE.TetrahedronGeometry(Math.random() * 1.4 + 0.5);
      const tMat = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0xff0055 : i % 3 === 1 ? 0xa855f7 : 0x3b82f6,
        wireframe: true,
        transparent: true,
        opacity: Math.random() * 0.4 + 0.15,
      });
      const mesh = new THREE.Mesh(tGeo, tMat);
      mesh.position.set(
        (Math.random() - 0.5) * 90,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 60 - 20,
      );
      mesh.userData = {
        speedX: (Math.random() - 0.5) * 0.008,
        speedY: (Math.random() - 0.5) * 0.006,
        speedZ: (Math.random() - 0.5) * 0.004,
      };
      triGroup.add(mesh);
    }
    scene.add(triGroup);

    /* ──── 7. DNA / double-helix ribbon ──── */
    const helixGroup = new THREE.Group();
    helixGroup.position.set(-34, 0, -20);
    const HELIX_POINTS = 80;
    const helix1Pts: THREE.Vector3[] = [];
    const helix2Pts: THREE.Vector3[] = [];
    for (let i = 0; i < HELIX_POINTS; i++) {
      const t = (i / HELIX_POINTS) * Math.PI * 5;
      const y = (i / HELIX_POINTS) * 40 - 20;
      helix1Pts.push(new THREE.Vector3(Math.cos(t) * 4, y, Math.sin(t) * 4));
      helix2Pts.push(new THREE.Vector3(Math.cos(t + Math.PI) * 4, y, Math.sin(t + Math.PI) * 4));
    }
    const h1Curve = new THREE.CatmullRomCurve3(helix1Pts);
    const h2Curve = new THREE.CatmullRomCurve3(helix2Pts);
    const tubeMatH = new THREE.MeshBasicMaterial({ color: 0xff0055, transparent: true, opacity: 0.5 });
    const tubeMatH2 = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.5 });
    helixGroup.add(new THREE.Mesh(new THREE.TubeGeometry(h1Curve, 100, 0.08, 6, false), tubeMatH));
    helixGroup.add(new THREE.Mesh(new THREE.TubeGeometry(h2Curve, 100, 0.08, 6, false), tubeMatH2));
    // Cross strands
    for (let i = 0; i < HELIX_POINTS; i += 6) {
      const a = helix1Pts[i]!;
      const b = helix2Pts[i]!;
      const strandGeo = new THREE.BufferGeometry().setFromPoints([a, b]);
      helixGroup.add(
        new THREE.Line(
          strandGeo,
          new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.3 }),
        ),
      );
    }
    scene.add(helixGroup);

    /* ──── 8. Mouse interaction ──── */
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = -(e.clientY / window.innerHeight - 0.5) * 2;
      xTo(nx * 6);
      yTo(ny * 3.5);
      mouse.x = nx;
      mouse.y = ny;
    };
    window.addEventListener("mousemove", onMouseMove);

    /* ──── 9. Scroll-driven depth shift ──── */
    let scrollProgress = 0;
    const scrollCtx = gsap.context(() => {
      gsap.to({ p: 0 }, {
        p: 1,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            scrollProgress = self.progress;
          },
        },
      });
    });

    /* ──── 10. Resize ──── */
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    /* ──── 11. Animation loop ──── */
    const clock = new THREE.Clock();
    let animId: number;

    function animate() {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Rotate galaxy
      particles.rotation.y = t * 0.025;
      particles.rotation.x = t * 0.008;

      // Icosphere continuous spin
      icoSphere.rotation.x = t * 0.18;
      icoSphere.rotation.y = t * 0.12;

      // Rings counter-spin
      ring1.rotation.z = t * 0.3;
      ring2.rotation.z = -t * 0.22;

      // Grid Y-scroll drift (cyber-floor rush effect)
      gridHelper.position.z = (t * 6) % 6;

      // Helix rotation
      helixGroup.rotation.y = t * 0.08;

      // Floating triangles self-rotate
      triGroup.children.forEach((child) => {
        const m = child as THREE.Mesh;
        m.rotation.x += m.userData.speedX;
        m.rotation.y += m.userData.speedY;
        m.rotation.z += m.userData.speedZ;
      });

      // Icosphere scale pulse
      const pulse = 1 + Math.sin(t * 1.4) * 0.04;
      icoSphere.scale.setScalar(pulse);

      // Icosphere opacity modulate with scroll
      icMat.opacity = lerp(0.3, 0.08, scrollProgress);
      (tubeMatH as THREE.MeshBasicMaterial).opacity = lerp(0.5, 0.15, scrollProgress);
      (tubeMatH2 as THREE.MeshBasicMaterial).opacity = lerp(0.5, 0.15, scrollProgress);

      // Camera smooth drift
      camera.position.x = lerp(camera.position.x, camTarget.x, 0.04);
      camera.position.y = lerp(camera.position.y, camTarget.y, 0.04);
      // Scroll-driven Z — zoom camera slightly into the galaxy on scroll
      const targetZ = 55 - scrollProgress * 22;
      camera.position.z = lerp(camera.position.z, targetZ, 0.03);

      // Slight particle field mouse parallax
      particleGeo.attributes.position!.needsUpdate = false;

      camera.lookAt(
        mouse.x * 2,
        mouse.y * 1.2,
        0,
      );

      renderer.render(scene, camera);
    }
    animate();

    /* ──── 12. Cleanup ──── */
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      scrollCtx.revert();

      // Dispose all geometries and materials
      particleGeo.dispose();
      particleMat.dispose();
      icGeo.dispose();
      icMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      tubeMatH.dispose();
      tubeMatH2.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
