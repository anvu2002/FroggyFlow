'use client';

import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({ children }) {
  const [isBannerVisible, setIsBannerVisible] = useState(true); // Manage banner visibility state

  return (
    <Provider>
      <Navbar />
      {children}
      <Toaster />
    </Provider>
  );
};
