import { PrismicPreview } from "@prismicio/next";
import { repositoryName, createClient } from "@/prismicio";
import * as stylex from "@stylexjs/stylex";
import { darkTheme, colors } from "@/styles/theme.stylex";
import "@fontsource-variable/geist";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const bodyStyles = stylex.create({
  body: {
    backgroundColor: colors.background,
    color: colors.foreground,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  main: {
    flex: 1,
  },
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient();
  const header = await client.getSingle("header");

  return (
    <html lang="en" {...stylex.props(darkTheme)}>
      <body {...stylex.props(bodyStyles.body)}>
        <Header name={header.data.name || ""} links={header.data.links} />
        <main {...stylex.props(bodyStyles.main)}>{children}</main>
        <Footer />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
