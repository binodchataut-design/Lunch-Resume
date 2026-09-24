/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, Cylinder, Stars, Box } from '@react-three/drei';
import * as THREE from 'three';

// A single floating node in the Skill & Opportunity network
const SkillNode = ({ position, color, label, scale = 1 }: { position: [number, number, number]; color: string; label: string; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      // Wave motion representing career fluidity
      ref.current.position.y = position[1] + Math.sin(t * 1.5 + position[0] * 2) * 0.15;
      ref.current.position.x = position[0] + Math.cos(t * 1.0 + position[2]) * 0.1;
      ref.current.rotation.y = t * 0.4;
      ref.current.rotation.x = t * 0.2;
    }
  });

  return (
    <group position={position}>
      <Sphere ref={ref} args={[0.3, 16, 16]} scale={scale}>
        <meshPhysicalMaterial
          color={color}
          roughness={0.1}
          metalness={0.3}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transmission={0.4}
          thickness={0.5}
        />
      </Sphere>
      {/* Visual ring around nodes representing connections/opportunities */}
      <Torus args={[0.5, 0.012, 8, 32]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color={color} opacity={0.25} transparent />
      </Torus>
    </group>
  );
};

// Moving career growth path connections between skill milestones
const GrowthLine = ({ start, end, progressSpeed = 1, color = "#0F766E" }: { start: [number, number, number], end: [number, number, number], progressSpeed?: number, color?: string }) => {
  const lineRef = useRef<any>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  const points = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  }, [start, end]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  useFrame((state) => {
    if (pulseRef.current) {
      const t = (state.clock.getElapsedTime() * progressSpeed * 0.3) % 1.0;
      // Interpolate position along the path from start to end
      pulseRef.current.position.x = start[0] + (end[0] - start[0]) * t;
      pulseRef.current.position.y = start[1] + (end[1] - start[1]) * t;
      pulseRef.current.position.z = start[2] + (end[2] - start[2]) * t;
    }
  });

  return (
    <group>
      {/* Cable/connection line */}
      {/* @ts-ignore */}
      <line ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial color={color} opacity={0.15} transparent />
      </line>
      {/* Moving kinetic energy packet representing growth/resume submission flow */}
      <Sphere ref={pulseRef} args={[0.06, 8, 8]}>
        <meshBasicMaterial color={color} />
      </Sphere>
    </group>
  );
};

// Floating resume pages in 3D outer space representing multiple design templates
const FloatingCVPage = ({ position, rotation, scale = [1.2, 1.6, 0.02], color = "#ffffff" }: { position: [number, number, number], rotation: [number, number, number], scale?: [number, number, number], color?: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.rotation.y = rotation[1] + Math.sin(t * 0.5) * 0.1;
      ref.current.rotation.z = rotation[2] + Math.cos(t * 0.3) * 0.05;
      ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.08;
    }
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <boxGeometry args={scale} />
      {/* Dual sided materials - Front looks like a resume card */}
      <meshPhysicalMaterial 
        color={color} 
        roughness={0.2} 
        metalness={0.1}
        clearcoat={0.5}
        transmission={0.1} 
        thickness={0.2}
      />
    </mesh>
  );
};

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 5]} intensity={2.0} />
        <directionalLight position={[-5, 5, -5]} intensity={1.0} color="#8CFBD4" />
        <pointLight position={[-10, -5, -5]} intensity={0.8} />
        
        {/* Growth constellations - Golden-Themed skill networking graph */}
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
          <group position={[0, 0, 0]}>
            {/* Networking lines */}
            <GrowthLine start={[-3.5, -1.5, -2]} end={[-2, 1, -1]} progressSpeed={1.2} />
            <GrowthLine start={[-2, 1, -1]} end={[0, -0.5, 0]} progressSpeed={0.8} />
            <GrowthLine start={[0, -0.5, 0]} end={[2, 1.5, -1]} progressSpeed={1.5} />
            <GrowthLine start={[2, 1.5, -1]} end={[3.5, -1, -2]} progressSpeed={1.0} />
            
            <GrowthLine start={[-2, 1, -1]} end={[1.5, -1.8, -1.5]} progressSpeed={0.7} />
            <GrowthLine start={[1.5, -1.8, -1.5]} end={[3.5, -1, -2]} progressSpeed={1.3} />

            {/* Nodes - Skill clusters */}
            <SkillNode position={[-3.5, -1.5, -2]} color="#0F766E" label="Entry" scale={1.1} />
            <SkillNode position={[-2, 1, -1]} color="#1C2B33" label="Hard Skills" scale={0.9} />
            <SkillNode position={[0, -0.5, 0]} color="#16A34A" label="Portfolio" scale={1.2} />
            <SkillNode position={[1.5, -1.8, -1.5]} color="#D97706" label="Soft Skills" scale={0.8} />
            <SkillNode position={[2, 1.5, -1]} color="#0F766E" label="Interview" scale={1.1} />
            <SkillNode position={[3.5, -1, -2]} color="#8CFBD4" label="Offer Accepted" scale={1.3} />
          </group>
        </Float>

        {/* Floating CV Pages sliding past elegantly */}
        <Float speed={0.8} rotationIntensity={0.4} floatIntensity={0.6}>
          <FloatingCVPage position={[-4, 2, -3]} rotation={[0.2, 0.4, -0.2]} color="#ffffff" />
          <FloatingCVPage position={[4, -2, -3]} rotation={[-0.2, -0.4, 0.2]} color="#F0EDE4" />
          <FloatingCVPage position={[3, 2.5, -4]} rotation={[0.1, -0.2, 0.1]} scale={[0.8, 1.1, 0.015]} color="#8CFBD4" />
        </Float>

        <Stars radius={100} depth={50} count={600} factor={4} saturation={0.5} fade speed={1.5} />
      </Canvas>
    </div>
  );
};

