import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Thynkcity%20Main%20Logo-bcVE5HyamWS9SeUWcwQGUVGHkpQKQn.png"
              alt="Thynkcity Logo"
              width={150}
              height={40}
              className="h-8 w-auto brightness-0 invert"
            />
            <p className="text-sm text-secondary-foreground/80">
              Empowering Africa's future through innovative education, expert consulting, and transformative technology
              solutions.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-montserrat">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services/consulting"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Consulting Services
                </Link>
              </li>
              <li>
                <Link
                  href="/services/training"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Training Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-montserrat">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/services/consulting"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services/consulting"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link
                  href="/services/training"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Tech Training
                </Link>
              </li>
              <li>
                <Link
                  href="/services/partnerships"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  School Partnerships
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Edustash
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-montserrat">Stay Connected</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@thynkcity.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+234 (0) 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Subscribe to our newsletter</p>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/60"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10 bg-transparent"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-secondary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-secondary-foreground/60">© 2024 Thynkcity. All rights reserved.</p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
