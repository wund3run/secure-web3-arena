
import React from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { UserJourney } from "@/components/user-journey/UserJourney";

const UserJourneyMapping = () => {
  return (
    <>
      <Helmet>
        <title>User Journey Mapping | Hawkly</title>
        <meta
          name="description"
          content="Visualize and optimize user journeys across the Hawkly platform."
        />
      </Helmet>
      <Navbar />
      <main className="min-h-screen py-10">
        <div className="container mx-auto px-4">
          <UserJourney />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default UserJourneyMapping;
