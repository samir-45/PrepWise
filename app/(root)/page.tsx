import InterviewCard from '@/components/InterviewCard';
import { dummyInterviews } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Home = () => {
  return (
    <>
      <section className='card-cta'>
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview ready with Ai-Powered Interview & Feedback</h2>
          <p className='text-lg'>Practice on real interview Questions and get instant feedback</p>
          <button className='btn-primary max-sm:w-full'>
            <Link href="/interview" >Start and Interview</Link>
          </button>
        </div>
        <Image src="/robot.png" width={400} height={400} className='max-sm:hidden' alt='robo-dude'></Image>
      </section>
      {/* ----------- */}
      <section className='flex flex-col gap-6 mt-8'>
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {/* <p>You have&apos;t taken any interviews Yet</p> */}
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id}></InterviewCard>
          ))}
        </div>
      </section>
      {/* --------- */}
      <section className='flex flex-col gap-6 mt-8'>
        <h2>Take an Interview</h2>
        <div className="interviews-section">
          {/* <p>There are no interviews available</p> */}
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id}></InterviewCard>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;