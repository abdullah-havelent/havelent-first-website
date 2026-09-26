'use client';

import ReviewCardContent from '@/components/ReviewCardContent';
import ReviewFilterSelect from '@/components/ReviewFilterSelect';
import Contact from '@/components/Contact';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Check, ChevronDown, ChevronRight, Grid2X2, Rows3, X } from 'lucide-react';
import { services } from '@/components/reviewsData';
import { supabase } from '@/lib/supabase';
import StarRating from '@/components/StarRating';
import Footer from '@/components/Footer';

type DatabaseReview = {
  id: number;
  client_name: string;
  client_role: string;
  service: string;
  sub_service: string | null;
  review: string;
  rating: number;
  approved: boolean;
  created_at: string;
};

export default function ReviewsPage() {
  const [activeService, setActiveService] = useState<string | null>(
    null
  );

  const [reviews, setReviews] = useState<DatabaseReview[]>([]);
  const [reviewFilterService, setReviewFilterService] = useState('');
  const [reviewFilterSubService, setReviewFilterSubService] = useState('');
  const [reviewLayout, setReviewLayout] = useState<1 | 2>(2);
  const [expandedReviewId, setExpandedReviewId] = useState<number | null>(null);

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [serviceQuery, setServiceQuery] = useState('');

  const [rating, setRating] = useState(0);
  const [feedbackModal, setFeedbackModal] = useState<{
    type: 'success' | 'error';
    title: string;
    message: string;
  } | null>(null);

  const [form, setForm] = useState({
    name: '',
    role: '',
    review: '',
  });




  useEffect(() => {
  async function fetchReviews() {
    const { data, error } = await supabase
      .from('reviews')
      .select(
        'id, client_name, client_role, service, sub_service, review, rating, approved, created_at'
      )
      .eq('approved', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading reviews:', error);
      return;
    }

    setReviews(data || []);
  }

  fetchReviews();
}, []);




  const availableReviewServices = services.map((service) => service.name);
  const selectableServices = services.flatMap((service) => [
    service.name,
    ...service.subServices.map((subService) => service.name + ' → ' + subService),
  ]);
  const normalizedServiceQuery = serviceQuery.trim().toLowerCase();
  const serviceSearchResults = normalizedServiceQuery
    ? services.flatMap((service) => [
        ...(service.name.toLowerCase().includes(normalizedServiceQuery)
          ? [{ type: 'main' as const, label: service.name, value: service.name, parent: '' }]
          : []),
        ...service.subServices
          .filter((subService) => subService.toLowerCase().includes(normalizedServiceQuery))
          .map((subService) => ({
            type: 'sub' as const,
            label: subService,
            value: service.name + ' → ' + subService,
            parent: service.name,
          })),
      ])
    : [];

  const availableReviewSubServices = reviewFilterService
    ? services.find((service) => service.name === reviewFilterService)
        ?.subServices ?? []
    : [];
  const getReviewServices = (review: DatabaseReview) => {
    if (review.sub_service) {
      return [{ mainService: review.service.trim(), subService: review.sub_service.trim() }];
    }

    return review.service.split(/\r?\n|,\s*/).map((service) => {
      const [mainService, ...subServiceParts] = service.split('→');

      return {
        mainService: mainService.trim(),
        subService: subServiceParts.join('→').trim(),
      };
    }).filter((service) => service.mainService);
  };

  const filteredReviews = reviews.filter((review) => {
    const reviewServices = getReviewServices(review);

    if (
      reviewFilterService &&
      !reviewServices.some((service) => service.mainService === reviewFilterService)
    ) return false;

    if (
      reviewFilterSubService &&
      !reviewServices.some(
        (service) =>
          service.mainService === reviewFilterService &&
          service.subService === reviewFilterSubService
      )
    ) return false;

    return true;
  });
  const addService = (service: string) => {
    const normalizedService = service.trim().replace(/,$/, '').trim();
    if (!normalizedService) return;

    setSelectedServices((current) =>
      current.some((item) => item.toLowerCase() === normalizedService.toLowerCase())
        ? current
        : [...current, normalizedService]
    );
    setServiceQuery('');
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (selectedServices.length === 0) {
    setFeedbackModal({
      type: 'error',
      title: 'Service Required',
      message: 'Please type or select at least one service before submitting your review.',
    });
    return;
  }

  if (rating === 0) {
    setFeedbackModal({
      type: 'error',
      title: 'Rating Required',
      message: 'Please select a rating before submitting your review.',
    });
    return;
  }

const { error } = await supabase
  .from('reviews')
  .insert([
    {
      client_name: form.name,
      client_role: form.role,
      service: selectedServices.join('\n'),
      sub_service: null,
      review: form.review,
      rating: rating,
      approved: false,
    },
  ]);

  if (error) {
    console.error('Error submitting review:', error);
    setFeedbackModal({
      type: 'error',
      title: 'Submission Failed',
      message: "We couldn't submit your review. Please try again.",
    });
    return;
  }

  setFeedbackModal({
    type: 'success',
    title: 'Review Submitted',
    message: 'Thank you! Your review has been submitted for approval.',
  });

  setForm({
    name: '',
    role: '',
    review: '',
  });

  setSelectedServices([]);
  setServiceQuery('');
  setRating(0);
};



  return (
    <>
    <main className="min-h-screen bg-[#050505] px-6 pb-24 pt-40 text-white sm:pb-28 sm:pt-44">

      {/* Ambient background */}
      <div className="pointer-events-none fixed left-1/2 top-0 -z-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-orange-500/[0.06] blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-[1500px]">

        {/* ================================= */}
        {/* HEADING */}
        {/* ================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-brand-orange">
            Client Reviews
          </p>

          <h1 className="font-display text-5xl font-semibold md:text-6xl">
            What Our{' '}
            <span className="text-gradient-orange">
              Clients Say
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/55">
            Real experiences from the people and brands
            we have worked with.
          </p>
        </motion.div>

        {/* ================================= */}
        {/* MAIN TWO COLUMN AREA */}
        {/* ================================= */}

        <div className="grid gap-10 lg:min-h-[980px] lg:grid-cols-[minmax(0,1.25fr)_minmax(440px,0.75fr)] lg:gap-14 xl:gap-20">

          {/* ================================= */}
          {/* LEFT — REVIEWS */}
          {/* ================================= */}

          <div className="relative min-h-0 min-w-0 lg:overflow-hidden lg:rounded-[26px] lg:border lg:border-white/10 lg:bg-white/[0.015]">
            <div className="lg:absolute lg:inset-0 lg:flex lg:flex-col">
              <div className="mb-4 rounded-[22px] border border-white/10 bg-[#111]/95 p-4 backdrop-blur-xl lg:relative lg:z-50 lg:m-4 lg:mb-0 lg:bg-[#0b0b0b] lg:backdrop-blur-none">
                <div className="flex flex-wrap items-end gap-3">
                  <div className="min-w-[180px] flex-1">
                    <span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-white/45">Main category</span>
                    <ReviewFilterSelect
                      value={reviewFilterService}
                      options={availableReviewServices}
                      allLabel="All Services"
                      onChange={(service) => {
                        setReviewFilterService(service);
                        setReviewFilterSubService('');
                      }}
                    />
                  </div>

                  <div className="min-w-[180px] flex-1">
                    <span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-white/45">Subcategory</span>
                    <ReviewFilterSelect
                      value={reviewFilterSubService}
                      options={availableReviewSubServices}
                      allLabel={reviewFilterService ? `All ${reviewFilterService}` : 'Select main category first'}
                      disabled={!reviewFilterService}
                      onChange={setReviewFilterSubService}
                    />
                  </div>
                  <p aria-live="polite" className="w-full text-sm font-medium text-brand-orange lg:w-auto lg:min-w-[122px] lg:pb-3 lg:text-right">
                    Found {filteredReviews.length} {filteredReviews.length === 1 ? 'review' : 'reviews'}
                  </p>

                  <div className="hidden w-full items-center justify-end gap-2 border-t border-white/[0.07] pt-3 lg:flex" aria-label="Review layout">
                    <span className="mr-1 text-xs font-medium uppercase tracking-[0.14em] text-white/35">Layout</span>
                    <button
                      type="button"
                      onClick={() => {
                        setReviewLayout(1);
                        setExpandedReviewId(null);
                      }}
                      aria-pressed={reviewLayout === 1}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                        reviewLayout === 1
                          ? 'border-brand-orange/50 bg-brand-orange/10 text-brand-orange'
                          : 'border-white/10 text-white/50 hover:border-brand-orange/30 hover:text-brand-orange'
                      }`}
                    >
                      <Rows3 size={15} />
                      1 Column
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setReviewLayout(2);
                        setExpandedReviewId(null);
                      }}
                      aria-pressed={reviewLayout === 2}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                        reviewLayout === 2
                          ? 'border-brand-orange/50 bg-brand-orange/10 text-brand-orange'
                          : 'border-white/10 text-white/50 hover:border-brand-orange/30 hover:text-brand-orange'
                      }`}
                    >
                      <Grid2X2 size={15} />
                      2 Columns
                    </button>
                  </div>
                </div>
              </div>

              <div
                role="region"
                aria-label="Filtered client reviews"
                tabIndex={0}
                className={`review-scroll-region flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4 pt-1 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-orange lg:relative lg:z-0 lg:min-h-0 lg:flex-1 lg:grid lg:content-start lg:gap-5 lg:snap-none lg:space-y-0 lg:overflow-x-hidden lg:overflow-y-scroll lg:overscroll-y-contain lg:p-4 ${
                  reviewLayout === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-1 lg:auto-rows-max'
                }`}
                style={{ scrollbarWidth: 'thin', scrollbarColor: '#f97316 #171717', scrollbarGutter: 'stable' }}
              >
                {filteredReviews.length > 0 ? filteredReviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{
                      opacity: 0,
                      x: 'var(--review-enter-x)',
                      y: 'var(--review-enter-y)',
                    }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: Math.min(index, 3) * 0.08 }}
                    className={`mobile-no-motion relative h-[560px] w-[90%] shrink-0 snap-start overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.035] p-7 [--review-enter-x:0px] [--review-enter-y:25px] transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-brand-orange/30 lg:w-auto lg:[--review-enter-x:0px] lg:[--review-enter-y:25px] ${
                      reviewLayout === 2 ? 'lg:h-[520px]' : 'lg:h-auto lg:cursor-pointer'
                    }`}
                  >
                    <ReviewCardContent
                      name={review.client_name}
                      role={review.client_role}
                      text={review.review}
                      rating={review.rating}
                      category={review.sub_service ? `${review.service} (${review.sub_service})` : review.service}
                      singleColumn={reviewLayout === 1}
                      expanded={expandedReviewId === review.id}
                      onToggle={() => setExpandedReviewId((current) => current === review.id ? null : review.id)}
                    />
                  </motion.div>
                )) : (
                  <div className={`flex min-h-52 items-center justify-center rounded-[22px] border border-dashed border-white/10 px-6 text-center text-sm text-white/45 ${reviewLayout === 2 ? 'lg:col-span-2' : ''}`}>
                    No approved reviews are available for this filter yet.
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* ================================= */}
          {/* RIGHT — SUBMIT REVIEW */}
          {/* ================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
              mobile-no-motion
              h-fit
              min-w-0
              max-w-full
              rounded-[22px]
              border
              border-white/10
              bg-white/[0.035]
              p-8
              backdrop-blur-xl
              lg:p-10
            "
          >

            <h2 className="font-display text-3xl font-semibold">
              Submit Your{' '}
              <span className="text-gradient-orange">
                Review
              </span>
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/45">
              We would love to hear about your experience
              working with Havelent.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 min-w-0 max-w-full space-y-5"
            >

              {/* ============================ */}
              {/* NAME */}
              {/* ============================ */}

              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Your Name
                </label>

                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter your name"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.035]
                    px-4
                    py-3.5
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-white/25
                    transition-all
                    focus:border-brand-orange/50
                    focus:ring-1
                    focus:ring-brand-orange/20
                  "
                />
              </div>

              {/* ============================ */}
              {/* ROLE */}
              {/* ============================ */}

              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Your Role
                </label>

                <input
                  required
                  type="text"
                  value={form.role}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      role: e.target.value,
                    })
                  }
                  placeholder="e.g. Business Owner"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.035]
                    px-4
                    py-3.5
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-white/25
                    transition-all
                    focus:border-brand-orange/50
                    focus:ring-1
                    focus:ring-brand-orange/20
                  "
                />
              </div>

