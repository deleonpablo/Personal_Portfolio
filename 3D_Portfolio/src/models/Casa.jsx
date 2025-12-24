import { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import {useFrame, useThree} from '@react-three/fiber'
import {a} from '@react-spring/three'

import islandScene from '../assets/3d/casa.glb' ;

const Casa = (props) => {
    const { nodes, materials } = useGLTF(islandScene)
    const islandRef = useRef();
    return (
      <a.group ref={islandRef} {...props} >
        <group position={[-4.486, 4.553, 10.964]} rotation={[0, -1.497, 0]} scale={1.392}>
          <mesh
            
            
            geometry={nodes.Object_28.geometry}
            material={materials.costal}
          />
          <mesh
            
            
            geometry={nodes.Object_29.geometry}
            material={materials.Materas}
          />
        </group>
        <group position={[-5.496, 4.444, 11]} rotation={[-Math.PI, 1.23, -Math.PI]} scale={0.892}>
          <mesh
            
            
            geometry={nodes.Object_31.geometry}
            material={materials.costal}
          />
          <mesh
            
            
            geometry={nodes.Object_32.geometry}
            material={materials.Materas}
          />
        </group>
        <group position={[-3.726, 4.347, 10.85]} rotation={[-Math.PI, 1.098, -Math.PI]} scale={0.636}>
          <mesh
            
            
            geometry={nodes.Object_34.geometry}
            material={materials.costal}
          />
          <mesh
            
            
            geometry={nodes.Object_35.geometry}
            material={materials.Materas}
          />
        </group>
        <group position={[-9.119, 7.328, 6.214]} rotation={[-Math.PI, 0.825, -Math.PI]} scale={0.842}>
          <mesh
            
            
            geometry={nodes.Object_37.geometry}
            material={materials.costal}
          />
          <mesh
            
            
            geometry={nodes.Object_38.geometry}
            material={materials.Materas}
          />
        </group>
        <group position={[-8.426, 4.583, 8.438]} rotation={[0, -1.497, 0]} scale={1.415}>
          <mesh
            
            
            geometry={nodes.Object_42.geometry}
            material={materials.costal}
          />
          <mesh
            
            
            geometry={nodes.Object_43.geometry}
            material={materials.Materas}
          />
        </group>
        <group position={[-3.058, 4.509, 4.562]} rotation={[Math.PI, -1.371, Math.PI]} scale={1.286}>
          <mesh
            
            
            geometry={nodes.Object_45.geometry}
            material={materials.costal}
          />
          <mesh
            
            
            geometry={nodes.Object_46.geometry}
            material={materials.Materas}
          />
        </group>
        <group position={[-1.442, 7.045, 3.256]} rotation={[0, 1.137, -Math.PI / 2]} scale={0.987}>
          <mesh
            
            
            geometry={nodes.Object_96.geometry}
            material={materials.Materas}
          />
          <mesh
            
            
            geometry={nodes.Object_97.geometry}
            material={materials.costal}
          />
        </group>
        <group position={[-8.289, 8.926, 3.271]} rotation={[2.004, 0.108, 0.228]} scale={1.03}>
          <mesh
            
            
            geometry={nodes.Object_105.geometry}
            material={materials.Materas}
          />
          <mesh
            
            
            geometry={nodes.Object_106.geometry}
            material={materials.costal}
          />
        </group>
        <group
          position={[-9.426, 7.26, 10.536]}
          rotation={[0.001, -0.227, 0]}
          scale={[1.03, 1.161, 1.03]}>
          <mesh
            
            
            geometry={nodes.Object_120.geometry}
            material={materials.Materas}
          />
          <mesh
            
            
            geometry={nodes.Object_121.geometry}
            material={materials.costal}
          />
        </group>
        <group position={[-2.923, 7.043, 4.825]} rotation={[3.1, 0, Math.PI]}>
          <mesh
            
            
            geometry={nodes.Object_137.geometry}
            material={materials['Canasta-silla']}
          />
          <mesh
            
            
            geometry={nodes.Object_138.geometry}
            material={materials.Materas}
          />
        </group>
        <group position={[4.575, 1.655, -6.712]} rotation={[-Math.PI, 0.418, -Math.PI]} scale={1.331}>
          <mesh
            
            
            geometry={nodes.Object_308.geometry}
            material={materials.cafeto}
          />
          <mesh
            
            
            geometry={nodes.Object_309.geometry}
            material={materials.Materas}
          />
        </group>
        <group position={[-3.538, 12.069, 26.004]} rotation={[0, -0.266, 0]} scale={1.331}>
          <mesh
            
            
            geometry={nodes.Object_311.geometry}
            material={materials.cafeto}
          />
          <mesh
            
            
            geometry={nodes.Object_312.geometry}
            material={materials.Materas}
          />
        </group>
        <group position={[-1.77, 5.217, 9.094]} rotation={[0, 0.195, 0]} scale={0.636}>
          <mesh
            
            
            geometry={nodes.Object_334.geometry}
            material={materials.costal}
          />
          <mesh
            
            
            geometry={nodes.Object_335.geometry}
            material={materials.Materas}
          />
        </group>
        <group
          position={[-9.231, 4.708, 3.875]}
          rotation={[-Math.PI, 1.305, Math.PI / 2]}
          scale={[0.987, 1.027, 1.027]}>
          <mesh
            
            
            geometry={nodes.Object_345.geometry}
            material={materials.Materas}
          />
          <mesh
            
            
            geometry={nodes.Object_346.geometry}
            material={materials.costal}
          />
        </group>
        <mesh
          
          
          geometry={nodes.Object_4.geometry}
          material={materials.piso}
          position={[-6.8, 5.68, 6.723]}
        />
        <mesh
          
          
          geometry={nodes.Object_6.geometry}
          material={materials['Canasta-silla']}
          position={[-0.679, 3.669, 3.71]}
        />
        <mesh
          
          
          geometry={nodes.Object_8.geometry}
          material={materials.WoodPilars}
          position={[-0.638, 6.459, 3.201]}
        />
        <mesh
          
          
          geometry={nodes.Object_10.geometry}
          material={materials.WoodPilars}
          position={[-1.029, 4.57, 3.198]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_12.geometry}
          material={materials.techo}
          position={[-4.503, 8.857, 7.229]}
          scale={[3.944, 3.944, 3.937]}
        />
        <mesh
          
          
          geometry={nodes.Object_14.geometry}
          material={materials.paredes}
          position={[-4.273, 6.332, 7.696]}
        />
        <mesh
          
          
          geometry={nodes.Object_16.geometry}
          material={materials.paredes}
          position={[-6.156, 5.95, 10.154]}
          rotation={[-Math.PI, 0, -Math.PI]}
        />
        <mesh
          
          
          geometry={nodes.Object_18.geometry}
          material={materials.paredes}
          position={[-6.798, 8.299, 10.105]}
        />
        <mesh
          
          
          geometry={nodes.Object_20.geometry}
          material={materials.paredes}
          position={[-7.167, 8.279, 10.076]}
        />
        <mesh
          
          
          geometry={nodes.Object_22.geometry}
          material={materials.costal}
          position={[-7.72, 4.378, 4.501]}
          rotation={[Math.PI, -1.087, Math.PI]}
          scale={0.758}
        />
        <mesh
          
          
          geometry={nodes.Object_24.geometry}
          material={materials.costal}
          position={[-0.635, 5.399, 4.519]}
          rotation={[0, -0.102, 0]}
          scale={0.577}
        />
        <mesh
          
          
          geometry={nodes.Object_26.geometry}
          material={materials.costal}
          position={[-3.288, 2.93, 3.853]}
          rotation={[-0.107, -0.86, -0.051]}
        />
        <mesh
          
          
          geometry={nodes.Object_40.geometry}
          material={materials.paredes}
          position={[-2.267, 6.432, 10.208]}
        />
        <mesh
          
          
          geometry={nodes.Object_48.geometry}
          material={materials.costal}
          position={[-4.134, 5.389, 5.166]}
          rotation={[0, -0.102, 0]}
          scale={0.755}
        />
        <mesh
          
          
          geometry={nodes.Object_50.geometry}
          material={materials.costal}
          position={[0.595, 4.261, 8.785]}
          rotation={[0.207, 0.1, 0.223]}
        />
        <mesh
          
          
          geometry={nodes.Object_52.geometry}
          material={materials.costal}
          position={[0.595, 3.582, 6.401]}
          rotation={[-0.421, 0.186, 0.35]}
        />
        <mesh
          
          
          geometry={nodes.Object_54.geometry}
          material={materials.costal}
          position={[0.491, 4.882, 7.41]}
          rotation={[0.14, 0.103, 0.283]}
        />
        <mesh
          
          
          geometry={nodes.Object_56.geometry}
          material={materials.cafeto}
          position={[7.946, 0.463, -7.603]}
          rotation={[0.041, -0.713, -0.336]}
          scale={1.024}
        />
        <mesh
          
          
          geometry={nodes.Object_58.geometry}
          material={materials.cafeto}
          position={[2.454, -0.286, -9.83]}
          rotation={[3.117, -0.57, 2.798]}
          scale={1.121}
        />
        <mesh
          
          
          geometry={nodes.Object_60.geometry}
          material={materials.cafeto}
          position={[-2.643, 0.763, -7.603]}
          rotation={[0.148, -0.87, -0.319]}
          scale={1.159}
        />
        <mesh
          
          
          geometry={nodes.Object_62.geometry}
          material={materials.cafeto}
          position={[-8.189, 0.207, -10.089]}
          rotation={[-3.119, 0.685, 2.784]}
          scale={1.15}
        />
        <mesh
          
          
          geometry={nodes.Object_64.geometry}
          material={materials.cafeto}
          position={[7.946, 2.959, -1.915]}
          rotation={[-0.005, 0.015, -0.258]}
          scale={1.301}
        />
        <mesh
          
          
          geometry={nodes.Object_66.geometry}
          material={materials.cafeto}
          position={[2.454, 1.584, -4.228]}
          rotation={[2.898, -1.242, 2.492]}
          scale={1.208}
        />
        <mesh
          
          
          geometry={nodes.Object_68.geometry}
          material={materials.cafeto}
          position={[-3.18, 3.18, -1.625]}
          rotation={[3.012, -0.401, 2.809]}
          scale={1.017}
        />
        <mesh
          
          
          geometry={nodes.Object_70.geometry}
          material={materials.cafeto}
          position={[-8.189, 2.458, -4.178]}
          rotation={[-1.113, -1.516, -1.336]}
          scale={1.121}
        />
        <mesh
          
          
          geometry={nodes.Object_72.geometry}
          material={materials.cafeto}
          position={[7.946, 10.063, 22.711]}
          rotation={[0.041, -0.713, -0.336]}
          scale={1.121}
        />
        <mesh
          
          
          geometry={nodes.Object_74.geometry}
          material={materials.cafeto}
          position={[2.454, 10.933, 24.937]}
          rotation={[3.001, -0.482, 2.8]}
          scale={1.121}
        />
        <mesh
          
          
          geometry={nodes.Object_76.geometry}
          material={materials.cafeto}
          position={[-2.643, 10.051, 23.047]}
          rotation={[0.082, -1.07, -0.352]}
          scale={1.159}
        />
        <mesh
          
          
          geometry={nodes.Object_78.geometry}
          material={materials.cafeto}
          position={[-8.189, 11.355, 25.088]}
          rotation={[-3.115, 0.841, 2.778]}
          scale={1.15}
        />
        <mesh
          
          
          geometry={nodes.Object_80.geometry}
          material={materials.cafeto}
          position={[7.946, 11.792, 28.078]}
          rotation={[-0.005, 0.015, -0.258]}
          scale={0.896}
        />
        <mesh
          
          
          geometry={nodes.Object_82.geometry}
          material={materials.cafeto}
          position={[2.454, 12.959, 30.569]}
          rotation={[2.898, -1.242, 2.492]}
          scale={1.208}
        />
        <mesh
          
          
          geometry={nodes.Object_84.geometry}
          material={materials.cafeto}
          position={[-2.643, 11.696, 28.392]}
          rotation={[3.033, -0.407, 2.863]}
          scale={1.017}
        />
        <mesh
          
          
          geometry={nodes.Object_86.geometry}
          material={materials.cafeto}
          position={[-8.189, 12.986, 30.569]}
          rotation={[-2.862, -1.39, -3.09]}
          scale={1.121}
        />
        <mesh
          
          
          geometry={nodes.Object_88.geometry}
          material={materials.cafeto}
          position={[7.946, 7.041, 17.622]}
          rotation={[-0.094, -0.486, -0.313]}
          scale={1.121}
        />
        <mesh
          
          
          geometry={nodes.Object_90.geometry}
          material={materials.cafeto}
          position={[2.454, 8.345, 20.274]}
          rotation={[3.002, 0.525, 2.903]}
          scale={1.023}
        />
        <mesh
          
          
          geometry={nodes.Object_92.geometry}
          material={materials.cafeto}
          position={[-2.643, 7.44, 17.8]}
          rotation={[-0.054, -0.876, -0.39]}
          scale={1.159}
        />
        <mesh
          
          
          geometry={nodes.Object_94.geometry}
          material={materials.cafeto}
          position={[-8.189, 8.781, 20.164]}
          rotation={[3.017, 0.685, 2.784]}
          scale={1.15}
        />
        <mesh
          
          
          geometry={nodes.Object_99.geometry}
          material={materials.Materas}
          position={[-7.762, 4.71, 4.515]}
          rotation={[-0.056, 0.582, -1.82]}
          scale={[0.493, 0.493, 0.754]}
        />
        <mesh
          
          
          geometry={nodes.Object_101.geometry}
          material={materials.Materas}
          position={[-0.614, 5.147, 4.541]}
          rotation={[0, 1.354, -1.846]}
          scale={[0.317, 0.317, 0.484]}
        />
        <mesh
          
          
          geometry={nodes.Object_103.geometry}
          material={materials.Materas}
          position={[-4.347, 5.518, 5.392]}
          rotation={[-2.929, 0.61, -2.425]}
          scale={[0.465, 0.352, 0.352]}
        />
        <mesh
          
          
          geometry={nodes.Object_108.geometry}
          material={materials.Materas}
          position={[-0.44, 5.314, 9.212]}
          rotation={[0, 0, Math.PI / 2]}
          scale={[1.653, 1.653, 1.88]}
        />
        <mesh
          
          
          geometry={nodes.Object_110.geometry}
          material={materials.Materas}
          position={[-0.447, 5.929, 6.419]}
          rotation={[-3.13, 0, -Math.PI / 2]}
          scale={[2.293, 2.048, 2.193]}
        />
        <mesh
          
          
          geometry={nodes.Object_112.geometry}
          material={materials.Materas}
          position={[-0.311, 3.063, 4.818]}
          rotation={[3.077, 0, -Math.PI / 2]}
          scale={[2.293, 2.048, 2.193]}
        />
        <mesh
          
          
          geometry={nodes.Object_114.geometry}
          material={materials.Tierra1}
          position={[-2.927, 0.961, 3.848]}
        />
        <mesh
          
          
          geometry={nodes.Object_116.geometry}
          material={materials.costal}
          position={[-2.22, 3.042, 5.538]}
          rotation={[-0.226, 0.233, -0.125]}
        />
        <mesh
          
          
          geometry={nodes.Object_118.geometry}
          material={materials.costal}
          position={[0.55, 2.669, 4.116]}
          rotation={[-0.176, -0.155, -0.207]}
        />
        <mesh
          
          
          geometry={nodes.Object_123.geometry}
          material={materials['Canasta-silla']}
          position={[-8.126, 7.316, 7.787]}
          rotation={[-0.066, -0.003, 0.049]}
        />
        <mesh
          
          
          geometry={nodes.Object_125.geometry}
          material={materials.WoodPilars}
          position={[-1.498, 5.122, 3.198]}
          scale={[1, 1, 0.845]}
        />
        <mesh
          
          
          geometry={nodes.Object_127.geometry}
          material={materials['Canasta-silla']}
          position={[-5.675, 5.359, 3.301]}
          rotation={[-Math.PI, 0.93, -Math.PI]}
          scale={0.992}
        />
        <mesh
          
          
          geometry={nodes.Object_129.geometry}
          material={materials['Canasta-silla']}
          position={[-6.119, 5.359, 3.262]}
          rotation={[Math.PI, -1.499, Math.PI]}
          scale={0.992}
        />
        <mesh
          
          
          geometry={nodes.Object_131.geometry}
          material={materials['Canasta-silla']}
          position={[-5.683, 5.058, 4.556]}
          rotation={[-Math.PI, 0.007, -Math.PI]}
          scale={[1.184, 1, 1]}
        />
        <mesh
          
          
          geometry={nodes.Object_133.geometry}
          material={materials['Canasta-silla']}
          position={[-2.726, 5.058, 10.886]}
          rotation={[0, -0.011, 0]}
          scale={[1.184, 1, 1]}
        />
        <mesh
          
          
          geometry={nodes.Object_135.geometry}
          material={materials.cafeto}
          position={[5.609, 4.079, -6.301]}
          rotation={[-0.079, -0.849, -0.867]}
          scale={1.354}
        />
        <mesh
          
          
          geometry={nodes.Object_140.geometry}
          material={materials.cafeto}
          position={[-4.698, 11.501, 25.677]}
          rotation={[0, -1.522, 0]}
        />
        <mesh
          
          
          geometry={nodes.Object_142.geometry}
          material={materials.costal}
          position={[0.41, 4.261, 11.459]}
          rotation={[0.21, 0.183, 0.205]}
        />
        <mesh
          
          
          geometry={nodes.Object_144.geometry}
          material={materials.Materas}
          position={[-8.058, 7.623, 7.743]}
          rotation={[1.941, -0.158, -3.073]}
          scale={0.303}
        />
        <mesh
          
          
          geometry={nodes.Object_146.geometry}
          material={materials.Materas}
          position={[-8.061, 7.6, 7.796]}
          rotation={[1.092, -0.152, 3.096]}
          scale={0.303}
        />
        <mesh
          
          
          geometry={nodes.Object_148.geometry}
          material={materials['Canasta-silla']}
          position={[-7.474, 3.492, 3.294]}
          rotation={[2.856, -0.475, 3.09]}
          scale={0.821}
        />
        <mesh
          
          
          geometry={nodes.Object_150.geometry}
          material={materials.WoodPilars}
          position={[-1.484, 4.57, 3.198]}
          rotation={[0, 1.472, 0]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_152.geometry}
          material={materials.WoodPilars}
          position={[-1.912, 4.57, 3.198]}
          rotation={[0, 0.04, 0]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_154.geometry}
          material={materials.WoodPilars}
          position={[-2.4, 4.57, 3.198]}
          rotation={[-Math.PI, 0.019, -Math.PI]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_156.geometry}
          material={materials.WoodPilars}
          position={[-2.802, 6.459, 3.201]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <mesh
          
          
          geometry={nodes.Object_158.geometry}
          material={materials.WoodPilars}
          position={[-3.193, 4.57, 3.198]}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_160.geometry}
          material={materials.WoodPilars}
          position={[-3.662, 5.122, 3.198]}
          scale={[1, 1, 0.845]}
        />
        <mesh
          
          
          geometry={nodes.Object_162.geometry}
          material={materials.WoodPilars}
          position={[-3.642, 4.57, 3.198]}
          rotation={[0, -1.537, 0]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_164.geometry}
          material={materials.WoodPilars}
          position={[-4.105, 4.57, 3.198]}
          rotation={[-Math.PI, -0.04, -Math.PI]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_166.geometry}
          material={materials.WoodPilars}
          position={[-4.565, 4.57, 3.198]}
          rotation={[0, -0.019, 0]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_168.geometry}
          material={materials.WoodPilars}
          position={[-4.931, 6.459, 3.201]}
        />
        <mesh
          
          
          geometry={nodes.Object_170.geometry}
          material={materials.WoodPilars}
          position={[-5.322, 4.57, 3.198]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_172.geometry}
          material={materials.WoodPilars}
          position={[-5.791, 5.122, 3.198]}
          scale={[1, 1, 0.845]}
        />
        <mesh
          
          
          geometry={nodes.Object_174.geometry}
          material={materials.WoodPilars}
          position={[-5.76, 4.57, 3.198]}
          rotation={[-Math.PI, 1.477, -Math.PI]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_176.geometry}
          material={materials.WoodPilars}
          position={[-6.208, 4.57, 3.198]}
          rotation={[0, 0.04, 0]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_178.geometry}
          material={materials.WoodPilars}
          position={[-6.673, 4.57, 3.198]}
          rotation={[-Math.PI, 0.019, -Math.PI]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_180.geometry}
          material={materials.WoodPilars}
          position={[-7.065, 6.459, 3.201]}
        />
        <mesh
          
          
          geometry={nodes.Object_182.geometry}
          material={materials.WoodPilars}
          position={[-7.483, 4.57, 3.198]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_184.geometry}
          material={materials.WoodPilars}
          position={[-7.925, 5.122, 3.198]}
          scale={[1, 1, 0.845]}
        />
        <mesh
          
          
          geometry={nodes.Object_186.geometry}
          material={materials.WoodPilars}
          position={[-7.916, 4.57, 3.198]}
          rotation={[0, 1.472, 0]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_188.geometry}
          material={materials.WoodPilars}
          position={[-8.397, 4.57, 3.198]}
          rotation={[0, 0.04, 0]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_190.geometry}
          material={materials.WoodPilars}
          position={[-8.854, 4.57, 3.198]}
          rotation={[-Math.PI, 0.019, -Math.PI]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_192.geometry}
          material={materials.WoodPilars}
          position={[-9.259, 6.459, 3.201]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <mesh
          
          
          geometry={nodes.Object_194.geometry}
          material={materials.WoodPilars}
          position={[-9.261, 6.459, 5.363]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <mesh
          
          
          geometry={nodes.Object_196.geometry}
          material={materials.WoodPilars}
          position={[-9.258, 4.57, 4.972]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_198.geometry}
          material={materials.WoodPilars}
          position={[-9.259, 5.122, 4.503]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[1, 1, 0.845]}
        />
        <mesh
          
          
          geometry={nodes.Object_200.geometry}
          material={materials.WoodPilars}
          position={[-9.258, 4.57, 4.533]}
          rotation={[0, 0.094, 0]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_202.geometry}
          material={materials.WoodPilars}
          position={[-9.258, 4.57, 4.086]}
          rotation={[0, -1.531, 0]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_204.geometry}
          material={materials.WoodPilars}
          position={[-9.258, 4.57, 3.62]}
          rotation={[0, 1.552, 0]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_206.geometry}
          material={materials.WoodPilars}
          position={[-9.261, 6.459, 7.531]}
          rotation={[-Math.PI, 0, -Math.PI]}
        />
        <mesh
          
          
          geometry={nodes.Object_208.geometry}
          material={materials.WoodPilars}
          position={[-9.258, 4.57, 7.14]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_210.geometry}
          material={materials.WoodPilars}
          position={[-9.259, 5.122, 6.671]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[1, 1, 0.845]}
        />
        <mesh
          
          
          geometry={nodes.Object_212.geometry}
          material={materials.WoodPilars}
          position={[-9.258, 4.57, 6.702]}
          rotation={[0, -1.477, 0]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_214.geometry}
          material={materials.WoodPilars}
          position={[-9.258, 4.57, 6.254]}
          rotation={[0, -1.531, 0]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_216.geometry}
          material={materials.WoodPilars}
          position={[-9.258, 4.57, 5.789]}
          rotation={[-Math.PI, 0.019, -Math.PI]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_218.geometry}
          material={materials.WoodPilars}
          position={[-9.261, 6.459, 9.696]}
          rotation={[0, -1.571, 0]}
        />
        <mesh
          
          
          geometry={nodes.Object_220.geometry}
          material={materials.WoodPilars}
          position={[-9.258, 4.57, 9.305]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_222.geometry}
          material={materials.WoodPilars}
          position={[-9.259, 5.122, 8.836]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[1, 1, 0.845]}
        />
        <mesh
          
          
          geometry={nodes.Object_224.geometry}
          material={materials.WoodPilars}
          position={[-9.258, 4.57, 8.867]}
          rotation={[0, 0.094, 0]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_226.geometry}
          material={materials.WoodPilars}
          position={[-9.258, 4.57, 8.419]}
          rotation={[0, 0.04, 0]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_228.geometry}
          material={materials.WoodPilars}
          position={[-9.258, 4.57, 7.954]}
          rotation={[0, 1.552, 0]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_230.geometry}
          material={materials.WoodPilars}
          position={[-8.351, 6.459, 11.517]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <mesh
          
          
          geometry={nodes.Object_232.geometry}
          material={materials.WoodPilars}
          position={[-9.259, 5.122, 10.99]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[1, 1, 0.845]}
        />
        <mesh
          
          
          geometry={nodes.Object_234.geometry}
          material={materials.WoodPilars}
          position={[-9.258, 4.57, 11.021]}
          rotation={[0, -1.477, 0]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_236.geometry}
          material={materials.WoodPilars}
          position={[-9.258, 4.57, 10.574]}
          rotation={[0, -1.531, 0]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_238.geometry}
          material={materials.WoodPilars}
          position={[-9.258, 4.57, 10.108]}
          rotation={[0, 1.552, 0]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_240.geometry}
          material={materials.WoodPilars}
          position={[-0.642, 4.57, 3.465]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_242.geometry}
          material={materials.WoodPilars}
          position={[-0.641, 5.122, 3.934]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[1, 1, 0.845]}
        />
        <mesh
          
          
          geometry={nodes.Object_244.geometry}
          material={materials.WoodPilars}
          position={[-0.642, 4.57, 3.92]}
          rotation={[-Math.PI, 0.099, -Math.PI]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_246.geometry}
          material={materials.WoodPilars}
          position={[-0.642, 4.57, 4.349]}
          rotation={[-Math.PI, 1.531, -Math.PI]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_248.geometry}
          material={materials.WoodPilars}
          position={[-0.642, 4.57, 4.837]}
          rotation={[Math.PI, -1.552, Math.PI]}
          scale={[1.094, 1, 1.094]}
        />
        <mesh
          
          
          geometry={nodes.Object_250.geometry}
          material={materials.costal}
          position={[-6.119, 5.359, 3.262]}
          rotation={[Math.PI, -1.499, Math.PI]}
          scale={0.992}
        />
        <mesh
          
          
          geometry={nodes.Object_252.geometry}
          material={materials.costal}
          position={[-5.675, 5.359, 3.301]}
          rotation={[-Math.PI, 0.93, -Math.PI]}
          scale={0.992}
        />
        <mesh
          
          
          geometry={nodes.Object_254.geometry}
          material={materials.WoodPilars}
          position={[-4.919, 8.757, 2.768]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={[1.304, 1, 1.304]}
        />
        <mesh
          
          
          geometry={nodes.Object_256.geometry}
          material={materials.WoodPilars}
          position={[-4.505, 8.725, 11.839]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        />
        <mesh
          
          
          geometry={nodes.Object_258.geometry}
          material={materials.techo}
          position={[-8.586, 9.875, 5.073]}
          rotation={[0.075, 0, 0]}
          scale={1.117}
        />
        <mesh
          
          
          geometry={nodes.Object_260.geometry}
          material={materials.techo}
          position={[-4.681, 11.133, 7.241]}
          rotation={[0.901, 0.884, -0.951]}
          scale={1.183}
        />
        <mesh
          
          
          geometry={nodes.Object_262.geometry}
          material={materials.techo}
          position={[-8.505, 9.918, 9.333]}
          rotation={[3.026, 0.861, -3.066]}
          scale={1.117}
        />
        <mesh
          
          
          geometry={nodes.Object_264.geometry}
          material={materials.techo}
          position={[-0.906, 9.875, 9.333]}
          rotation={[3.067, 0, Math.PI]}
          scale={1.117}
        />
        <mesh
          
          
          geometry={nodes.Object_266.geometry}
          material={materials.techo}
          position={[-0.896, 9.918, 5.117]}
          rotation={[0.117, -0.878, 0.079]}
          scale={1.117}
        />
        <mesh
          
          
          geometry={nodes.Object_268.geometry}
          material={materials.paredes}
          position={[-1.679, 6.432, 10.208]}
        />
        <mesh
          
          
          geometry={nodes.Object_270.geometry}
          material={materials.WoodPilars}
          position={[-9.782, 8.757, 7.477]}
          rotation={[Math.PI / 2, 0, Math.PI]}
          scale={[1.304, 0.896, 1.304]}
        />
        <mesh
          
          
          geometry={nodes.Object_272.geometry}
          material={materials.WoodPilars}
          position={[0.396, 8.725, 7.106]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1, 0.896, 1]}
        />
        <mesh
          
          
          geometry={nodes.Object_274.geometry}
          material={materials.paredes}
          position={[-4.973, 6.432, 10.208]}
          rotation={[0, -0.53, 0]}
        />
        <mesh
          
          
          geometry={nodes.Object_276.geometry}
          material={materials.paredes}
          position={[-3.793, 6.887, 10.208]}
          rotation={[0, -0.036, 0]}
        />
        <mesh
          
          
          geometry={nodes.Object_278.geometry}
          material={materials.paredes}
          position={[-3.497, 6.432, 5.219]}
          rotation={[Math.PI, -1.057, Math.PI]}
        />
        <mesh
          
          
          geometry={nodes.Object_280.geometry}
          material={materials.paredes}
          position={[-4.737, 6.887, 5.219]}
          rotation={[-Math.PI, 1.045, -Math.PI]}
        />
        <mesh
          
          
          geometry={nodes.Object_282.geometry}
          material={materials.paredes}
          position={[-7.838, 6.432, 5.946]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <mesh
          
          
          geometry={nodes.Object_284.geometry}
          material={materials.paredes}
          position={[-7.838, 6.432, 6.602]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <mesh
          
          
          geometry={nodes.Object_286.geometry}
          material={materials.paredes}
          position={[-7.824, 6.432, 8.133]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <mesh
          
          
          geometry={nodes.Object_288.geometry}
          material={materials.paredes}
          position={[-7.824, 6.432, 8.721]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <mesh
          
          
          geometry={nodes.Object_290.geometry}
          material={materials.paredes}
          position={[-6.835, 5.95, 10.154]}
          rotation={[-Math.PI, 0, -Math.PI]}
        />
        <mesh
          
          
          geometry={nodes.Object_292.geometry}
          material={materials.paredes}
          position={[-7.412, 5.95, 5.078]}
          rotation={[0, 0.089, 0]}
        />
        <mesh
          
          
          geometry={nodes.Object_294.geometry}
          material={materials.paredes}
          position={[-6.793, 8.299, 5.127]}
          rotation={[-Math.PI, 0, -Math.PI]}
        />
        <mesh
          
          
          geometry={nodes.Object_296.geometry}
          material={materials.paredes}
          position={[-6.424, 8.279, 5.156]}
          rotation={[-Math.PI, 0, -Math.PI]}
        />
        <mesh
          
          
          geometry={nodes.Object_298.geometry}
          material={materials.paredes}
          position={[-6.2, 6.023, 5.078]}
          rotation={[0, -0.059, 0]}
        />
        <mesh
          
          
          geometry={nodes.Object_300.geometry}
          material={materials.paredes}
          position={[-2.266, 5.95, 5.078]}
          rotation={[0, -0.161, 0]}
        />
        <mesh
          
          
          geometry={nodes.Object_302.geometry}
          material={materials.paredes}
          position={[-1.689, 8.299, 5.127]}
          rotation={[-Math.PI, 0, -Math.PI]}
        />
        <mesh
          
          
          geometry={nodes.Object_304.geometry}
          material={materials.paredes}
          position={[-1.32, 8.279, 5.156]}
          rotation={[-Math.PI, 0, -Math.PI]}
        />
        <mesh
          
          
          geometry={nodes.Object_306.geometry}
          material={materials.paredes}
          position={[-1.119, 6.023, 5.078]}
          rotation={[0, 1.141, 0]}
        />
        <mesh
          
          
          geometry={nodes.Object_314.geometry}
          material={materials.cafeto}
          position={[7.946, -1.541, -13.369]}
          rotation={[-0.094, -0.486, -0.313]}
          scale={1.121}
        />
        <mesh
          
          
          geometry={nodes.Object_316.geometry}
          material={materials.cafeto}
          position={[2.454, -2.522, -15.334]}
          rotation={[3.002, 0.525, 2.903]}
          scale={1.023}
        />
        <mesh
          
          
          geometry={nodes.Object_318.geometry}
          material={materials.cafeto}
          position={[-2.643, -1.387, -13.191]}
          rotation={[-0.054, -0.876, -0.39]}
          scale={1.159}
        />
        <mesh
          
          
          geometry={nodes.Object_320.geometry}
          material={materials.cafeto}
          position={[-8.189, -2.085, -15.443]}
          rotation={[3.017, 0.685, 2.784]}
          scale={1.15}
        />
        <mesh
          
          
          geometry={nodes.Object_322.geometry}
          material={materials.cafeto}
          position={[5.555, -1.402, -4.731]}
          rotation={[-0.86, 0.356, -1.116]}
          scale={1.354}
        />
        <mesh
          
          
          geometry={nodes.Object_324.geometry}
          material={materials.cafeto}
          position={[-4.361, 9.801, 28.114]}
          rotation={[-0.931, 0.356, -1.116]}
          scale={1.354}
        />
        <mesh
          
          
          geometry={nodes.Object_326.geometry}
          material={materials.cafeto}
          position={[-5.156, 8.331, 23.654]}
          rotation={[-1.619, 0.706, -0.22]}
          scale={1.354}
        />
        <mesh
          
          
          geometry={nodes.Object_328.geometry}
          material={materials['Canasta-silla']}
          position={[-3.305, 7.316, 9.819]}
          rotation={[-1.62, -1.504, -Math.PI / 2]}
        />
        <mesh
          
          
          geometry={nodes.Object_330.geometry}
          material={materials.Materas}
          position={[-3.314, 7.6, 9.884]}
          rotation={[1.742, -0.473, -1.538]}
          scale={0.303}
        />
        <mesh
          
          
          geometry={nodes.Object_332.geometry}
          material={materials['Canasta-silla']}
          position={[-1.725, 5.11, 9.415]}
          rotation={[-Math.PI, -0.022, -Math.PI]}
          scale={[1.29, 1.089, 1.089]}
        />
        <mesh
          
          
          geometry={nodes.Object_337.geometry}
          material={materials['Canasta-silla']}
          position={[-3.132, 5.11, 9.396]}
          rotation={[-Math.PI, 1.549, -Math.PI]}
          scale={[1.093, 0.923, 0.923]}
        />
        <mesh
          
          
          geometry={nodes.Object_339.geometry}
          material={materials.Materas}
          position={[-1.445, 1.159, 3.464]}
          rotation={[0.532, -1.443, 2.13]}
          scale={[2.293, 2.048, 2.193]}
        />
        <mesh
          
          
          geometry={nodes.Object_341.geometry}
          material={materials['Canasta-silla']}
          position={[-4.859, 4.883, 9.154]}
          rotation={[-1.47, 0.608, 2.016]}
          scale={0.205}
        />
        <mesh
          
          
          geometry={nodes.Object_343.geometry}
          material={materials['Canasta-silla']}
          position={[-3.147, 5.483, 9.337]}
          rotation={[0, 0.142, 0]}
          scale={[0.23, 0.229, 0.261]}
        />
        <mesh
          
          
          geometry={nodes.Object_348.geometry}
          material={materials.pilacafe}
          position={[9.341, 4.185, 7.797]}
          rotation={[-Math.PI, 1.01, -Math.PI]}
          scale={0.839}
        />
        <mesh
          
          
          geometry={nodes.Object_350.geometry}
          material={materials.costal}
          position={[3.274, 4.352, 10.798]}
          rotation={[0.18, 0.648, 0.219]}
        />
        <mesh
          
          
          geometry={nodes.Object_352.geometry}
          material={materials.pilacafe}
          position={[6.272, 4.477, 9.617]}
        />
        <mesh
          
          
          geometry={nodes.Object_354.geometry}
          material={materials['Canasta-silla']}
          position={[9.357, 4.607, 7.799]}
          rotation={[0.031, 0.668, -0.018]}
          scale={0.682}
        />
      </a.group>
    )
  }
  
 export default Casa;
  