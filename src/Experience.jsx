import * as THREE from 'three'
import { Perf } from 'r3f-perf'
import { Bloom, Noise, Glitch, Vignette, EffectComposer } from '@react-three/postprocessing'
import { useEffect, useRef, useState } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { useCursor, MeshPortalMaterial, CameraControls, Gltf, Text } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing, geometry } from 'maath'
import HalloweenScene from './HalloweenScene'

extend(geometry)
export default function Experience() {
  // const imageRef = useRef()

  // useFrame(() => {
  //     imageRef.current.position.z += 0.02
  // })

  return (
    <Canvas camera={{ fov: 75, position: [0, 0, 20] }} eventSource={document.getElementById('root')} eventPrefix="client">
      <color attach="background" args={['#f0f0f0']} />
      <Frame id="01" name={`Underworld`} author="Omar Faruq Tawsif" bg="black" position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <HalloweenScene />
      </Frame>

      <Rig />
    </Canvas>
  )

  {/* <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} /> */}

  {/* <EffectComposer multisampling={4}> */ }
  {/* <Image ref={imageRef} url={'jack-o-lantern.avif'} alt="image"
            toneMapped={false} color={'orange'} /> */}
  {/* <Bloom mipmapBlur intensity={10} /> */ }
  {/* </EffectComposer> */ }

}

function Frame({ id, name, author, bg, width = 1, height = 1.61803398875, children, ...props }) {
  const portal = useRef()
  const [, setLocation] = useLocation()
  const [, params] = useRoute('/item/:id')
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  useFrame((state, dt) => easing.damp(portal.current, 'blend', params?.id === id ? 1 : 0, 0.2, dt))
  return (
    <group {...props}>
      <Text fontSize={0.15} anchorY="top" anchorX="left" lineHeight={0.8} position={[-0.375, 0.715, 0.01]} material-toneMapped={false}>
        {name}
      </Text>

      <mesh name={id} onDoubleClick={(e) => (e.stopPropagation(), setLocation('/item/' + e.object.name))} onPointerOver={(e) => hover(true)} onPointerOut={() => hover(false)}>
        <roundedPlaneGeometry args={[width, height, 0.1]} />
        <MeshPortalMaterial ref={portal} events={params?.id === id} side={THREE.DoubleSide}>
          <color attach="background" args={[bg]} />
          {children}
        </MeshPortalMaterial>
      </mesh>
    </group>
  )
}

function Rig({ position = new THREE.Vector3(0, 0, 2), focus = new THREE.Vector3(0, 0, 0) }) {
  const { controls, scene } = useThree()
  const [, params] = useRoute('/item/:id')
  useEffect(() => {
    const active = scene.getObjectByName(params?.id)
    if (active) {
      active.parent.localToWorld(position.set(0, 0.5, 5))
      active.parent.localToWorld(focus.set(0, 0, -20))
    }
    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true)
  })
  return <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
}