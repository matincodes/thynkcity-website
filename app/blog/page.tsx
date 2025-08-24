import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { Calendar, User, ArrowRight, BookOpen, TrendingUp, Briefcase, Building } from "lucide-react"

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      slug: "robotics-future-african-children",
      title: "5 Reasons Why Robotics is the Future for African Children",
      excerpt:
        "Discover how robotics education is transforming young minds across Africa and preparing the next generation for a technology-driven future.",
      category: "EdTech Insights",
      author: "Dr. Michael Adeyemi",
      date: "December 15, 2024",
      readTime: "5 min read",
      image: "/placeholder.svg?height=400&width=600&text=African+children+learning+robotics+and+building+robots",
      featured: true,
    },
    {
      id: 2,
      slug: "data-science-career-transformation-nigeria",
      title: "How Upskilling in Data Science Can Transform Your Career in Nigeria",
      excerpt:
        "Explore the growing demand for data scientists in Nigeria and learn how acquiring these skills can accelerate your professional growth.",
      category: "Career Advice",
      author: "Sarah Ikechukwu",
      date: "December 10, 2024",
      readTime: "7 min read",
      image:
        "/placeholder.svg?height=400&width=600&text=Professional+analyzing+data+on+multiple+screens+in+modern+office",
      featured: true,
    },
    {
      id: 3,
      slug: "choosing-right-tech-partner-african-businesses",
      title: "Choosing the Right Tech Partner: What African Businesses Should Look For",
      excerpt:
        "A comprehensive guide to selecting the perfect technology partner for your African business, with key criteria and red flags to watch out for.",
      category: "Business Insights",
      author: "Fatima Al-Hassan",
      date: "December 5, 2024",
      readTime: "6 min read",
      image:
        "/placeholder.svg?height=400&width=600&text=Business+meeting+with+African+entrepreneurs+and+tech+consultants",
      featured: true,
    },
    {
      id: 4,
      slug: "fintech-revolution-africa-2024",
      title: "The FinTech Revolution: How Africa is Leading Global Innovation",
      excerpt:
        "An in-depth look at how African FinTech companies are pioneering solutions that are being adopted worldwide.",
      category: "FinTech Trends",
      author: "Dr. Adebayo Ogundimu",
      date: "November 28, 2024",
      readTime: "8 min read",
      image: "/placeholder.svg?height=400&width=600&text=Mobile+payment+and+fintech+innovation+in+Africa",
      featured: false,
    },
    {
      id: 5,
      slug: "ai-education-african-schools",
      title: "Integrating AI Education in African Schools: A Practical Approach",
      excerpt:
        "Step-by-step guidance for schools looking to introduce artificial intelligence concepts into their curriculum.",
      category: "EdTech Insights",
      author: "Dr. Michael Adeyemi",
      date: "November 20, 2024",
      readTime: "6 min read",
      image: "/placeholder.svg?height=400&width=600&text=Students+learning+AI+concepts+in+classroom+setting",
      featured: false,
    },
    {
      id: 6,
      slug: "thynkcity-expansion-announcement",
      title: "Thynkcity Expands to 5 New African Countries",
      excerpt:
        "We're excited to announce our expansion into Kenya, Ghana, South Africa, Rwanda, and Senegal, bringing world-class tech education to more communities.",
      category: "Company News",
      author: "Thynkcity Team",
      date: "November 15, 2024",
      readTime: "3 min read",
      image: "/placeholder.svg?height=400&width=600&text=African+map+showing+Thynkcity+expansion+across+continent",
      featured: false,
    },
  ]

  const categories = [
    { name: "All Posts", icon: BookOpen, count: blogPosts.length },
    {
      name: "EdTech Insights",
      icon: BookOpen,
      count: blogPosts.filter((post) => post.category === "EdTech Insights").length,
    },
    {
      name: "Career Advice",
      icon: TrendingUp,
      count: blogPosts.filter((post) => post.category === "Career Advice").length,
    },
    {
      name: "Business Insights",
      icon: Briefcase,
      count: blogPosts.filter((post) => post.category === "Business Insights").length,
    },
    {
      name: "FinTech Trends",
      icon: Building,
      count: blogPosts.filter((post) => post.category === "FinTech Trends").length,
    },
    {
      name: "Company News",
      icon: Building,
      count: blogPosts.filter((post) => post.category === "Company News").length,
    },
  ]

  const featuredPosts = blogPosts.filter((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-background to-muted py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="text-primary border-primary">
                Thynkcity Blog
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold font-montserrat text-foreground leading-tight">
                Insights, Stories, and <span className="text-primary">Innovation</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                Stay updated with the latest trends in technology, education, and business across Africa. Discover
                insights from our experts and learn from success stories that inspire.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <Button key={index} variant="outline" className="flex items-center space-x-2 bg-transparent">
                <category.icon className="h-4 w-4" />
                <span>{category.name}</span>
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">Featured Articles</h2>
              <p className="text-xl text-muted-foreground">Our most popular and impactful content</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <Card
                  key={post.id}
                  className={`group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 overflow-hidden ${index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
                >
                  <div className="relative">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={600}
                      height={400}
                      className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${index === 0 ? "h-80" : "h-48"}`}
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-background/90 text-foreground">
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="space-y-4">
                    <CardTitle
                      className={`font-montserrat group-hover:text-primary transition-colors ${index === 0 ? "text-2xl" : "text-xl"}`}
                    >
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription className={index === 0 ? "text-base" : "text-sm"}>{post.excerpt}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <span>{post.readTime}</span>
                    </div>

                    <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Regular Posts */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">Latest Articles</h2>
              <p className="text-xl text-muted-foreground">Stay updated with our newest content</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Card
                  key={post.id}
                  className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 overflow-hidden"
                >
                  <div className="relative">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-background/90 text-foreground">
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="space-y-3">
                    <CardTitle className="font-montserrat text-lg group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription className="text-sm">{post.excerpt}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <span>{post.readTime}</span>
                    </div>

                    <Button asChild size="sm" className="w-full group-hover:bg-primary/90 transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        Read More
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
