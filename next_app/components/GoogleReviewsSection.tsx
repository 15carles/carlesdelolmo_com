'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { googleReviewsData } from '@/data/google-reviews';

interface GoogleReviewsSectionProps {
  maxReviews?: number;
  showHeader?: boolean;
  variant?: 'default' | 'compact';
  className?: string;
}

// Icono G multicolor de Google
const GoogleIcon = ({ size = 24 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// Estrella exacta de Google (color #fbbc04)
const GoogleStar = ({ filled = true, size = 16 }: { filled?: boolean, size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={filled ? "#fbbc04" : "#e0e0e0"} 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

// Colores aleatorios para los avatares como hace Google
const avatarColors = ["#db4437", "#0f9d58", "#4285f4", "#f4b400", "#ab47bc", "#00acc1", "#ff7043", "#9e9d24"];

export default function GoogleReviewsSection({
  maxReviews,
  showHeader = true,
  variant = 'default',
  className = ''
}: GoogleReviewsSectionProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const userInteractionTimeoutRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const { averageRating, totalReviews, googleMapsUrl, reviews } = googleReviewsData;
  const displayReviews = maxReviews ? reviews.slice(0, maxReviews) : reviews;
  const carouselReviews = useMemo(
    () => (displayReviews.length > 1 ? [...displayReviews, ...displayReviews] : displayReviews),
    [displayReviews]
  );

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    if (displayReviews.length <= 1 || isHovered || isUserInteracting) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    const speedPxPerSecond = 24;
    const resetPoint = carousel.scrollWidth / 2;
    if (resetPoint <= 0) return;

    if (positionRef.current >= resetPoint) {
      positionRef.current = positionRef.current % resetPoint;
    }
    carousel.scrollLeft = positionRef.current;

    let previousTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (previousTimestamp === null) {
        previousTimestamp = timestamp;
      }

      const delta = timestamp - previousTimestamp;
      previousTimestamp = timestamp;

      positionRef.current += (speedPxPerSecond * delta) / 1000;
      if (positionRef.current >= resetPoint) {
        positionRef.current = positionRef.current % resetPoint;
      }

      carousel.scrollLeft = positionRef.current;

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [displayReviews.length, isHovered, isUserInteracting]);

  const markUserInteraction = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      positionRef.current = carousel.scrollLeft;
    }

    setIsUserInteracting(true);
    if (userInteractionTimeoutRef.current !== null) {
      window.clearTimeout(userInteractionTimeoutRef.current);
    }
    userInteractionTimeoutRef.current = window.setTimeout(() => {
      setIsUserInteracting(false);
    }, 1200);
  };

  useEffect(() => {
    return () => {
      if (userInteractionTimeoutRef.current !== null) {
        window.clearTimeout(userInteractionTimeoutRef.current);
      }
    };
  }, []);

  const renderStars = (rating: number, size: number = 14) => {
    return (
      <div className="flex gap-[2px]" aria-label={`Valoración de ${rating} sobre 5 estrellas`}>
        {[...Array(5)].map((_, i) => (
          <GoogleStar key={i} size={size} filled={i < rating} />
        ))}
      </div>
    );
  };

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getColorForName = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return avatarColors[Math.abs(hash) % avatarColors.length];
  };

  const getRelativeTime = (dateString: string) => {
    const reviewDate = new Date(dateString);
    const today = new Date();
    // Restablecemos la hora para calcular solo días enteros
    reviewDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = today.getTime() - reviewDate.getTime();
    const diffDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
    
    if (diffDays === 0) return 'hoy';
    if (diffDays === 1) return 'hace 1 día';
    if (diffDays < 7) return `hace ${diffDays} días`;
    
    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks === 1) return 'hace 1 semana';
    if (diffWeeks < 4) return `hace ${diffWeeks} semanas`;
    
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return 'hace 1 mes';
    if (diffMonths < 12) return `hace ${diffMonths} meses`;
    
    const diffYears = Math.floor(diffDays / 365);
    if (diffYears === 1) return 'hace 1 año';
    return `hace ${diffYears} años`;
  };

  return (
    <section className={`section ${className}`} aria-labelledby="google-reviews-title">
      <div className="container">
        {showHeader && (
          <header className="mb-xl text-center animate-on-scroll">
            <h2 id="google-reviews-title" className="section-header__title mb-lg">
              Reseñas en <span className="gradient-text">Google</span>
            </h2>
            
            <div className="flex flex-wrap items-center justify-center" style={{ gap: '1.5rem' }}>
              <div className="google-review-average">
                {averageRating.toFixed(1).replace('.', ',')}
              </div>
              <div className="flex flex-col items-start gap-1">
                {renderStars(Math.round(averageRating), 28)}
                <a 
                  href={googleMapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-secondary hover:underline flex items-center mt-1"
                  style={{ gap: '0.5rem' }}
                >
                  Basado en {totalReviews} reseñas
                  <GoogleIcon size={14} />
                </a>
              </div>
            </div>
          </header>
        )}

        <div className="reviews-carousel-wrapper animate-on-scroll">
          <div
            ref={carouselRef}
            className="reviews-carousel"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onPointerDown={markUserInteraction}
            onPointerUp={markUserInteraction}
            onTouchStart={markUserInteraction}
            onTouchEnd={markUserInteraction}
            onWheel={markUserInteraction}
          >
            {carouselReviews.map((review, index) => (
              <article key={`${review.author}-${index}`} className="google-review-card">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center" style={{ gap: '1rem' }}>
                    {review.photoUrl ? (
                      <div className="google-review-avatar">
                        <Image 
                          src={review.photoUrl} 
                          alt={`Avatar de ${review.author}`} 
                          width={48} 
                          height={48} 
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ) : (
                      <div 
                        className="google-review-avatar"
                        style={{ backgroundColor: getColorForName(review.author) }}
                      >
                        {getInitials(review.author)}
                      </div>
                    )}
                    <div className="flex flex-col text-left">
                      <h3 className="google-review-author">{review.author}</h3>
                    </div>
                  </div>
                  <GoogleIcon size={18} />
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  {renderStars(review.rating, 14)}
                  <span className="google-review-time" suppressHydrationWarning>
                    {getRelativeTime(review.date)}
                  </span>
                </div>
                
                <div className="google-review-content text-left">
                  <p>{review.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
