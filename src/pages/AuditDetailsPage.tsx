import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Calendar, 
  DollarSign, 
  Clock, 
  Code, 
  Shield, 
  FileText, 
  User, 
  MapPin,
  AlertTriangle,
  CheckCircle,
  MessageCircle,
  Send
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";
import { Tables } from "@/integrations/supabase/types";
import { RequestStatusTracker, StatusUpdate } from '@/components/request-management/RequestStatusTracker';
import { AuditRequestService } from '@/services/auditRequestService';
import { EngagementOfferService } from '@/services/engagementOfferService';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';

type AuditRequest = Tables<'audit_requests'>;
type AuditorProfile = Tables<'auditor_profiles'>;

interface AuditProject extends AuditRequest {
  client_profile?: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

export default function AuditDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [project, setProject] = useState<AuditProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [auditorProfile, setAuditorProfile] = useState<AuditorProfile | null>(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [applying, setApplying] = useState(false);
  const [statusUpdates, setStatusUpdates] = useState<StatusUpdate[]>([]);
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [offerScope, setOfferScope] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [offerTimeline, setOfferTimeline] = useState('');
  const [submittingOffer, setSubmittingOffer] = useState(false);
  const [latestOffer, setLatestOffer] = useState<EngagementOffer | null>(null);
  const [offerHistory, setOfferHistory] = useState<EngagementOffer[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [offerError, setOfferError] = useState('');
  const [notificationFeed, setNotificationFeed] = useState<any[]>([]);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (id && user) {
      fetchProjectDetails();
      fetchAuditorProfile();
      checkApplicationStatus();
      fetchStatusUpdates();
      fetchOffer();
    }
  }, [id, user]);

  useEffect(() => {
    async function poll() {
      if (!project) return;
      const offer = await EngagementOfferService.getLatestOfferForAudit(project.id, project.assigned_auditor_id);
      setLatestOffer(offer);
      const history = await EngagementOfferService.getOffersForAudit(project.id);
      setOfferHistory(history.filter(o => o.auditor_id === project.assigned_auditor_id));
      // Fetch notifications for this audit/offer
      const { data: notifications } = await supabase
        .from('notifications')
        .select('*')
        .or(`metadata->>audit_request_id.eq.${project.id},metadata->>offer_id.eq.${offer?.id}`)
        .order('created_at', { ascending: false });
      setNotificationFeed(notifications || []);
    }
    poll();
    pollingRef.current = setInterval(poll, 10000);
    return () => { if (pollingRef.current) clearInterval(pollingRef.current); };
  }, [project]);

