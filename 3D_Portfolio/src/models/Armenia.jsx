import { useRef, useEffect, useCallback } from 'react'
import { useGLTF } from '@react-three/drei'
import {useFrame, useThree} from '@react-three/fiber'
import {a} from '@react-spring/three'

import islandScene from '../assets/3d/armenia.glb' ;


const Armenia = ({isRotating, setCurrentStage, setIsRotating, ...props }) => {
  const { nodes, materials } = useGLTF(islandScene);
  const {gl, viewport } =  useThree();
  const islandRef = useRef();
  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  const handlePointerDown = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
  }, [setIsRotating]);

  const handlePointerUp = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  }, [setIsRotating]);

  const handlePointerMove = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      
      // Calculamos la diferencia
      const delta = (clientX - lastX.current) / viewport.width;
      
      // Aumentamos un poco la sensibilidad (0.01 era muy poco)
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      
      // Actualizamos para el siguiente frame
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  }, [isRotating, viewport.width]);

  const handleKeyDown = (e) => {
    if(e.key === 'ArrowLeft') {
      if(!isRotating) setIsRotating(true);
      islandRef.current.rotation.y += 0.01 * Math.PI;
    } else if (e.key === 'ArrowRight') {
      if (!isRotating) setIsRotating(true);
      islandRef.current.rotation.y -= 0.01 * Math.PI;
    }
  }

  const handleKeyUp = (e) => {
    if(e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      setIsRotating(false);
    }
  }

  useFrame(()  => {
    if(!isRotating) {
      rotationSpeed.current *= dampingFactor;
      if(Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      islandRef.current.rotation.y += rotationSpeed.current;
    } else  {
      const rotation = islandRef.current.rotation.y;
            /**
       * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
       * The goal is to ensure that the rotation value remains within a specific range to
       * prevent potential issues with very large or negative rotation values.
       *  Here's a step-by-step explanation of what this code does:
       *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
       *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
       *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
       *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
       *     This is done to ensure that the value remains positive and within the range of
       *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
       *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
       *     modulo operation to the value obtained in step 2. This step guarantees that the value
       *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
       *     circle in radians.
       */
            const normalizedRotation =
            ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    
          // Set the current stage based on the island's orientation
          switch (true) {
            case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
              setCurrentStage(4);
              break;
            case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
              setCurrentStage(3);
              break;
            case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
              setCurrentStage(2);
              break;
            case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
              setCurrentStage(1);
              break;
            default:
              setCurrentStage(null);
          }
        }
      });
    


  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerUp);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
    canvas.removeEventListener('pointerdown', handlePointerDown);
    canvas.removeEventListener('pointerup', handlePointerUp);
    canvas.removeEventListener('pointermove', handlePointerMove);
    canvas.removeEventListener('pointerleave', handlePointerUp);
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('keyup', handleKeyUp);

    }

  
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);


  return (
    <a.group ref={islandRef} {...props} >
      <group position={[-0.051, -0.023, -0.005]} scale={0.453}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials.VERDE}
          position={[1.211, -0.36, 0.783]}
          scale={6.473}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials.CAFE}
          position={[1.211, -1.978, 0.797]}
          scale={6.459}
        />
      </group>
      <group position={[-0.126, 0.244, 2.24]} scale={[0.008, 0.055, 0.008]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_7.geometry}
          material={materials.GRIS}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_8.geometry}
          material={materials.VERDE_BANDERA}
          position={[7.475, 0.295, -0.014]}
          scale={7.355}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_9.geometry}
          material={materials.BLANCO}
          position={[7.475, 0.299, -0.014]}
          scale={6.941}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_10.geometry}
          material={materials.Material}
          position={[7.475, -0.138, -0.014]}
          scale={7.355}
        />
      </group>
      <group position={[-0.658, 0.574, 0.763]} scale={[0.015, 0.108, 0.015]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_12.geometry}
          material={materials.GRIS}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_13.geometry}
          material={materials.VERDE_BANDERA}
          position={[7.475, 0.295, -0.014]}
          scale={7.355}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_14.geometry}
          material={materials.BLANCO}
          position={[7.475, 0.299, -0.014]}
          scale={6.941}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_15.geometry}
          material={materials.Material}
          position={[7.475, -0.138, -0.014]}
          scale={7.355}
        />
      </group>
      <group position={[1.046, 0.22, -0.473]} scale={[0.01, 0.076, 0.01]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_17.geometry}
          material={materials.GRIS}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_18.geometry}
          material={materials.VERDE_BANDERA}
          position={[7.475, 0.295, -0.014]}
          scale={7.355}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_19.geometry}
          material={materials.BLANCO}
          position={[7.475, 0.299, -0.014]}
          scale={6.941}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_20.geometry}
          material={materials.Material}
          position={[7.475, -0.138, -0.014]}
          scale={7.355}
        />
      </group>
      <group
        position={[0.518, 0.067, 0.195]}
        rotation={[0, -0.21, 0]}
        scale={[0.059, 0.061, 0.012]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_22.geometry}
          material={materials['Ruana_3.001']}
          position={[-0.037, -0.175, 0.687]}
          scale={3.171}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_23.geometry}
          material={materials.cafe_arbol}
          position={[0.033, 0.029, 0.456]}
          scale={2.476}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_24.geometry}
          material={materials.Piel}
          position={[0.016, -0.295, 1.973]}
          scale={1.661}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_25.geometry}
          material={materials.NEGRO}
          position={[0.082, 1.239, 2.647]}
          scale={3.515}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_26.geometry}
          material={materials.PELO}
          position={[0.098, 1.002, 2.335]}
          scale={1.714}
        />
      </group>
      <group
        position={[0.906, 0.153, -0.119]}
        rotation={[-3.108, 0.97, -2.976]}
        scale={[0.059, 0.061, 0.012]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_28.geometry}
          material={materials['Ruana_3.001']}
          position={[-0.037, -0.175, 0.687]}
          scale={3.171}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_29.geometry}
          material={materials.cafe_arbol}
          position={[0.033, 0.029, 0.456]}
          scale={2.476}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_30.geometry}
          material={materials.Piel}
          position={[0.016, -0.295, 1.973]}
          scale={1.661}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_31.geometry}
          material={materials.NEGRO}
          position={[0.082, 1.239, 2.647]}
          scale={3.515}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_32.geometry}
          material={materials.PELO}
          position={[0.098, 1.002, 2.335]}
          scale={1.714}
        />
      </group>
      <group
        position={[-0.043, 0.262, -0.684]}
        rotation={[-0.227, 1.194, 0.029]}
        scale={[0.059, 0.061, 0.012]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_34.geometry}
          material={materials['Ruana_3.001']}
          position={[-0.037, -0.175, 0.687]}
          scale={3.171}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_35.geometry}
          material={materials.cafe_arbol}
          position={[0.033, 0.029, 0.456]}
          scale={2.476}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_36.geometry}
          material={materials.Piel}
          position={[0.016, -0.295, 1.973]}
          scale={1.661}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_37.geometry}
          material={materials.NEGRO}
          position={[0.082, 1.239, 2.647]}
          scale={3.515}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_38.geometry}
          material={materials.PELO}
          position={[0.098, 1.002, 2.335]}
          scale={1.714}
        />
      </group>
      <group
        position={[-0.349, 0.176, -0.148]}
        rotation={[-0.103, -0.629, -0.243]}
        scale={[0.059, 0.061, 0.012]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_40.geometry}
          material={materials['Ruana_3.001']}
          position={[-0.037, -0.175, 0.687]}
          scale={3.171}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_41.geometry}
          material={materials.cafe_arbol}
          position={[0.033, 0.029, 0.456]}
          scale={2.476}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_42.geometry}
          material={materials.Piel}
          position={[0.016, -0.295, 1.973]}
          scale={1.661}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_43.geometry}
          material={materials.NEGRO}
          position={[0.082, 1.239, 2.647]}
          scale={3.515}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_44.geometry}
          material={materials.PELO}
          position={[0.098, 1.002, 2.335]}
          scale={1.714}
        />
      </group>
      <group
        position={[-1.161, 0.094, -0.587]}
        rotation={[-0.084, 0, 0]}
        scale={[0.059, 0.061, 0.012]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_46.geometry}
          material={materials['Ruana_3.001']}
          position={[-0.037, -0.175, 0.687]}
          scale={3.171}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_47.geometry}
          material={materials.cafe_arbol}
          position={[0.033, 0.029, 0.456]}
          scale={2.476}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_48.geometry}
          material={materials.Piel}
          position={[0.016, -0.295, 1.973]}
          scale={1.661}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_49.geometry}
          material={materials.NEGRO}
          position={[0.082, 1.239, 2.647]}
          scale={3.515}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_50.geometry}
          material={materials.PELO}
          position={[0.098, 1.002, 2.335]}
          scale={1.714}
        />
      </group>
      <group
        position={[-1.263, 0.244, -1.002]}
        rotation={[-0.123, 0.816, 0.09]}
        scale={[0.059, 0.061, 0.012]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_52.geometry}
          material={materials['Ruana_3.001']}
          position={[-0.037, -0.175, 0.687]}
          scale={3.171}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_53.geometry}
          material={materials.cafe_arbol}
          position={[0.033, 0.029, 0.456]}
          scale={2.476}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_54.geometry}
          material={materials.Piel}
          position={[0.016, -0.295, 1.973]}
          scale={1.661}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_55.geometry}
          material={materials.NEGRO}
          position={[0.082, 1.239, 2.647]}
          scale={3.515}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_56.geometry}
          material={materials.PELO}
          position={[0.098, 1.002, 2.335]}
          scale={1.714}
        />
      </group>
      <group
        position={[-0.585, 0.174, -1.392]}
        rotation={[-0.191, -1.11, -0.171]}
        scale={[0.059, 0.061, 0.012]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_58.geometry}
          material={materials['Ruana_3.001']}
          position={[-0.037, -0.175, 0.687]}
          scale={3.171}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_59.geometry}
          material={materials.cafe_arbol}
          position={[0.033, 0.029, 0.456]}
          scale={2.476}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_60.geometry}
          material={materials.Piel}
          position={[0.016, -0.295, 1.973]}
          scale={1.661}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_61.geometry}
          material={materials.NEGRO}
          position={[0.082, 1.239, 2.647]}
          scale={3.515}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_62.geometry}
          material={materials.PELO}
          position={[0.098, 1.002, 2.335]}
          scale={1.714}
        />
      </group>
      <group position={[-1.144, -0.018, 3.043]} scale={1.103}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_64.geometry}
          material={materials.AMARILLO_ARBOL}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group
        position={[-0.079, 0.024, 2.533]}
        rotation={[0, -0.672, 0]}
        scale={[0.015, 0.042, 0.015]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_66.geometry}
          material={materials.cafe_arbol}
          position={[0, 1, -0.957]}
          scale={1.043}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_67.geometry}
          material={materials['VERDE.001']}
          position={[0, 2.718, -1]}
          scale={3.848}
        />
      </group>
      <group position={[-0.419, 0.042, 2.296]} scale={0.2}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_69.geometry}
          material={materials.AMARILLO_ARBOL}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group position={[-1.706, -0.017, 0.135]} scale={[0.005, 0.015, 0.005]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_71.geometry}
          material={materials.cafe_arbol}
          position={[0, 2.965, 0]}
          scale={2.965}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_72.geometry}
          material={materials['VERDE.001']}
          position={[0, 13.826, 1]}
          scale={27.725}
        />
      </group>
      <group position={[-0.976, 0.004, 1.483]} scale={[0.022, 0.088, 0.022]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_74.geometry}
          material={materials.CAFE}
          position={[0, 1, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_75.geometry}
          material={materials.TUNJA}
          position={[-0.134, 2.192, -0.024]}
          scale={3.409}
        />
      </group>
      <group position={[-0.453, 0.014, 2.383]} scale={[0.017, 0.068, 0.017]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_77.geometry}
          material={materials.CAFE}
          position={[0, 1, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_78.geometry}
          material={materials.TUNJA}
          position={[-0.134, 2.192, -0.024]}
          scale={3.409}
        />
      </group>
      <group
        position={[0.01, 0.024, 2.464]}
        rotation={[0, -1.157, 0]}
        scale={[0.015, 0.042, 0.015]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_80.geometry}
          material={materials.cafe_arbol}
          position={[0, 1, -0.957]}
          scale={1.043}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_81.geometry}
          material={materials['VERDE.001']}
          position={[0, 2.718, -1]}
          scale={3.848}
        />
      </group>
      <group position={[-0.106, 0.014, 2.657]} scale={[0.017, 0.068, 0.017]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_83.geometry}
          material={materials.CAFE}
          position={[0, 1, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_84.geometry}
          material={materials.TUNJA}
          position={[-0.134, 2.192, -0.024]}
          scale={3.409}
        />
      </group>
      <group position={[-0.16, 0.014, 2.744]} scale={[0.017, 0.068, 0.017]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_86.geometry}
          material={materials.CAFE}
          position={[0, 1, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_87.geometry}
          material={materials.TUNJA}
          position={[-0.134, 2.192, -0.024]}
          scale={3.409}
        />
      </group>
      <group position={[-0.217, 0.014, 2.837]} scale={[0.017, 0.068, 0.017]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_89.geometry}
          material={materials.CAFE}
          position={[0, 1, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_90.geometry}
          material={materials.TUNJA}
          position={[-0.134, 2.192, -0.024]}
          scale={3.409}
        />
      </group>
      <group position={[-0.571, 0.014, 2.392]} scale={[0.017, 0.068, 0.017]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_92.geometry}
          material={materials.CAFE}
          position={[0, 1, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_93.geometry}
          material={materials.TUNJA}
          position={[-0.134, 2.192, -0.024]}
          scale={3.409}
        />
      </group>
      <group position={[-0.626, 0.014, 2.479]} scale={[0.017, 0.068, 0.017]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_95.geometry}
          material={materials.CAFE}
          position={[0, 1, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_96.geometry}
          material={materials.TUNJA}
          position={[-0.134, 2.192, -0.024]}
          scale={3.409}
        />
      </group>
      <group position={[-0.682, 0.014, 2.572]} scale={[0.017, 0.068, 0.017]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_98.geometry}
          material={materials.CAFE}
          position={[0, 1, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_99.geometry}
          material={materials.TUNJA}
          position={[-0.134, 2.192, -0.024]}
          scale={3.409}
        />
      </group>
      <group position={[-1.27, -0.018, 2.974]} scale={0.904}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_101.geometry}
          material={materials.AMARILLO_ARBOL}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group
        position={[-0.801, 0.025, 3.189]}
        rotation={[0, -0.672, 0]}
        scale={[0.021, 0.058, 0.021]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_103.geometry}
          material={materials.cafe_arbol}
          position={[0, 1, -0.957]}
          scale={1.043}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_104.geometry}
          material={materials['Material.003']}
          position={[0, 2.718, -1]}
          scale={3.848}
        />
      </group>
      <group
        position={[-0.629, 0.025, 3.236]}
        rotation={[0, 0.081, 0]}
        scale={[0.021, 0.058, 0.021]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_106.geometry}
          material={materials.cafe_arbol}
          position={[0, 1, -0.957]}
          scale={1.043}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_107.geometry}
          material={materials['Material.003']}
          position={[0, 2.718, -1]}
          scale={3.848}
        />
      </group>
      <group position={[-1.183, 0.031, 2.291]} scale={0.904}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_109.geometry}
          material={materials.TUNJA}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group position={[-1.29, -0.005, 2.405]} scale={0.904}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_111.geometry}
          material={materials.TUNJA}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group position={[-1.114, 0.031, 2.467]} scale={0.904}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_113.geometry}
          material={materials.TUNJA}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group position={[-1.106, 0.004, 1.667]} scale={[0.022, 0.088, 0.022]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_115.geometry}
          material={materials.CAFE}
          position={[0, 1, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_116.geometry}
          material={materials.TUNJA}
          position={[-0.134, 2.192, -0.024]}
          scale={3.409}
        />
      </group>
      <group position={[-0.435, 0.004, 1.707]} scale={[0.022, 0.088, 0.022]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_118.geometry}
          material={materials.CAFE}
          position={[0, 1, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_119.geometry}
          material={materials.TUNJA}
          position={[-0.134, 2.192, -0.024]}
          scale={3.409}
        />
      </group>
      <group position={[-0.392, 0.004, 1.816]} scale={[0.022, 0.088, 0.022]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_121.geometry}
          material={materials.CAFE}
          position={[0, 1, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_122.geometry}
          material={materials.TUNJA}
          position={[-0.134, 2.192, -0.024]}
          scale={3.409}
        />
      </group>
      <group position={[-0.456, 0.004, 1.937]} scale={[0.022, 0.088, 0.022]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_124.geometry}
          material={materials.CAFE}
          position={[0, 1, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_125.geometry}
          material={materials.TUNJA}
          position={[-0.134, 2.192, -0.024]}
          scale={3.409}
        />
      </group>
      <group position={[-1.168, 0.004, 1.82]} scale={[0.022, 0.088, 0.022]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_127.geometry}
          material={materials.CAFE}
          position={[0, 1, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_128.geometry}
          material={materials.TUNJA}
          position={[-0.134, 2.192, -0.024]}
          scale={3.409}
        />
      </group>
      <group position={[-0.98, 0.011, 2.062]} scale={0.251}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_130.geometry}
          material={materials.AMARILLO_ARBOL}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group position={[-0.833, 0.011, 2.107]} scale={0.251}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_132.geometry}
          material={materials.AMARILLO_ARBOL}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group position={[-1.055, 0.011, 2.085]} scale={0.251}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_134.geometry}
          material={materials.AMARILLO_ARBOL}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group position={[-1.039, 0.011, 2.121]} scale={0.251}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_136.geometry}
          material={materials.AMARILLO_ARBOL}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group position={[-1.021, 0.011, 2.157]} scale={0.251}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_138.geometry}
          material={materials.AMARILLO_ARBOL}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group position={[-1.004, 0.011, 2.194]} scale={0.251}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_140.geometry}
          material={materials.AMARILLO_ARBOL}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group position={[-1.133, 0.011, 1.888]} scale={0.251}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_142.geometry}
          material={materials.AMARILLO_ARBOL}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group position={[-1.117, 0.011, 1.923]} scale={0.251}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_144.geometry}
          material={materials.AMARILLO_ARBOL}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group position={[-1.099, 0.011, 1.96]} scale={0.251}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_146.geometry}
          material={materials.AMARILLO_ARBOL}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group position={[-1.082, 0.011, 1.997]} scale={0.251}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_148.geometry}
          material={materials.AMARILLO_ARBOL}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group position={[-0.798, 0.011, 2.195]} rotation={[Math.PI, -1.536, Math.PI]} scale={0.251}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_150.geometry}
          material={materials.AMARILLO_ARBOL}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group position={[-0.833, 0.011, 2.21]} rotation={[Math.PI, -1.536, Math.PI]} scale={0.251}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_152.geometry}
          material={materials.AMARILLO_ARBOL}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group position={[-0.871, 0.011, 2.227]} rotation={[Math.PI, -1.536, Math.PI]} scale={0.251}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_154.geometry}
          material={materials.AMARILLO_ARBOL}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group position={[-0.908, 0.011, 2.242]} rotation={[Math.PI, -1.536, Math.PI]} scale={0.251}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_156.geometry}
          material={materials.AMARILLO_ARBOL}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group position={[-0.621, 0.011, 2.11]} rotation={[Math.PI, -1.536, Math.PI]} scale={0.251}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_158.geometry}
          material={materials.AMARILLO_ARBOL}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group position={[-0.657, 0.011, 2.125]} rotation={[Math.PI, -1.536, Math.PI]} scale={0.251}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_160.geometry}
          material={materials.AMARILLO_ARBOL}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group position={[-0.694, 0.011, 2.142]} rotation={[Math.PI, -1.536, Math.PI]} scale={0.251}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_162.geometry}
          material={materials.AMARILLO_ARBOL}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group position={[-0.731, 0.011, 2.158]} rotation={[Math.PI, -1.536, Math.PI]} scale={0.251}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_164.geometry}
          material={materials.AMARILLO_ARBOL}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group position={[-0.507, 0.011, 2.062]} rotation={[Math.PI, -1.536, Math.PI]} scale={0.251}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_166.geometry}
          material={materials.AMARILLO_ARBOL}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group position={[-0.544, 0.011, 2.079]} rotation={[Math.PI, -1.536, Math.PI]} scale={0.251}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_168.geometry}
          material={materials.AMARILLO_ARBOL}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group position={[-0.581, 0.011, 2.095]} rotation={[Math.PI, -1.536, Math.PI]} scale={0.251}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_170.geometry}
          material={materials.AMARILLO_ARBOL}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group position={[-0.988, 0.011, 2.094]} scale={0.183}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_172.geometry}
          material={materials.AMARILLO_ARBOL}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group position={[-0.822, 0.011, 2.14]} scale={0.183}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_174.geometry}
          material={materials.AMARILLO_ARBOL}
          position={[0, 0.113, 0]}
          scale={0.113}
        />
      </group>
      <group position={[-1.419, -0.017, 0.173]} scale={[0.005, 0.015, 0.005]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_176.geometry}
          material={materials.cafe_arbol}
          position={[0, 2.965, 0]}
          scale={2.965}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_177.geometry}
          material={materials['VERDE.001']}
          position={[0, 13.826, 1]}
          scale={27.725}
        />
      </group>
      <group position={[-1.537, -0.017, -0.076]} scale={[0.005, 0.015, 0.005]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_179.geometry}
          material={materials.cafe_arbol}
          position={[0, 2.965, 0]}
          scale={2.965}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_180.geometry}
          material={materials['VERDE.001']}
          position={[0, 13.826, 1]}
          scale={27.725}
        />
      </group>
      <group position={[-1.193, -0.017, 0.241]} scale={[0.005, 0.015, 0.005]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_182.geometry}
          material={materials.cafe_arbol}
          position={[0, 2.965, 0]}
          scale={2.965}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_183.geometry}
          material={materials['VERDE.001']}
          position={[0, 13.826, 1]}
          scale={27.725}
        />
      </group>
      <group position={[1.717, 0.114, -1.797]} rotation={[-0.164, -0.023, 0.141]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_185.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[1.423, 0.045, -1.832]} rotation={[-0.214, 0.697, 0.284]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_187.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[1.105, 0.001, -1.875]} rotation={[-0.325, 1.036, 0.427]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_189.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[0.886, 0.001, -1.9]} rotation={[-0.325, 1.036, 0.427]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_191.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[1.029, 0.029, -2.112]} rotation={[-0.325, 1.036, 0.427]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_193.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[1.274, 0.001, -2.094]} rotation={[-2.892, 0.852, 3.097]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_195.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[0.54, 0.001, -1.883]} rotation={[-2.892, 0.852, 3.097]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_197.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[0.278, 0.001, -1.95]} rotation={[-2.892, 0.852, 3.097]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_199.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[-0.006, -0.04, -2.148]} rotation={[-2.892, 0.852, 3.097]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_201.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[0.19, 0.001, -2.212]} rotation={[-2.892, 0.852, 3.097]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_203.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[-0.072, -0.039, -2.389]} rotation={[-2.892, 0.852, 3.097]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_205.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[0.085, -0.047, -2.495]} rotation={[-2.892, 0.852, 3.097]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_207.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[0.383, -0.033, -2.124]} rotation={[-2.978, 0.081, -3.01]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_209.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[0.333, -0.018, -2.427]} rotation={[-2.978, 0.081, -3.01]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_211.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[0.653, -0.086, -2.421]} rotation={[-2.892, 0.852, 3.097]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_213.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[0.671, 0.001, -2.123]} rotation={[-2.892, 0.852, 3.097]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_215.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[0.913, -0.011, -2.442]} rotation={[-2.892, 0.852, 3.097]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_217.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[-0.189, -0.027, -2.512]} rotation={[-2.892, 0.852, 3.097]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_219.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[1.57, 0.078, -2.011]} rotation={[-0.164, -0.023, 0.141]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_221.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[1.363, 0.006, -2.241]} rotation={[-0.164, -0.023, 0.141]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_223.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[1.845, 0.011, -2.087]} rotation={[-0.164, -0.023, 0.141]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_225.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[2.017, 0.074, -1.835]} rotation={[-0.164, -0.023, 0.141]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_227.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[2.354, 0.074, -1.961]} rotation={[-0.164, -0.023, 0.141]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_229.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[1.924, 0.074, -1.594]} rotation={[-0.164, -0.023, 0.141]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_231.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[1.919, 0.026, -1.441]} rotation={[-2.978, 0.023, -3]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_233.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[2.193, 0.026, -1.496]} rotation={[-0.224, 0.749, 0.299]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_235.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[2.268, 0.063, -1.73]} rotation={[-0.164, -0.023, 0.141]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_237.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[2.542, -0.043, -1.794]} rotation={[-0.164, -0.023, 0.141]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_239.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[2.452, 0.005, -1.55]} rotation={[-0.224, 0.749, 0.299]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_241.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[2.121, 0.014, -2.044]} rotation={[-0.164, -0.023, 0.141]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_243.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[2.438, 0.026, -2.175]} rotation={[-0.164, -0.023, 0.141]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_245.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[2.684, -0.023, -2.192]} rotation={[-0.164, -0.023, 0.141]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_247.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[2.891, 0.006, -2.413]} rotation={[-0.164, -0.023, 0.141]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_249.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group position={[2.729, 0.148, -2.428]} rotation={[-0.164, -0.023, 0.141]} scale={0.097}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_251.geometry}
          material={materials['Jungle.004']}
          position={[0.171, 1.941, 0.104]}
          scale={1.964}
        />
      </group>
      <group
        position={[-0.332, 0.022, 2.462]}
        rotation={[0, -0.523, 0]}
        scale={[0.005, 0.011, 0.005]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_253.geometry}
          material={materials['NEGRO.001']}
          position={[0, 4.441, 0]}
          scale={4.43}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_254.geometry}
          material={materials.LUZ_AMA}
          position={[0, 7.739, 0]}
          scale={1.652}
        />
      </group>
      <group
        position={[-0.232, 0.022, 2.521]}
        rotation={[0, -0.523, 0]}
        scale={[0.005, 0.011, 0.005]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_256.geometry}
          material={materials['NEGRO.001']}
          position={[0, 4.441, 0]}
          scale={4.43}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_257.geometry}
          material={materials.LUZ_AMA}
          position={[0, 7.739, 0]}
          scale={1.652}
        />
      </group>
      <group
        position={[-0.939, 0.022, 2.261]}
        rotation={[0, -0.523, 0]}
        scale={[0.005, 0.011, 0.005]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_259.geometry}
          material={materials['NEGRO.001']}
          position={[0, 4.441, 0]}
          scale={4.43}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_260.geometry}
          material={materials.LUZ_AMA}
          position={[0, 7.739, 0]}
          scale={1.652}
        />
      </group>
      <group
        position={[-0.989, 0.022, 2.241]}
        rotation={[0, -0.523, 0]}
        scale={[0.005, 0.011, 0.005]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_262.geometry}
          material={materials['NEGRO.001']}
          position={[0, 4.441, 0]}
          scale={4.43}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_263.geometry}
          material={materials.LUZ_AMA}
          position={[0, 7.739, 0]}
          scale={1.652}
        />
      </group>
      <group
        position={[-0.466, 0.022, 3.006]}
        rotation={[0, -0.523, 0]}
        scale={[0.006, 0.014, 0.006]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_265.geometry}
          material={materials['NEGRO.001']}
          position={[0, 4.441, 0]}
          scale={4.43}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_266.geometry}
          material={materials.LUZ_AMA}
          position={[0, 7.739, 0]}
          scale={1.652}
        />
      </group>
      <group
        position={[0.072, 0.022, 0.848]}
        rotation={[0, -0.523, 0]}
        scale={[0.005, 0.012, 0.005]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_268.geometry}
          material={materials['NEGRO.001']}
          position={[0, 4.441, 0]}
          scale={4.43}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_269.geometry}
          material={materials.LUZ_AMA}
          position={[0, 7.739, 0]}
          scale={1.652}
        />
      </group>
      <group
        position={[-0.351, 0.022, 1.345]}
        rotation={[0, -0.523, 0]}
        scale={[0.005, 0.012, 0.005]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_271.geometry}
          material={materials['NEGRO.001']}
          position={[0, 4.441, 0]}
          scale={4.43}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_272.geometry}
          material={materials.LUZ_AMA}
          position={[0, 7.739, 0]}
          scale={1.652}
        />
      </group>
      <group
        position={[0.188, 0.022, 1.782]}
        rotation={[0, -0.523, 0]}
        scale={[0.005, 0.012, 0.005]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_274.geometry}
          material={materials['NEGRO.001']}
          position={[0, 4.441, 0]}
          scale={4.43}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_275.geometry}
          material={materials.LUZ_AMA}
          position={[0, 7.739, 0]}
          scale={1.652}
        />
      </group>
      <group
        position={[0.633, 0.022, 1.25]}
        rotation={[0, -0.523, 0]}
        scale={[0.005, 0.012, 0.005]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_277.geometry}
          material={materials['NEGRO.001']}
          position={[0, 4.441, 0]}
          scale={4.43}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_278.geometry}
          material={materials.LUZ_AMA}
          position={[0, 7.739, 0]}
          scale={1.652}
        />
      </group>
      <group position={[0.51, 0.022, 0.93]} rotation={[0, -0.523, 0]} scale={[0.005, 0.011, 0.005]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_280.geometry}
          material={materials['NEGRO.001']}
          position={[0, 4.441, 0]}
          scale={4.43}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_281.geometry}
          material={materials.LUZ_AMA}
          position={[0, 7.739, 0]}
          scale={1.652}
        />
      </group>
      <group
        position={[0.475, 0.026, 1.022]}
        rotation={[0, -0.523, 0]}
        scale={[0.005, 0.012, 0.005]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_283.geometry}
          material={materials['NEGRO.001']}
          position={[0, 4.441, 0]}
          scale={4.43}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_284.geometry}
          material={materials.LUZ_AMA}
          position={[0, 7.739, 0]}
          scale={1.652}
        />
      </group>
      <group
        position={[0.346, 0.026, 0.916]}
        rotation={[0, -0.523, 0]}
        scale={[0.005, 0.012, 0.005]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_286.geometry}
          material={materials['NEGRO.001']}
          position={[0, 4.441, 0]}
          scale={4.43}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_287.geometry}
          material={materials.LUZ_AMA}
          position={[0, 7.739, 0]}
          scale={1.652}
        />
      </group>
      <group
        position={[-0.155, 0.026, 1.094]}
        rotation={[0, -0.523, 0]}
        scale={[0.005, 0.012, 0.005]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_289.geometry}
          material={materials['NEGRO.001']}
          position={[0, 4.441, 0]}
          scale={4.43}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_290.geometry}
          material={materials.LUZ_AMA}
          position={[0, 7.739, 0]}
          scale={1.652}
        />
      </group>
      <group
        position={[-0.117, 0.026, 1.047]}
        rotation={[0, -0.523, 0]}
        scale={[0.005, 0.012, 0.005]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_292.geometry}
          material={materials['NEGRO.001']}
          position={[0, 4.441, 0]}
          scale={4.43}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_293.geometry}
          material={materials.LUZ_AMA}
          position={[0, 7.739, 0]}
          scale={1.652}
        />
      </group>
      <group
        position={[0.454, 0.026, 1.498]}
        rotation={[0, -0.523, 0]}
        scale={[0.005, 0.012, 0.005]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_295.geometry}
          material={materials['NEGRO.001']}
          position={[0, 4.441, 0]}
          scale={4.43}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_296.geometry}
          material={materials.LUZ_AMA}
          position={[0, 7.739, 0]}
          scale={1.652}
        />
      </group>
      <group
        position={[0.388, 0.026, 1.572]}
        rotation={[0, -0.523, 0]}
        scale={[0.005, 0.012, 0.005]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_298.geometry}
          material={materials['NEGRO.001']}
          position={[0, 4.441, 0]}
          scale={4.43}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_299.geometry}
          material={materials.LUZ_AMA}
          position={[0, 7.739, 0]}
          scale={1.652}
        />
      </group>
      <group
        position={[-0.656, 0.004, 1.045]}
        rotation={[0, -0.523, 0]}
        scale={[0.006, 0.015, 0.006]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_301.geometry}
          material={materials['NEGRO.001']}
          position={[0, 4.441, 0]}
          scale={4.43}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_302.geometry}
          material={materials.LUZ_AMA}
          position={[0, 7.739, 0]}
          scale={1.652}
        />
      </group>
      <group
        position={[-0.851, 0.004, 0.964]}
        rotation={[0, -0.523, 0]}
        scale={[0.006, 0.015, 0.006]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_304.geometry}
          material={materials['NEGRO.001']}
          position={[0, 4.441, 0]}
          scale={4.43}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_305.geometry}
          material={materials.LUZ_AMA}
          position={[0, 7.739, 0]}
          scale={1.652}
        />
      </group>
      <group
        position={[-0.464, 0.004, 0.959]}
        rotation={[0, -0.523, 0]}
        scale={[0.006, 0.015, 0.006]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_307.geometry}
          material={materials['NEGRO.001']}
          position={[0, 4.441, 0]}
          scale={4.43}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_308.geometry}
          material={materials.LUZ_AMA}
          position={[0, 7.739, 0]}
          scale={1.652}
        />
      </group>
      <group
        position={[-0.374, 0.004, 0.765]}
        rotation={[0, -0.523, 0]}
        scale={[0.006, 0.015, 0.006]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_310.geometry}
          material={materials['NEGRO.001']}
          position={[0, 4.441, 0]}
          scale={4.43}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_311.geometry}
          material={materials.LUZ_AMA}
          position={[0, 7.739, 0]}
          scale={1.652}
        />
      </group>
      <group
        position={[-0.459, 0.004, 0.568]}
        rotation={[0, -0.523, 0]}
        scale={[0.006, 0.015, 0.006]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_313.geometry}
          material={materials['NEGRO.001']}
          position={[0, 4.441, 0]}
          scale={4.43}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_314.geometry}
          material={materials.LUZ_AMA}
          position={[0, 7.739, 0]}
          scale={1.652}
        />
      </group>
      <group
        position={[-0.654, 0.004, 0.486]}
        rotation={[0, -0.523, 0]}
        scale={[0.006, 0.015, 0.006]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_316.geometry}
          material={materials['NEGRO.001']}
          position={[0, 4.441, 0]}
          scale={4.43}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_317.geometry}
          material={materials.LUZ_AMA}
          position={[0, 7.739, 0]}
          scale={1.652}
        />
      </group>
      <group
        position={[-0.855, 0.004, 0.573]}
        rotation={[0, -0.523, 0]}
        scale={[0.006, 0.015, 0.006]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_319.geometry}
          material={materials['NEGRO.001']}
          position={[0, 4.441, 0]}
          scale={4.43}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_320.geometry}
          material={materials.LUZ_AMA}
          position={[0, 7.739, 0]}
          scale={1.652}
        />
      </group>
      <group
        position={[-0.932, 0.004, 0.761]}
        rotation={[0, -0.523, 0]}
        scale={[0.006, 0.015, 0.006]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_322.geometry}
          material={materials['NEGRO.001']}
          position={[0, 4.441, 0]}
          scale={4.43}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_323.geometry}
          material={materials.LUZ_AMA}
          position={[0, 7.739, 0]}
          scale={1.652}
        />
      </group>
      <group
        position={[-0.154, 0.021, 2.24]}
        rotation={[0, -0.576, 0]}
        scale={[0.292, 0.009, 0.292]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_325.geometry}
          material={materials['cafe_oscuro.001']}
          position={[0.011, 0, 0.523]}
          scale={1.523}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_326.geometry}
          material={materials.NEGRO}
          position={[-0.318, 1.033, 0.712]}
          scale={0.534}
        />
      </group>
      <group position={[-0.123, 0.109, 2.236]} rotation={[0, -0.576, 0]} scale={0.116}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_328.geometry}
          material={materials.GRIS}
          position={[0, -0.087, 0.497]}
          scale={2.144}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_329.geometry}
          material={materials.BLANCO}
          position={[0, 0, 0.097]}
          scale={2.434}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_330.geometry}
          material={materials.VIDRIO}
          position={[0, 0, 0.057]}
          scale={2.393}
        />
      </group>
      <group
        position={[-0.574, 0.021, 2.511]}
        rotation={[0, -0.524, 0]}
        scale={[0.064, 0.069, 0.119]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_332.geometry}
          material={materials.GRIS}
          position={[3.404, 0, -0.083]}
          scale={3.77}
        />
      </group>
      <group
        position={[-0.78, -0.001, 1.779]}
        rotation={[0, 0.415, 0]}
        scale={[0.357, 0.013, 0.357]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_334.geometry}
          material={materials.cafe_oscuro}
          position={[0, 4.704, 0]}
          scale={5.704}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_335.geometry}
          material={materials['cafe_oscuro.001']}
          position={[-0.013, 4.99, 0.011]}
          scale={4.588}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_336.geometry}
          material={materials.VIDRIO}
          position={[0.094, 8.694, -0.106]}
          scale={1.714}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_337.geometry}
          material={materials.cafe_arbol}
          position={[-0.012, 4.442, 0.018]}
          scale={1.62}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_338.geometry}
          material={materials['AZUL.001']}
          position={[-0.058, 1.046, 0.069]}
          scale={0.881}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_339.geometry}
          material={materials.material}
          position={[0.051, 14.409, 0.018]}
          scale={4.868}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_340.geometry}
          material={materials.material}
          position={[0.303, 14.414, 0.262]}
          scale={4.862}
        />
      </group>
      <group position={[-0.656, 0.381, 0.764]} scale={0.297}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_342.geometry}
          material={materials.Branch1_1}
          position={[0, -0.637, -0.012]}
          scale={0.937}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_343.geometry}
          material={materials.cafe_oscuro}
          position={[0, -0.054, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_344.geometry}
          material={materials.BLANCO}
          position={[0, -0.054, 0]}
          scale={0.935}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_345.geometry}
          material={materials.CAFE}
          position={[0, 0.095, 0]}
          scale={0.096}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_346.geometry}
          material={materials['AZUL.001']}
          position={[0, -1.265, 0]}
          scale={0.837}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_347.geometry}
          material={materials.GRIS}
          position={[0, -1.3, 0]}
          scale={1.003}
        />
      </group>
      <group position={[-0.609, 0.046, 1.177]} rotation={[Math.PI / 2, 0, -2.916]} scale={0}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_349.geometry}
          material={materials.wire_000000000}
          position={[43.38, 50.49, -115.105]}
          scale={707.795}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_350.geometry}
          material={materials.amurluk}
          position={[109.723, 118.266, -187.794]}
          scale={683.867}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_351.geometry}
          material={materials.Material__1}
          position={[-26.603, 59.333, -97.472]}
          scale={691.687}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_352.geometry}
          material={materials.Material__1}
          position={[284.102, -139.664, 105.16]}
          scale={506.648}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_353.geometry}
          material={materials.b_lamba}
          position={[419.862, 489.778, -132.477]}
          scale={188.851}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_354.geometry}
          material={materials.kck_lamba}
          position={[431.111, 504.043, -56.177]}
          scale={180.051}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_355.geometry}
          material={materials.CAFE}
          position={[-182.146, -202.374, -505.394]}
          scale={384.173}
        />
      </group>
      <group position={[1.036, 0.213, -0.929]} rotation={[-1.294, 0.269, -0.101]} scale={0.034}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_357.geometry}
          material={materials.cafe_oscuro}
          position={[3.277, 6.531, -1.139]}
          scale={13.739}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_358.geometry}
          material={materials.cafe_oscuro}
          position={[2.497, 5.875, -0.089]}
          scale={5.846}
        />
      </group>
      <group position={[-0.26, 0.019, 0.435]} rotation={[Math.PI / 2, 0, -1.438]} scale={0}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_360.geometry}
          material={materials.wire_000000000}
          position={[43.38, 50.49, -115.105]}
          scale={707.795}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_361.geometry}
          material={materials.amurluk}
          position={[109.723, 118.266, -187.794]}
          scale={683.867}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_362.geometry}
          material={materials.Material__1}
          position={[-26.603, 59.333, -97.472]}
          scale={691.687}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_363.geometry}
          material={materials.Material__1}
          position={[284.102, -139.664, 105.16]}
          scale={506.648}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_364.geometry}
          material={materials.b_lamba}
          position={[419.862, 489.778, -132.477]}
          scale={188.851}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_365.geometry}
          material={materials.kck_lamba}
          position={[431.111, 504.043, -56.177]}
          scale={180.051}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_366.geometry}
          material={materials.CAFE}
          position={[-182.146, -202.374, -505.394]}
          scale={384.173}
        />
      </group>
      <group position={[1.899, 0.176, -1.512]} rotation={[2.037, -0.21, 2.856]} scale={0}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_368.geometry}
          material={materials.wire_000000000}
          position={[43.38, 50.49, -115.105]}
          scale={707.795}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_369.geometry}
          material={materials.amurluk}
          position={[109.723, 118.266, -187.794]}
          scale={683.867}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_370.geometry}
          material={materials.Material__1}
          position={[-26.603, 59.333, -97.472]}
          scale={691.687}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_371.geometry}
          material={materials.Material__1}
          position={[284.102, -139.664, 105.16]}
          scale={506.648}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_372.geometry}
          material={materials.b_lamba}
          position={[419.862, 489.778, -132.477]}
          scale={188.851}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_373.geometry}
          material={materials.kck_lamba}
          position={[431.111, 504.043, -56.177]}
          scale={180.051}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_374.geometry}
          material={materials.CAFE}
          position={[-182.146, -202.374, -505.394]}
          scale={384.173}
        />
      </group>
      <group position={[0.636, 0.008, -1.985]} rotation={[Math.PI / 2, 0, -2.81]} scale={0}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_376.geometry}
          material={materials.wire_000000000}
          position={[43.38, 50.49, -115.105]}
          scale={707.795}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_377.geometry}
          material={materials.amurluk}
          position={[109.723, 118.266, -187.794]}
          scale={683.867}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_378.geometry}
          material={materials.Material__1}
          position={[-26.603, 59.333, -97.472]}
          scale={691.687}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_379.geometry}
          material={materials.Material__1}
          position={[284.102, -139.664, 105.16]}
          scale={506.648}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_380.geometry}
          material={materials.b_lamba}
          position={[419.862, 489.778, -132.477]}
          scale={188.851}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_381.geometry}
          material={materials.kck_lamba}
          position={[431.111, 504.043, -56.177]}
          scale={180.051}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_382.geometry}
          material={materials.CAFE}
          position={[-182.146, -202.374, -505.394]}
          scale={384.173}
        />
      </group>
      <group position={[0.161, 0.004, -2.197]} rotation={[Math.PI / 2, 0, 0.489]} scale={0}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_384.geometry}
          material={materials.wire_000000000}
          position={[43.38, 50.49, -115.105]}
          scale={707.795}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_385.geometry}
          material={materials.amurluk}
          position={[109.723, 118.266, -187.794]}
          scale={683.867}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_386.geometry}
          material={materials.Material__1}
          position={[-26.603, 59.333, -97.472]}
          scale={691.687}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_387.geometry}
          material={materials.Material__1}
          position={[284.102, -139.664, 105.16]}
          scale={506.648}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_388.geometry}
          material={materials.b_lamba}
          position={[419.862, 489.778, -132.477]}
          scale={188.851}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_389.geometry}
          material={materials.kck_lamba}
          position={[431.111, 504.043, -56.177]}
          scale={180.051}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_390.geometry}
          material={materials.CAFE}
          position={[-182.146, -202.374, -505.394]}
          scale={384.173}
        />
      </group>
      <group
        position={[-1.061, 0.012, 0.367]}
        rotation={[0.521, 0.27, -0.131]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_392.geometry}
          material={materials['leaves.004']}
          position={[9.275, 0.563, 0.072]}
          scale={10.407}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_393.geometry}
          material={materials.rojo}
          position={[8.848, 0.646, -0.546]}
          scale={9.586}
        />
      </group>
      <group
        position={[-0.923, 0.045, 0.229]}
        rotation={[0.521, 0.27, -0.131]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_395.geometry}
          material={materials['leaves.004']}
          position={[6.962, 0.563, 0.095]}
          scale={8.095}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_396.geometry}
          material={materials.rojo}
          position={[7.052, 0.567, -0.562]}
          scale={7.484}
        />
      </group>
      <group
        position={[-0.822, 0.076, 0.09]}
        rotation={[0.521, 0.27, -0.131]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_398.geometry}
          material={materials['leaves.004']}
          position={[5.805, 0.405, 0.072]}
          scale={6.938}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_399.geometry}
          material={materials.rojo}
          position={[5.896, 1.512, 0.023]}
          scale={6.109}
        />
      </group>
      <group
        position={[-0.747, 0.11, -0.033]}
        rotation={[0.479, 0.27, -0.128]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_401.geometry}
          material={materials['leaves.004']}
          position={[4.649, 0.563, 0.095]}
          scale={5.782}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_402.geometry}
          material={materials.rojo}
          position={[4.739, 0.567, -0.562]}
          scale={5.171}
        />
      </group>
      <group
        position={[-0.628, 0.146, -0.159]}
        rotation={[0.479, 0.27, -0.128]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_404.geometry}
          material={materials['leaves.004']}
          position={[2.336, 0.563, 0.095]}
          scale={3.469}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_405.geometry}
          material={materials.rojo}
          position={[2.427, 0.567, -0.562]}
          scale={2.858}
        />
      </group>
      <group
        position={[-0.538, 0.18, -0.296]}
        rotation={[0.479, 0.27, -0.128]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_407.geometry}
          material={materials['leaves.004']}
          position={[1.18, 0.563, 0.095]}
          scale={2.313}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_408.geometry}
          material={materials.rojo}
          position={[1.27, 0.567, -0.562]}
          scale={1.702}
        />
      </group>
      <group
        position={[-0.38, 0.002, 0.162]}
        rotation={[0.556, -0.36, 0.127]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_410.geometry}
          material={materials['leaves.004']}
          position={[6.962, 0.563, 0.072]}
          scale={8.095}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_411.geometry}
          material={materials.rojo}
          position={[6.535, 0.646, -0.546]}
          scale={7.274}
        />
      </group>
      <group
        position={[-0.381, 0.045, 0.07]}
        rotation={[0.556, -0.36, 0.127]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_413.geometry}
          material={materials['leaves.004']}
          position={[5.805, 0.563, 0.072]}
          scale={6.938}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_414.geometry}
          material={materials.rojo}
          position={[5.379, 0.646, -0.546]}
          scale={6.117}
        />
      </group>
      <group
        position={[-0.36, 0.077, -0.008]}
        rotation={[0.556, -0.36, 0.127]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_416.geometry}
          material={materials['leaves.004']}
          position={[4.649, 0.563, 0.095]}
          scale={5.782}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_417.geometry}
          material={materials.rojo}
          position={[4.739, 0.567, -0.562]}
          scale={5.171}
        />
      </group>
      <group
        position={[-0.377, 0.099, -0.111]}
        rotation={[0.556, -0.36, 0.127]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_419.geometry}
          material={materials['leaves.004']}
          position={[3.493, 0.563, 0.072]}
          scale={4.626}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_420.geometry}
          material={materials.rojo}
          position={[3.066, 0.646, -0.546]}
          scale={3.804}
        />
      </group>
      <group
        position={[-0.393, 0.135, -0.2]}
        rotation={[0.556, -0.36, 0.127]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_422.geometry}
          material={materials['leaves.004']}
          position={[2.336, 0.563, 0.095]}
          scale={3.469}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_423.geometry}
          material={materials.rojo}
          position={[2.427, 0.567, -0.562]}
          scale={2.858}
        />
      </group>
      <group
        position={[-0.396, 0.175, -0.319]}
        rotation={[0.556, -0.36, 0.127]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_425.geometry}
          material={materials['leaves.004']}
          position={[1.18, 0.563, 0.095]}
          scale={2.313}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_426.geometry}
          material={materials.rojo}
          position={[1.27, 0.567, -0.562]}
          scale={1.702}
        />
      </group>
      <group
        position={[-1.123, 0.009, -0.435]}
        rotation={[1.508, -0.97, 1.503]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_428.geometry}
          material={materials['leaves.004']}
          position={[11.587, 0.563, 0.095]}
          scale={12.72}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_429.geometry}
          material={materials.rojo}
          position={[11.678, 0.567, -0.562]}
          scale={12.109}
        />
      </group>
      <group
        position={[-1.025, 0.036, -0.428]}
        rotation={[1.486, -1.109, 1.485]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_431.geometry}
          material={materials['leaves.004']}
          position={[9.275, 0.405, 0.072]}
          scale={10.407}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_432.geometry}
          material={materials.rojo}
          position={[9.365, 1.512, 0.023]}
          scale={9.578}
        />
      </group>
      <group
        position={[-0.909, 0.074, -0.44]}
        rotation={[1.486, -1.109, 1.485]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_434.geometry}
          material={materials['leaves.004']}
          position={[6.962, 0.563, 0.002]}
          scale={8.095}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_435.geometry}
          material={materials.rojo}
          position={[6.992, 0.385, 0.599]}
          scale={7.601}
        />
      </group>
      <group
        position={[-0.791, 0.115, -0.45]}
        rotation={[1.486, -1.109, 1.485]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_437.geometry}
          material={materials['leaves.004']}
          position={[5.805, 0.563, 0.095]}
          scale={6.938}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_438.geometry}
          material={materials.rojo}
          position={[5.896, 0.567, -0.562]}
          scale={6.327}
        />
      </group>
      <group
        position={[-0.686, 0.135, -0.438]}
        rotation={[1.486, -1.109, 1.485]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_440.geometry}
          material={materials['leaves.004']}
          position={[3.493, 0.405, 0.072]}
          scale={4.626}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_441.geometry}
          material={materials.rojo}
          position={[3.583, 1.512, 0.023]}
          scale={3.796}
        />
      </group>
      <group
        position={[-0.598, 0.177, -0.43]}
        rotation={[1.486, -1.109, 1.485]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_443.geometry}
          material={materials['leaves.004']}
          position={[1.18, 0.405, 0.072]}
          scale={2.313}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_444.geometry}
          material={materials.rojo}
          position={[1.27, 1.512, 0.023]}
          scale={1.483}
        />
      </group>
      <group
        position={[-1.05, 0.216, -1.189]}
        rotation={[2.113, -1.276, 1.851]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_446.geometry}
          material={materials['leaves.004']}
          position={[10.431, 0.563, 0.095]}
          scale={11.564}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_447.geometry}
          material={materials.rojo}
          position={[10.521, 0.567, -0.562]}
          scale={10.953}
        />
      </group>
      <group
        position={[-0.97, 0.222, -1.104]}
        rotation={[2.07, -1.225, 1.811]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_449.geometry}
          material={materials['leaves.004']}
          position={[9.275, 0.563, 0.095]}
          scale={10.407}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_450.geometry}
          material={materials.rojo}
          position={[9.365, 0.567, -0.562]}
          scale={9.796}
        />
      </group>
      <group
        position={[-0.872, 0.226, -0.965]}
        rotation={[2.173, -1.325, 1.909]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_452.geometry}
          material={materials['leaves.004']}
          position={[6.962, 0.563, 0.095]}
          scale={8.095}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_453.geometry}
          material={materials.rojo}
          position={[7.052, 0.567, -0.562]}
          scale={7.484}
        />
      </group>
      <group
        position={[-0.785, 0.215, -0.834]}
        rotation={[2.058, -1.208, 1.8]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_455.geometry}
          material={materials['leaves.004']}
          position={[4.649, 0.563, 0.095]}
          scale={5.782}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_456.geometry}
          material={materials.rojo}
          position={[4.739, 0.567, -0.562]}
          scale={5.171}
        />
      </group>
      <group
        position={[-0.691, 0.218, -0.736]}
        rotation={[1.928, -1.229, 1.661]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_458.geometry}
          material={materials['leaves.004']}
          position={[3.434, 0.582, 0.072]}
          scale={4.567}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_459.geometry}
          material={materials.rojo}
          position={[4.176, 0.248, 0.049]}
          scale={3.942}
        />
      </group>
      <group
        position={[-0.588, 0.218, -0.604]}
        rotation={[2.005, -1.385, 1.736]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_461.geometry}
          material={materials['leaves.004']}
          position={[1.18, 0.563, 0.095]}
          scale={2.313}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_462.geometry}
          material={materials.rojo}
          position={[1.27, 0.567, -0.562]}
          scale={1.702}
        />
      </group>
      <group
        position={[-0.307, 0.026, -1.189]}
        rotation={[2.889, -0.021, -2.869]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_464.geometry}
          material={materials['leaves.004']}
          position={[10.431, 0.563, 0.072]}
          scale={11.564}
        />
      </group>
      <group
        position={[-0.311, 0.056, -1.09]}
        rotation={[2.888, -0.017, -2.886]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_466.geometry}
          material={materials['leaves.004']}
          position={[9.275, 0.563, 0.072]}
          scale={10.407}
        />
      </group>
      <group
        position={[-0.345, 0.101, -0.973]}
        rotation={[2.888, -0.017, -2.886]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_468.geometry}
          material={materials['leaves.004']}
          position={[6.904, 0.582, 0.072]}
          scale={8.036}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_469.geometry}
          material={materials.rojo}
          position={[7.645, 0.248, 0.049]}
          scale={7.412}
        />
      </group>
      <group
        position={[-0.39, 0.136, -0.851]}
        rotation={[2.888, -0.017, -2.886]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_471.geometry}
          material={materials['leaves.004']}
          position={[4.649, 0.563, 0.095]}
          scale={5.782}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_472.geometry}
          material={materials.rojo}
          position={[4.739, 0.567, -0.562]}
          scale={5.171}
        />
      </group>
      <group
        position={[-0.405, 0.144, -0.729]}
        rotation={[2.893, -0.034, -2.819]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_474.geometry}
          material={materials['leaves.004']}
          position={[3.493, 0.563, 0.095]}
          scale={4.626}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_475.geometry}
          material={materials.rojo}
          position={[3.583, 0.567, -0.562]}
          scale={4.014}
        />
      </group>
      <group
        position={[-0.443, 0.181, -0.607]}
        rotation={[2.893, -0.034, -2.819]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_477.geometry}
          material={materials['leaves.004']}
          position={[1.18, 0.563, 0.072]}
          scale={2.313}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_478.geometry}
          material={materials.rojo}
          position={[0.753, 0.646, -0.546]}
          scale={1.492}
        />
      </group>
      <group
        position={[0.212, 0.205, -1.188]}
        rotation={[2.899, 0.096, 2.759]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_480.geometry}
          material={materials['leaves.004']}
          position={[6.962, 0.563, 0.072]}
          scale={8.095}
        />
      </group>
      <group
        position={[0.131, 0.21, -1.101]}
        rotation={[2.9, 0.045, 2.746]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_482.geometry}
          material={materials['leaves.004']}
          position={[5.805, 0.563, 0.072]}
          scale={6.938}
        />
      </group>
      <group
        position={[0.004, 0.208, -0.976]}
        rotation={[2.689, 0.131, 2.765]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_484.geometry}
          material={materials['leaves.004']}
          position={[4.649, 0.405, 0.072]}
          scale={5.782}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_485.geometry}
          material={materials.rojo}
          position={[4.739, 1.512, 0.023]}
          scale={4.952}
        />
      </group>
      <group
        position={[-0.106, 0.206, -0.848]}
        rotation={[2.689, 0.131, 2.765]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_487.geometry}
          material={materials['leaves.004']}
          position={[3.493, 0.563, 0.072]}
          scale={4.626}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_488.geometry}
          material={materials.rojo}
          position={[3.469, 0.409, 0.025]}
          scale={4.46}
        />
      </group>
      <group
        position={[-0.21, 0.214, -0.737]}
        rotation={[2.835, 0.072, 2.75]}
        scale={[0.029, 0.015, 0.029]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_490.geometry}
          material={materials['leaves.004']}
          position={[2.407, 0.563, 0.072]}
          scale={3.398}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_491.geometry}
          material={materials.rojo}
          position={[1.764, 0.484, 0.181]}
          scale={2.897}
        />
      </group>
      <group
        position={[-0.308, 0.215, -0.604]}
        rotation={[2.835, 0.072, 2.75]}
        scale={[0.029, 0.015, 0.029]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_493.geometry}
          material={materials['leaves.004']}
          position={[1.18, 0.563, 0.072]}
          scale={2.313}
        />
      </group>
      <group
        position={[0.175, 0.074, -0.464]}
        rotation={[1.341, 1.308, -1.109]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_495.geometry}
          material={materials['leaves.004']}
          position={[10.431, 0.405, 0.072]}
          scale={11.564}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_496.geometry}
          material={materials.rojo}
          position={[10.521, 1.512, 0.023]}
          scale={10.734}
        />
      </group>
      <group
        position={[0.084, 0.092, -0.475]}
        rotation={[1.341, 1.308, -1.109]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_498.geometry}
          material={materials['leaves.004']}
          position={[9.275, 0.405, 0.072]}
          scale={10.407}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_499.geometry}
          material={materials.rojo}
          position={[9.365, 1.512, 0.023]}
          scale={9.578}
        />
      </group>
      <group
        position={[-0.026, 0.122, -0.481]}
        rotation={[1.341, 1.308, -1.109]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_501.geometry}
          material={materials['leaves.004']}
          position={[7.033, 0.563, 0.072]}
          scale={8.024}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_502.geometry}
          material={materials.rojo}
          position={[6.389, 0.484, 0.181]}
          scale={7.522}
        />
      </group>
      <group
        position={[-0.133, 0.154, -0.48]}
        rotation={[1.341, 1.308, -1.109]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_504.geometry}
          material={materials['leaves.004']}
          position={[4.846, 0.563, 0.072]}
          scale={5.585}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_505.geometry}
          material={materials.rojo}
          position={[4.591, 0.484, 0.025]}
          scale={5.724}
        />
      </group>
      <group
        position={[-0.234, 0.186, -0.491]}
        rotation={[1.341, 1.308, -1.109]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_507.geometry}
          material={materials['leaves.004']}
          position={[2.336, 0.563, 0.002]}
          scale={3.469}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_508.geometry}
          material={materials.rojo}
          position={[2.366, 0.385, 0.599]}
          scale={2.976}
        />
      </group>
      <group
        position={[-0.334, 0.217, -0.478]}
        rotation={[1.341, 1.308, -1.109]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_510.geometry}
          material={materials['leaves.004']}
          position={[0.094, 0.563, 0.072]}
          scale={1.435}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_511.geometry}
          material={materials.rojo}
          position={[-0.549, 0.484, 0.181]}
          scale={1.198}
        />
      </group>
      <group
        position={[-0.52, 0.207, -0.462]}
        rotation={[-1.115, 1.112, 1.306]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_513.geometry}
          material={materials['leaves.004']}
          position={[0.094, 0.563, 0.072]}
          scale={1.435}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_514.geometry}
          material={materials.rojo}
          position={[-0.549, 0.484, 0.181]}
          scale={1.198}
        />
      </group>
      <group
        position={[0.11, -0.025, 0.304]}
        rotation={[1.435, 1.308, -1.314]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_516.geometry}
          material={materials['leaves.004']}
          position={[10.431, 0.405, 0.072]}
          scale={11.564}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_517.geometry}
          material={materials.rojo}
          position={[10.521, 1.512, 0.023]}
          scale={10.734}
        />
      </group>
      <group
        position={[0.025, 0.02, 0.149]}
        rotation={[1.435, 1.308, -1.314]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_519.geometry}
          material={materials['leaves.004']}
          position={[8.118, 0.405, 0.072]}
          scale={9.251}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_520.geometry}
          material={materials.rojo}
          position={[8.208, 1.512, 0.023]}
          scale={8.421}
        />
      </group>
      <group
        position={[-0.086, 0.072, 0.002]}
        rotation={[1.435, 1.308, -1.314]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_522.geometry}
          material={materials['leaves.004']}
          position={[5.805, 0.405, 0.072]}
          scale={6.938}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_523.geometry}
          material={materials.rojo}
          position={[5.896, 1.512, 0.023]}
          scale={6.109}
        />
      </group>
      <group
        position={[-0.179, 0.118, -0.157]}
        rotation={[1.435, 1.308, -1.314]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_525.geometry}
          material={materials['leaves.004']}
          position={[3.493, 0.405, 0.072]}
          scale={4.626}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_526.geometry}
          material={materials.rojo}
          position={[3.583, 1.512, 0.023]}
          scale={3.796}
        />
      </group>
      <group
        position={[-0.273, 0.158, -0.324]}
        rotation={[1.435, 1.308, -1.314]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_528.geometry}
          material={materials['leaves.004']}
          position={[1.18, 0.405, 0.072]}
          scale={2.313}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_529.geometry}
          material={materials.rojo}
          position={[1.27, 1.512, 0.023]}
          scale={1.483}
        />
      </group>
      <group
        position={[-0.436, 0.218, -0.398]}
        rotation={[1.435, 1.308, -1.314]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_531.geometry}
          material={materials['leaves.004']}
          position={[1.18, 0.563, 0.072]}
          scale={2.313}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_532.geometry}
          material={materials.rojo}
          position={[0.753, 0.646, -0.546]}
          scale={1.492}
        />
      </group>
      <group
        position={[0.206, -0.021, 0.284]}
        rotation={[-1.224, 1.294, 1.328]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_534.geometry}
          material={materials['leaves.004']}
          position={[10.431, 0.405, 0.072]}
          scale={11.564}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_535.geometry}
          material={materials.rojo}
          position={[10.521, 1.512, 0.023]}
          scale={10.734}
        />
      </group>
      <group
        position={[0.314, 0.006, 0.203]}
        rotation={[-1.224, 1.294, 1.328]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_537.geometry}
          material={materials['leaves.004']}
          position={[9.275, 0.405, 0.072]}
          scale={10.407}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_538.geometry}
          material={materials.rojo}
          position={[9.365, 1.512, 0.023]}
          scale={9.578}
        />
      </group>
      <group
        position={[0.43, 0.031, 0.05]}
        rotation={[-1.224, 1.294, 1.328]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_540.geometry}
          material={materials['leaves.004']}
          position={[6.962, 0.563, 0.002]}
          scale={8.095}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_541.geometry}
          material={materials.rojo}
          position={[6.992, 0.385, 0.599]}
          scale={7.601}
        />
      </group>
      <group
        position={[0.542, 0.046, -0.036]}
        rotation={[-1.224, 1.294, 1.328]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_543.geometry}
          material={materials['leaves.004']}
          position={[5.805, 0.405, 0.072]}
          scale={6.938}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_544.geometry}
          material={materials.rojo}
          position={[5.896, 1.512, 0.023]}
          scale={6.109}
        />
      </group>
      <group
        position={[0.667, 0.085, -0.193]}
        rotation={[-1.224, 1.294, 1.328]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_546.geometry}
          material={materials['leaves.004']}
          position={[3.493, 0.405, 0.072]}
          scale={4.626}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_547.geometry}
          material={materials.rojo}
          position={[3.583, 1.512, 0.023]}
          scale={3.796}
        />
      </group>
      <group
        position={[0.793, 0.113, -0.277]}
        rotation={[-1.224, 1.294, 1.328]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_549.geometry}
          material={materials['leaves.004']}
          position={[2.278, 0.582, 0.072]}
          scale={3.411}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_550.geometry}
          material={materials.rojo}
          position={[3.019, 0.248, 0.049]}
          scale={2.786}
        />
      </group>
      <group
        position={[0.923, 0.137, -0.382]}
        rotation={[-1.224, 1.294, 1.328]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_552.geometry}
          material={materials['leaves.004']}
          position={[1.18, 0.563, 0.002]}
          scale={2.313}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_553.geometry}
          material={materials.rojo}
          position={[1.21, 0.385, 0.599]}
          scale={1.819}
        />
      </group>
      <group
        position={[0.284, 0.058, -0.48]}
        rotation={[-0.974, 1.344, 1.2]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_555.geometry}
          material={materials['leaves.004']}
          position={[10.431, 0.405, 0.072]}
          scale={11.564}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_556.geometry}
          material={materials.rojo}
          position={[10.521, 1.512, 0.023]}
          scale={10.734}
        />
      </group>
      <group
        position={[0.362, 0.083, -0.502]}
        rotation={[-0.859, 1.323, 1.082]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_558.geometry}
          material={materials['leaves.004']}
          position={[8.189, 0.563, 0.072]}
          scale={9.18}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_559.geometry}
          material={materials.rojo}
          position={[7.546, 0.484, 0.181]}
          scale={8.679}
        />
      </group>
      <group
        position={[0.463, 0.091, -0.493]}
        rotation={[-0.859, 1.323, 1.082]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_561.geometry}
          material={materials['leaves.004']}
          position={[6.962, 0.405, 0.072]}
          scale={8.095}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_562.geometry}
          material={materials.rojo}
          position={[7.052, 1.512, 0.023]}
          scale={7.265}
        />
      </group>
      <group
        position={[0.575, 0.101, -0.499]}
        rotation={[-0.859, 1.323, 1.082]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_564.geometry}
          material={materials['leaves.004']}
          position={[5.805, 0.563, 0.072]}
          scale={6.938}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_565.geometry}
          material={materials.rojo}
          position={[5.379, 0.646, -0.546]}
          scale={6.117}
        />
      </group>
      <group
        position={[0.695, 0.128, -0.508]}
        rotation={[-0.859, 1.323, 1.082]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_567.geometry}
          material={materials['leaves.004']}
          position={[3.564, 0.563, 0.072]}
          scale={4.555}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_568.geometry}
          material={materials.rojo}
          position={[2.92, 0.484, 0.181]}
          scale={4.053}
        />
      </group>
      <group
        position={[0.81, 0.145, -0.516]}
        rotation={[-0.859, 1.323, 1.082]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_570.geometry}
          material={materials['leaves.004']}
          position={[2.336, 0.563, 0.095]}
          scale={3.469}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_571.geometry}
          material={materials.rojo}
          position={[2.427, 0.567, -0.562]}
          scale={2.858}
        />
      </group>
      <group
        position={[0.927, 0.173, -0.531]}
        rotation={[-0.859, 1.323, 1.082]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_573.geometry}
          material={materials['leaves.004']}
          position={[0.023, 0.563, 0.072]}
          scale={1.435}
        />
      </group>
      <group
        position={[0.728, -0.055, 0.367]}
        rotation={[-2.88, 0.058, -3.114]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_575.geometry}
          material={materials['leaves.004']}
          position={[6.962, 0.405, 0.072]}
          scale={8.095}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_576.geometry}
          material={materials.rojo}
          position={[7.052, 1.512, 0.023]}
          scale={7.265}
        />
      </group>
      <group
        position={[0.771, -0.035, 0.271]}
        rotation={[-2.88, 0.058, -3.114]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_578.geometry}
          material={materials['leaves.004']}
          position={[5.805, 0.405, 0.072]}
          scale={6.938}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_579.geometry}
          material={materials.rojo}
          position={[5.896, 1.512, 0.023]}
          scale={6.109}
        />
      </group>
      <group
        position={[0.797, -0.009, 0.154]}
        rotation={[-2.88, 0.058, -3.114]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_581.geometry}
          material={materials['leaves.004']}
          position={[4.649, 0.405, 0.072]}
          scale={5.782}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_582.geometry}
          material={materials.rojo}
          position={[4.739, 1.512, 0.023]}
          scale={4.952}
        />
      </group>
      <group
        position={[0.824, 0.019, 0.028]}
        rotation={[-2.88, 0.058, -3.114]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_584.geometry}
          material={materials['leaves.004']}
          position={[3.493, 0.405, 0.072]}
          scale={4.626}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_585.geometry}
          material={materials.rojo}
          position={[3.583, 1.512, 0.023]}
          scale={3.796}
        />
      </group>
      <group
        position={[0.85, 0.051, -0.087]}
        rotation={[-2.88, 0.058, -3.114]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_587.geometry}
          material={materials['leaves.004']}
          position={[2.336, 0.405, 0.072]}
          scale={3.469}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_588.geometry}
          material={materials.rojo}
          position={[2.426, 1.512, 0.023]}
          scale={2.639}
        />
      </group>
      <group
        position={[0.92, 0.078, -0.2]}
        rotation={[-2.88, 0.058, -3.114]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_590.geometry}
          material={materials['leaves.004']}
          position={[1.18, 0.405, 0.072]}
          scale={2.313}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_591.geometry}
          material={materials.rojo}
          position={[1.27, 1.512, 0.023]}
          scale={1.483}
        />
      </group>
      <group
        position={[0.925, 0.116, -0.312]}
        rotation={[-2.88, 0.058, -3.114]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_593.geometry}
          material={materials['leaves.004']}
          position={[0.023, 0.405, 0.072]}
          scale={1.277}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_594.geometry}
          material={materials.rojo}
          position={[0.114, 1.512, 0.023]}
          scale={0.486}
        />
      </group>
      <group
        position={[0.842, -0.04, 0.253]}
        rotation={[0.093, 0.752, 0.189]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_596.geometry}
          material={materials['leaves.004']}
          position={[3.493, 0.405, 0.072]}
          scale={4.626}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_597.geometry}
          material={materials.rojo}
          position={[3.583, 1.512, 0.023]}
          scale={3.796}
        />
      </group>
      <group
        position={[0.878, -0.014, 0.109]}
        rotation={[0.093, 0.752, 0.189]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_599.geometry}
          material={materials['leaves.004']}
          position={[2.336, 0.405, 0.072]}
          scale={3.469}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_600.geometry}
          material={materials.rojo}
          position={[2.426, 1.512, 0.023]}
          scale={2.639}
        />
      </group>
      <group
        position={[0.904, 0.021, -0.03]}
        rotation={[0.093, 0.752, 0.189]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_602.geometry}
          material={materials['leaves.004']}
          position={[2.336, 0.405, 0.072]}
          scale={3.469}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_603.geometry}
          material={materials.rojo}
          position={[2.426, 1.512, 0.023]}
          scale={2.639}
        />
      </group>
      <group
        position={[0.98, 0.089, -0.194]}
        rotation={[0.093, 0.752, 0.189]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_605.geometry}
          material={materials['leaves.004']}
          position={[1.18, 0.405, 0.072]}
          scale={2.313}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_606.geometry}
          material={materials.rojo}
          position={[1.27, 1.512, 0.023]}
          scale={1.483}
        />
      </group>
      <group
        position={[1.007, 0.119, -0.315]}
        rotation={[0.093, 0.752, 0.189]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_608.geometry}
          material={materials['leaves.004']}
          position={[0.023, 0.405, 0.072]}
          scale={1.277}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_609.geometry}
          material={materials.rojo}
          position={[0.114, 1.512, 0.023]}
          scale={0.486}
        />
      </group>
      <group
        position={[-1.188, 0, 0.334]}
        rotation={[-Math.PI, 1.501, -Math.PI]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_611.geometry}
          material={materials['leaves.004']}
          position={[11.587, 0.563, 0.072]}
          scale={12.72}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_612.geometry}
          material={materials.rojo}
          position={[11.161, 0.646, -0.546]}
          scale={11.899}
        />
      </group>
      <group
        position={[-1.295, 0, 0.318]}
        rotation={[-Math.PI, 1.501, -Math.PI]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_614.geometry}
          material={materials['leaves.004']}
          position={[11.587, 0.405, 0.072]}
          scale={12.72}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_615.geometry}
          material={materials.rojo}
          position={[11.677, 1.512, 0.023]}
          scale={11.89}
        />
      </group>
      <group
        position={[-1.408, 0, 0.27]}
        rotation={[-Math.PI, 1.501, -Math.PI]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_617.geometry}
          material={materials['leaves.004']}
          position={[10.502, 0.563, 0.072]}
          scale={11.493}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_618.geometry}
          material={materials.rojo}
          position={[9.858, 0.484, 0.181]}
          scale={10.991}
        />
      </group>
      <group
        position={[-1.509, 0, 0.252]}
        rotation={[-Math.PI, 1.501, -Math.PI]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_620.geometry}
          material={materials['leaves.004']}
          position={[10.502, 0.563, 0.072]}
          scale={11.493}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_621.geometry}
          material={materials.rojo}
          position={[9.858, 0.484, 0.181]}
          scale={10.991}
        />
      </group>
      <group
        position={[-1.622, 0, 0.227]}
        rotation={[-Math.PI, 1.501, -Math.PI]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_623.geometry}
          material={materials['leaves.004']}
          position={[10.444, 0.582, 0.072]}
          scale={11.435}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_624.geometry}
          material={materials.rojo}
          position={[10.431, 0.405, 0.107]}
          scale={11.564}
        />
      </group>
      <group
        position={[-1.72, 0, 0.197]}
        rotation={[-Math.PI, 1.501, -Math.PI]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_626.geometry}
          material={materials['leaves.004']}
          position={[9.275, 0.563, 0.002]}
          scale={10.407}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_627.geometry}
          material={materials.rojo}
          position={[9.304, 0.385, 0.599]}
          scale={9.914}
        />
      </group>
      <group
        position={[-1.234, 0, -0.507]}
        rotation={[0, 1.466, 0.279]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_629.geometry}
          material={materials['leaves.004']}
          position={[10.431, 0.563, 0.002]}
          scale={11.564}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_630.geometry}
          material={materials.rojo}
          position={[10.461, 0.385, 0.599]}
          scale={11.07}
        />
      </group>
      <group
        position={[-1.346, 0, -0.528]}
        rotation={[0, 1.466, 0.279]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_632.geometry}
          material={materials['leaves.004']}
          position={[6.962, 0.563, 0.072]}
          scale={8.095}
        />
      </group>
      <group
        position={[-1.459, 0, -0.507]}
        rotation={[0, 1.466, 0.279]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_634.geometry}
          material={materials['leaves.004']}
          position={[5.805, 0.563, 0.072]}
          scale={6.938}
        />
      </group>
      <group
        position={[-1.559, 0, -0.515]}
        rotation={[0, 1.466, 0.279]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_636.geometry}
          material={materials['leaves.004']}
          position={[3.493, 0.563, 0.072]}
          scale={4.626}
        />
      </group>
      <group
        position={[-1.666, 0, -0.52]}
        rotation={[0, 1.466, 0.279]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_638.geometry}
          material={materials['leaves.004']}
          position={[1.18, 0.563, 0.072]}
          scale={2.313}
        />
      </group>
      <group position={[-1.659, 0, -1.225]} rotation={[0, 0, 0.384]} scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_640.geometry}
          material={materials['leaves.004']}
          position={[8.06, 0.582, 0.072]}
          scale={9.193}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_641.geometry}
          material={materials.rojo}
          position={[8.801, 0.248, 0.049]}
          scale={8.568}
        />
      </group>
      <group position={[-1.673, 0, -1.126]} rotation={[0, 0, 0.384]} scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_643.geometry}
          material={materials['leaves.004']}
          position={[6.962, 0.563, 0.095]}
          scale={8.095}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_644.geometry}
          material={materials.rojo}
          position={[7.064, 0.567, -0.563]}
          scale={7.49}
        />
      </group>
      <group position={[-1.687, 0, -1.03]} rotation={[0, 0, 0.384]} scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_646.geometry}
          material={materials['leaves.004']}
          position={[5.805, 0.563, 0.095]}
          scale={6.938}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_647.geometry}
          material={materials.rojo}
          position={[5.896, 0.567, -0.562]}
          scale={6.327}
        />
      </group>
      <group position={[-1.699, 0, -0.917]} rotation={[0, 0, 0.384]} scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_649.geometry}
          material={materials['leaves.004']}
          position={[3.493, 0.563, 0.095]}
          scale={4.626}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_650.geometry}
          material={materials.rojo}
          position={[3.583, 0.567, -0.562]}
          scale={4.014}
        />
      </group>
      <group position={[-1.714, 0, -0.818]} rotation={[0, 0, 0.384]} scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_652.geometry}
          material={materials['leaves.004']}
          position={[3.493, 0.563, 0.095]}
          scale={4.626}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_653.geometry}
          material={materials.rojo}
          position={[3.583, 0.567, -0.562]}
          scale={4.014}
        />
      </group>
      <group position={[-1.729, 0, -0.712]} rotation={[0, 0, 0.384]} scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_655.geometry}
          material={materials['leaves.004']}
          position={[2.336, 0.563, 0.002]}
          scale={3.469}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_656.geometry}
          material={materials.rojo}
          position={[2.366, 0.385, 0.599]}
          scale={2.976}
        />
      </group>
      <group position={[-1.742, 0, -0.601]} rotation={[0, 0, 0.384]} scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_658.geometry}
          material={materials['leaves.004']}
          position={[1.122, 0.582, 0.072]}
          scale={2.255}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_659.geometry}
          material={materials.rojo}
          position={[1.863, 0.248, 0.049]}
          scale={1.63}
        />
      </group>
      <group
        position={[-1.624, 0.018, -1.316]}
        rotation={[-0.211, -0.084, 0.375]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_661.geometry}
          material={materials['leaves.004']}
          position={[8.06, 0.582, 0.072]}
          scale={9.193}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_662.geometry}
          material={materials.rojo}
          position={[8.801, 0.248, 0.049]}
          scale={8.568}
        />
      </group>
      <group
        position={[-1.582, 0.018, -1.402]}
        rotation={[-0.211, -0.084, 0.375]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_664.geometry}
          material={materials['leaves.004']}
          position={[6.962, 0.563, 0.002]}
          scale={8.095}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_665.geometry}
          material={materials.rojo}
          position={[6.992, 0.385, 0.599]}
          scale={7.601}
        />
      </group>
      <group
        position={[-1.541, 0.011, -1.499]}
        rotation={[-0.214, -0.077, 0.341]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_667.geometry}
          material={materials['leaves.004']}
          position={[5.805, 0.405, 0.072]}
          scale={6.938}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_668.geometry}
          material={materials.rojo}
          position={[5.896, 1.512, 0.023]}
          scale={6.109}
        />
      </group>
      <group
        position={[-1.499, 0.011, -1.594]}
        rotation={[-0.214, -0.077, 0.341]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_670.geometry}
          material={materials['leaves.004']}
          position={[4.649, 0.563, 0.072]}
          scale={5.782}
        />
      </group>
      <group
        position={[-1.451, 0.011, -1.689]}
        rotation={[-0.214, -0.077, 0.341]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_672.geometry}
          material={materials['leaves.004']}
          position={[3.493, 0.563, 0.072]}
          scale={4.626}
        />
      </group>
      <group
        position={[-1.402, 0.011, -1.788]}
        rotation={[-0.214, -0.077, 0.341]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_674.geometry}
          material={materials['leaves.004']}
          position={[2.336, 0.563, 0.072]}
          scale={3.469}
        />
      </group>
      <group
        position={[-1.358, 0.011, -1.88]}
        rotation={[-0.214, -0.077, 0.341]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_676.geometry}
          material={materials['leaves.004']}
          position={[1.18, 0.563, 0.072]}
          scale={2.313}
        />
      </group>
      <group
        position={[-1.299, 0.011, -1.979]}
        rotation={[-0.214, -0.077, 0.341]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_678.geometry}
          material={materials['leaves.004']}
          position={[0.023, 0.563, 0.072]}
          scale={1.435}
        />
      </group>
      <group
        position={[-1.217, 0.009, -1.989]}
        rotation={[-0.516, -1.296, -0.217]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_680.geometry}
          material={materials['leaves.004']}
          position={[9.275, 0.563, 0.072]}
          scale={10.407}
        />
      </group>
      <group
        position={[-1.129, 0.013, -1.979]}
        rotation={[-0.516, -1.296, -0.217]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_682.geometry}
          material={materials['leaves.004']}
          position={[6.962, 0.563, 0.072]}
          scale={8.095}
        />
      </group>
      <group
        position={[-1.035, 0, -1.979]}
        rotation={[-0.516, -1.296, -0.217]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_684.geometry}
          material={materials['leaves.004']}
          position={[4.649, 0.563, 0.072]}
          scale={5.782}
        />
      </group>
      <group
        position={[-0.945, -0.006, -1.974]}
        rotation={[-0.516, -1.296, -0.217]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_686.geometry}
          material={materials['leaves.004']}
          position={[2.336, 0.563, 0.072]}
          scale={3.469}
        />
      </group>
      <group
        position={[-0.849, -0.011, -1.958]}
        rotation={[-0.516, -1.296, -0.217]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_688.geometry}
          material={materials['leaves.004']}
          position={[0.023, 0.563, 0.072]}
          scale={1.435}
        />
      </group>
      <group
        position={[-0.257, 0.009, -1.953]}
        rotation={[2.723, -0.667, 3.076]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_690.geometry}
          material={materials['leaves.004']}
          position={[13.9, 0.563, 0.072]}
          scale={15.033}
        />
      </group>
      <group
        position={[-0.383, 0.009, -1.959]}
        rotation={[2.738, -0.619, 3.102]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_692.geometry}
          material={materials['leaves.004']}
          position={[10.431, 0.405, 0.072]}
          scale={11.564}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_693.geometry}
          material={materials.rojo}
          position={[10.521, 1.512, 0.023]}
          scale={10.734}
        />
      </group>
      <group
        position={[-0.522, 0.009, -1.968]}
        rotation={[2.738, -0.619, 3.102]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_695.geometry}
          material={materials['leaves.004']}
          position={[6.962, 0.563, 0.072]}
          scale={8.095}
        />
      </group>
      <group
        position={[-0.698, 0.009, -1.95]}
        rotation={[2.738, -0.619, 3.102]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_697.geometry}
          material={materials['leaves.004']}
          position={[2.336, 0.563, 0.072]}
          scale={3.469}
        />
      </group>
      <group
        position={[-0.195, 0.009, -1.874]}
        rotation={[-2.874, -0.585, -2.794]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_699.geometry}
          material={materials['leaves.004']}
          position={[13.9, 0.563, 0.072]}
          scale={15.033}
        />
      </group>
      <group
        position={[-0.207, -0.006, -1.741]}
        rotation={[-2.874, -0.585, -2.794]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_701.geometry}
          material={materials['leaves.004']}
          position={[11.587, 0.405, 0.072]}
          scale={12.72}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_702.geometry}
          material={materials.rojo}
          position={[11.677, 1.512, 0.023]}
          scale={11.89}
        />
      </group>
      <group
        position={[-0.221, -0.006, -1.596]}
        rotation={[-2.874, -0.585, -2.794]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_704.geometry}
          material={materials['leaves.004']}
          position={[8.118, 0.563, 0.072]}
          scale={9.251}
        />
      </group>
      <group
        position={[-0.245, -0.008, -1.447]}
        rotation={[-2.874, -0.585, -2.794]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_706.geometry}
          material={materials['leaves.004']}
          position={[4.649, 0.563, 0.072]}
          scale={5.782}
        />
      </group>
      <group
        position={[-0.258, 0.002, -1.317]}
        rotation={[-2.874, -0.585, -2.794]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_708.geometry}
          material={materials['leaves.004']}
          position={[1.18, 0.563, 0.072]}
          scale={2.313}
        />
      </group>
      <group
        position={[-0.117, 0.025, -1.84]}
        rotation={[0.32, -0.941, 0.51]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_710.geometry}
          material={materials['leaves.004']}
          position={[10.431, 0.563, 0.072]}
          scale={11.564}
        />
      </group>
      <group
        position={[-0.14, 0.011, -1.724]}
        rotation={[0.32, -0.941, 0.51]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_712.geometry}
          material={materials['leaves.004']}
          position={[8.118, 0.563, 0.072]}
          scale={9.251}
        />
      </group>
      <group
        position={[-0.162, 0.011, -1.58]}
        rotation={[0.32, -0.941, 0.51]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_714.geometry}
          material={materials['leaves.004']}
          position={[5.805, 0.563, 0.095]}
          scale={6.938}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_715.geometry}
          material={materials.rojo}
          position={[5.896, 0.567, -0.562]}
          scale={6.327}
        />
      </group>
      <group
        position={[-0.178, 0.011, -1.42]}
        rotation={[0.32, -0.941, 0.51]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_717.geometry}
          material={materials['leaves.004']}
          position={[2.336, 0.563, 0.072]}
          scale={3.469}
        />
      </group>
      <group
        position={[-0.19, 0.011, -1.291]}
        rotation={[0.32, -0.941, 0.51]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_719.geometry}
          material={materials['leaves.004']}
          position={[0.023, 0.563, 0.072]}
          scale={1.435}
        />
      </group>
      <group
        position={[-0.074, 0.02, -1.931]}
        rotation={[-0.598, -1.009, -0.266]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_721.geometry}
          material={materials['leaves.004']}
          position={[10.431, 0.563, 0.002]}
          scale={11.564}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_722.geometry}
          material={materials.rojo}
          position={[10.461, 0.385, 0.599]}
          scale={11.07}
        />
      </group>
      <group
        position={[0.038, 0.011, -1.917]}
        rotation={[-0.598, -1.009, -0.266]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_724.geometry}
          material={materials['leaves.004']}
          position={[9.275, 0.563, 0.072]}
          scale={10.407}
        />
      </group>
      <group
        position={[0.174, 0, -1.893]}
        rotation={[-0.598, -1.009, -0.266]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_726.geometry}
          material={materials['leaves.004']}
          position={[6.962, 0.563, 0.072]}
          scale={8.095}
        />
      </group>
      <group
        position={[0.314, 0.011, -1.856]}
        rotation={[-0.598, -1.009, -0.266]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_728.geometry}
          material={materials['leaves.004']}
          position={[4.649, 0.563, 0.072]}
          scale={5.782}
        />
      </group>
      <group
        position={[0.462, 0.011, -1.815]}
        rotation={[-0.598, -1.009, -0.266]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_730.geometry}
          material={materials['leaves.004']}
          position={[2.336, 0.563, 0.072]}
          scale={3.469}
        />
      </group>
      <group
        position={[0.572, 0.011, -1.805]}
        rotation={[-0.598, -1.009, -0.266]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_732.geometry}
          material={materials['leaves.004']}
          position={[1.18, 0.563, 0.072]}
          scale={2.313}
        />
      </group>
      <group
        position={[0.382, 0.206, -1.313]}
        rotation={[-0.4, 0.275, 0.114]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_734.geometry}
          material={materials['leaves.004']}
          position={[19.682, 0.563, 0.072]}
          scale={20.815}
        />
      </group>
      <group
        position={[0.422, 0.145, -1.42]}
        rotation={[-0.4, 0.275, 0.114]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_736.geometry}
          material={materials['leaves.004']}
          position={[15.057, 0.563, 0.072]}
          scale={16.189}
        />
      </group>
      <group
        position={[0.521, 0.1, -1.544]}
        rotation={[-0.4, 0.275, 0.114]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_738.geometry}
          material={materials['leaves.004']}
          position={[10.431, 0.563, 0.072]}
          scale={11.564}
        />
      </group>
      <group
        position={[0.613, 0.069, -1.661]}
        rotation={[-0.4, 0.275, 0.114]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_740.geometry}
          material={materials['leaves.004']}
          position={[4.649, 0.563, 0.072]}
          scale={5.782}
        />
      </group>
      <group
        position={[0.675, 0.032, -1.752]}
        rotation={[-0.4, 0.275, 0.114]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_742.geometry}
          material={materials['leaves.004']}
          position={[1.18, 0.563, 0.072]}
          scale={2.313}
        />
      </group>
      <group
        position={[0.509, 0.188, -1.264]}
        rotation={[0.65, 0.239, -0.178]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_744.geometry}
          material={materials['leaves.004']}
          position={[17.44, 0.563, 0.002]}
          scale={18.431}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_745.geometry}
          material={materials.rojo}
          position={[17.137, 0.424, 0.373]}
          scale={18.27}
        />
      </group>
      <group
        position={[0.766, 0.154, -1.264]}
        rotation={[0.65, 0.239, -0.178]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_747.geometry}
          material={materials['leaves.004']}
          position={[11.658, 0.563, 0.072]}
          scale={12.649}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_748.geometry}
          material={materials.rojo}
          position={[11.015, 0.484, 0.181]}
          scale={12.148}
        />
      </group>
      <group
        position={[1.028, 0.09, -1.28]}
        rotation={[0.65, 0.239, -0.178]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_750.geometry}
          material={materials['leaves.004']}
          position={[5.805, 0.405, 0.072]}
          scale={6.938}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_751.geometry}
          material={materials.rojo}
          position={[5.896, 1.512, 0.023]}
          scale={6.109}
        />
      </group>
      <group
        position={[1.226, 0.038, -1.267]}
        rotation={[0.65, 0.239, -0.178]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_753.geometry}
          material={materials.rojo}
          position={[1.18, 0.563, 0.072]}
          scale={2.313}
        />
      </group>
      <group
        position={[0.433, 0.188, -1.198]}
        rotation={[-0.579, -0.69, -0.452]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_755.geometry}
          material={materials['leaves.004']}
          position={[12.815, 0.563, 0.072]}
          scale={13.806}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_756.geometry}
          material={materials.rojo}
          position={[12.171, 0.484, 0.181]}
          scale={13.304}
        />
      </group>
      <group
        position={[0.569, 0.167, -1.193]}
        rotation={[-0.579, -0.69, -0.452]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_758.geometry}
          material={materials['leaves.004']}
          position={[10.373, 0.582, 0.072]}
          scale={11.506}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_759.geometry}
          material={materials.rojo}
          position={[11.114, 0.248, 0.049]}
          scale={10.881}
        />
      </group>
      <group
        position={[0.691, 0.142, -1.202]}
        rotation={[-0.579, -0.69, -0.452]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_761.geometry}
          material={materials['leaves.004']}
          position={[8.118, 0.563, 0.002]}
          scale={9.251}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_762.geometry}
          material={materials.rojo}
          position={[8.148, 0.385, 0.599]}
          scale={8.758}
        />
      </group>
      <group
        position={[0.841, 0.116, -1.181]}
        rotation={[-0.579, -0.69, -0.452]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_764.geometry}
          material={materials['leaves.004']}
          position={[5.805, 0.563, 0.002]}
          scale={6.938}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_765.geometry}
          material={materials.rojo}
          position={[5.835, 0.385, 0.599]}
          scale={6.445}
        />
      </group>
      <group
        position={[0.958, 0.086, -1.203]}
        rotation={[-0.579, -0.69, -0.452]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_767.geometry}
          material={materials['leaves.004']}
          position={[4.649, 0.563, 0.002]}
          scale={5.782}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_768.geometry}
          material={materials.rojo}
          position={[4.679, 0.385, 0.599]}
          scale={5.289}
        />
      </group>
      <group
        position={[1.097, 0.045, -1.191]}
        rotation={[-0.579, -0.69, -0.452]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_770.geometry}
          material={materials['leaves.004']}
          position={[2.336, 0.405, 0.072]}
          scale={3.469}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_771.geometry}
          material={materials.rojo}
          position={[2.426, 1.512, 0.023]}
          scale={2.639}
        />
      </group>
      <group
        position={[1.226, 0.018, -1.189]}
        rotation={[-0.579, -0.69, -0.452]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_773.geometry}
          material={materials['leaves.004']}
          position={[0.023, 0.563, 0.002]}
          scale={1.435}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_774.geometry}
          material={materials.rojo}
          position={[0.053, 0.385, 0.599]}
          scale={1.219}
        />
      </group>
      <group
        position={[1.105, 0.115, -0.586]}
        rotation={[-0.603, 0.696, 0.28]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_776.geometry}
          material={materials['leaves.004']}
          position={[13.9, 0.405, 0.072]}
          scale={15.033}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_777.geometry}
          material={materials.rojo}
          position={[13.99, 1.512, 0.023]}
          scale={14.203}
        />
      </group>
      <group
        position={[1.156, 0.096, -0.746]}
        rotation={[-0.603, 0.696, 0.28]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_779.geometry}
          material={materials['leaves.004']}
          position={[10.431, 0.563, 0.002]}
          scale={11.564}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_780.geometry}
          material={materials.rojo}
          position={[10.461, 0.385, 0.599]}
          scale={11.07}
        />
      </group>
      <group
        position={[1.201, 0.063, -0.894]}
        rotation={[-0.603, 0.696, 0.28]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_782.geometry}
          material={materials['leaves.004']}
          position={[6.962, 0.405, 0.072]}
          scale={8.095}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_783.geometry}
          material={materials.rojo}
          position={[7.052, 1.512, 0.023]}
          scale={7.265}
        />
      </group>
      <group
        position={[1.271, 0.031, -1.059]}
        rotation={[-0.603, 0.696, 0.28]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_785.geometry}
          material={materials['leaves.004']}
          position={[3.493, 0.563, 0.072]}
          scale={4.626}
        />
      </group>
      <group
        position={[1.319, 0.024, -1.191]}
        rotation={[-0.603, 0.696, 0.28]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_787.geometry}
          material={materials['leaves.004']}
          position={[0.023, 0.563, 0.002]}
          scale={1.435}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_788.geometry}
          material={materials.rojo}
          position={[0.053, 0.385, 0.599]}
          scale={1.219}
        />
      </group>
      <group
        position={[1.154, 0.129, -0.512]}
        rotation={[0.938, 0.38, -0.653]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_790.geometry}
          material={materials['leaves.004']}
          position={[12.744, 0.405, 0.072]}
          scale={13.877}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_791.geometry}
          material={materials.rojo}
          position={[12.834, 1.512, 0.023]}
          scale={13.047}
        />
      </group>
      <group
        position={[1.291, 0.09, -0.514]}
        rotation={[0.938, 0.38, -0.653]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_793.geometry}
          material={materials['leaves.004']}
          position={[8.118, 0.563, 0.002]}
          scale={9.251}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_794.geometry}
          material={materials.rojo}
          position={[8.148, 0.385, 0.599]}
          scale={8.758}
        />
      </group>
      <group
        position={[1.427, 0.045, -0.504]}
        rotation={[0.938, 0.38, -0.653]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_796.geometry}
          material={materials['leaves.004']}
          position={[3.493, 0.405, 0.072]}
          scale={4.626}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_797.geometry}
          material={materials.rojo}
          position={[3.583, 1.512, 0.023]}
          scale={3.796}
        />
      </group>
      <group
        position={[1.092, 0.129, -0.442]}
        rotation={[-1.236, -1.264, -1.458]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_799.geometry}
          material={materials['leaves.004']}
          position={[6.962, 0.405, 0.072]}
          scale={8.095}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_800.geometry}
          material={materials.rojo}
          position={[7.052, 1.512, 0.023]}
          scale={7.265}
        />
      </group>
      <group
        position={[1.201, 0.088, -0.427]}
        rotation={[-1.236, -1.264, -1.458]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_802.geometry}
          material={materials['leaves.004']}
          position={[4.649, 0.405, 0.072]}
          scale={5.782}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_803.geometry}
          material={materials.rojo}
          position={[4.739, 1.512, 0.023]}
          scale={4.952}
        />
      </group>
      <group
        position={[1.318, 0.047, -0.42]}
        rotation={[-1.236, -1.264, -1.458]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_805.geometry}
          material={materials['leaves.004']}
          position={[2.336, 0.405, 0.072]}
          scale={3.469}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_806.geometry}
          material={materials.rojo}
          position={[2.426, 1.512, 0.023]}
          scale={2.639}
        />
      </group>
      <group
        position={[1.413, 0.012, -0.402]}
        rotation={[-1.236, -1.264, -1.458]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_808.geometry}
          material={materials['leaves.004']}
          position={[0.023, 0.563, 0.095]}
          scale={1.435}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_809.geometry}
          material={materials.rojo}
          position={[0.114, 0.567, -0.562]}
          scale={0.957}
        />
      </group>
      <group
        position={[1.718, 0.188, -1.623]}
        rotation={[1.201, -1.232, 0.72]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_811.geometry}
          material={materials['leaves.004']}
          position={[5.805, 0.563, 0.072]}
          scale={6.938}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_812.geometry}
          material={materials.rojo}
          position={[5.379, 0.646, -0.546]}
          scale={6.117}
        />
      </group>
      <group
        position={[1.649, 0.14, -1.516]}
        rotation={[1.201, -1.232, 0.72]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_814.geometry}
          material={materials['leaves.004']}
          position={[3.493, 0.563, 0.095]}
          scale={4.626}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_815.geometry}
          material={materials.rojo}
          position={[3.583, 0.567, -0.562]}
          scale={4.014}
        />
      </group>
      <group
        position={[1.55, 0.099, -1.437]}
        rotation={[1.201, -1.232, 0.72]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_817.geometry}
          material={materials['leaves.004']}
          position={[2.336, 0.563, 0.095]}
          scale={3.469}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_818.geometry}
          material={materials.rojo}
          position={[2.427, 0.567, -0.562]}
          scale={2.858}
        />
      </group>
      <group
        position={[1.469, 0.063, -1.354]}
        rotation={[1.201, -1.232, 0.72]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_820.geometry}
          material={materials['leaves.004']}
          position={[1.18, 0.563, 0.095]}
          scale={2.313}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_821.geometry}
          material={materials.rojo}
          position={[1.27, 0.567, -0.562]}
          scale={1.702}
        />
      </group>
      <group
        position={[1.394, 0.024, -1.281]}
        rotation={[1.201, -1.232, 0.72]}
        scale={[0.033, 0.017, 0.033]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_823.geometry}
          material={materials['leaves.004']}
          position={[0.023, 0.563, 0.095]}
          scale={1.435}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_824.geometry}
          material={materials.rojo}
          position={[0.114, 0.567, -0.562]}
          scale={0.957}
        />
      </group>
      <group position={[0.25, 0.031, 1.388]} rotation={[-Math.PI, 0.443, -Math.PI]} scale={0.029}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_826.geometry}
          material={materials['Jungle.004']}
          position={[2.844, 2.699, 5.995]}
          scale={17.324}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_827.geometry}
          material={materials['Jungle.004']}
          position={[-3.367, 2.699, -2.541]}
          scale={9.869}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_828.geometry}
          material={materials['VERDE.003']}
          position={[4.855, 2.476, 1.197]}
          scale={20.392}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_829.geometry}
          material={materials.Branch1_1}
          position={[4.583, -0.543, -2.942]}
          scale={21.792}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_830.geometry}
          material={materials.BLANCO}
          position={[4.855, 3.626, 10.188]}
          scale={20.709}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_831.geometry}
          material={materials['leaves.004']}
          position={[-0.927, 0.356, 15.589]}
          scale={9.448}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_832.geometry}
          material={materials['leaves.004']}
          position={[5.011, 0.148, 4.409]}
          scale={17.501}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_833.geometry}
          material={materials['leaves.004']}
          position={[-1.373, 0.356, 16.25]}
          scale={8.077}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_834.geometry}
          material={materials['leaves.004']}
          position={[6.022, -0.144, -4.573]}
          scale={10.84}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_835.geometry}
          material={materials['leaves.004']}
          position={[4.361, -0.144, 3.305]}
          scale={10.831}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_836.geometry}
          material={materials['leaves.004']}
          position={[0.784, -0.144, 6.717]}
          scale={7.238}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_837.geometry}
          material={materials.GRIS}
          position={[2.701, 2.395, 13.422]}
          scale={16.616}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_838.geometry}
          material={materials['AMARILLO_PASTEL.002']}
          position={[-0.378, 3.475, 23.283]}
          scale={11.566}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_839.geometry}
          material={materials['CAFE.002']}
          position={[4.855, 3.896, 6.272]}
          scale={20.896}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_840.geometry}
          material={materials.TUNJA}
          position={[1.207, -0.677, 16.923]}
          scale={13.409}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_841.geometry}
          material={materials['Material.004']}
          position={[3.861, 5.514, 0.949]}
          scale={10.177}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_842.geometry}
          material={materials.VIDRIO}
          position={[3.861, 5.885, 0.949]}
          scale={10.177}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_843.geometry}
          material={materials['AZUL.001']}
          position={[5.138, -0.425, 0.93]}
          scale={10.985}
        />
      </group>
      <group position={[-0.884, -0.005, 2.811]} rotation={[Math.PI / 2, 0, 0.189]} scale={0.448}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_845.geometry}
          material={materials.cafe_oscuro}
          position={[0, 0, -0.205]}
          scale={1.342}
        />
      </group>
      <group position={[-1.45, 0.986, -0.867]} rotation={[-0.099, -0.645, -0.219]} scale={0.244}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_847.geometry}
          material={materials.material_0}
          position={[0.137, -0.022, -0.042]}
          scale={1.589}
        />
      </group>
      <group position={[1.978, 1.075, -1.466]} rotation={[0, -0.615, 0]} scale={0.245}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_849.geometry}
          material={materials.material_0}
          position={[0.137, -0.022, -0.042]}
          scale={1.589}
        />
      </group>
      <group position={[0.998, -0.743, 1.17]} rotation={[0, -0.615, 0]} scale={0.25}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_851.geometry}
          material={materials.material_0}
          position={[0.137, -0.022, -0.042]}
          scale={1.589}
        />
      </group>
      <group position={[-2.404, 0.465, 1.513]} rotation={[0, -0.615, 0]} scale={0.303}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_853.geometry}
          material={materials.material_0}
          position={[0.137, -0.022, -0.042]}
          scale={1.589}
        />
      </group>
      <group position={[0.064, 1.54, 0.058]} rotation={[-0.099, -0.645, -0.219]} scale={0.244}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_855.geometry}
          material={materials.material_0}
          position={[0.137, -0.022, -0.042]}
          scale={1.589}
        />
      </group>
      <group position={[1.295, -1.424, 2.719]} rotation={[0, -0.615, 0]} scale={0.425}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_857.geometry}
          material={materials.material_0}
          position={[0.137, -0.022, -0.042]}
          scale={1.589}
        />
      </group>
      <group position={[-2.973, -1.424, 2.719]} rotation={[0, -0.615, 0]} scale={0.425}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_859.geometry}
          material={materials.material_0}
          position={[0.137, -0.022, -0.042]}
          scale={1.589}
        />
      </group>
    </a.group>
  )
}

export default Armenia;
