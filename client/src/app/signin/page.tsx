"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css"; 
import Link from "next/link";

export default function signIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: false, 
      easing: "ease-in-out", 
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <Link href="/">
      <Image
        src="/logo_transparent.png"
        width={200}
        height={100}
        alt="Illustration of tracking calories for health and fitness"
        className="hidden cursor-pointer lg:block "
        data-aos="fade-down"
      />
    </Link>
    <div className="bg-white p-8 rounded-md shadow-md w-11/12 sm:w-3/4 md:w-1/3 lg:w-1/3 xl:w-1/3" data-aos="fade-up">
        <h1 className="text-2xl text-blue-600 font-bold text-center mb-6">
            Sign In!
        </h1>
        <form onSubmit={handleSignin} className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                    />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
                Sign In
            </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
                Sign Up
            </a>
        </p>
    </div>
    </div>

  );
}
