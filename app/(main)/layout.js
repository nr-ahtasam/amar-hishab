"use client";

import ColorPicker from "../components/ColorPicker";
import Layout from "../components/Layout";

export default function MainLayout({ children }) {
  return (
    <>
      <Layout>{children}</Layout>
      <ColorPicker />
    </>
  );
}
