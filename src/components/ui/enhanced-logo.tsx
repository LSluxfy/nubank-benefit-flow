import { useState, useEffect } from 'react';
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';

interface EnhancedLogoProps {
  src: string;
  alt: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  removeBackground?: boolean;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12', 
  lg: 'w-16 h-16',
  xl: 'w-20 h-20'
};

export const EnhancedLogo = ({ 
  src, 
  alt, 
  className = '', 
  size = 'md',
  removeBackground: shouldRemoveBackground = false 
}: EnhancedLogoProps) => {
  const [processedSrc, setProcessedSrc] = useState(src);
  const [isProcessing, setIsProcessing] = useState(false);

  const processImage = async () => {
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
    if (shouldRemoveBackground) {
      processImage();
    }
  }, [src, shouldRemoveBackground]);

  return (
    <img 
      src={processedSrc} 
      alt={alt} 
      className={`${sizeClasses[size]} ${className} ${isProcessing ? 'opacity-50' : ''}`}
    />
  );
};