{/* ============================ */}
{/* SERVICE MENU */}
{/* ============================ */}

<div className="relative min-w-0 max-w-full">
  <label className="mb-2 block text-sm text-white/60">
    Services
  </label>

  <div className="min-w-0 w-full max-w-full rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2.5 transition-all focus-within:border-brand-orange/50 focus-within:ring-1 focus-within:ring-brand-orange/20 max-md:focus-within:border-white/10 max-md:focus-within:ring-0">
    {selectedServices.length > 0 && (
      <div className="mb-2 flex min-w-0 max-w-full flex-wrap gap-2">
        {selectedServices.map((service) => (
          <span
            key={service}
            className="flex w-full min-w-0 max-w-full items-center gap-1.5 rounded-lg border border-brand-orange/25 bg-brand-orange/10 px-2.5 py-1.5 text-xs text-brand-orange sm:w-auto"
          >
            <span className="min-w-0 flex-1 truncate">{service}</span>
            <button
              type="button"
              aria-label={`Remove ${service}`}
              onClick={() => setSelectedServices((current) => current.filter((item) => item !== service))}
              className="shrink-0 text-brand-orange/70 transition-colors hover:text-white"
            >
              <X size={13} />
            </button>
          </span>
        ))}
      </div>
    )}

    <div className="flex min-w-0 items-center gap-2">
      <input
        type="text"
        value={serviceQuery}
        onFocus={() => setActiveService('')}
        onChange={(event) => {
          setServiceQuery(event.target.value);
          setActiveService('');
        }}
        onKeyDown={(event) => {
          if ((event.key === 'Enter' || event.key === ',') && serviceQuery.trim()) {
            event.preventDefault();
            addService(serviceQuery);
          }
          if (event.key === 'Backspace' && !serviceQuery && selectedServices.length > 0) {
            setSelectedServices((current) => current.slice(0, -1));
          }
          if (event.key === 'Escape') setActiveService(null);
        }}
        placeholder={selectedServices.length ? 'Add another service' : 'Type or select a service'}
        aria-expanded={activeService !== null}
        aria-controls="review-service-options"
        className="min-w-0 flex-1 bg-transparent px-1 py-1 text-sm text-white outline-none placeholder:text-white/30"
      />
      <button
        type="button"
        aria-label="Toggle service options"
        onClick={() => setActiveService((current) => current === null ? '' : null)}
        className="shrink-0 p-1 text-white/40 hover:text-brand-orange"
      >
        <ChevronDown size={17} className={`transition-transform max-md:transition-none ${activeService !== null ? 'rotate-180' : ''}`} />
      </button>
    </div>
  </div>

  {activeService !== null && (
    <div
      id="review-service-options"
      className="absolute left-0 right-0 top-full z-[100] mt-2 min-w-0 max-w-full overflow-hidden rounded-xl border border-white/10 bg-[#11100f] shadow-2xl"
    >
      <div className="max-h-64 overflow-y-auto py-2">
        {!activeService ? (
          <>
            <div className="border-b border-white/10 px-4 py-3">
              <button
                type="button"
                onClick={() => {
                  setActiveService(null);
                  setServiceQuery('');
                }}
                className="flex items-center gap-2 text-xs text-white/45 transition-colors hover:text-white max-md:transition-none"
              >
                <span>↑</span>
                <span>Close Dropdown</span>
              </button>
            </div>

            {normalizedServiceQuery ? (
              <>
                {serviceSearchResults.map((result) => {
                  const isSelected = selectedServices.some(
                    (service) => service.toLowerCase() === result.value.toLowerCase()
                  );

                  return (
                    <button
                      key={result.type + result.value}
                      type="button"
                      disabled={result.type === 'sub' && isSelected}
                      onClick={() => {
                        if (result.type === 'main') {
                          setActiveService(result.value);
                          setServiceQuery('');
                        } else {
                          addService(result.value);
                        }
                      }}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm text-white/70 transition-colors hover:bg-brand-orange/[0.08] hover:text-white disabled:text-white/25 max-md:transition-none"
                    >
                      <span className="min-w-0">
                        <span className="block truncate">{result.label}</span>
                        {result.type === 'sub' && (
                          <span className="mt-0.5 block truncate text-xs text-white/35">
                            {result.parent}
                          </span>
                        )}
                      </span>
                      {result.type === 'main' && (
                        <ChevronRight size={15} className="shrink-0 text-brand-orange" />
                      )}
                      {result.type === 'sub' && isSelected && (
                        <Check size={15} className="shrink-0 text-brand-orange" />
                      )}
                    </button>
                  );
                })}

                {!selectableServices.some(
                  (service) => service.toLowerCase() === normalizedServiceQuery
                ) && (
                  <button
                    type="button"
                    onClick={() => addService(serviceQuery)}
                    className="w-full border-t border-white/10 px-4 py-3.5 text-left text-sm text-brand-orange transition-colors hover:bg-brand-orange/[0.08] max-md:transition-none"
                  >
                    Add “{serviceQuery.trim()}”
                  </button>
                )}

                {serviceSearchResults.length === 0 && (
                  <p className="px-4 pt-3 text-xs text-white/40">
                    No listed service matched. You can add it as a custom service below.
                  </p>
                )}
              </>
            ) : (
              services.map((service) => (
                <button
                  key={service.name}
                  type="button"
                  onClick={() => setActiveService(service.name)}
                  className="flex w-full items-center justify-between px-4 py-3.5 text-left text-sm text-white/70 transition-colors hover:bg-brand-orange/[0.08] hover:text-white max-md:transition-none"
                >
                  <span>{service.name}</span>
                  <ChevronRight size={15} className="text-brand-orange" />
                </button>
              ))
            )}
          </>
        ) : (
          <>
            <div className="border-b border-white/10 px-4 py-3">
              <button
                type="button"
                onClick={() => setActiveService('')}
                className="flex items-center gap-2 text-xs text-white/45 transition-colors hover:text-white max-md:transition-none"
              >
                <span>←</span>
                <span>All Services</span>
              </button>
              <p className="mt-2 text-sm font-medium text-white">{activeService}</p>
              <p className="mt-1 text-xs text-white/45">Select one or more services</p>
            </div>

            <button
              type="button"
              onClick={() => addService(activeService)}
              disabled={selectedServices.includes(activeService)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-white/65 transition-colors hover:bg-brand-orange/[0.08] hover:text-white disabled:text-white/25 max-md:transition-none"
            >
              <span className="min-w-[20px] text-[10px] font-semibold text-brand-orange">00</span>
              <span>{activeService} — General</span>
            </button>

            {services
              .find((service) => service.name === activeService)
              ?.subServices.map((subService, index) => {
                const serviceValue = activeService + ' → ' + subService;
                const isSelected = selectedServices.includes(serviceValue);

                return (
                  <button
                    key={subService}
                    type="button"
                    disabled={isSelected}
                    onClick={() => addService(serviceValue)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-white/65 transition-colors hover:bg-brand-orange/[0.08] hover:text-white disabled:text-white/25 max-md:transition-none"
                  >
                    <span className="min-w-[20px] text-[10px] font-semibold text-brand-orange">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>{subService}</span>
                  </button>
                );
              })}
          </>
        )}
      </div>
    </div>
  )}
</div>



              {/* ============================ */}
              {/* RATING */}
              {/* ============================ */}

              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Rating
                </label>

                <div className="flex flex-col items-start gap-3">
                  <div className="flex w-full flex-wrap items-center gap-x-3 gap-y-1.5 sm:flex-nowrap">
                    <div className="shrink-0 sm:hidden">
                      <StarRating value={rating} size={23} onChange={setRating} />
                    </div>
                    <div className="hidden shrink-0 sm:block">
                      <StarRating value={rating} size={26} onChange={setRating} />
                    </div>
                    <span className="shrink-0 whitespace-nowrap text-sm font-medium text-white/60 sm:min-w-10">
                      {rating > 0 ? `${rating}/5` : '—'}
                    </span>
                    <span className="w-full text-[10px] font-normal tracking-wide text-white/30 sm:w-auto sm:min-w-0 sm:flex-1 sm:whitespace-nowrap sm:text-[11px] sm:text-white/25">
                      Double click for a full star or choose from slider
                    </span>
                  </div>

                  <div className="flex w-full max-w-sm items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-3.5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                    <span className="min-w-6 text-center text-[10px] font-semibold tracking-wide text-white/35">0.5</span>
                    <div className="relative flex min-w-0 flex-1 items-center">
                      <div aria-hidden="true" className="pointer-events-none absolute inset-x-[5px] top-1/2 flex -translate-y-1/2 justify-between">
                        {Array.from({ length: 10 }, (_, index) => (
                          <span key={index} className="h-1 w-1 rounded-full bg-white/20" />
                        ))}
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="5"
                        step="0.5"
                        value={Math.max(0.5, rating)}
                        onChange={(event) => setRating(Number(event.target.value))}
                        aria-label="Choose a rating from 0.5 to 5 stars"
                        className="rating-slider relative z-10 w-full cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #f97316 0%, #f97316 ${((Math.max(0.5, rating) - 0.5) / 4.5) * 100}%, rgba(255,255,255,0.12) ${((Math.max(0.5, rating) - 0.5) / 4.5) * 100}%, rgba(255,255,255,0.12) 100%)`,
                        }}
                      />
                    </div>
                    <span className="min-w-6 text-center text-[10px] font-semibold tracking-wide text-white/35">5</span>
                  </div>
                </div>
              </div>

              {/* ============================ */}
              {/* REVIEW */}
              {/* ============================ */}

              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Your Review
                </label>

                <textarea
                  required
                  rows={5}
                  value={form.review}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      review: e.target.value,
                    })
                  }
                  placeholder="Tell us about your experience..."
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.035]
                    px-4
                    py-3.5
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-white/25
                    transition-all
                    focus:border-brand-orange/50
                    focus:ring-1
                    focus:ring-brand-orange/20
                  "
                />
              </div>

              {/* ============================ */}
              {/* SUBMIT */}
              {/* ============================ */}

              <button
  type="submit"
  className="
    relative
    w-full
    overflow-hidden
    rounded-xl
    bg-gradient-to-r
    from-brand-accent
    to-brand-orange
    px-5
    py-3.5
    text-sm
    font-semibold
    text-white
    transition-all
    duration-300
    hover:-translate-y-0.5
  "
  style={{
    boxShadow:
      '0 0 20px -4px rgba(249,115,22,0.5)',
  }}
