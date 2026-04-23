"use client";

import { useEffect, useState, ReactNode } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface Props {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export default function MobileGyroParallax({ children, strength = 20, className }: Props) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  
  const x = useSpring(0, { stiffness: 50, damping: 20 });
  const y = useSpring(0, { stiffness: 50, damping: 20 });

  const translateX = useTransform(x, [-30, 30], [-strength, strength]);
  const translateY = useTransform(y, [-30, 30], [-strength, strength]);

  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    const handleOrientation = (e: DeviceOrientationEvent) => {
        if (e.beta !== null && e.gamma !== null) {
            // Beta: -180 to 180 (front/back tilt)
            // Gamma: -90 to 90 (left/right tilt)
            x.set(e.gamma);
            y.set(e.beta - 45); // Assuming 45 deg viewing angle
        }
    };

    if (isIOS && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        // Permission needed for iOS 13+
        setHasPermission(false);
    } else {
        window.addEventListener('deviceorientation', handleOrientation);
        setHasPermission(true);
    }

    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [x, y]);

  const requestPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          setHasPermission(true);
          window.addEventListener('deviceorientation', (e) => {
            if (e.beta !== null && e.gamma !== null) {
                x.set(e.gamma);
                y.set(e.beta - 45);
            }
          });
        }
      } catch (err) {
        console.error('Gyro permission denied', err);
      }
    }
  };

  return (
    <motion.div 
      className={className}
      style={{ x: translateX, y: translateY }}
      onClick={hasPermission === false ? requestPermission : undefined}
    >
      {children}
    </motion.div>
  );
}
