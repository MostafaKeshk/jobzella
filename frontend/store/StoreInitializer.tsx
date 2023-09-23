"use client";

import { useRef } from "react";
import { useStore } from ".";

const StoreInitializer = ({ openNav }: { openNav: boolean }) => {
  const initialized = useRef(false);
  if (!initialized.current) {
    useStore.setState({ openNav });
    initialized.current = true;
  }
  return null;
};

export default StoreInitializer;
