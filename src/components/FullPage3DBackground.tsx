import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FullPage3DBackgroundProps {
  theme?: string;
}

/**
 * Full-Page 3D Background Component using Three.js WebGL
 *
 * Spans the ENTIRE landing page from top to bottom (fixed full-viewport canvas).
 * Features:
 * - Geometric 3D motifs derived directly from `logo.svg` (The Eye of Ra arches,
 *   Golden Sunburst rays, cybernetic circuit conduits, and illuminated `< / >` code glyphs).
 * - Multi-stage vertical distribution as user scrolls through the full page.
 * - Scroll-linked camera traversal (smooth vertical travel down the 3D scene).
 * - Organic interactive mouse-parallax depth.
 * - Brand lighting (CodeRa Blue #3157E8, CodeRa Green #0D8068, Ra Gold #F59E0B).
 * - Automatic pause on tab blur for 60FPS performance & low power consumption.
 */
export const FullPage3DBackground: React.FC<FullPage3DBackgroundProps> = ({ theme = 'light' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera & WebGL Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 38);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDark ? 1.2 : 0.95;
    container.appendChild(renderer.domElement);

    // 2. Palette & Materials
    const blueColor = new THREE.Color(0x3157e8);
    const greenColor = new THREE.Color(0x0d8068);
    const goldColor = new THREE.Color(0xf59e0b);
    const cyanColor = new THREE.Color(0x38bdf8);

    // Glowing wireframe and physical materials
    const goldMat = new THREE.MeshStandardMaterial({
      color: goldColor,
      roughness: 0.25,
      metalness: 0.85,
      emissive: goldColor,
      emissiveIntensity: isDark ? 0.35 : 0.2,
    });

    const blueMat = new THREE.MeshStandardMaterial({
      color: blueColor,
      roughness: 0.3,
      metalness: 0.7,
      emissive: blueColor,
      emissiveIntensity: isDark ? 0.4 : 0.25,
    });

    const greenMat = new THREE.MeshStandardMaterial({
      color: greenColor,
      roughness: 0.35,
      metalness: 0.6,
      emissive: greenColor,
      emissiveIntensity: isDark ? 0.35 : 0.2,
    });

    const cyanMat = new THREE.MeshStandardMaterial({
      color: cyanColor,
      roughness: 0.2,
      metalness: 0.5,
      emissive: cyanColor,
      emissiveIntensity: isDark ? 0.5 : 0.3,
    });

    // 3. Dynamic Scene Lighting
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x0f172a : 0xf1f5f9,
      isDark ? 1.4 : 1.8
    );
    scene.add(ambientLight);

    const bluePointLight = new THREE.PointLight(0x3157e8, isDark ? 3.5 : 2.2, 70);
    bluePointLight.position.set(-12, 10, 15);
    scene.add(bluePointLight);

    const greenPointLight = new THREE.PointLight(0x0d8068, isDark ? 3.2 : 2.0, 70);
    greenPointLight.position.set(14, -12, 15);
    scene.add(greenPointLight);

    const goldPointLight = new THREE.PointLight(0xf59e0b, isDark ? 2.8 : 1.8, 60);
    goldPointLight.position.set(0, 18, 12);
    scene.add(goldPointLight);

    // =========================================================================
    // 4. EMBLEM GEOMETRY 1: HERO SECTION STAGE (Eye of Ra + Sunburst + Circuits)
    // =========================================================================
    const heroEmblemGroup = new THREE.Group();
    heroEmblemGroup.position.set(0, 4, 0);

    // A. The Upper Eyelid Arch (Smooth CatmullRom Curve)
    const upperArchPoints = [
      new THREE.Vector3(-14, -1, 0),
      new THREE.Vector3(-7, 4.5, 1),
      new THREE.Vector3(0, 6, 1.5),
      new THREE.Vector3(7, 4.5, 1),
      new THREE.Vector3(14, -1, 0),
    ];
    const upperArchCurve = new THREE.CatmullRomCurve3(upperArchPoints);
    const upperArchGeo = new THREE.TubeGeometry(upperArchCurve, 64, 0.45, 12, false);
    const upperArchMesh = new THREE.Mesh(upperArchGeo, goldMat);
    heroEmblemGroup.add(upperArchMesh);

    // B. The Eyebrow Halo Arch (CodeRa Blue)
    const eyebrowPoints = [
      new THREE.Vector3(-12, 2.5, -0.5),
      new THREE.Vector3(-6, 7.5, 0.5),
      new THREE.Vector3(0, 8.8, 1),
      new THREE.Vector3(6, 7.5, 0.5),
      new THREE.Vector3(12, 2.5, -0.5),
    ];
    const eyebrowCurve = new THREE.CatmullRomCurve3(eyebrowPoints);
    const eyebrowGeo = new THREE.TubeGeometry(eyebrowCurve, 64, 0.35, 12, false);
    const eyebrowMesh = new THREE.Mesh(eyebrowGeo, blueMat);
    heroEmblemGroup.add(eyebrowMesh);

    // C. The Lower Eyelid Arch
    const lowerArchPoints = [
      new THREE.Vector3(-14, -1, 0),
      new THREE.Vector3(-7, -4.5, 0.8),
      new THREE.Vector3(0, -5.5, 1.2),
      new THREE.Vector3(7, -4.5, 0.8),
      new THREE.Vector3(14, -1, 0),
    ];
    const lowerArchCurve = new THREE.CatmullRomCurve3(lowerArchPoints);
    const lowerArchGeo = new THREE.TubeGeometry(lowerArchCurve, 64, 0.38, 12, false);
    const lowerArchMesh = new THREE.Mesh(lowerArchGeo, goldMat);
    heroEmblemGroup.add(lowerArchMesh);

    // D. The Pharaonic Spiral Hook (Bottom Base)
    const spiralPoints = [
      new THREE.Vector3(-3.5, -5.5, 0.5),
      new THREE.Vector3(-5, -8.5, 0.2),
      new THREE.Vector3(-3.8, -11, 0),
      new THREE.Vector3(-1.8, -10.5, 0),
      new THREE.Vector3(-2.2, -9, 0),
      new THREE.Vector3(-3.2, -9.2, 0),
    ];
    const spiralCurve = new THREE.CatmullRomCurve3(spiralPoints);
    const spiralGeo = new THREE.TubeGeometry(spiralCurve, 48, 0.32, 10, false);
    const spiralMesh = new THREE.Mesh(spiralGeo, goldMat);
    heroEmblemGroup.add(spiralMesh);

    // E. Vertical Teardrop Tech Conduit
    const conduitPoints = [
      new THREE.Vector3(4, -5.5, 0.5),
      new THREE.Vector3(4, -11.5, 0.2),
    ];
    const conduitCurve = new THREE.CatmullRomCurve3(conduitPoints);
    const conduitGeo = new THREE.TubeGeometry(conduitCurve, 20, 0.28, 10, false);
    const conduitMesh = new THREE.Mesh(conduitGeo, blueMat);
    heroEmblemGroup.add(conduitMesh);

    // F. Golden Sunburst Rays (12 radiating 3D cylindrical shafts)
    const raysGroup = new THREE.Group();
    raysGroup.position.set(0, 6, 0);
    const rayCount = 11;
    for (let i = 0; i < rayCount; i++) {
      const angle = (Math.PI / (rayCount + 1)) * (i + 1);
      const rayLen = 4 + (i % 2 === 0 ? 2.5 : 1.2);
      const rayGeo = new THREE.CylinderGeometry(0.12, 0.04, rayLen, 8);
      const rayMesh = new THREE.Mesh(rayGeo, goldMat);
      rayMesh.position.set(Math.cos(angle) * 7.5, Math.sin(angle) * 7.5, 0);
      rayMesh.rotation.z = angle - Math.PI / 2;
      raysGroup.add(rayMesh);
    }
    heroEmblemGroup.add(raysGroup);

    // G. Central Luminous Iris & 3D Code Brackets < / >
    const irisGroup = new THREE.Group();
    irisGroup.position.set(0, 0.2, 1.2);

    // Concentric Iris Rings
    const ringGeo1 = new THREE.TorusGeometry(3.6, 0.16, 16, 64);
    const ringMesh1 = new THREE.Mesh(ringGeo1, cyanMat);
    irisGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(2.8, 0.08, 12, 48);
    const ringMesh2 = new THREE.Mesh(ringGeo2, goldMat);
    ringMesh2.rotation.x = Math.PI / 8;
    irisGroup.add(ringMesh2);

    // 3D Left Angle Bracket <
    const leftBracketPoints = [
      new THREE.Vector3(-0.4, 1.3, 0),
      new THREE.Vector3(-1.6, 0, 0),
      new THREE.Vector3(-0.4, -1.3, 0),
    ];
    const leftBracketCurve = new THREE.CatmullRomCurve3(leftBracketPoints);
    const leftBracketGeo = new THREE.TubeGeometry(leftBracketCurve, 24, 0.2, 8, false);
    const leftBracketMesh = new THREE.Mesh(leftBracketGeo, cyanMat);
    irisGroup.add(leftBracketMesh);

    // 3D Slash /
    const slashPoints = [
      new THREE.Vector3(0.5, 1.6, 0),
      new THREE.Vector3(-0.5, -1.6, 0),
    ];
    const slashCurve = new THREE.CatmullRomCurve3(slashPoints);
    const slashGeo = new THREE.TubeGeometry(slashCurve, 16, 0.2, 8, false);
    const slashMesh = new THREE.Mesh(slashGeo, goldMat);
    irisGroup.add(slashMesh);

    // 3D Right Angle Bracket >
    const rightBracketPoints = [
      new THREE.Vector3(0.4, 1.3, 0),
      new THREE.Vector3(1.6, 0, 0),
      new THREE.Vector3(0.4, -1.3, 0),
    ];
    const rightBracketCurve = new THREE.CatmullRomCurve3(rightBracketPoints);
    const rightBracketGeo = new THREE.TubeGeometry(rightBracketCurve, 24, 0.2, 8, false);
    const rightBracketMesh = new THREE.Mesh(rightBracketGeo, cyanMat);
    irisGroup.add(rightBracketMesh);

    heroEmblemGroup.add(irisGroup);

    // H. Cybernetic Circuit Conduits & Terminal Nodes (Left Flank)
    const circuitGroup = new THREE.Group();
    circuitGroup.position.set(-8, 0, 0);

    const nodeGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const techCubeGeo = new THREE.BoxGeometry(0.55, 0.55, 0.55);

    const circuitNodes = [
      { pos: new THREE.Vector3(-6, 2, 0.5), mat: cyanMat },
      { pos: new THREE.Vector3(-9, 0, 1), mat: cyanMat },
      { pos: new THREE.Vector3(-7, -3, 0.8), mat: goldMat },
      { pos: new THREE.Vector3(-10, -5, 0.2), mat: greenMat },
      { pos: new THREE.Vector3(9, 2.5, 0.5), mat: cyanMat },
      { pos: new THREE.Vector3(12, -2, 0.8), mat: greenMat },
    ];

    circuitNodes.forEach((node) => {
      const mesh = new THREE.Mesh(nodeGeo, node.mat);
      mesh.position.copy(node.pos);
      circuitGroup.add(mesh);
    });

    // Floating digital tech pixels / micro-cubes
    const techCubes: THREE.Mesh[] = [];
    for (let i = 0; i < 18; i++) {
      const mat = i % 3 === 0 ? goldMat : i % 2 === 0 ? cyanMat : blueMat;
      const cube = new THREE.Mesh(techCubeGeo, mat);
      cube.position.set(
        (Math.random() - 0.5) * 36,
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 12
      );
      cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      heroEmblemGroup.add(cube);
      techCubes.push(cube);
    }

    heroEmblemGroup.add(circuitGroup);
    scene.add(heroEmblemGroup);

    // =========================================================================
    // 5. MID-PAGE SECTION STAGE: ABOUT & WHY CODERA REGION (Y: -16 to -28)
    // =========================================================================
    const midSectionGroup = new THREE.Group();
    midSectionGroup.position.set(0, -18, 0);

    // Geometric floating 3D Wireframe Icosahedrons & Dodecahedrons
    const polyGeo1 = new THREE.IcosahedronGeometry(3.5, 1);
    const polyWireMat1 = new THREE.MeshStandardMaterial({
      color: greenColor,
      wireframe: true,
      roughness: 0.4,
      emissive: greenColor,
      emissiveIntensity: 0.4,
    });
    const polyMesh1 = new THREE.Mesh(polyGeo1, polyWireMat1);
    polyMesh1.position.set(-14, 0, -2);
    midSectionGroup.add(polyMesh1);

    const polyGeo2 = new THREE.DodecahedronGeometry(4.2, 0);
    const polyWireMat2 = new THREE.MeshStandardMaterial({
      color: blueColor,
      wireframe: true,
      roughness: 0.3,
      emissive: blueColor,
      emissiveIntensity: 0.35,
    });
    const polyMesh2 = new THREE.Mesh(polyGeo2, polyWireMat2);
    polyMesh2.position.set(15, -2, -3);
    midSectionGroup.add(polyMesh2);

    // Floating Cyber Gyro Ring in Green/Blue
    const midRingGeo = new THREE.TorusGeometry(8.5, 0.18, 16, 80);
    const midRingMesh = new THREE.Mesh(midRingGeo, greenMat);
    midRingMesh.rotation.x = Math.PI / 3;
    midSectionGroup.add(midRingMesh);

    scene.add(midSectionGroup);

    // =========================================================================
    // 6. LOWER-PAGE SECTION STAGE: CAREER & ROLES REGION (Y: -35 to -50)
    // =========================================================================
    const lowerSectionGroup = new THREE.Group();
    lowerSectionGroup.position.set(0, -38, 0);

    // Dual Intersecting Code Orbitals
    const orbitRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(12, 0.2, 16, 96),
      cyanMat
    );
    orbitRing1.rotation.set(Math.PI / 4, Math.PI / 6, 0);
    lowerSectionGroup.add(orbitRing1);

    const orbitRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(10.5, 0.18, 16, 96),
      goldMat
    );
    orbitRing2.rotation.set(-Math.PI / 3, Math.PI / 5, 0);
    lowerSectionGroup.add(orbitRing2);

    // Floating Code Nodes at lower depth
    for (let k = 0; k < 12; k++) {
      const angle = (k / 12) * Math.PI * 2;
      const sphere = new THREE.Mesh(nodeGeo, k % 2 === 0 ? blueMat : greenMat);
      sphere.position.set(
        Math.cos(angle) * 11.5,
        Math.sin(angle) * 11.5,
        (Math.sin(k) * 3)
      );
      lowerSectionGroup.add(sphere);
    }

    scene.add(lowerSectionGroup);

    // =========================================================================
    // 7. AMBIENT SPATIAL PARTICLES (Constellation Across Entire Page)
    // =========================================================================
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount; p++) {
      particlePositions[p * 3] = (Math.random() - 0.5) * 55;
      // Spread vertically across the full length of the landing page
      particlePositions[p * 3 + 1] = Math.random() * 20 - 55;
      particlePositions[p * 3 + 2] = (Math.random() - 0.5) * 25;

      const pColor = Math.random() > 0.6 ? goldColor : Math.random() > 0.3 ? blueColor : greenColor;
      particleColors[p * 3] = pColor.r;
      particleColors[p * 3 + 1] = pColor.g;
      particleColors[p * 3 + 2] = pColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: isDark ? 0.35 : 0.28,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.75 : 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // =========================================================================
    // 8. INTERACTIVE PARALLAX & SCROLL TRACKING
    // =========================================================================
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let scrollProgress = 0;
    const onScroll = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      scrollProgress = window.scrollY / maxScroll;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', onResize);

    // =========================================================================
    // 9. ANIMATION LOOP & LIFECYCLE
    // =========================================================================
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let isTabVisible = true;

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isTabVisible) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerping
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Scroll-linked camera traversal: Camera travels vertically down the 3D space
      const targetCameraY = -scrollProgress * 42;
      camera.position.y += (targetCameraY - camera.position.y) * 0.06;

      // Interactive Parallax
      camera.position.x = currentMouseX * 3.5;
      camera.rotation.y = -currentMouseX * 0.07;
      camera.rotation.x = currentMouseY * 0.05;

      // Gentle organic rotations
      heroEmblemGroup.rotation.y = Math.sin(elapsed * 0.35) * 0.08 + currentMouseX * 0.12;
      heroEmblemGroup.rotation.x = Math.cos(elapsed * 0.28) * 0.05 + -currentMouseY * 0.08;
      heroEmblemGroup.position.y = 4 + Math.sin(elapsed * 0.8) * 0.4;

      irisGroup.rotation.z = elapsed * 0.15;
      polyMesh1.rotation.x += delta * 0.2;
      polyMesh1.rotation.y += delta * 0.25;
      polyMesh2.rotation.y += delta * 0.18;
      polyMesh2.rotation.z += delta * 0.15;

      orbitRing1.rotation.z = elapsed * 0.1;
      orbitRing2.rotation.z = -elapsed * 0.12;

      techCubes.forEach((cube, idx) => {
        cube.rotation.x += delta * (0.3 + (idx % 3) * 0.1);
        cube.rotation.y += delta * (0.4 + (idx % 2) * 0.1);
      });

      // Subtle light oscillations
      bluePointLight.position.x = -12 + Math.sin(elapsed * 0.7) * 3;
      greenPointLight.position.y = -12 + Math.cos(elapsed * 0.6) * 3;

      renderer.render(scene, camera);
    };

    animate();

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none select-none overflow-hidden"
      style={{
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      {/* Soft atmospheric gradient backdrop matching brand tokens */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-500"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at 50% 20%, rgba(49, 87, 232, 0.15) 0%, rgba(13, 128, 104, 0.08) 50%, #101522 90%)'
            : 'radial-gradient(ellipse at 50% 20%, rgba(49, 87, 232, 0.09) 0%, rgba(13, 128, 104, 0.06) 50%, #F7F6F1 90%)',
        }}
      />
    </div>
  );
};
