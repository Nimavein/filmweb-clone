import React, { ReactNode } from "react";
import { AuthenticationProvider } from "@/context/Authentication.context";
import { ProfileDataProvider } from "@/context/ProfileData.context";
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
            <ProfileDataProvider>
              <Header />
              {children}
              <Footer />
            </ProfileDataProvider>
          </AuthenticationProvider>
        </SWRProvider>
      </body>
    </html>
  );
}
