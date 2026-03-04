import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AppProvider } from "./context/AppContext";

// Lazy load all page components
const AppLayout = lazy(() => import("./AppLayout"));
const Landing = lazy(() => import("./pages/Landing"));
const SignIn = lazy(() => import("./pages/auth/SignIn"));
const SignUp = lazy(() => import("./pages/auth/SignUp"));
const StudentOverview = lazy(() => import("./pages/student/Overview"));
const FindTutors = lazy(() => import("./pages/student/FindTutors"));
const MyCourses = lazy(() => import("./pages/student/MyCourses"));
const StudentCredits = lazy(() => import("./pages/student/Credits"));
const SavedNotes = lazy(() => import("./pages/student/SavedNotes"));
const StudentProfile = lazy(() => import("./pages/student/Profile"));
const TutorOverview = lazy(() => import("./pages/tutor/Overview"));
const StudentRequests = lazy(() => import("./pages/tutor/StudentRequests"));
const ActiveCourses = lazy(() => import("./pages/tutor/ActiveCourses"));
const TutorCredits = lazy(() => import("./pages/tutor/Credits"));
const Reviews = lazy(() => import("./pages/tutor/Reviews"));
const TutorProfile = lazy(() => import("./pages/tutor/Profile"));
const AdminOverview = lazy(() => import("./pages/admin/Overview"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));

const LoadingFallback = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-lg text-gray-600 dark:text-gray-400">Loading...</span>
    </div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            
            <Route path="/student" element={<AppLayout />}>
              <Route index element={<StudentOverview />} />
              <Route path="find-tutors" element={<FindTutors />} />
              <Route path="courses" element={<MyCourses />} />
              <Route path="credits" element={<StudentCredits />} />
              <Route path="notes" element={<SavedNotes />} />
              <Route path="profile" element={<StudentProfile />} />
            </Route>
            
            <Route path="/tutor" element={<AppLayout />}>
              <Route index element={<TutorOverview />} />
              <Route path="requests" element={<StudentRequests />} />
              <Route path="active-courses" element={<ActiveCourses />} />
              <Route path="credits" element={<TutorCredits />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="profile" element={<TutorProfile />} />
            </Route>
            
            <Route path="/admin" element={<AppLayout />}>
              <Route index element={<AdminOverview />} />
              <Route path="users" element={<UserManagement />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AppProvider>
    </BrowserRouter>
  );
}