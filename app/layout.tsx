import React, { ReactNode } from "react";
import "react-circular-progressbar/dist/styles.css";
import "styles/globals.scss";
import Layout from "@/components/Layout/Layout";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
