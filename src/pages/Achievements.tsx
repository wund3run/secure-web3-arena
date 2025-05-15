
import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { EnhancedFooter } from "@/components/home/enhanced-footer";
import { AchievementsList } from "@/components/achievements/achievements-list";
import { Shield, Award } from "lucide-react";

const Achievements = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-primary/5">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="h-8 w-8 text-web3-orange" />
              <h1 className="text-3xl md:text-4xl font-extrabold">Achievement Badges</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Earn these badges by demonstrating excellence in security auditing, vulnerability detection, 
              and community participation. Badges increase your visibility and reputation in the marketplace.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 pb-12">
            <AchievementsList />
          </div>
        </div>
      </main>
      <EnhancedFooter />
    </div>
  );
};

export default Achievements;
