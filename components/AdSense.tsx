
import React, { useEffect, useRef } from 'react';

declare global {
    interface Window {
        adsbygoogle: any;
    }
}

interface AdSenseProps {
  className?: string;
}

const AdSense: React.FC<AdSenseProps> = ({ className = '' }) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const adInsRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    const adClient = adInsRef.current?.dataset.adClient;
    // Prevent AdSense errors and hide the container if using placeholder credentials.
    if (adClient === "ca-pub-0000000000000000") {
        console.warn("AdSense is using placeholder credentials. Ad will not be displayed.");
        if (adContainerRef.current) {
            adContainerRef.current.style.display = 'none';
        }
        return; // Do not attempt to push the ad.
    }

    const timer = setTimeout(() => {
      if (adContainerRef.current && adContainerRef.current.clientWidth > 0) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error("AdSense push error:", e);
        }
      } else {
        console.warn("AdSense container not ready or has no width. Ad not pushed.");
      }
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={adContainerRef} className={`flex justify-center my-4 ${className}`}>
      {/* The outer container now has the ref to check its dimensions */}
      <div className="w-full max-w-4xl min-h-[100px] bg-slate-800 rounded-lg overflow-hidden">
        {/* The 'ins' tag is the ad slot that Google AdSense will fill. */}
        <ins ref={adInsRef} className="adsbygoogle"
             style={{ display: 'block', width: '100%' }}
             data-ad-client="ca-pub-0000000000000000" // IMPORTANT: Replace with your real AdSense client ID
             data-ad-slot="0000000000" // IMPORTANT: Replace with your real Ad slot ID
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
    </div>
  );
};

export default AdSense;
