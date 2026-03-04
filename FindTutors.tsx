import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Star, Sparkles, RefreshCw, CreditCard, ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";

export default function FindTutors() {
  const { tutors, selectedSkill, setSelectedSkill, addCourse, addNotification } = useApp();
  const [filter, setFilter] = useState("All Skills");

  const skills = [
    "All Skills",
    "Development",
    "Design",
    "Marketing",
    "Advanced React",
    "Python",
    "TypeScript",
    "UI/UX Design",
    "Figma",
    "Machine Learning",
  ];

  const getMatchedTutors = () => {
    if (filter === "All Skills") {
      return tutors.sort((a, b) => b.rating - a.rating);
    }

    const exactMatches = tutors
      .filter((t) => t.skills.some((s) => s.toLowerCase().includes(filter.toLowerCase())))
      .sort((a, b) => b.matchPercent - a.matchPercent);

    const otherTutors = tutors
      .filter((t) => !t.skills.some((s) => s.toLowerCase().includes(filter.toLowerCase())))
      .sort((a, b) => b.rating - a.rating);

    return { exactMatches, otherTutors };
  };

  const matches = getMatchedTutors();
  const hasExactMatches = typeof matches === "object" && "exactMatches" in matches;

  const handleRequestTutor = (tutor: any) => {
    const newCourse = {
      id: Date.now().toString(),
      tutorId: tutor.id,
      studentId: "s1",
      skill: tutor.skills[0],
      status: "requested" as const,
      tutorName: tutor.name,
      tutorImage: tutor.image,
      tutorRating: tutor.rating,
      message: `I'd like to learn ${tutor.skills[0]} from you.`,
      requestedAt: "Just now",
    };
    addCourse(newCourse);
    addNotification({
      title: "Request Sent",
      message: `Your request to ${tutor.name} has been sent successfully.`,
      timestamp: "Just now",
      read: false,
      icon: "clock",
      type: "info",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">find</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your skill exchange journey
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search skills (React, Python, Design...)"
            className="w-full px-4 py-3 pl-10 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>

        <div className="flex gap-2 flex-wrap">
          {skills.map((skill) => (
            <button
              key={skill}
              onClick={() => {
                setFilter(skill);
                setSelectedSkill(skill);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === skill
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* AI Best Matches Section */}
      {hasExactMatches && (matches as any).exactMatches.length > 0 && (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-semibold">AI Best Matches</h2>
            </div>
            <button className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 font-medium">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          <div className="space-y-4">
            {(matches as any).exactMatches.map((tutor: any) => (
              <TutorCard key={tutor.id} tutor={tutor} onRequest={handleRequestTutor} />
            ))}
          </div>
        </div>
      )}

      {/* Other Suggested Tutors */}
      {hasExactMatches && (matches as any).otherTutors.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Popular Skill Exchanges</h2>
          <div className="grid grid-cols-1 gap-4">
            {(matches as any).otherTutors.map((tutor: any) => (
              <TutorCard key={tutor.id} tutor={tutor} onRequest={handleRequestTutor} suggested />
            ))}
          </div>
        </div>
      )}

      {/* All Tutors (when no filter) */}
      {!hasExactMatches && (
        <div>
          <h2 className="text-xl font-semibold mb-4">All Tutors</h2>
          <div className="grid grid-cols-1 gap-4">
            {(matches as any[]).map((tutor: any) => (
              <TutorCard key={tutor.id} tutor={tutor} onRequest={handleRequestTutor} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TutorCard({
  tutor,
  onRequest,
  suggested = false,
}: {
  tutor: any;
  onRequest: (tutor: any) => void;
  suggested?: boolean;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-shrink-0">
          <img
            src={tutor.image}
            alt={tutor.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center">
            <span className="text-xs text-white">✓</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold">{tutor.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{tutor.experience}</p>
            </div>
            <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-semibold">{tutor.rating}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {tutor.skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs font-medium rounded-full"
              >
                {skill}
              </span>
            ))}
            {!suggested && (
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 text-xs font-medium rounded-full">
                +{tutor.matchPercent - tutor.skills.length}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CreditCard className="w-4 h-4" />
              <span className="font-medium">{tutor.creditsPerHour} credits/hr</span>
            </div>

            <Button
              onClick={() => onRequest(tutor)}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Request Tutor
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
