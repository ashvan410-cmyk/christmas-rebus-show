import "./globals.css";
export const viewport={width:'device-width',initialScale:1,viewportFit:'cover'};
export const metadata = { title: "Christmas Tradition Games", description: "A Christmas party game for any group. Rebus puzzles, gift exchanges, and festive fun." };
export default function Layout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>;}