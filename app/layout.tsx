import React, { ReactNode } from "react";
import { AuthenticationProvider } from "@/context/Authentication.context";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

import "styles/globals.scss";
import { SWRProvider } from "./swr-provider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SWRProvider>
          <AuthenticationProvider>
            <Header />
            {children}
            <Footer />
          </AuthenticationProvider>
        </SWRProvider>
      </body>
    </html>
  );
}