export const QuantumComputerScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 42 }}>
        <ambientLight intensity={1.2} />
        <spotLight position={[5, 10, 5]} angle={0.4} penumbra={1} intensity={3.5} color="#C5A059" />
        <directionalLight position={[-3, 5, 2]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-6, -6, -6]} intensity={0.8} />
        
        <Float rotationIntensity={0.3} floatIntensity={0.25} speed={1.2}>
          <group rotation={[0.2, -0.4, 0]} position={[0, 0, 0]}>
            
            {/* The Career Hub Structure: Beautiful stacks of templates floating */}
            
            {/* Gold Platform (Reflective pedestal of professional standards) */}
            <Cylinder args={[1.5, 1.5, 0.08, 64]} position={[0, -1.2, 0]}>
              <meshStandardMaterial color="#C5A059" metalness={0.9} roughness={0.15} />
            </Cylinder>

            {/* Glowing Accent Ring */}
            <Torus args={[1.45, 0.02, 16, 64]} position={[0, -1.16, 0]} rotation={[Math.PI/2, 0, 0]}>
              <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
            </Torus>

            {/* Resume Page Stacks in 3D representing layered designs */}
            <group position={[0, 0, 0]}>
              {/* Underneath layer - Shadowy page */}
              <Box args={[1.1, 1.5, 0.03]} position={[-0.15, -0.3, -0.15]} rotation={[0, 0.05, -0.05]}>
                <meshStandardMaterial color="#E8E5DC" roughness={0.3} />
              </Box>
              
              {/* Middle layer - Professional Page */}
              <Box args={[1.1, 1.5, 0.03]} position={[0.15, -0.1, -0.05]} rotation={[0, -0.05, 0.03]}>
                <meshStandardMaterial color="#D6CEBF" roughness={0.25} />
              </Box>

              {/* Main front resume mockup page */}
              <Box args={[1.1, 1.5, 0.03]} position={[0, 0.15, 0.05]} rotation={[0, 0, 0]}>
                <meshPhysicalMaterial 
                  color="#ffffff" 
                  roughness={0.1} 
                  metalness={0.0}
                  clearcoat={1.0}
                />
              </Box>

              {/* Little gold ribbon on top */}
              <Box args={[0.25, 0.3, 0.04]} position={[-0.35, 0.75, 0.08]} rotation={[0, 0, 0]}>
                <meshStandardMaterial color="#C5A059" metalness={0.8} roughness={0.15} />
              </Box>
            </group>

            {/* Vertical Support Columns (Constructing your career) */}
            <Cylinder args={[0.04, 0.04, 2.2, 16]} position={[-1.2, -0.1, 0]}>
              <meshStandardMaterial color="#D1D5DB" metalness={0.8} roughness={0.2} />
            </Cylinder>
            <Cylinder args={[0.04, 0.04, 2.2, 16]} position={[1.2, -0.1, 0]}>
              <meshStandardMaterial color="#D1D5DB" metalness={0.8} roughness={0.2} />
            </Cylinder>

            {/* Connected Career Milestones Floating atop the columns */}
            <Sphere args={[0.14, 16, 16]} position={[-1.2, 1.0, 0]}>
              <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={0.2} />
            </Sphere>
            <Sphere args={[0.14, 16, 16]} position={[1.2, 1.0, 0]}>
              <meshStandardMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={0.2} />
            </Sphere>

          </group>
        </Float>
      </Canvas>
    </div>
  );
};
