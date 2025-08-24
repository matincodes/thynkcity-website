import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import Link from "next/link"
import Image from "next/image"
import { Calendar, User, Clock, ArrowLeft, Share2, TrendingUp, DollarSign, BarChart3 } from "lucide-react"

export default function DataScienceArticlePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Article Header */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <Button variant="outline" asChild>
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>

            <div className="space-y-4">
              <Badge variant="secondary">Career Advice</Badge>
              <h1 className="text-4xl lg:text-5xl font-bold font-montserrat text-foreground leading-tight">
                How Upskilling in Data Science Can Transform Your Career in Nigeria
              </h1>
              <p className="text-xl text-muted-foreground">
                Explore the growing demand for data scientists in Nigeria and learn how acquiring these skills can
                accelerate your professional growth in Africa's largest economy.
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-b border-border py-4">
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Sarah Ikechukwu</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>December 10, 2024</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>7 min read</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Image
            src="/placeholder.svg?height=500&width=800&text=Professional+analyzing+data+on+multiple+screens+in+modern+Nigerian+office"
            alt="Data scientist working in Nigeria"
            width={800}
            height={500}
            className="w-full rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Nigeria's digital economy is booming, and at the heart of this transformation lies data science. From
              fintech giants like Flutterwave and Paystack to e-commerce platforms like Jumia, Nigerian companies are
              increasingly relying on data-driven insights to make strategic decisions, optimize operations, and drive
              growth. This surge in demand has created unprecedented opportunities for professionals willing to upskill
              in data science.
            </p>

            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
              <div className="flex items-start space-x-3">
                <TrendingUp className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold font-montserrat text-lg mb-2">Market Reality</h3>
                  <p className="text-muted-foreground">
                    According to recent industry reports, data science roles in Nigeria have grown by over 300% in the
                    past three years, with average salaries ranging from ₦3.5M to ₦15M annually for experienced
                    professionals.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold font-montserrat text-foreground mb-6 flex items-center">
              <DollarSign className="mr-3 h-8 w-8 text-primary" />
              The Economic Impact: Why Nigeria Needs Data Scientists
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-6">
              Nigeria's economy is undergoing a fundamental shift. Traditional sectors like oil and gas, while still
              important, are being complemented by a rapidly growing digital economy. The Nigerian government's push for
              financial inclusion, digital transformation initiatives, and the rise of tech hubs in Lagos, Abuja, and
              Port Harcourt have created a perfect storm of opportunity for data professionals.
            </p>

            <div className="bg-muted/50 p-6 rounded-lg mb-8">
              <h4 className="font-semibold font-montserrat mb-4">Key Sectors Driving Data Science Demand:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-2">Financial Services</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Risk assessment and fraud detection</li>
                    <li>• Credit scoring and lending decisions</li>
                    <li>• Customer behavior analysis</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">E-commerce & Retail</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Recommendation systems</li>
                    <li>• Inventory optimization</li>
                    <li>• Price optimization</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Healthcare</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Predictive diagnostics</li>
                    <li>• Drug discovery</li>
                    <li>• Healthcare analytics</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Agriculture</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Crop yield prediction</li>
                    <li>• Weather pattern analysis</li>
                    <li>• Supply chain optimization</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold font-montserrat text-foreground mb-6 flex items-center">
              <BarChart3 className="mr-3 h-8 w-8 text-primary" />
              Real Career Transformation Stories
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-6">
              Let me share some real examples of career transformations we've witnessed at Thynkcity.
            </p>

            <div className="space-y-6 mb-8">
              <div className="bg-card border border-border p-6 rounded-lg">
                <h4 className="font-semibold font-montserrat mb-2">From Banking to Tech: Adaora's Journey</h4>
                <p className="text-muted-foreground mb-3">
                  Adaora worked as a relationship manager at a commercial bank in Lagos for 5 years. After completing
                  our Data Science Bootcamp, she transitioned to a Senior Data Analyst role at a leading fintech
                  company, increasing her salary by 180% within 8 months.
                </p>
                <p className="text-sm text-primary font-medium">
                  "The practical projects and industry mentorship at Thynkcity gave me the confidence to make the leap.
                  I'm now building predictive models that help millions of Nigerians access credit."
                </p>
              </div>

              <div className="bg-card border border-border p-6 rounded-lg">
                <h4 className="font-semibold font-montserrat mb-2">Engineering to Data Science: Kemi's Pivot</h4>
                <p className="text-muted-foreground mb-3">
                  Kemi had a mechanical engineering background but felt limited by traditional engineering roles. After
                  our 6-month intensive program, she landed a Machine Learning Engineer position at an e-commerce
                  startup, where she now leads recommendation system development.
                </p>
                <p className="text-sm text-primary font-medium">
                  "Data science allowed me to combine my analytical mindset with cutting-edge technology. I'm solving
                  problems that impact thousands of customers daily."
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold font-montserrat text-foreground mb-6">
              Your Roadmap to Data Science Success
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-6">
              Transitioning into data science doesn't happen overnight, but with the right approach, you can build the
              skills needed to compete in Nigeria's growing tech ecosystem. Here's a practical roadmap based on our
              experience training over 2,000 professionals:
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold font-montserrat mb-2">Master the Fundamentals</h4>
                  <p className="text-muted-foreground">
                    Start with statistics, probability, and basic programming in Python or R. Focus on understanding
                    data structures, data cleaning, and exploratory data analysis.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold font-montserrat mb-2">Build Machine Learning Skills</h4>
                  <p className="text-muted-foreground">
                    Learn supervised and unsupervised learning algorithms. Practice with real datasets from Nigerian
                    contexts - financial data, agricultural data, or e-commerce metrics.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold font-montserrat mb-2">Develop Business Acumen</h4>
                  <p className="text-muted-foreground">
                    Understand how data science creates business value. Learn to communicate insights to non-technical
                    stakeholders and align your work with business objectives.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-semibold font-montserrat mb-2">Build a Portfolio</h4>
                  <p className="text-muted-foreground">
                    Create 3-5 projects that showcase different skills. Include at least one project that addresses a
                    Nigerian market challenge - this shows local relevance to employers.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  5
                </div>
                <div>
                  <h4 className="font-semibold font-montserrat mb-2">Network and Apply</h4>
                  <p className="text-muted-foreground">
                    Join data science communities, attend meetups, and start applying for roles. Don't wait until you
                    feel "ready" - the learning continues on the job.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg mb-8">
              <h3 className="font-semibold font-montserrat text-lg mb-4">
                Why Choose Thynkcity for Your Data Science Journey?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium mb-2">Industry-Relevant Curriculum</h5>
                  <p className="text-muted-foreground">
                    Our courses are designed with input from leading Nigerian tech companies.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Practical Projects</h5>
                  <p className="text-muted-foreground">
                    Work on real datasets from Nigerian businesses and organizations.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Career Support</h5>
                  <p className="text-muted-foreground">
                    Resume reviews, interview prep, and direct connections to hiring partners.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Flexible Learning</h5>
                  <p className="text-muted-foreground">
                    Evening and weekend classes designed for working professionals.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold font-montserrat text-foreground mb-6">The Time is Now</h2>

            <p className="text-muted-foreground leading-relaxed mb-6">
              Nigeria's data science market is still emerging, which means there's a window of opportunity for early
              adopters. Companies are actively seeking talent, and the competition isn't as fierce as in more mature
              markets. However, this window won't stay open forever.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              The question isn't whether data science will transform industries in Nigeria - it's already happening. The
              question is whether you'll be part of that transformation or watching from the sidelines. Your career
              transformation starts with a single decision to invest in your future.
            </p>

            {/* Call to Action */}
            <div className="bg-primary text-primary-foreground p-8 rounded-2xl text-center">
              <h3 className="text-2xl font-bold font-montserrat mb-4">Ready to Transform Your Career?</h3>
              <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
                Join our next Data Science Bootcamp and learn from industry experts who've helped hundreds of
                professionals successfully transition into high-paying data science roles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/services/training">View Training Programs</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  asChild
                >
                  <Link href="/contact">Schedule a Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold font-montserrat mb-8">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/blog/robotics-future-african-children" className="group">
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <Badge variant="secondary" className="mb-3">
                  EdTech Insights
                </Badge>
                <h4 className="font-semibold font-montserrat mb-2 group-hover:text-primary transition-colors">
                  5 Reasons Why Robotics is the Future for African Children
                </h4>
                <p className="text-sm text-muted-foreground">
                  Discover how robotics education is preparing the next generation of African innovators...
                </p>
              </div>
            </Link>
            <Link href="/blog" className="group">
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <Badge variant="secondary" className="mb-3">
                  Company News
                </Badge>
                <h4 className="font-semibold font-montserrat mb-2 group-hover:text-primary transition-colors">
                  Choosing the Right Tech Partner: What African Businesses Should Look For
                </h4>
                <p className="text-sm text-muted-foreground">
                  A comprehensive guide to selecting technology partners that understand the African market...
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
