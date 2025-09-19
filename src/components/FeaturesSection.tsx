import { Search, DollarSign, TrendingUp, Shield, Clock, FileText } from "lucide-react"

const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: "Smart Recruitment",
      description: "AI-powered candidate screening and automated interview scheduling to find the best talent faster.",
    },
    {
      icon: DollarSign,
      title: "Payroll Management",
      description:
        "Automated payroll processing, tax calculations, and compliance reporting for seamless financial management.",
    },
    {
      icon: TrendingUp,
      title: "Performance Tracking",
      description: "Real-time performance metrics and goal tracking to drive employee development and success.",
    },
    {
      icon: Shield,
      title: "Compliance Management",
      description: "Stay compliant with labor laws and regulations with automated compliance monitoring and reporting.",
    },
    {
      icon: Clock,
      title: "Time & Attendance",
      description: "Digital time tracking and attendance analytics to optimize workforce productivity and scheduling.",
    },
    {
      icon: FileText,
      title: "Document Management",
      description: "Centralized document storage and automated workflows for efficient HR document handling.",
    },
  ]

  return (
    <section id="features" className="bg-slate-800 min-h-screen flex items-center py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Powerful Features for Modern HR</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Everything you need to manage your workforce efficiently and effectively.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-700"
            >
              <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-slate-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-slate-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
