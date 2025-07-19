import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { CalendarIcon, User, Lock } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '../hooks/use-toast';

const AdminAccountForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    gender: '',
    dateOfBirth: undefined,
    accountType: '',
    address: '',
    postalCode: '',
    state: '',
    country: '',
    currency: '',
    password: '',
    confirmPassword: '',
    pin: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
      case 'address':
      case 'postalCode':
      case 'state':
        return !value ? 'This field is required' : '';
      case 'email':
        if (!value) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Please enter a valid email address' : '';
      case 'gender':
      case 'country':
      case 'currency':
        return !value ? 'Please select an option' : '';
      case 'dateOfBirth':
        return !value ? 'Date of birth is required' : '';
      case 'confirmPassword':
        if (formData.password && value !== formData.password) {
          return 'Passwords do not match';
        }
        return '';
      case 'agreeToTerms':
        return !value ? 'You must agree to the terms and conditions' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }

    if (name === 'password' && formData.confirmPassword) {
      const confirmError = validateField('confirmPassword', formData.confirmPassword);
      setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const value = formData[name];
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const isFormValid = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'gender', 'dateOfBirth', 'address', 'postalCode', 'state', 'country', 'currency', 'agreeToTerms'];
    const allRequiredFilled = requiredFields.every(field => {
      const value = formData[field];
      return value !== '' && value !== undefined && value !== false;
    });
    const passwordsMatch = !formData.password || formData.password === formData.confirmPassword;
    const noErrors = Object.values(errors).every(error => error === '');
    return allRequiredFilled && passwordsMatch && noErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    if (Object.keys(newErrors).length === 0 && isFormValid()) {
      toast({
        title: 'Account Created Successfully',
        description: 'The new user account has been created and is ready for use.',
      });
      console.log('Form submitted:', formData);
    }
  };

  const RequiredLabel = ({ children, htmlFor }) => (
    <Label htmlFor={htmlFor} className="text-banking-text font-medium">
      {children} <span className="text-required ml-1">✱</span>
    </Label>
  );

  const OptionalLabel = ({ children, htmlFor }) => (
    <Label htmlFor={htmlFor} className="text-banking-text font-medium">
      {children}
    </Label>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-500 to-blue-500 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-banking-text mb-2">Bank Admin Portal</h1>
          <p className="text-muted-foreground text-white">Create New User Account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information Section */}
          <Card className="border-form-border">
            <CardHeader className="bg-banking-blue-light/50">
              <CardTitle className="flex items-center gap-2 text-banking-text">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-form-section-bg p-6 space-y-6">
              {/* Name Fields Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <RequiredLabel htmlFor="firstName">First Name</RequiredLabel>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    onBlur={() => handleBlur('firstName')}
                    className={cn(errors.firstName && touched.firstName && "border-required")}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && touched.firstName && (
                    <p className="text-sm text-required">{errors.firstName}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <OptionalLabel htmlFor="middleName">Middle Name</OptionalLabel>
                  <Input
                    id="middleName"
                    value={formData.middleName}
                    onChange={(e) => handleInputChange('middleName', e.target.value)}
                    placeholder="Enter middle name"
                  />
                </div>
                
                <div className="space-y-2">
                  <RequiredLabel htmlFor="lastName">Last Name</RequiredLabel>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    onBlur={() => handleBlur('lastName')}
                    className={cn(errors.lastName && touched.lastName && "border-required")}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && touched.lastName && (
                    <p className="text-sm text-required">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email and Gender Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <RequiredLabel htmlFor="email">Email</RequiredLabel>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={cn(errors.email && touched.email && "border-required")}
                    placeholder="Enter email address"
                  />
                  {errors.email && touched.email && (
                    <p className="text-sm text-required">{errors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <RequiredLabel htmlFor="gender">Gender</RequiredLabel>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger className={cn(errors.gender && touched.gender && "border-required")}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && touched.gender && (
                    <p className="text-sm text-required">{errors.gender}</p>
                  )}
                </div>
              </div>

              {/* Date of Birth and Account Type Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <RequiredLabel htmlFor="dateOfBirth">Date of Birth</RequiredLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.dateOfBirth && "text-muted-foreground",
                          errors.dateOfBirth && touched.dateOfBirth && "border-required"
                        )}
                        onClick={() => handleBlur('dateOfBirth')}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.dateOfBirth}
                        onSelect={(date) => handleInputChange('dateOfBirth', date)}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.dateOfBirth && touched.dateOfBirth && (
                    <p className="text-sm text-required">{errors.dateOfBirth}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <OptionalLabel htmlFor="accountType">Account Type</OptionalLabel>
                  <Select value={formData.accountType} onValueChange={(value) => handleInputChange('accountType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="savings">Savings Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <RequiredLabel htmlFor="address">Residential Address</RequiredLabel>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  onBlur={() => handleBlur('address')}
                  className={cn(errors.address && touched.address && "border-required")}
                  placeholder="Enter complete residential address"
                  rows={3}
                />
                {errors.address && touched.address && (
                  <p className="text-sm text-required">{errors.address}</p>
                )}
              </div>

              {/* Location Details Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <RequiredLabel htmlFor="postalCode">Postal Code</RequiredLabel>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    onBlur={() => handleBlur('postalCode')}
                    className={cn(errors.postalCode && touched.postalCode && "border-required")}
                    placeholder="Enter postal code"
                  />
                  {errors.postalCode && touched.postalCode && (
                    <p className="text-sm text-required">{errors.postalCode}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <RequiredLabel htmlFor="state">State</RequiredLabel>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    onBlur={() => handleBlur('state')}
                    className={cn(errors.state && touched.state && "border-required")}
                    placeholder="Enter state"
                  />
                  {errors.state && touched.state && (
                    <p className="text-sm text-required">{errors.state}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <RequiredLabel htmlFor="country">Country</RequiredLabel>
                  <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                    <SelectTrigger className={cn(errors.country && touched.country && "border-required")}>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nigeria">Nigeria</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.country && touched.country && (
                    <p className="text-sm text-required">{errors.country}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <RequiredLabel htmlFor="currency">Currency</RequiredLabel>
                  <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                    <SelectTrigger className={cn(errors.currency && touched.currency && "border-required")}>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">$ - Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.currency && touched.currency && (
                    <p className="text-sm text-required">{errors.currency}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Security Section */}
          <Card className="border-form-border">
            <CardHeader className="bg-banking-blue-light/50">
              <CardTitle className="flex items-center gap-2 text-banking-text">
                <Lock className="h-5 w-5" />
                Account Security Information
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-form-section-bg p-6 space-y-6">
              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <OptionalLabel htmlFor="password">Password</OptionalLabel>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter password"
                  />
                </div>
                
                <div className="space-y-2">
                  <OptionalLabel htmlFor="confirmPassword">Confirm Password</OptionalLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    onBlur={() => handleBlur('confirmPassword')}
                    className={cn(errors.confirmPassword && touched.confirmPassword && "border-required")}
                    placeholder="Confirm password"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-sm text-required">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              {/* Password Note */}
              <div className="bg-banking-blue-light/30 p-4 rounded-md">
                <p className="text-sm text-banking-text">
                  The password should be at least 8 characters long. To make it stronger, use letters and symbols like #!&%.
                </p>
              </div>

              {/* Account Pin */}
              <div className="space-y-2">
                <OptionalLabel htmlFor="pin">Account Pin</OptionalLabel>
                <Input
                  id="pin"
                  type="password"
                  value={formData.pin}
                  onChange={(e) => handleInputChange('pin', e.target.value)}
                  placeholder="Enter 4-digit PIN"
                  maxLength={4}
                  className="max-w-32"
                />
              </div>

              {/* Agreement Checkbox */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                    onBlur={() => handleBlur('agreeToTerms')}
                  />
                  <RequiredLabel htmlFor="agreeToTerms">I agree with the terms and conditions.</RequiredLabel>
                </div>
                {errors.agreeToTerms && touched.agreeToTerms && (
                  <p className="text-sm text-required">{errors.agreeToTerms}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              variant="banking-submit"
              size="lg"
              disabled={!isFormValid()}
              className="w-full md:w-auto px-12"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAccountForm;
