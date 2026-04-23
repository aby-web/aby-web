import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function VacationBanner() {
  const [bannerInfo, setBannerInfo] = useState(null);
  const [bannerHeight, setBannerHeight] = useState(0);
  const bannerRef = useRef(null);

  useEffect(() => {
    fetchUpcomingVacation();
  }, []);

  useEffect(() => {
    if (bannerRef.current) {
      setBannerHeight(bannerRef.current.offsetHeight);
    }
  }, [bannerInfo]);

  const fetchUpcomingVacation = async () => {
    try {
      const today = new Date();
      const twoWeeksFromNow = new Date();
      twoWeeksFromNow.setDate(today.getDate() + 14);

      // Get vacations that start within the next 2 weeks or are currently active
      const { data, error } = await supabase
        .from('vacations')
        .select('*')
        .gte('end_date', today.toISOString().split('T')[0]) // End date is today or later
        .lte('start_date', twoWeeksFromNow.toISOString().split('T')[0]) // Start date is within 2 weeks
        .order('start_date', { ascending: true })
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        const vacation = data[0];
        const startDate = new Date(vacation.start_date);
        const endDate = new Date(vacation.end_date);

        setBannerInfo({
          startDate: startDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }),
          endDate: endDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
        });
      }
    } catch (error) {
      console.error('Error fetching vacation:', error);
    }
  };

  if (!bannerInfo) return null;

  return (
    <>
      {/* Fixed banner at the very top */}
      <div ref={bannerRef} className="fixed top-0 left-0 right-0 bg-[#785E3D] text-[#F4EFE6] py-3 px-8 text-center text-sm z-[60]">
        <p>
          <strong>Note:</strong> I'll be away {bannerInfo.startDate} – {bannerInfo.endDate}. Classes will be covered during this time.{' '}
          <Link to="/practice" className="underline hover:text-white transition-colors">
            Practice with me online
          </Link>
          {' '}while I'm away.
        </p>
      </div>
      {/* Add CSS to push fixed nav down using measured banner height */}
      {bannerHeight > 0 && (
        <style>{`
          nav.fixed {
            top: ${bannerHeight}px !important;
          }
        `}</style>
      )}
    </>
  );
}
