import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { Calendar, User, Clock, ArrowLeft, Share2, BookOpen, Lightbulb, Users, TrendingUp, Globe } from "lucide-react"

export default function RoboticsArticlePage() {
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
              <Badge variant="secondary">EdTech Insights</Badge>
              <h1 className="text-4xl lg:text-5xl font-bold font-montserrat text-foreground leading-tight">
                5 Reasons Why Robotics is the Future for African Children
              </h1>
              <p className="text-xl text-muted-foreground">
                Discover how robotics education is transforming young minds across Africa and preparing the next
                generation for a technology-driven future.
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-b border-border py-4">
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Dr. Michael Adeyemi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>December 15, 2024</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>5 min read</span>
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
            src="/placeholder.svg?height=500&width=800&text=African+children+learning+robotics+and+building+robots+in+classroom"
            alt="African children learning robotics"
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
              As Africa continues its rapid digital transformation, one field stands out as particularly promising for
              the continent's youth: robotics. From Lagos to Nairobi, from Cape Town to Cairo, children are discovering
              the magic of building, programming, and controlling robots. But this isn't just about fun and games –
              robotics education is laying the foundation for Africa's technological future.
            </p>

            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
              <div className="flex items-start space-x-3">
                <Lightbulb className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold font-montserrat text-lg mb-2">Key Insight</h3>
                  <p className="text-muted-foreground">
                    Countries that invest in robotics education today will lead the automation revolution tomorrow.
                    Africa has the opportunity to leapfrog traditional manufacturing models and embrace Industry 4.0
                    from the ground up.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold font-montserrat text-foreground mb-6 flex items-center">
              <BookOpen className="mr-3 h-8 w-8 text-primary" />
              1. Developing Critical Problem-Solving Skills
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-6">
              Robotics education goes far beyond teaching children how to build machines. It's fundamentally about
              developing critical thinking and problem-solving skills that are essential in our increasingly complex
              world. When a child programs a robot to navigate a maze or complete a specific task, they're learning to
              break down complex problems into manageable steps.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              In African contexts, where resourcefulness and innovation are often born from necessity, robotics
              education amplifies these natural problem-solving instincts. Children learn to work with constraints, find
              creative solutions, and iterate on their designs – skills that are invaluable whether they become
              engineers, entrepreneurs, or leaders in any field.
            </p>

            <h2 className="text-3xl font-bold font-montserrat text-foreground mb-6 flex items-center">
              <Users className="mr-3 h-8 w-8 text-primary" />
              2. Preparing for the Jobs of Tomorrow
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-6">
              The World Economic Forum predicts that by 2030, over 85 million jobs may be displaced by automation, while
              97 million new jobs may emerge that are more adapted to the new division of labor between humans and
              machines. African children learning robotics today are positioning themselves at the forefront of this
              transformation.
            </p>

            <div className="bg-muted/50 p-6 rounded-lg mb-8">
              <h4 className="font-semibold font-montserrat mb-4">Future Career Opportunities in Robotics:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Robotics Engineers and Technicians</li>
                <li>• AI and Machine Learning Specialists</li>
                <li>• Automation Consultants</li>
                <li>• Human-Robot Interaction Designers</li>
                <li>• Agricultural Robotics Specialists</li>
                <li>• Healthcare Robotics Professionals</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold font-montserrat text-foreground mb-6 flex items-center">
              <TrendingUp className="mr-3 h-8 w-8 text-primary" />
              3. Bridging the Digital Divide
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-6">
              One of the most significant challenges facing Africa is the digital divide – the gap between those who
              have access to modern technology and those who don't. Robotics education serves as a powerful bridge
              across this divide, providing hands-on experience with cutting-edge technology in an accessible and
              engaging format.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              Unlike many other advanced technologies, robotics can be taught with relatively simple, affordable
              components. A basic robotics kit can introduce children to programming, electronics, mechanical
              engineering, and systems thinking – all while being tangible and interactive in a way that purely digital
              education cannot match.
            </p>

            <h2 className="text-3xl font-bold font-montserrat text-foreground mb-6 flex items-center">
              <Globe className="mr-3 h-8 w-8 text-primary" />
              4. Addressing Africa-Specific Challenges
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-6">
              Africa faces unique challenges that robotics and automation could help solve: from agricultural
              productivity and healthcare delivery to infrastructure development and environmental conservation.
              Children learning robotics today are the ones who will develop tomorrow's solutions to these pressing
              issues.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card border border-border p-6 rounded-lg">
                <h4 className="font-semibold font-montserrat mb-3">Agricultural Innovation</h4>
                <p className="text-sm text-muted-foreground">
                  Robotics can revolutionize farming through precision agriculture, automated irrigation, and crop
                  monitoring systems.
                </p>
              </div>
              <div className="bg-card border border-border p-6 rounded-lg">
                <h4 className="font-semibold font-montserrat mb-3">Healthcare Access</h4>
                <p className="text-sm text-muted-foreground">
                  Robotic systems can extend healthcare reach to remote areas through telemedicine robots and automated
                  diagnostic tools.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold font-montserrat text-foreground mb-6 flex items-center">
              <Lightbulb className="mr-3 h-8 w-8 text-primary" />
              5. Fostering Innovation and Entrepreneurship
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-6">
              Perhaps most importantly, robotics education nurtures the entrepreneurial spirit that Africa needs to
              drive its own technological development. When children learn to build and program robots, they're not just
              consuming technology – they're creating it.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              This shift from technology consumers to technology creators is crucial for Africa's economic development.
              The continent has already shown remarkable innovation in areas like mobile payments and fintech. Robotics
              education can help extend this innovative capacity into manufacturing, agriculture, healthcare, and
              beyond.
            </p>

            <div className="bg-primary text-primary-foreground p-8 rounded-2xl mb-8">
              <h3 className="text-2xl font-bold font-montserrat mb-4">The Thynkcity Approach</h3>
              <p className="mb-4">
                At Thynkcity, we've seen firsthand how robotics education transforms children's confidence, creativity,
                and career aspirations. Our robotics programs are designed specifically for African contexts, using
                locally relevant examples and addressing real-world challenges.
              </p>
              <Button variant="secondary" asChild>
                <Link href="/services/partnerships">Learn About Our Robotics Programs</Link>
              </Button>
            </div>

            <h2 className="text-3xl font-bold font-montserrat text-foreground mb-6">
              Looking Ahead: The Robotics Generation
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-6">
              The children learning robotics in African classrooms today will be the engineers, entrepreneurs, and
              innovators who shape the continent's future. They'll be the ones who develop robotic solutions for African
              challenges, who start the next generation of tech companies, and who ensure that Africa is not just a
              consumer of global technology but a creator and leader.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              The question isn't whether robotics will be important for Africa's future – it's whether we'll prepare our
              children to be leaders in this robotic revolution or followers. The choice is ours, and the time is now.
            </p>

            <div className="border-t border-border pt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold font-montserrat">Dr. Michael Adeyemi</p>
                    <p className="text-sm text-muted-foreground">Head of Education at Thynkcity</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Article
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold font-montserrat text-foreground">Related Articles</h2>
            <p className="text-muted-foreground">Continue exploring insights on education and technology</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/blog/data-science-career-transformation-nigeria" className="group">
              <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <Image
                  src="/placeholder.svg?height=200&width=400&text=Data+science+career+transformation"
                  alt="Data Science Career"
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <Badge variant="secondary" className="mb-3">
                    Career Advice
                  </Badge>
                  <h3 className="font-semibold font-montserrat text-lg mb-2 group-hover:text-primary transition-colors">
                    How Upskilling in Data Science Can Transform Your Career in Nigeria
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Explore the growing demand for data scientists in Nigeria and learn how acquiring these skills can
                    accelerate your professional growth.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/blog/choosing-right-tech-partner-african-businesses" className="group">
              <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <Image
                  src="/placeholder.svg?height=200&width=400&text=Choosing+tech+partner+for+business"
                  alt="Tech Partner Selection"
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <Badge variant="secondary" className="mb-3">
                    Business Insights
                  </Badge>
                  <h3 className="font-semibold font-montserrat text-lg mb-2 group-hover:text-primary transition-colors">
                    Choosing the Right Tech Partner: What African Businesses Should Look For
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    A comprehensive guide to selecting the perfect technology partner for your African business.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
