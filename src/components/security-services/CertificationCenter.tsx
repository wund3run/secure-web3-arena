
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useCertifications } from '@/hooks/useCertifications';
import { Award, Calendar, Shield, Search, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const CERTIFICATION_TYPES = {
  basic_auditor: {
    name: 'Basic Auditor',
    description: 'Fundamental security audit certification',
    color: 'bg-blue-100 text-blue-800',
    icon: Shield
  },
  advanced_auditor: {
    name: 'Advanced Auditor',
    description: 'Advanced security audit techniques',
    color: 'bg-purple-100 text-purple-800',
    icon: Award
  },
  security_specialist: {
    name: 'Security Specialist',
    description: 'Specialized in Web3 security protocols',
    color: 'bg-green-100 text-green-800',
    icon: Shield
  },
  compliance_expert: {
    name: 'Compliance Expert',
    description: 'Regulatory compliance and standards',
    color: 'bg-orange-100 text-orange-800',
    icon: Award
  }
};

export const CertificationCenter = () => {
  const { certifications, loading, verifyCertification } = useCertifications();
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [verifying, setVerifying] = useState(false);

  const handleVerification = async () => {
    if (!verificationCode.trim()) {
      toast.error('Please enter a verification code');
      return;
    }

    setVerifying(true);
    try {
      const result = await verifyCertification(verificationCode);
      setVerificationResult(result);
      toast.success('Certification verified successfully');
    } catch (error) {
      setVerificationResult(null);
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Certification Center</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Verification Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Verify Certification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleVerification} disabled={verifying}>
              {verifying ? 'Verifying...' : 'Verify'}
            </Button>
          </div>
          
          {verificationResult && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Award className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800">Valid Certification</h4>
                  <p className="text-sm text-green-700">
                    {CERTIFICATION_TYPES[verificationResult.certification_type as keyof typeof CERTIFICATION_TYPES]?.name}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    Issued: {new Date(verificationResult.issued_at).toLocaleDateString()}
                    {verificationResult.expires_at && (
                      <span> • Expires: {new Date(verificationResult.expires_at).toLocaleDateString()}</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* My Certifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2" />
            My Certifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          {certifications.length === 0 ? (
            <div className="text-center py-8">
              <Award className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-muted-foreground">No certifications yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Complete training programs to earn your first certification
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert) => {
                const certType = CERTIFICATION_TYPES[cert.certification_type as keyof typeof CERTIFICATION_TYPES];
                const IconComponent = certType?.icon || Award;
                
                return (
                  <div key={cert.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <IconComponent className="h-5 w-5" />
                        <h3 className="font-medium">{certType?.name || cert.certification_type}</h3>
                      </div>
                      <Badge 
                        variant={cert.is_active ? 'default' : 'secondary'}
                        className={cert.is_active ? certType?.color : ''}
                      >
                        {cert.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {certType?.description || 'Professional certification'}
                    </p>
                    
                    <div className="flex items-center text-xs text-muted-foreground space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Issued {new Date(cert.issued_at).toLocaleDateString()}
                      </div>
                      {cert.expires_at && (
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Expires {new Date(cert.expires_at).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    
                    {cert.verification_code && (
                      <div className="bg-gray-50 p-2 rounded text-xs">
                        <span className="font-medium">Verification Code:</span> {cert.verification_code}
                      </div>
                    )}
                    
                    {cert.certificate_url && (
                      <Button size="sm" variant="outline" className="w-full">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View Certificate
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Certifications */}
      <Card>
        <CardHeader>
          <CardTitle>Available Certification Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(CERTIFICATION_TYPES).map(([type, details]) => {
              const IconComponent = details.icon;
              const hasThis = certifications.some(c => c.certification_type === type && c.is_active);
              
              return (
                <div key={type} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="h-5 w-5" />
                    <h3 className="font-medium">{details.name}</h3>
                    {hasThis && <Badge variant="outline">Earned</Badge>}
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{details.description}</p>
                  
                  <Button 
                    size="sm" 
                    variant={hasThis ? 'outline' : 'default'} 
                    className="w-full"
                    disabled={hasThis}
                  >
                    {hasThis ? 'Completed' : 'Start Program'}
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
