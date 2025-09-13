import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  Target,
  BarChart3,
  Video,
  Star,
  Lightbulb,
} from "lucide-react"

const TrainerDashboard = () => {
  const trainingStats = [
    {
      name: "Active Courses",
      value: "24",
      change: "+3",
      changeType: "increase",
      icon: BookOpen,
      color: "bg-blue-500",
      target: "30",
    },
    {
      name: "Total Learners",
      value: "347",
      change: "+28",
      changeType: "increase",
      icon: Users,
      color: "bg-green-500",
      target: "400",
    },
    {
      name: "Certificates Issued",
      value: "156",
      change: "+15",
      changeType: "increase",
      icon: Award,
      color: "bg-purple-500",
      target: "200",
    },
    {
      name: "Avg. Completion Rate",
      value: "87.5%",
      change: "+2.3%",
      changeType: "increase",
      icon: Target,
      color: "bg-orange-500",
      target: "90%",
    },
  ]

  const coursePerformance = [
    {
      id: 1,
      title: "React Advanced Development",
      category: "Technology",
      enrollments: 45,
      completions: 38,
      completionRate: 84,
      avgRating: 4.7,
      status: "active",
      instructor: "Sarah Chen",
    },
    {
      id: 2,
      title: "Leadership Fundamentals",
      category: "Management",
      enrollments: 32,
      completions: 29,
      completionRate: 91,
      avgRating: 4.9,
      status: "active",
      instructor: "Mike Johnson",
    },
    {
      id: 3,
      title: "Data Analysis with Python",
      category: "Analytics",
      enrollments: 28,
      completions: 22,
      completionRate: 79,
      avgRating: 4.5,
      status: "active",
      instructor: "Alex Rodriguez",
    },
    {
      id: 4,
      title: "Digital Marketing Strategy",
      category: "Marketing",
      enrollments: 39,
      completions: 35,
      completionRate: 90,
      avgRating: 4.6,
      status: "active",
      instructor: "Emily Davis",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "completion",
      message: 'John Doe completed "Advanced Excel" course',
      time: "15 minutes ago",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "enrollment",
      message: '5 new learners enrolled in "Leadership Training"',
      time: "1 hour ago",
      icon: Users,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "certificate",
      message: 'Certificate issued to Sarah Chen for "Project Management"',
      time: "2 hours ago",
      icon: Award,
      color: "text-purple-600",
    },
    {
      id: 4,
      type: "session",
      message: 'Live session "React Hooks" completed successfully',
      time: "4 hours ago",
      icon: Video,
      color: "text-orange-600",
    },
  ]

  const upcomingSessions = [
    {
      id: 1,
      title: "Advanced JavaScript Concepts",
      date: "Today",
      time: "2:00 PM - 4:00 PM",
      attendees: 23,
      instructor: "Sarah Chen",
      type: "live",
    },
    {
      id: 2,
      title: "Leadership Q&A Session",
      date: "Tomorrow",
      time: "10:00 AM - 11:00 AM",
      attendees: 15,
      instructor: "Mike Johnson",
      type: "webinar",
    },
    {
      id: 3,
      title: "Data Visualization Workshop",
      date: "Dec 15",
      time: "1:00 PM - 3:00 PM",
      attendees: 18,
      instructor: "Alex Rodriguez",
      type: "workshop",
    },
  ]

  const learnerProgress = [
    {
      id: 1,
      name: "John Doe",
      course: "React Advanced",
      progress: 85,
      timeSpent: "24 hours",
      lastActivity: "2 hours ago",
      status: "on-track",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      course: "Leadership Training",
      progress: 92,
      timeSpent: "18 hours",
      lastActivity: "1 day ago",
      status: "ahead",
    },
    {
      id: 3,
      name: "Mike Chen",
      course: "Data Analysis",
      progress: 45,
      timeSpent: "12 hours",
      lastActivity: "3 days ago",
      status: "behind",
    },
    {
      id: 4,
      name: "Emily Davis",
      course: "Digital Marketing",
      progress: 78,
      timeSpent: "20 hours",
      lastActivity: "1 hour ago",
      status: "on-track",
    },
  ]

  const aiRecommendations = [
    {
      id: 1,
      type: "course",
      title: "Recommend Advanced Python course",
      description: "Based on completion of Data Analysis course, 15 learners would benefit from Advanced Python",
      impact: "High",
      action: "Create Course",
    },
    {
      id: 2,
      type: "learner",
      title: "At-risk learner identified",
      description: "Mike Chen showing signs of disengagement in Data Analysis course",
      impact: "Medium",
      action: "Send Reminder",
    },
    {
      id: 3,
      type: "content",
      title: "Update course content",
      description: "JavaScript Fundamentals course has low engagement on Module 3",
      impact: "Medium",
      action: "Review Content",
    },
  ]

  return (
    <div className="space-y-6 bg-slate-900 min-h-screen p-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Training Dashboard</h1>
        <p className="text-green-100">Manage learning programs and track employee development progress.</p>
      </div>

      {/* Training Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trainingStats.map((stat) => (
          <div key={stat.name} className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-300">{stat.name}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-1">Target: {stat.target}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
              <span className="text-sm font-medium text-green-400">{stat.change}</span>
              <span className="text-sm text-slate-400 ml-1">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* AI Recommendations */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Lightbulb className="w-5 h-5 text-yellow-400 mr-2" />
            AI Training Recommendations
          </h3>
          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiRecommendations.map((rec) => (
            <div key={rec.id} className="border border-slate-600 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-white">{rec.title}</h4>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    rec.impact === "High"
                      ? "bg-red-900/50 text-red-300 border border-red-800"
                      : rec.impact === "Medium"
                        ? "bg-yellow-900/50 text-yellow-300 border border-yellow-800"
                        : "bg-green-900/50 text-green-300 border border-green-800"
                  }`}
                >
                  {rec.impact} Impact
                </span>
              </div>
              <p className="text-sm text-slate-300 mb-3">{rec.description}</p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors duration-200">
                {rec.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Performance */}
        <div className="lg:col-span-2 bg-slate-800 rounded-lg border border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Course Performance</h3>
          <div className="space-y-4">
            {coursePerformance.map((course) => (
              <div key={course.id} className="border border-slate-600 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-white">{course.title}</h4>
                    <p className="text-sm text-slate-300">
                      {course.category} • {course.instructor}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-white">{course.avgRating}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-slate-300">Enrollments</p>
                    <p className="font-medium text-white">{course.enrollments}</p>
                  </div>
                  <div>
                    <p className="text-slate-300">Completions</p>
                    <p className="font-medium text-white">{course.completions}</p>
                  </div>
                  <div>
                    <p className="text-slate-300">Completion Rate</p>
                    <p className="font-medium text-white">{course.completionRate}%</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: `${course.completionRate}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                  <activity.icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">{activity.message}</p>
                  <p className="text-xs text-slate-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Upcoming Sessions</h3>
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="flex items-center space-x-4 p-3 bg-slate-700 rounded-lg">
                <div
                  className={`w-3 h-3 rounded-full ${
                    session.type === "live"
                      ? "bg-red-500"
                      : session.type === "webinar"
                        ? "bg-blue-500"
                        : "bg-purple-500"
                  }`}
                />
                <div className="flex-1">
                  <p className="font-medium text-white">{session.title}</p>
                  <p className="text-sm text-slate-300">
                    {session.date} • {session.time}
                  </p>
                  <p className="text-xs text-slate-400">
                    {session.attendees} attendees • {session.instructor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learner Progress */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Learner Progress</h3>
          <div className="space-y-4">
            {learnerProgress.map((learner) => (
              <div key={learner.id} className="border border-slate-600 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-white">{learner.name}</p>
                    <p className="text-sm text-slate-300">{learner.course}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      learner.status === "ahead"
                        ? "bg-green-900/50 text-green-300 border border-green-800"
                        : learner.status === "on-track"
                          ? "bg-blue-900/50 text-blue-300 border border-blue-800"
                          : "bg-red-900/50 text-red-300 border border-red-800"
                    }`}
                  >
                    {learner.status === "ahead" ? "Ahead" : learner.status === "on-track" ? "On Track" : "Behind"}
                  </span>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>{learner.progress}% complete</span>
                    <span>{learner.timeSpent}</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        learner.status === "ahead"
                          ? "bg-green-500"
                          : learner.status === "on-track"
                            ? "bg-blue-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${learner.progress}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-xs text-slate-400">Last activity: {learner.lastActivity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <button className="p-4 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors duration-200">
            <BookOpen className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">Create Course</p>
          </button>
          <button className="p-4 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors duration-200">
            <Video className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">Schedule Session</p>
          </button>
          <button className="p-4 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors duration-200">
            <Award className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">Issue Certificate</p>
          </button>
          <button className="p-4 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors duration-200">
            <BarChart3 className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">View Analytics</p>
          </button>
          <button className="p-4 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors duration-200">
            <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">Manage Learners</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TrainerDashboard
