import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type UserRole = "student" | "tutor" | "admin";
type ConnectionStatus = "none" | "requested" | "accepted" | "rejected" | "active" | "completed";
type Theme = "light" | "dark";

interface Course {
  id: string;
  tutorId: string;
  studentId: string;
  skill: string;
  status: ConnectionStatus;
  tutorName: string;
  tutorImage: string;
  tutorRating?: number;
  studentName?: string;
  studentImage?: string;
  message?: string;
  requestedAt?: string;
}

interface Tutor {
  id: string;
  name: string;
  image: string;
  skills: string[];
  rating: number;
  experience: string;
  experienceScore: "high" | "medium" | "low";
  creditsPerHour: number;
  matchPercent: number;
  description: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon: string;
  type: "info" | "success" | "warning";
}

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  theme: Theme;
  toggleTheme: () => void;
  studentCredits: number;
  setStudentCredits: (credits: number) => void;
  tutorCredits: number;
  setTutorCredits: (credits: number) => void;
  courses: Course[];
  updateCourseStatus: (courseId: string, status: ConnectionStatus) => void;
  addCourse: (course: Course) => void;
  tutors: Tutor[];
  selectedSkill: string;
  setSelectedSkill: (skill: string) => void;
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id">) => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRole>("student");
  const [theme, setTheme] = useState<Theme>(() => {
    // Initialize theme from system preference or localStorage
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      if (savedTheme) return savedTheme;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });
  const [studentCredits, setStudentCredits] = useState(50);
  const [tutorCredits, setTutorCredits] = useState(120);
  const [selectedSkill, setSelectedSkill] = useState("All Skills");
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      tutorId: "t1",
      studentId: "s1",
      skill: "Advanced React",
      status: "requested",
      tutorName: "Jordan Smith",
      tutorImage: "figma:asset/7f9245b816518f323aba6b3799defe30ae305257.png",
      tutorRating: 4.9,
      message: "I am struggling with useEffect and custom hooks. Looking for a 1-hour session to clarify concepts.",
      requestedAt: "2h ago",
    },
    {
      id: "2",
      tutorId: "t2",
      studentId: "s1",
      skill: "UI/UX Principles",
      status: "requested",
      tutorName: "Sarah Chen",
      tutorImage: "figma:asset/cafb7b5743696336dd503139cfc3ccfe8627302c.png",
      tutorRating: 4.8,
      message: "Need help setting up a design system and using auto-layout efficiently.",
      requestedAt: "5h ago",
    },
  ]);

  const [tutors] = useState<Tutor[]>([
    {
      id: "t1",
      name: "Dr. Sarah Chen",
      image: "figma:asset/cafb7b5743696336dd503139cfc3ccfe8627302c.png",
      skills: ["Advanced React", "TypeScript"],
      rating: 4.9,
      experience: "Senior Software Engineer with 8 years of experience in distributed systems.",
      experienceScore: "high",
      creditsPerHour: 50,
      matchPercent: 98,
      description: "Passionate about teaching React best practices and modern web development.",
    },
    {
      id: "t2",
      name: "James Wilson",
      image: "figma:asset/1354d8714718372ef34807f197fda5fc19977f34.png",
      skills: ["Python", "Machine Learning"],
      rating: 4.7,
      experience: "Specializing in neural networks and practical AI implementation.",
      experienceScore: "high",
      creditsPerHour: 45,
      matchPercent: 85,
      description: "Expert in AI/ML with focus on practical applications.",
    },
    {
      id: "t3",
      name: "Elena Rodriguez",
      image: "figma:asset/d67abab5e964da2aa8b77a4e155982e69420b7a2.png",
      skills: ["UI/UX Design", "Figma"],
      rating: 4.8,
      experience: "Passionate designer focused on accessible and user-centric web.",
      experienceScore: "high",
      creditsPerHour: 40,
      matchPercent: 92,
      description: "Creating beautiful, accessible user experiences.",
    },
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Credits Earned",
      message: 'You received 50 credits for completing "Advanced React Patterns" with Tutor Sarah.',
      timestamp: "2 mins ago",
      read: false,
      icon: "coins",
      type: "success",
    },
    {
      id: "2",
      title: "Request Accepted",
      message: 'Tutor Alex has accepted your request for "UI/UX Design Fundamentals".',
      timestamp: "45 mins ago",
      read: false,
      icon: "check-circle",
      type: "success",
    },
    {
      id: "3",
      title: "New Course Started",
      message: 'The session for "Data Structures & Algorithms" has officially begun.',
      timestamp: "3 hours ago",
      read: true,
      icon: "info",
      type: "info",
    },
    {
      id: "4",
      title: "Request Sent",
      message: 'Your request for "Python for Finance" has been delivered to Tutor James.',
      timestamp: "5 hours ago",
      read: true,
      icon: "clock",
      type: "info",
    },
    {
      id: "5",
      title: "Course Completed",
      message: 'Congratulations! You finished "Intro to Cloud Computing". Leave a review?',
      timestamp: "1 day ago",
      read: true,
      icon: "graduation-cap",
      type: "success",
    },
  ]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newTheme);
      }
      return newTheme;
    });
  };

  const updateCourseStatus = (courseId: string, status: ConnectionStatus) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId ? { ...course, status } : course
      )
    );
  };

  const addCourse = (course: Course) => {
    setCourses((prev) => [...prev, course]);
  };

  const addNotification = (notification: Omit<Notification, "id">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const clearAllNotifications = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        theme,
        toggleTheme,
        studentCredits,
        setStudentCredits,
        tutorCredits,
        setTutorCredits,
        courses,
        updateCourseStatus,
        addCourse,
        tutors,
        selectedSkill,
        setSelectedSkill,
        notifications,
        addNotification,
        markNotificationAsRead,
        clearAllNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;