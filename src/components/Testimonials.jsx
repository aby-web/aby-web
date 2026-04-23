import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('order_position', { ascending: true });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#F4EFE6] px-8 md:px-12 py-18">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#785E3D] mb-4">
            From students
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-[#1C1410]">
            What people say
          </h2>
        </div>

        {/* Testimonial Cards */}
        {loading ? (
          <div className="text-center py-12 text-[#6B5740]">
            Loading testimonials...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-[#F4EFE6] border border-[#C9B99A] rounded-md p-7 hover:border-[#785E3D] transition-colors"
              >
                <p className="text-[19px] font-light italic leading-relaxed text-[#1C1410] mb-6">
                  "{testimonial.review}"
                </p>
                <p className="text-[10px] uppercase tracking-[0.12em] text-[#785E3D]">
                  {testimonial.studio} · {testimonial.class_name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
