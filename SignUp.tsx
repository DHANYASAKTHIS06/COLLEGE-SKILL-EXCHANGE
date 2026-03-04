import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useApp } from "../../context/AppContext";

export default function SignUp() {
  const navigate = useNavigate();
  const { toggleTheme, theme } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex mb-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => navigate("/")}
            className="flex-1 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 rounded-md hover:text-gray-900 dark:hover:text-gray-200"
          >
            Sign In
          </button>
          <button className="flex-1 py-2 text-sm font-medium bg-white dark:bg-gray-700 text-blue-500 rounded-md shadow-sm">
            Sign Up
          </button>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8">
          <h1 className="text-3xl font-bold mb-2 text-center">Create Account</h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            Join our learning community
          </p>

          <form className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input placeholder="John Doe" className="mt-2" />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="name@example.com" className="mt-2" />
            </div>
            <div>
              <Label>Password</Label>
              <Input type="password" placeholder="••••••••" className="mt-2" />
            </div>
            <div>
              <Label>Role</Label>
              <select className="w-full mt-2 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                <option>Student</option>
                <option>Tutor</option>
              </select>
            </div>

            <Button type="button" onClick={() => navigate("/student")} className="w-full bg-blue-500 hover:bg-blue-600 mt-6">
              Create Account
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
