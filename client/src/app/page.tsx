"use client";

import { useEffect } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <>
      <Navbar />
      {/* Main Wrapper */}
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-100 to-blue-200 scroll-smooth">
        {/* Hero Section */}
        <MaxWidthWrapper className="h-screen flex flex-col md:flex-row justify-center items-center text-center md:text-left">
          {/* Text Section */}
          <div className="w-full md:w-1/2">
            <h1
              className="text-4xl sm:text-5xl font-bold text-black"
              data-aos="fade-down"
            >
              FIT<span className="text-blue-500">LIFE</span>
            </h1>
            <p
              className="mt-4 text-xl sm:text-3xl font-semibold"
              data-aos="fade-up"
            >
              The <span className="text-blue-500">ultimate</span> app for your health.
              <br /> Plan workouts, track your diet, and take notes. Empower your
              journey and achieve your goals with FitLife.
            </p>
            {/* Join Now Button */}
            <div className="mt-12">
              <Link href="/signup">
                <button
                  aria-label="Join Now to start your fitness journey"
                  className="bg-blue-400 px-10 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-400/50 shadow-md"
                  data-aos="zoom-in"
                >
                  <p className="text-black font-semibold text-xl">Join Now!</p>
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2" data-aos="fade-left">
            <Image
              src="/hero.svg"
              width={500}
              height={300}
              alt="hero page image"
              className="mx-auto md:ml-0"
            />
          </div>
        </MaxWidthWrapper>

        {/* Facts Section */}
        <div className="flex flex-col gap-20 mt-20 items-center sm:items-center w-full sm:w-full px-4">
          {/* Fact 1 */}
          <div
            className="flex flex-col sm:flex-row gap-12 items-center sm:items-start"
            data-aos="zoom-out"
          >
            <div className="hidden sm:block w-60 h-60 flex-shrink-0">
              <Image
                src="/breakfast.svg"
                width={300}
                height={300}
                alt="Illustration of tracking calories for health and fitness"
              />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-4xl font-semibold text-blue-500 text-center">
                Seamless Tracking
              </p>
              <p className="text-2xl mt-2">
                Effortlessly track your calories and seamlessly incorporate it
                into your daily routine.
              </p>
            </div>
          </div>

          {/* Fact 2 */}
          <div
            className="flex flex-col sm:flex-row gap-12 items-center sm:items-start"
            data-aos="zoom-out"
          >
            <div className="hidden sm:block w-60 h-60 flex-shrink-0">
              <Image
                src="/workout.svg"
                width={300}
                height={300}
                alt="Illustration of tracking workouts for fitness goals"
              />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-4xl font-semibold text-blue-500 text-center">
                Workout Scheduling
              </p>
              <p className="text-2xl mt-2">
                Easily plan and organize your workouts to fit seamlessly into
                your daily routine.
              </p>
            </div>
          </div>

          {/* Fact 3 */}
          <div
            className="flex flex-col mb-10 sm:flex-row gap-12 items-center sm:items-start sm:mt-16"
            data-aos="zoom-out"
          >
            <div className="hidden sm:block w-60 h-60 flex-shrink-0">
              <Image
                src="/notes.svg"
                width={300}
                height={300}
                alt="Illustration of tracking workouts for fitness goals"
              />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-4xl font-semibold text-blue-500 text-center">
                Note Taking
              </p>
              <p className="text-2xl mt-2">
                Effortlessly jot down and organize your fitness notes to stay on
                top of your goals
              </p>
            </div>
          </div>

          {/* Fact 4 */}
          <div
            className="flex flex-col mb-10 sm:flex-row gap-12 items-center sm:items-start sm:mt-16"
            data-aos="zoom-out"
          >
            <div className="hidden sm:block w-60 h-60 flex-shrink-0">
              <Image
                src="/assistance.svg"
                width={300}
                height={300}
                alt="Illustration of tracking workouts for fitness goals"
              />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-4xl font-semibold text-blue-500 text-center">
                Personal Assistance
              </p>
              <p className="text-2xl mt-2">
                Get easy personal fitness, diet or app related assistance!
                anytime, anywhere!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
