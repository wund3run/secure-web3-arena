import React, { useState, useEffect } from 'react';
import { useStabilizedAuth } from '@/hooks/useStabilizedAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { 
  Eye, 
  EyeOff, 
  Shield, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  User,
  Github,
  Chrome,
  Star
} from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface SocialProvider {
  name: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

export function EnhancedAuthFlow() {
  const [activeTab, setActiveTab] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    userType: 'project_owner' as 'auditor' | 'project_owner',
    confirmPassword: '',
    company: '',
    referralCode: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signIn, signUp, loading, signInWithProvider } = useStabilizedAuth();

  // Password strength calculation
  useEffect(() => {
    const calculateStrength = (password: string) => {
      let strength = 0;
      if (password.length >= 8) strength += 25;
      if (/[A-Z]/.test(password)) strength += 25;
      if (/[0-9]/.test(password)) strength += 25;
      if (/[^A-Za-z0-9]/.test(password)) strength += 25;
      return strength;
    };

    setPasswordStrength(calculateStrength(formData.password));
  }, [formData.password]);

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-orange-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  const socialProviders: SocialProvider[] = [
    {
      name: 'Google',
      icon: <Chrome className="h-4 w-4" />,
      color: 'hover:bg-red-50 border-red-200',
      onClick: () => signInWithProvider('google')
    },
    {
      name: 'GitHub',
      icon: <Github className="h-4 w-4" />,
      color: 'hover:bg-gray-50 border-gray-200',
      onClick: () => signInWithProvider('github')
    }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (passwordStrength < 50 && activeTab === 'signup') {
      newErrors.password = 'Password is too weak. Please use a stronger password.';
    }

    if (activeTab === 'signup') {
      // Full name validation
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      } else if (formData.fullName.trim().length < 2) {
        newErrors.fullName = 'Full name must be at least 2 characters';
      }

      // Password confirmation
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      // Terms acceptance
      if (!acceptTerms) {
        newErrors.terms = 'You must accept the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (activeTab === 'signin') {
        await signIn(formData.email, formData.password, rememberMe);
        toast.success('Welcome back to Hawkly!');
      } else {
        await signUp(formData.email, formData.password, formData.fullName, formData.userType);
        toast.success('Account created! Please check your email for verification.');
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <div className="flex items-center justify-center gap-2">
          <img 
            src="/lovable-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png" 
            alt="Hawkly Logo"
            className="h-8 w-8 object-contain"
          />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Hawkly
          </h1>
        </div>
        <p className="text-muted-foreground">Secure Web3 Audit Platform</p>
        <div className="flex items-center justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-xs text-muted-foreground ml-1">Trusted by 10,000+ users</span>
        </div>
      </motion.div>

      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 bg-gray-100">
            <TabsTrigger value="signin" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Shield className="h-4 w-4" />
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Users className="h-4 w-4" />
              Sign Up
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="signin">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Shield className="h-5 w-5 text-blue-500" />
                    Welcome Back
                  </CardTitle>
                  <CardDescription>
                    Sign in to access your secure Web3 auditing dashboard
                  </CardDescription>
                </CardHeader>
              </motion.div>
            </TabsContent>

            <TabsContent value="signup">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Users className="h-5 w-5 text-purple-500" />
                    Join Hawkly
                  </CardTitle>
                  <CardDescription>
                    Create your account to start securing Web3 projects
                  </CardDescription>
                </CardHeader>
              </motion.div>
            </TabsContent>
          </AnimatePresence>

          <CardContent className="space-y-6">
            {/* Social Sign In */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {socialProviders.map((provider) => (
                  <Button
                    key={provider.name}
                    type="button"
                    variant="outline"
                    className={`${provider.color} transition-all duration-200`}
                    onClick={provider.onClick}
                    disabled={loading}
                  >
                    {provider.icon}
                    <span className="ml-2">{provider.name}</span>
                  </Button>
                ))}
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {activeTab === 'signup' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    {/* Full Name */}
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="flex items-center gap-2">
                        <User  className="h-4 w-4" />
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className={errors.fullName ? 'border-red-500' : ''}
                      />
                      {errors.fullName && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="text-sm text-red-500 flex items-center gap-1"
                        >
                          <AlertCircle className="h-3 w-3" />
                          {errors.fullName}
                        </motion.p>
                      )}
                    </div>

                    {/* Account Type Selection */}
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Account Type
                      </Label>
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          type="button"
                          variant={formData.userType === 'project_owner' ? 'default' : 'outline'}
                          className="h-auto p-4 flex flex-col items-center gap-2 transition-all duration-200"
                          onClick={() => handleInputChange('userType', 'project_owner')}
                        >
                          <Shield className="h-6 w-6" />
                          <div className="text-center">
                            <div className="font-medium">Project Owner</div>
                            <div className="text-xs text-muted-foreground">Request audits</div>
                          </div>
                          {formData.userType === 'project_owner' && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </Button>
                        <Button
                          type="button"
                          variant={formData.userType === 'auditor' ? 'default' : 'outline'}
                          className="h-auto p-4 flex flex-col items-center gap-2 transition-all duration-200"
                          onClick={() => handleInputChange('userType', 'auditor')}
                        >
                          <Users className="h-6 w-6" />
                          <div className="text-center">
                            <div className="font-medium">Auditor</div>
                            <div className="text-xs text-muted-foreground">Provide audits</div>
                          </div>
                          {formData.userType === 'auditor' && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Referral Code */}
                    <div className="space-y-2">
                      <Label htmlFor="referralCode">Referral Code (Optional)</Label>
                      <Input
                        id="referralCode"
                        type="text"
                        placeholder="Enter referral code"
                        value={formData.referralCode}
                        onChange={(e) => handleInputChange('referralCode', e.target.value)}
                      />
                    </div>
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="h-3 w-3" />
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="h-3 w-3" />
                      {errors.password}
                    </motion.p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Checkbox 
                        id="rememberMe" 
                        checked={rememberMe} 
                        onChange={() => setRememberMe(!rememberMe)} 
                      />
                      <Label htmlFor="rememberMe" className="ml-2">Remember Me</Label>
                    </div>
                    <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
                  </div>
                </div>

                {activeTab === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className={errors.confirmPassword ? 'border-red-500' : ''}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {errors.confirmPassword && (
                      <motion.p 
                        initial
                                            {errors.confirmPassword && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="text-sm text-red-500 flex items-center gap-1"
                      >
                        <AlertCircle className="h-3 w-3" />
                        {errors.confirmPassword}
                      </motion.p>
                    )}

                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Password Strength</span>
                          <span className={`font-medium ${
                            passwordStrength < 50 ? 'text-red-500' : 
                            passwordStrength < 75 ? 'text-yellow-500' : 'text-green-500'
                          }`}>
                            {getPasswordStrengthText()}
                          </span>
                        </div>
                        <Progress 
                          value={passwordStrength} 
                          className={`h-2 ${getPasswordStrengthColor()}`}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Terms and Conditions for Signup */}
                {activeTab === 'signup' && (
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="acceptTerms" 
                        checked={acceptTerms} 
                        onCheckedChange={setAcceptTerms}
                        className={errors.terms ? 'border-red-500' : ''}
                      />
                      <Label htmlFor="acceptTerms" className="text-sm leading-relaxed">
                        I agree to the{' '}
                        <a href="/terms" className="text-primary hover:underline">Terms of Service</a>{' '}
                        and{' '}
                        <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                      </Label>
                    </div>
                    {errors.terms && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="text-sm text-red-500 flex items-center gap-1"
                      >
                        <AlertCircle className="h-3 w-3" />
                        {errors.terms}
                      </motion.p>
                    )}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting || loading}
                >
                  {isSubmitting || loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {activeTab === 'signin' ? 'Signing in...' : 'Creating account...'}
                    </>
                  ) : (
                    <>
                      {activeTab === 'signin' ? (
                        <Shield className="mr-2 h-4 w-4" />
                      ) : (
                        <CheckCircle className="mr-2 h-4 w-4" />
                      )}
                      {activeTab === 'signin' ? 'Sign In' : 'Create Account'}
                    </>
                  )}
                </Button>
              </AnimatePresence>
            </form>

            {/* Benefits Section for Signup */}
            {activeTab === 'signup' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 space-y-3"
              >
                <Separator />
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    What you get with Hawkly:
                  </p>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>Secure escrow payments</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>Expert security auditors</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>Real-time project tracking</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>24/7 customer support</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Tabs>
      </Card>

      {/* Footer */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          By continuing, you agree to our{' '}
          <a href="/terms" className="text-primary hover:underline">Terms of Service</a>{' '}
          and{' '}
          <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
