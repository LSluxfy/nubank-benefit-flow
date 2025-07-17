import { useState, useEffect } from 'react';
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';

interface EnhancedLogoProps {
  src?: string;
  alt: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  removeBackground?: boolean;
  variant?: 'nubank' | 'image';
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12', 
  lg: 'w-16 h-16',
  xl: 'w-20 h-20'
};

const textSizeClasses = {
  sm: 'text-lg',
  md: 'text-2xl', 
  lg: 'text-4xl',
  xl: 'text-5xl'
};

export const EnhancedLogo = ({ 
  src, 
  alt, 
  className = '', 
  size = 'md',
  removeBackground: shouldRemoveBackground = false,
  variant = 'nubank'
}: EnhancedLogoProps) => {
  const [processedSrc, setProcessedSrc] = useState(src);
  const [isProcessing, setIsProcessing] = useState(false);

  const processImage = async () => {
    if (!src) return;
    
    try {
      setIsProcessing(true);
      
      // Load the image
      const response = await fetch(src);
      const blob = await response.blob();
      const imageElement = await loadImage(blob);
      
      // Remove background
      const processedBlob = await removeBackground(imageElement);
      const processedUrl = URL.createObjectURL(processedBlob);
      
      setProcessedSrc(processedUrl);
    } catch (error) {
      console.error('Error processing image:', error);
      // Keep original image on error
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (shouldRemoveBackground && src) {
      processImage();
    }
  }, [src, shouldRemoveBackground]);

  // Render Nubank-style logo
  if (variant === 'nubank') {
    return (
      <div className={`${sizeClasses[size]} ${className} flex items-center justify-center`}>
        <span className={`font-bold text-primary ${textSizeClasses[size]} leading-none`}>
          nu
        </span>
      </div>
    );
  }

  // Render image logo
  if (!src) return null;
  
  return (
    <img 
      src={processedSrc} 
      alt={alt} 
      className={`${sizeClasses[size]} ${className} ${isProcessing ? 'opacity-50' : ''}`}
    />
  );
};
