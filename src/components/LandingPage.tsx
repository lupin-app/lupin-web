import React, { useEffect, useRef, useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import logo from '../../lupin-logo.png';
import avatar1 from '../../avatars/1.png';
import avatar2 from '../../avatars/2.png';
import avatar3 from '../../avatars/3.png';
import avatar4 from '../../avatars/4.png';
import avatar5 from '../../avatars/5.png';
import avatar6 from '../../avatars/13.png';
import avatar7 from '../../avatars/7.png';
import avatar8 from '../../avatars/8.png';
import avatar9 from '../../avatars/9.png';
import avatar10 from '../../avatars/10.png';

export function LandingPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLFormElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const hasPendingSubmit = useRef(false);
  const hasSeenIframeLoad = useRef(false);
  const iframeTimeoutRef = useRef<number | null>(null);
  const mailchimpAction =
    'https://deckbuildr.us1.list-manage.com/subscribe/post?u=5708d487c290f03aaa16cbbd7&id=4df9c7ef2c&f_id=00e0ede4f0';
  const honeypotName = 'b_5708d487c290f03aaa16cbbd7_4df9c7ef2c';
  const mailchimpTarget = 'mailchimp_iframe';

  // Global spacing used both between circles and away from the container edges.
  const circleSpacing = 16;

  type CircleSpec = {
    src: string;
    alt: string;
    size: number;
    x: number;
    y: number;
  };

  const topLeftCircles: CircleSpec[] = [
    { src: avatar1, alt: 'Happy Lupin customer', size: 130, x: 22, y: 18 },
    { src: avatar2, alt: 'Smiling Lupin customer', size: 82, x: 0, y: 126 },
    { src: avatar10, alt: 'Excited Lupin customer', size: 95, x: 25, y: 195 }
  ];

  const bottomRightCircles: CircleSpec[] = [
    { src: avatar4, alt: 'Happy Lupin customer', size: 132, x: 0, y: 0 },
    { src: avatar3, alt: 'Smiling Lupin customer', size: 96, x: 113, y: 106 },
    { src: avatar6, alt: 'Cheerful Lupin customer', size: 116, x: 140, y: 0},
    { src: avatar5, alt: 'Excited Lupin customer', size: 150, x: 0, y: 152 },
    { src: avatar8, alt: 'Delighted Lupin customer', size: 110, x: 198, y: 104 },
    { src: avatar7, alt: 'Joyful Lupin customer', size: 88, x: 418, y: 0 },
    { src: avatar9, alt: 'Grateful Lupin customer', size: 158, x: 272, y: 0 }
  ];

  const [isMobile, setIsMobile] = useState(false);

  // Allow separate mobile scaling for each cluster.
  const topLeftScale = isMobile ? 0.7 : 1;
  const bottomRightScale = isMobile ? 0.8 : 1;

  // Hide avatar7 on mobile.
  const visibleBottomRightCircles = isMobile
    ? bottomRightCircles.filter(circle => circle.src !== avatar7)
    : bottomRightCircles;

  const buildCircleStyle = (circle: CircleSpec, origin: 'topLeft' | 'bottomRight') => {
    const scale = origin === 'topLeft' ? topLeftScale : bottomRightScale;
    const scaledX = circle.x * scale;
    const scaledY = circle.y * scale;
    const scaledSize = circle.size * scale;

    const basePosition =
      origin === 'topLeft'
        ? { top: circleSpacing + scaledY, left: circleSpacing + scaledX }
        : { bottom: circleSpacing + scaledY, right: circleSpacing + scaledX };

    return {
      ...basePosition,
      width: scaledSize,
      height: scaledSize,
      padding: circleSpacing / 2
    };
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status === 'loading') return;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    hasPendingSubmit.current = true;

    // Submit to Mailchimp via hidden iframe; keep user on page.
    if (formRef.current && iframeRef.current) {
      formRef.current.submit();

      // Fallback in case the iframe load event is blocked; assume success after a short delay.
      iframeTimeoutRef.current = window.setTimeout(() => {
        if (!hasPendingSubmit.current) return;
        setStatus('success');
        setEmail('');
        hasPendingSubmit.current = false;
      }, 2000);
    } else {
      setStatus('error');
      setErrorMessage('Unable to submit right now. Please try again.');
      hasPendingSubmit.current = false;
    }
  };

  const handleIframeLoad = () => {
    // First load is the empty iframe; ignore it.
    if (!hasSeenIframeLoad.current) {
      hasSeenIframeLoad.current = true;
      return;
    }

    if (!hasPendingSubmit.current) return;

    // Treat iframe load as completion signal from Mailchimp.
    setStatus('success');
    setEmail('');
    hasPendingSubmit.current = false;

    if (iframeTimeoutRef.current) {
      clearTimeout(iframeTimeoutRef.current);
      iframeTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia('(max-width: 900px)').matches);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (iframeTimeoutRef.current) {
        clearTimeout(iframeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (iframeTimeoutRef.current) {
        clearTimeout(iframeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-visible bg-white px-6 py-12 pb-48 md:px-12 md:pb-28"
      style={{
        minHeight: isMobile ? 'calc(100vh + 120px)' : 'max(100vh, 1000px)',
        paddingBottom: isMobile ? 240 : undefined // Give extra room on mobile so circles clear the footer text
      }}
    >
      {/* Decorative Background Avatars - Top Right (hidden) */}
      <div className="hidden">
        <img
          src={avatar1}
          alt="Happy Lupin customer"
          className="w-16 h-16 rounded-full mb-3 object-cover"
        />
        <img
          src={avatar2}
          alt="Smiling Lupin customer"
          className="w-12 h-12 rounded-full object-cover"
        />
        <img
          src={avatar3}
          alt="Excited Lupin customer"
          className="w-10 h-10 rounded-full object-cover mt-2 ml-8"
        />
      </div>

      {/* Decorative Circles - Top Left (origin at top/left = 0) */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none select-none opacity-70 origin-top-left"
        style={{
          top: 0,
          left: 0,
          width: 360 * topLeftScale,
          height: 230 * topLeftScale,
          padding: circleSpacing
        }}
      >
        {topLeftCircles.map((circle, index) => (
          <div
            key={`top-left-${index}`}
            className="absolute"
            style={buildCircleStyle(circle, 'topLeft')}
          >
            <img
              src={circle.src}
              alt={circle.alt}
              className="rounded-full object-cover w-full h-full"
              style={{ border: '3px solid #000' }}
            />
          </div>
        ))}
      </div>

      {/* Decorative Circles - Bottom Right (origin at bottom/right = 0) */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none select-none opacity-70 origin-bottom-right"
        style={{
          bottom: 0,
          right: 0,
          width: 460 * bottomRightScale,
          height: 320 * bottomRightScale,
          padding: circleSpacing
        }}
      >
        {visibleBottomRightCircles.map((circle, index) => (
          <div
            key={`bottom-right-${index}`}
            className="absolute"
            style={buildCircleStyle(circle, 'bottomRight')}
          >
            <img
              src={circle.src}
              alt={circle.alt}
              className="rounded-full object-cover w-full h-full"
              style={{ border: '3px solid #000' }}
            />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-xl mx-auto text-center flex flex-col items-center">
        {/* Logo */}
        <div className="mb-12">
          <img
            src={logo}
            alt="Lupin Logo"
            className="mx-auto"
            style={{ height: 120, width: 'auto' }}
          />
        </div>

        {/* Hero Text */}
        <div className="space-y-6 mb-12">
          <h1
            className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900"
            style={{ fontFamily: '"Playfair Display", serif', lineHeight: 1.2 }}
          >
            Show up for the people who matter, regularly.
          </h1>
          <div className="space-y-2">
            <p className="text-lg md:text-xl text-gray-600 font-small">
              Lupin helps you stay connected over time with the people you care about most. It creates simple, recurring
              moments to check in, share updates, and respond, without the pressure of constant messaging. And when life
              gets busy, Lupin quietly helps smooth things out, so staying in touch feels natural, not forced.
            </p>
          </div>
        </div>

        {/* Email Capture Form */}
        <div className="w-full max-w-md mx-auto mb-6">
          {status === 'success' ? (
            <div className="border border-[#c5d9d5] rounded-xl p-6 flex flex-col items-center animate-in fade-in zoom-in duration-300">
              <CheckCircle2 className="w-12 h-12 text-[#81A6A2] mb-3" />
              <h3 className="text-lg font-semibold text-[#8303A6]">You're in the loop!</h3>
              <p className="text-[#81A6A2]">We'll be in touch soon.</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 text-sm text-[#81A6A2] hover:text-[#6f938f] underline"
              >
                Sign up with another email
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              action={mailchimpAction}
              method="post"
              target={mailchimpTarget}
              className="flex flex-col gap-4"
              noValidate
            >
              <iframe
                ref={iframeRef}
                onLoad={handleIframeLoad}
                name={mailchimpTarget}
                title="mailchimp-silent-submit"
                style={{ display: 'none' }}
                aria-hidden="true"
              />
              <input type="hidden" name="u" value="5708d487c290f03aaa16cbbd7" />
              <input type="hidden" name="id" value="4df9c7ef2c" />
              <input type="hidden" name="f_id" value="00e0ede4f0" />
              <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                <input type="text" name={honeypotName} tabIndex={-1} defaultValue="" />
              </div>
              <div>
                <input
                  name="EMAIL"
                  type="email"
                  placeholder="Enter your email for early access"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  disabled={status === 'loading'}
                  required
                  autoComplete="email"
                  inputMode="email"
                  spellCheck={false}
                  aria-invalid={status === 'error'}
                  aria-describedby={status === 'error' ? 'email-error' : undefined}
                  className={`w-full px-6 py-4 text-lg bg-white border-2 rounded-xl outline-none transition-all duration-200 shadow-sm
                    ${
                      status === 'error'
                        ? 'border-red-300 focus:border-red-500 text-red-900 placeholder:text-red-300'
                        : 'border-gray-200 focus:border-[#9333ea] text-gray-900 placeholder:text-gray-400'
                    }
                    disabled:bg-gray-50 disabled:cursor-not-allowed
                  `}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#81A6A2] hover:bg-[#6f938f] text-white font-semibold text-lg py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Joining...
                  </>
                ) : (
                  'Get Early Access'
                )}
              </button>
              {status === 'error' && (
                <div
                  id="email-error"
                  className="flex items-center text-red-500 text-sm -mt-2"
                  role="alert"
                  aria-live="assertive"
                >
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errorMessage}
                </div>
              )}
            </form>
          )}
        </div>

        {/* Footer Text */}
        <div className="text-center space-y-1">
          <p className="text-sm text-gray-400">No spam, no noise.</p>
          <p className="text-sm text-gray-400">Just keeping you in the loop as Lupin gets ready to launch.</p>
        </div>
      </main>
    </div>
  );
}