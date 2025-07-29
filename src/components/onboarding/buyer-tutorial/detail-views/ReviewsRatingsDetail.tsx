
import React from "react";
import { Search, Star } from "lucide-react";

export function ReviewsRatingsDetail() {
  return (
    <div className="mt-4 p-4 rounded-lg bg-muted/50">
      <h4 className="font-semibold mb-2">How to evaluate reviews:</h4>
      <ul className="space-y-2 text-sm">
        <li className="flex items-start">
          <Search className="h-4 w-4 text-primary mr-2 mt-0.5" />
          <span>Look for reviews that mention specific vulnerabilities found</span>
        </li>
        <li className="flex items-start">
          <Search className="h-4 w-4 text-primary mr-2 mt-0.5" />
          <span>Prioritize reviews from projects in your domain</span>
        </li>
        <li className="flex items-start">
          <Search className="h-4 w-4 text-primary mr-2 mt-0.5" />
          <span>Note comments about communication and responsiveness</span>
        </li>
      </ul>
      <div className="mt-4 p-3 border border-primary/20 rounded-md bg-primary/5">
        <div className="flex items-center mb-1">
          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
          <span className="text-xs ml-2 font-medium">Example quality review:</span>
        </div>
        <p className="text-xs italic">"The auditor found a critical reentrancy vulnerability that other auditors missed. They provided clear explanations and helped us implement the fix correctly."</p>
      </div>
    </div>
  );
}