>
  {/* Hover gradient */}
  <span
    className="
      absolute
      inset-0
      bg-gradient-to-r
      from-brand-orange
      to-brand-red
      opacity-0
      transition-opacity
      duration-300
      hover:opacity-100
    "
  />

  {/* Button text */}
  <span className="relative z-10">
    Submit Review
  </span>
</button>

<p className="mt-4 text-center text-sm text-white/70">
  Only genuine reviews from clients we’ve worked with are accepted.
</p>

            </form>
          </motion.div>

        </div>
      </div>
    </main>

    <Contact />
    <Footer />

    <AnimatePresence>
      {feedbackModal && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/75 px-5 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setFeedbackModal(null)}
          role="presentation"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-feedback-title"
            aria-describedby="review-feedback-message"
            initial={{ opacity: 0, scale: 0.92, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-[430px] overflow-hidden rounded-[26px] border border-white/10 bg-[#11100f]/95 p-7 text-center text-white shadow-[0_30px_90px_rgba(0,0,0,0.65)] sm:p-9"
          >
            <div className="pointer-events-none absolute inset-x-10 -top-20 h-40 rounded-full bg-orange-500/20 blur-[70px]" />

            <button
              type="button"
              aria-label="Close message"
              onClick={() => setFeedbackModal(null)}
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/45 transition-colors hover:border-brand-orange/40 hover:text-brand-orange"
            >
              <X size={17} />
            </button>

            <motion.div
              initial={{ scale: 0.5, rotate: -12 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.12, type: 'spring', stiffness: 320, damping: 18 }}
              className={`relative mx-auto grid h-16 w-16 place-items-center rounded-full border ${
                feedbackModal.type === 'success'
                  ? 'border-brand-orange/45 bg-brand-orange/10 text-brand-orange shadow-[0_0_35px_rgba(249,115,22,0.22)]'
                  : 'border-red-500/45 bg-red-500/10 text-red-400 shadow-[0_0_35px_rgba(239,68,68,0.18)]'
              }`}
            >
              {feedbackModal.type === 'success' ? <Check size={30} strokeWidth={2.5} /> : <AlertCircle size={29} />}
            </motion.div>

            <h2 id="review-feedback-title" className="relative mt-6 font-display text-3xl font-semibold">
              {feedbackModal.title}
            </h2>
            <p id="review-feedback-message" className="relative mx-auto mt-3 max-w-sm text-sm leading-6 text-white/55">
              {feedbackModal.message}
            </p>

            <button
              type="button"
              onClick={() => setFeedbackModal(null)}
              className="relative mt-7 w-full rounded-xl bg-gradient-to-r from-brand-orange to-brand-red px-5 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_-10px_rgba(249,115,22,0.65)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              {feedbackModal.type === 'success' ? 'Done' : 'Try Again'}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}




















