import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Thynkcity - Empowering Africa's Future Through Education & Innovation",
  description:
    "Your integrated platform for cutting-edge training, expert consulting, and transformative financial tools. Empowering learners and businesses across Africa.",
  generator: "v0.app",
  keywords:
    "tech training Nigeria, web development agency Lagos, coding for kids Africa, robotics classes for children, AI solutions for business Africa, UI/UX design Nigeria, Edustash, Thynkcity, African EdTech, FinTech Africa, digital transformation Africa",
  authors: [{ name: "Thynkcity Team" }],
  creator: "Thynkcity",
  publisher: "Thynkcity",
  metadataBase: new URL("https://thynkcity.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thynkcity.com",
    siteName: "Thynkcity",
    title: "Thynkcity - Empowering Africa's Future Through Education & Innovation",
    description:
      "Your integrated platform for cutting-edge training, expert consulting, and transformative financial tools. Empowering learners and businesses across Africa.",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Thynkcity%20Main%20Logo-bcVE5HyamWS9SeUWcwQGUVGHkpQKQn.png",
        width: 1200,
        height: 630,
        alt: "Thynkcity - Empowering Africa's Future",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thynkcity - Empowering Africa's Future Through Education & Innovation",
    description:
      "Your integrated platform for cutting-edge training, expert consulting, and transformative financial tools. Empowering learners and businesses across Africa.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Thynkcity%20Main%20Logo-bcVE5HyamWS9SeUWcwQGUVGHkpQKQn.png",
    ],
    creator: "@thynkcity",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
