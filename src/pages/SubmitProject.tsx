
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ProjectSubmissionForm } from '@/components/project/ProjectSubmissionForm';

export default function SubmitProject() {
  return (
    <>
      <Helmet>
        <title>Submit Your Project | Hawkly</title>
        <meta name="description" content="Submit your Web3 project for professional security audit by verified experts" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="py-8">
          <ProjectSubmissionForm />
        </main>
        <Footer />
      </div>
    </>
  );
}
