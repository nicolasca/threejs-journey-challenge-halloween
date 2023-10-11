import { Gltf } from "@react-three/drei"

const HalloweenScene = () => {

  return (
    <>
      <ambientLight intensity={0.5} />
      <Gltf src="halloween_pumpkin.glb" scale={8} position={[0, -0.7, -20]} />
    </>
  )

}

export default HalloweenScene