
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, ThumbsUp, ThumbsDown, X } from "lucide-react";
import { toast } from "sonner";

type FeedbackType = 'positive' | 'negative' | 'suggestion';

export function FeedbackCollector() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async () => {
    if (!feedbackText.trim() || !feedbackType) return;
    
    setIsSubmitting(true);
    
    try {
      // Here we would normally send this to an API endpoint
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Feedback submitted!", { 
        description: "Thank you for helping us improve the platform." 
      });
      
      // Reset form
      setFeedbackType(null);
      setFeedbackText('');
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to submit feedback", {
        description: "Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleOpen = () => {
    setIsOpen(true);
  };
  
  const handleClose = () => {
    setIsOpen(false);
    setFeedbackType(null);
    setFeedbackText('');
  };
  
  return (
    <>
      <Button 
        onClick={handleOpen}
        className="fixed bottom-20 right-4 z-40 rounded-full h-12 w-12 p-0 shadow-md bg-primary hover:bg-primary/90"
        aria-label="Provide feedback"
      >
        <MessageSquare className="h-5 w-5" />
      </Button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md animate-in slide-in-from-bottom-10 duration-300">
            <CardHeader className="relative pb-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-2" 
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </Button>
              <CardTitle>Share Your Feedback</CardTitle>
            </CardHeader>
            
            <CardContent>
              {!feedbackType ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">What would you like to share with us?</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline"
                      className="flex flex-col gap-2 h-auto py-4"
                      onClick={() => setFeedbackType('positive')}
                    >
                      <ThumbsUp className="h-5 w-5 text-green-500" />
                      <span>Something I like</span>
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="flex flex-col gap-2 h-auto py-4"
                      onClick={() => setFeedbackType('negative')}
                    >
                      <ThumbsDown className="h-5 w-5 text-amber-500" />
                      <span>Something to improve</span>
                    </Button>
                  </div>
                  
                  <Button 
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setFeedbackType('suggestion')}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    <span>I have a suggestion</span>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm font-medium">
                    {feedbackType === 'positive' && "What do you like about our platform?"}
                    {feedbackType === 'negative' && "What could we improve?"}
                    {feedbackType === 'suggestion' && "What would you like to suggest?"}
                  </p>
                  
                  <Textarea 
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Please share your thoughts..."
                    className="min-h-[120px]"
                  />
                  
                  <Button 
                    variant="link"
                    className="p-0 h-auto"
                    onClick={() => setFeedbackType(null)}
                  >
                    &larr; Choose a different feedback type
                  </Button>
                </div>
              )}
            </CardContent>
            
            {feedbackType && (
              <CardFooter>
                <Button 
                  className="w-full"
                  disabled={!feedbackText.trim() || isSubmitting}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      )}
    </>
  );
}
