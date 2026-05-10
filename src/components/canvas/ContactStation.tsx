"use client";

import { Text } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { CONTACTS, type ContactPoint } from "@/data/contact";
import { useGameStore } from "@/stores/gameStore";

function Mailbox({
  contact,
  highlight,
}: {
  contact: ContactPoint;
  highlight: boolean;
}) {
  const [x, z] = contact.position;
  return (
    <group position={[x, 0, z]}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[0.3, 0.8, 0.3]} />
          <meshStandardMaterial color="#5a3a1a" flatShading />
        </mesh>
        <mesh position={[0, 1.1, 0]} castShadow>
          <boxGeometry args={[0.9, 0.8, 0.6]} />
          <meshStandardMaterial
            color={contact.color}
            flatShading
            emissive={highlight ? contact.color : "#000"}
            emissiveIntensity={highlight ? 0.5 : 0}
          />
        </mesh>
        <mesh position={[0, 1.55, 0.31]}>
          <boxGeometry args={[0.7, 0.1, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" flatShading />
        </mesh>
      </RigidBody>
      <Text
        position={[0, 2, 0]}
        fontSize={0.22}
        color="#fff"
        outlineWidth={0.03}
        outlineColor="#000"
        anchorX="center"
      >
        {contact.label}
      </Text>
    </group>
  );
}

function PostOffice() {
  return (
    <group position={[0, 0, -22]}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
          <boxGeometry args={[5, 2, 3]} />
          <meshStandardMaterial color="#dc2626" flatShading />
        </mesh>
        <mesh position={[0, 2.4, 0]} castShadow>
          <boxGeometry args={[5.4, 0.8, 3.4]} />
          <meshStandardMaterial color="#1f2937" flatShading />
        </mesh>
      </RigidBody>
      <Text
        position={[0, 3.2, 0]}
        fontSize={0.4}
        color="#fff"
        outlineWidth={0.05}
        outlineColor="#000"
        anchorX="center"
      >
        📬 CONTACT
      </Text>
    </group>
  );
}

export function ContactStation() {
  const nearby = useGameStore((s) => s.nearbyInteractable);
  return (
    <group>
      <PostOffice />
      {CONTACTS.map((c) => (
        <Mailbox
          key={c.id}
          contact={c}
          highlight={nearby === `contact:${c.id}`}
        />
      ))}
    </group>
  );
}
