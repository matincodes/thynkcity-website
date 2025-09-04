import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Users, TrendingUp, Globe, BookOpen, Award } from "lucide-react"

export default function FranchisePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">Franchise Opportunity</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Partner with <span className="text-blue-600">ThynkCity</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join Africa's leading EdTech franchise network. Empower your community with cutting-edge technology
            education while building a profitable business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/franchise/signup">Apply Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/franchise/login">Franchisee Login</Link>
            </Button>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Proven Business Model</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Join a successful franchise system with established processes, training programs, and ongoing support.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Growing Market</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Tap into the rapidly expanding EdTech market in Africa with high demand for quality technology
                education.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Globe className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Comprehensive Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Get full marketing support, curriculum materials, training resources, and ongoing business guidance.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* What You Get Section */}
        <div className="bg-white rounded-2xl p-8 mb-16 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-12">What You Get as a ThynkCity Franchisee</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <BookOpen className="h-6 w-6 text-blue-600 mr-2" />
                Complete Curriculum Package
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Age-appropriate courses for kids and adults</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>AI-powered learning tools (ThynkAI & ThynkBot)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Regular curriculum updates and new courses</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Award className="h-6 w-6 text-blue-600 mr-2" />
                Business Support Tools
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>School CRM and lead management system</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Automated proposal and contract generation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Marketing materials and brand guidelines</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-blue-600 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your EdTech Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join the ThynkCity franchise network and make a difference in your community while building a successful
            business.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link href="/franchise/signup">Get Started Today</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
