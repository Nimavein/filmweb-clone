"use client";

import React, { ReactNode } from "react";
import "react-circular-progressbar/dist/styles.css";
import "styles/globals.scss";
import Layout from "@/components/Layout/Layout";
import { Providers } from "@/store/provider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