  const fetchProjectDetails = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('audit_requests')
        .select(`
          *,
          profiles!audit_requests_client_id_fkey(
            full_name,
            avatar_url
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching project details:', error);
        toast({
          title: "Error",
          description: "Failed to load project details",
          variant: "destructive",
        });
        navigate('/auditor/opportunities');
        return;
      }

      setProject(data);
    } catch (error) {
      console.error('Error in fetchProjectDetails:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAuditorProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('auditor_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching auditor profile:', error);
        return;
      }

      setAuditorProfile(data);
    } catch (error) {
      console.error('Error in fetchAuditorProfile:', error);
    }
  };

  const checkApplicationStatus = async () => {
    if (!user || !id) return;

    try {
      const { data, error } = await supabase
        .from('audit_proposals')
        .select('id')
        .eq('audit_request_id', id)
        .eq('auditor_id', user.id)
        .single();

      if (data) {
        setHasApplied(true);
      }
    } catch (error) {
      // No application found, which is fine
    }
  };

  const fetchStatusUpdates = async () => {
    if (!id) return;
    try {
      const updates = await AuditRequestService.getAuditStatusUpdates(id);
      setStatusUpdates(updates);
    } catch (err) {
      setStatusUpdates([]);
    }
  };

  const fetchOffer = async () => {
    if (!project) return;
    const offer = await EngagementOfferService.getLatestOfferForAudit(project.id, project.assigned_auditor_id);
    setLatestOffer(offer);
    const history = await EngagementOfferService.getOffersForAudit(project.id);
    setOfferHistory(history.filter(o => o.auditor_id === project.assigned_auditor_id));
  };

  const handleApply = async () => {
    if (!user || !auditorProfile || !project) {
      toast({
        title: "Error",
        description: "Please complete your auditor profile first",
        variant: "destructive",
      });
      return;
    }

    try {
      setApplying(true);
      
      const { error } = await supabase
        .from('audit_proposals')
        .insert({
          audit_request_id: project.id,
          auditor_id: user.id,
          proposal_text: `I am interested in auditing your ${project.project_name} project. With ${auditorProfile.years_experience} years of experience in blockchain security and expertise in ${auditorProfile.blockchain_expertise?.join(', ')}, I can provide a thorough audit of your smart contracts.`,
          proposed_cost: project.budget || 5000,
          estimated_timeline_days: 14,
          status: 'submitted',
          submitted_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error submitting proposal:', error);
        toast({
          title: "Error",
          description: "Failed to submit proposal",
          variant: "destructive",
        });
        return;
      }

      setHasApplied(true);
      toast({
        title: "Success",
        description: "Your proposal has been submitted successfully",
      });
    } catch (error) {
      console.error('Error in handleApply:', error);
      toast({
        title: "Error",
        description: "Failed to submit proposal",
        variant: "destructive",
      });
    } finally {
      setApplying(false);
    }
  };

  const handleAcceptReject = async (status: 'accepted' | 'rejected') => {
    if (!latestOffer) return;
    try {
      const updated = await EngagementOfferService.acceptOrRejectOffer(latestOffer.id, status);
      setLatestOffer(updated);
      await supabase.from('notifications').insert({
        user_id: latestOffer.client_id,
        title: `Offer ${status === 'accepted' ? 'Accepted' : 'Rejected'}`,
        message: `Your engagement offer for audit request ${project?.id} was ${status}.`,
        type: 'info',
        metadata: { audit_request_id: project?.id, offer_id: latestOffer.id }
      });
      toast({ title: `Offer ${status.charAt(0).toUpperCase() + status.slice(1)}`, description: `Offer ${status}.` });
    } catch (err) {
      toast({ title: 'Error', description: `Failed to ${status} offer`, variant: 'destructive' });
    }
  };

  const validateOffer = () => {
    if (!offerScope.trim() || !offerPrice.trim() || !offerTimeline.trim()) {
      setOfferError('All fields are required.');
      return false;
    }
    if (isNaN(Number(offerPrice)) || Number(offerPrice) <= 0) {
      setOfferError('Price must be a positive number.');
      return false;
    }
    if (isNaN(Number(offerTimeline)) || Number(offerTimeline) <= 0) {
      setOfferError('Timeline must be a positive number.');
      return false;
    }
    setOfferError('');
    return true;
  };

  const handleSendOffer = async () => {
    if (!validateOffer()) return;
    setSubmittingOffer(true);
    try {
      if (!project || !user) return;
      const terms = { scope: offerScope, price: offerPrice, timeline: offerTimeline };
      const offer = await EngagementOfferService.createOffer(
        project.id,
        project.assigned_auditor_id,
        user.id,
        terms
      );
      if (offer) {
        // Insert notification for auditor
        await supabase.from('notifications').insert({
          user_id: project.assigned_auditor_id,
          title: 'New Engagement Offer',
          message: `You have received an engagement offer for audit request ${project.id}.`,
          type: 'info',
          metadata: { audit_request_id: project.id, offer_id: offer.id }
        });
        toast({ title: 'Offer Sent', description: 'Engagement offer sent to auditor.' });
        setOfferModalOpen(false);
        setOfferScope(''); setOfferPrice(''); setOfferTimeline('');
      }
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to send offer', variant: 'destructive' });
    } finally {
      setSubmittingOffer(false);
    }
  };

  const getUrgencyColor = (urgency: string | null) => {
    switch (urgency) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: number | null) => {
    if (!priority) return 'outline';
    if (priority >= 8) return 'destructive';
    if (priority >= 5) return 'secondary';
    return 'outline';
  };

  const handleCounterOffer = () => {
    if (!latestOffer) return;
    setOfferScope(latestOffer.terms.scope);
    setOfferPrice(latestOffer.terms.price);
    setOfferTimeline(latestOffer.terms.timeline);
    setOfferModalOpen(true);
    setOfferError('');
  };

  const handleSendCounterOffer = async () => {
    if (!validateOffer()) return;
    setSubmittingOffer(true);
    try {
      await EngagementOfferService.createCounterOffer(
        project.id,
        project.assigned_auditor_id,
        user.id,
        { scope: offerScope, price: offerPrice, timeline: offerTimeline },
        latestOffer?.id
      );
      setOfferModalOpen(false);
      setOfferScope('');
      setOfferPrice('');
      setOfferTimeline('');
      toast({ title: 'Counter-Offer Sent', description: 'Your counter-offer has been sent.' });
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to send counter-offer', variant: 'destructive' });
    } finally {
      setSubmittingOffer(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">Project not found</p>
            <Button className="mt-4" asChild>
              <Link to="/auditor/opportunities">
                Back to Opportunities
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/auditor/opportunities">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Opportunities
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{project.project_name}</h1>
          <p className="text-muted-foreground">Detailed project information and requirements</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Project Details */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="scope">Scope</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">
                    {project.project_description || 'No description provided'}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">Blockchain</p>
                        <p className="text-sm text-gray-600">{project.blockchain}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">Budget</p>
                        <p className="text-sm text-gray-600">
                          ${project.budget?.toLocaleString() || 'Not specified'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <div>
                        <p className="text-sm font-medium">Timeline</p>
                        <p className="text-sm text-gray-600">
                          {project.deadline ? 
                            `Due ${new Date(project.deadline).toLocaleDateString()}` : 
                            'Flexible'
                          }
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-purple-500" />
                      <div>
                        <p className="text-sm font-medium">Code Size</p>
                        <p className="text-sm text-gray-600">
                          {project.lines_of_code ? 
                            `${project.lines_of_code.toLocaleString()} LOC` : 
                            'TBD'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requirements" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Audit Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {project.audit_scope && (
                    <div>
                      <h4 className="font-medium mb-2">Audit Scope</h4>
                      <p className="text-gray-700">{project.audit_scope}</p>
                    </div>
                  )}
                  
                  {project.specific_concerns && (
                    <div>
                      <h4 className="font-medium mb-2">Specific Concerns</h4>
                      <p className="text-gray-700">{project.specific_concerns}</p>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-medium mb-2">Required Deliverables</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Comprehensive security audit report</li>
                      <li>Detailed findings with severity levels</li>
                      <li>Recommendations for fixes and improvements</li>
                      <li>Executive summary for stakeholders</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scope" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Scope</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Smart Contract Types</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">ERC-20 Token</Badge>
                        <Badge variant="outline">Governance</Badge>
                        <Badge variant="outline">Staking</Badge>
                        <Badge variant="outline">DEX/AMM</Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Security Focus Areas</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-red-500" />
                          <span className="text-sm">Reentrancy vulnerabilities</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-orange-500" />
                          <span className="text-sm">Access control mechanisms</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">Gas optimization opportunities</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Logic and business rule validation</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4">
              <RequestStatusTracker statusUpdates={statusUpdates} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Client & Actions */}
        <div className="space-y-6">
          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  {project.client_profile?.avatar_url ? (
                    <img 
                      src={project.client_profile.avatar_url} 
                      alt="Client" 
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <User className="h-5 w-5 text-gray-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium">
                    {project.client_profile?.full_name || 'Anonymous Client'}
                  </p>
                  <p className="text-sm text-gray-600">Project Owner</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Posted {new Date(project.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Remote Work</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Status */}
          <Card>
            <CardHeader>
              <CardTitle>Project Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Status:</span>
                <Badge variant="outline">{project.status}</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Urgency:</span>
                <Badge variant={getUrgencyColor(project.urgency_level)}>
                  {project.urgency_level || 'Standard'}
                </Badge>
              </div>
              
              {project.priority_score && (
                <div className="flex items-center justify-between">
                  <span className="text-sm">Priority:</span>
                  <Badge variant={getPriorityColor(project.priority_score)}>
                    {project.priority_score}/10
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {hasApplied ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700">Application submitted</span>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/messages">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message Client
                    </Link>
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleApply}
                  disabled={applying}
                  className="w-full"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {applying ? 'Submitting...' : 'Apply for This Audit'}
                </Button>
              )}
              
              <Button variant="outline" className="w-full" asChild>
                <Link to="/auditor/opportunities">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Opportunities
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Offer Modal */}
      {offerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Send Engagement Offer</h2>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Scope</label>
              <Input value={offerScope} onChange={e => setOfferScope(e.target.value)} placeholder="Audit scope" />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Price (USD)</label>
              <Input value={offerPrice} onChange={e => setOfferPrice(e.target.value)} placeholder="e.g. 5000" type="number" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Timeline (days)</label>
              <Input value={offerTimeline} onChange={e => setOfferTimeline(e.target.value)} placeholder="e.g. 14" type="number" />
            </div>
            {offerError && <div className="text-red-600 text-sm mb-2">{offerError}</div>}
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setOfferModalOpen(false)} disabled={submittingOffer}>Cancel</Button>
              <Button onClick={handleSendOffer} loading={submittingOffer} disabled={submittingOffer}>Send Offer</Button>
            </div>
          </div>
        </div>
      )}

      {latestOffer && (
        <div className="mb-4 p-4 rounded border bg-gray-50">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-semibold">Engagement Offer</div>
              <div className="text-sm text-gray-700">Scope: {latestOffer.terms.scope}</div>
              <div className="text-sm text-gray-700">Price: ${latestOffer.terms.price}</div>
              <div className="text-sm text-gray-700">Timeline: {latestOffer.terms.timeline} days</div>
              <div className="text-xs mt-1">Status: <span className={`font-bold ${latestOffer.status === 'accepted' ? 'text-green-600' : latestOffer.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>{latestOffer.status}</span></div>
            </div>
            {user?.id === project.assigned_auditor_id && latestOffer.status === 'pending' && (
              <div className="flex gap-2">
                <Button size="sm" variant="success" onClick={() => handleAcceptReject('accepted')}>Accept</Button>
                <Button size="sm" variant="destructive" onClick={() => handleAcceptReject('rejected')}>Reject</Button>
              </div>
            )}
          </div>
          <Button variant="link" size="sm" className="mt-2" onClick={() => setShowHistory(h => !h)}>
            {showHistory ? 'Hide Offer History' : 'Show Offer History'}
          </Button>
          <Collapsible open={showHistory}>
            <CollapsibleContent>
              <div className="mt-2 space-y-2">
                {offerHistory.map((offer, idx) => (
                  <div key={offer.id} className="text-xs border-b pb-1">
                    <span className="font-medium">{idx === 0 ? 'Latest' : `Offer #${offerHistory.length - idx}`}</span>: {offer.terms.scope}, ${offer.terms.price}, {offer.terms.timeline}d — <span className={`font-bold ${offer.status === 'accepted' ? 'text-green-600' : offer.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>{offer.status}</span>
                    {offer.parent_offer_id && (
                      <Badge variant="outline" className="ml-2">Counter-Offer</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {user?.id === latestOffer?.client_id && latestOffer && (
        <div className="mb-2 flex items-center gap-2">
          <span className={`px-2 py-1 rounded text-xs font-bold ${latestOffer.status === 'accepted' ? 'bg-green-100 text-green-700' : latestOffer.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{latestOffer.status.charAt(0).toUpperCase() + latestOffer.status.slice(1)}</span>
          <span className="text-xs text-gray-500">(Offer status for you)</span>
        </div>
      )}
      {notificationFeed.length > 0 && (
        <div className="mb-2 p-2 bg-gray-50 rounded border">
          <div className="font-semibold text-xs mb-1">Offer Notifications</div>
          <ul className="space-y-1 text-xs">
            {notificationFeed.map(n => (
              <li key={n.id} className="flex justify-between">
                <span>{n.title}: {n.message}</span>
                <span className="text-gray-400">{new Date(n.created_at).toLocaleTimeString()}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {latestOffer && latestOffer.status !== 'accepted' && (
        <Button size="sm" variant="secondary" className="mb-2" onClick={handleCounterOffer} disabled={submittingOffer}>Propose Counter-Offer</Button>
      )}
    </div>
  );
} 