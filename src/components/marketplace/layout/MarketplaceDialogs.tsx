
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ServiceReviews } from "@/components/marketplace/service-reviews";
import { ServiceComparison } from "@/components/marketplace/comparison";
import { EnhancedOnboarding } from "@/components/onboarding/enhanced-onboarding";

interface MarketplaceDialogsProps {
  selectedService: any | null;
  setSelectedService: (service: any | null) => void;
  showComparison: boolean;
  setShowComparison: (show: boolean) => void;
  servicesForComparison: any[];
  showEnhancedOnboarding: boolean;
  setShowEnhancedOnboarding: (show: boolean) => void;
  handleOnboardingComplete: () => void;
  reviews: any[];
}

export function MarketplaceDialogs({
  selectedService,
  setSelectedService,
  showComparison,
  setShowComparison,
  servicesForComparison,
  showEnhancedOnboarding,
  setShowEnhancedOnboarding,
  handleOnboardingComplete,
  reviews
}: MarketplaceDialogsProps) {
  return (
    <>
      {/* Service Details Dialog */}
      {selectedService && (
        <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="space-y-6">
              <div className="relative h-56 rounded-lg overflow-hidden">
                <img 
                  src={selectedService.imageUrl || `https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1600&auto=format&fit=crop`}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-primary/90 text-white mb-2">{selectedService.category}</Badge>
                  <h2 className="text-2xl font-bold text-white">{selectedService.title}</h2>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <h3 className="text-xl font-bold mb-2">Service Description</h3>
                  <p className="text-muted-foreground mb-6">{selectedService.description}</p>
                  
                  <h3 className="text-xl font-bold mb-2">Key Features</h3>
                  <ul className="space-y-2 mb-6">
                    {selectedService.tags.map((tag: string) => (
                      <li key={tag} className="flex items-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                        <span>{tag}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <ServiceReviews 
                    serviceId={selectedService.id}
                    averageRating={selectedService.rating}
                    totalReviews={reviews.length}
                    reviews={reviews}
                  />
                </div>
                
                <div>
                  <div className="bg-card border border-border rounded-lg p-6 sticky top-4">
                    <div className="text-2xl font-bold text-center mb-4">
                      {selectedService.pricing.amount} {selectedService.pricing.currency}
                    </div>
                    
                    <div className="flex justify-between text-sm text-muted-foreground mb-4">
                      <span>Provider</span>
                      <span className="font-medium">{selectedService.provider.name}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm text-muted-foreground mb-4">
                      <span>Reputation</span>
                      <span className="font-medium">{selectedService.provider.reputation}%</span>
                    </div>
                    
                    <div className="flex justify-between text-sm text-muted-foreground mb-4">
                      <span>Completed Jobs</span>
                      <span className="font-medium">{selectedService.completedJobs}</span>
                    </div>
                    
                    <div className="space-y-3 mt-6">
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                        Request Service
                      </Button>
                      <Button variant="outline" className="w-full">
                        Contact Provider
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Enhanced onboarding flow */}
      <EnhancedOnboarding 
        open={showEnhancedOnboarding} 
        onOpenChange={(open) => {
          setShowEnhancedOnboarding(open);
          if (!open) {
            handleOnboardingComplete();
          }
        }} 
      />
      
      {/* Comparison Dialog */}
      <ServiceComparison 
        services={servicesForComparison}
        open={showComparison}
        onOpenChange={setShowComparison}
      />
    </>
  );
}
