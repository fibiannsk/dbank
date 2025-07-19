import React, { useState, useRef } from 'react';
import { User, Camera, Lock, Shield, LogOut } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { useToast } from '../../hooks/use-toast';
import { Navbar } from "../../components/dashboard/Navbar";

interface ProfilePageProps {
  onChangePassword?: () => void;
  onCreatePin?: () => void;
  onLogout?: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  onChangePassword,
  onCreatePin,
  onLogout
}) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast({
        title: "File too large",
        description: "Please select an image under 5MB.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageDataUrl = e.target?.result as string;
      setProfileImage(imageDataUrl);
      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been updated successfully.",
      });
    };
    reader.onerror = () => {
      toast({
        title: "Error uploading image",
        description: "An error occurred while uploading your image.",
        variant: "destructive",
      });
    };
    reader.readAsDataURL(file);
  }
};


  const handleRemoveImage = () => {
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast({
      title: "Profile picture removed",
      description: "Your profile picture has been removed.",
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const actionCards = [
    {
      title: 'Change Password',
      icon: Lock,
      description: 'Update your account password',
      onClick: onChangePassword,
    },
    {
      title: 'Create PIN',
      icon: Shield,
      description: 'Set up a secure PIN for quick access',
      onClick: onCreatePin,
    },
    {
      title: 'Logout',
      icon: LogOut,
      description: 'Sign out of your account',
      onClick: onLogout,
      variant: 'destructive' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 py-8 px-4">
      <Navbar />
      <div className="max-w-lg mx-auto space-y-8">
        
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-card border-4 border-white shadow-profile">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <User className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
            </div>
            
            {/* Camera Icon Overlay */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-white text-primary hover:bg-white hover:text-primary-hover shadow-md border-2 border-white transition-all duration-200 hover:scale-105"
                  variant="outline"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleUploadClick} className="cursor-pointer">
                  <Camera className="w-4 h-4 mr-2" />
                  Upload Picture
                </DropdownMenuItem>
                {profileImage && (
                <DropdownMenuItem onClick={handleRemoveImage} className="cursor-pointer text-destructive">
                    <User className="w-4 h-4 mr-2" />
                    Remove Picture
                </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-foreground">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences</p>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        {/* Action Cards Section */}
        <div className="space-y-4">
          {actionCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <Card
                key={index}
                className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] bg-gradient-card border hover:border-primary/20 ${
                  card.variant === 'destructive' 
                    ? 'hover:border-destructive/20' 
                    : ''
                }`}
                onClick={card.onClick}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${
                    card.variant === 'destructive' 
                      ? 'bg-destructive/10 text-destructive' 
                      : 'bg-primary/10 text-primary'
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      card.variant === 'destructive' 
                        ? 'text-destructive' 
                        : 'text-foreground'
                    }`}>
                      {card.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center pt-8 pb-4">
          <p className="text-xs text-muted-foreground">
            Your account is secure and protected
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;