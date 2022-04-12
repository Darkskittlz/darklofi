import '../App.css';
import React, { Suspense, useCallback, useMemo, useRef } from 'react';
import { Canvas, extend, useFrame, useLoader, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import circleImg from '../assets/circle.png';
import styled from 'styled-components';
import 'react-slideshow-image/dist/styles.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Video from './Video';
extend({ OrbitControls })


function CameraControls() {
    const {
        camera,
        gl: { domElement }
    } = useThree();

    const controlsRef = useRef();
    useFrame(() => controlsRef.current.update())

    return (
        <orbitControls
            ref={controlsRef}
            args={[camera, domElement]}
            autoRotate
            autoRotateSpeed={-0.2}
        />
    )
}

function Points() {
    const imgTex = useLoader(THREE.TextureLoader, circleImg);
    const bufferRef = useRef();

    let t = 0;
    let f = 0.002;
    let a = 4;

    const graph = useCallback((x, z) => {
        return Math.sin(f * (x ** 2 + z ** 2 + t)) * a;
    }, [t, f, a])


    //count = number of points along one axis
    const count = 100

    //sep = seperation or distance between each point
    const sep = 3
    let positions = useMemo(() => {
        let positions = []

        for (let xi = 0; xi < count; xi++) {
            for (let zi = 0; zi < count; zi++) {
                let x = sep * (xi - count / 2);
                let z = sep * (zi - count / 2);
                let y = graph(x, z);
                positions.push(x, y, z);
            }
        }

        return new Float32Array(positions);
    }, [count, sep, graph])

    useFrame(() => {
        t += 15
        const positions = bufferRef.current.array;

        let i = 0;
        for (let xi = 0; xi < count; xi++) {
            for (let zi = 0; zi < count; zi++) {
                let x = sep * (xi - count / 2);
                let z = sep * (zi - count / 2);

                positions[i + 1] = graph(x, z);
                i += 3;
            }
        }

        bufferRef.current.needsUpdate = true;
    })

    return (
        <points>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    ref={bufferRef}
                    attachObject={['attributes', 'position']}
                    count={positions.length / 3}
                    itemSize={3}
                    array={positions}
                />
            </bufferGeometry>

            <pointsMaterial
                attach="material"
                map={imgTex}
                color={0x00AAFF}
                size={0.5}
                sizeAttenuation
                transparent={false}
                alphaTest={0.5}
                opacity={1.0}
            />
        </points>
    )
}

function AnimationCanvas() {
    return (
        <Canvas
            colorManagement={false}
            camera={{ position: [100, 10, 0], fov: 75 }}
        >
            <Suspense fallback={null}>
                <Points />
            </Suspense>
            <CameraControls />
        </Canvas>
    );
}

const TitleBox = styled.div`
    display: flex;
    position: fixed;
    z-index: 998;
    width: 100%;
    justify-content: center;
    margin-top: 20px;
    @media (max-width: 860px){
        display: flex;
        justify-content: center;
        width: 100%;
    }
`

const Title = styled.h1`
    font-size: 70px;
    font-family: 'yellowtail', cursive;
    margin-bottom: 0;
    color: white;
`


const Body = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 999;
    position: fixed;

    @media (max-width: 860px){
        display: flex;
        flex-direction: column;
        align-content: center;
        left: 2.5%;
        top: 15%;
        row-gap: 0rem;
        width: 95%;
  }
`

const Card = styled.div`
        flex-direction: column;
        margin-top: 120px;
        display: flex;
        z-index: 999;
        width: 100%;

        img {
            object-fit: cover;
            height: 100%;
            text-align: center;
            @media (max-width: 860px){
            height: 100%;
            }
        }

        h1 {
            font-size: 25px;
            font-family: "notMyType";
            color: white;
            text-align: center;
            z-index: 999;
            backdrop-filter: blur(10px);
        }

        p {
            text-align: center;
            color: white;
            font-size: 20px;
        }

        @media (max-width: 860px){
            height: 100%;
            display: flex;
            justify-content: center;
            align-content: end;
        }
    `

const Container = styled.div`
        display: flex;
        justify-content: center;
        backdrop-filter: blur(10px);
        background-color: #b3b1b113;
        border-radius: 10px;
    `


const LofiContainer = () => {
    return (
        <>
            <Body>
                <Card>
                    <Container>
                        <Video />
                    </Container>
                </Card>
            </Body>
        </>
    )
}




const Home = () => {
    return (
        <>
            <TitleBox>
                <Title>DarkMeowFi</Title>
                <LofiContainer />
            </TitleBox>
            <div className="anim">
                <Suspense fallback={<div>Loading...</div>}>
                    <AnimationCanvas />
                </Suspense>
            </div>
        </>
    );
};

export default Home;
