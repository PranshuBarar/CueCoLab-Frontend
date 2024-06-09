import React from "react";
import "@/ui/global.css";
import { EmailProvider } from "@/contexts/EmailContext";
import { UserAccountDetailsProvider } from "@/contexts/UserAccountDetailsContext";
import { VideosProvider } from "@/contexts/AllInsideRoomContexts/VideosContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html prefix="og: http://ogp.me/ns#">
      <head>
        <meta name="viewport" content="width=1024, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@cuecolab" />
        <meta name="twitter:title" content="CueCoLab - Empowering Creators" />
        <meta name="twitter:description" content="Enhance your creative collaborations with CueCoLab, your partner in content creation and management." />
        <meta name="twitter:image" content="https://twitterimageforcuecolab.s3.ap-south-1.amazonaws.com/Screenshot+from+2024-06-01+05-35-37.png" />
        <meta name="twitter:url" content="https://cuecolab.com/home" />
        <meta property='og:title' content='CueCoLab'/>
        <meta property='og:image' content='https://twitterimageforcuecolab.s3.ap-south-1.amazonaws.com/file.jpg'/>
        <meta property='og:description' content='Secure and Streamline your content creation process with CueCoLab'/>
        <meta property='og:url' content='https://cuecolab.com/home' />
      </head>
      <body>
          {/* <VideosProvider> */}
          <EmailProvider>
            {children}
          </EmailProvider>
          {/* </VideosProvider> */}
        </body>
    </html>
  );
}
