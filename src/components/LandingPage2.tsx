import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import logoTransparent from '../../lupin-logo-transparent.png';
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

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export function LandingPage2() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLFormElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const hasPendingSubmit = useRef(false);
  const hasSeenIframeLoad = useRef(false);
  const iframeTimeoutRef = useRef<number | null>(null);

  const mailchimpAction =
    'https://deckbuildr.us1.list-manage.com/subscribe/post?u=5708d487c290f03aaa16cbbd7&id=4df9c7ef2c&f_id=00e0ede4f0';
  const honeypotName = 'b_5708d487c290f03aaa16cbbd7_4df9c7ef2c';
  const mailchimpTarget = 'mailchimp_iframe_2';

  const circleSpacing = 16;

  type CircleSpec = {
    src: string;
    alt: string;
    size: number;
    x: number;
    y: number;
  };

  const avatarCluster: CircleSpec[] = [
    { src: avatar1, alt: 'Happy Lupin customer', size: 150, x: 40, y: 0 },
    { src: avatar2, alt: 'Smiling Lupin customer', size: 96, x: 0, y: 150 },
    { src: avatar10, alt: 'Excited Lupin customer', size: 95, x: 70, y: 320 },
    { src: avatar4, alt: 'Happy Lupin customer', size: 132, x: 200, y: 20 },
    { src: avatar3, alt: 'Smiling Lupin customer', size: 110, x: 120, y: 180 },
    { src: avatar6, alt: 'Cheerful Lupin customer', size: 120, x: 360, y: 70 },
    { src: avatar5, alt: 'Excited Lupin customer', size: 150, x: 260, y: 190 },
    { src: avatar8, alt: 'Delighted Lupin customer', size: 110, x: 180, y: 330 },
    { src: avatar7, alt: 'Joyful Lupin customer', size: 96, x: 390, y: 250 },
    { src: avatar9, alt: 'Grateful Lupin customer', size: 158, x: 310, y: 340 }
  ];

  const buildCircleStyle = (circle: CircleSpec) => ({
    position: 'absolute' as const,
    top: circle.y + circleSpacing,
    left: circle.x + circleSpacing,
    width: circle.size,
    height: circle.size,
    padding: circleSpacing / 2
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === 'loading') return;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    hasPendingSubmit.current = true;

    if (formRef.current && iframeRef.current) {
      formRef.current.submit();

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
    if (!hasSeenIframeLoad.current) {
      hasSeenIframeLoad.current = true;
      return;
    }

    if (!hasPendingSubmit.current) return;

    setStatus('success');
    setEmail('');
    hasPendingSubmit.current = false;

    if (iframeTimeoutRef.current) {
      clearTimeout(iframeTimeoutRef.current);
      iframeTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (iframeTimeoutRef.current) {
        clearTimeout(iframeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#C5D9D5] text-white px-6 py-12 md:px-12 lg:px-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 lg:min-h-[80vh]">
          <div className="w-full space-y-8">
            <div className="flex justify-center">
                <img src={logoTransparent} alt="Lupin logo" className="h-20 w-auto" />
            </div>
          <div className="space-y-4">
            <h1
              className="text-4xl font-black leading-tight text-black sm:text-5xl md:text-6xl mb-3"
              style={{ fontFamily: '"Inter", "Inter var", system-ui, -apple-system, "Segoe UI", sans-serif', fontWeight: 700 }}
            >
              <span className="text-[#8303A6]">Show up</span> for the people who matter, regularly.
              <br />
            </h1>
            <p className="max-w-xl text-lg text-black/80">
            Lupin helps you stay connected over time with the people you care about most. It creates simple, recurring moments to check in, share updates, and respond, without the pressure of constant messaging. And when life gets busy, Lupin quietly helps smooth things out, so staying in touch feels natural, not forced.
              </p>
          </div>

          <div className="w-full max-w-lg">
            {status === 'success' ? (
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-4 ring-1 ring-white/15 backdrop-blur">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d5ff57] text-[#1f4a2b]">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-base font-semibold text-white">You’re on the list!</p>
                  <p className="text-sm text-white/70">We’ll follow up with early access soon.</p>
                </div>
                <button
                  onClick={() => setStatus('idle')}
                  className="ml-auto text-sm font-medium text-[#d5ff57] underline decoration-2 decoration-transparent transition hover:decoration-[#d5ff57]"
                >
                  Add another
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                action={mailchimpAction}
                method="post"
                target={mailchimpTarget}
                className="flex flex-col gap-3 rounded-2xl bg-white/10 p-3 ring-1 ring-white/15 backdrop-blur"
                noValidate
              >
                <iframe
                  ref={iframeRef}
                  onLoad={handleIframeLoad}
                  name={mailchimpTarget}
                  title="mailchimp-silent-submit-2"
                  style={{ display: 'none' }}
                  aria-hidden="true"
                />
                <input type="hidden" name="u" value="5708d487c290f03aaa16cbbd7" />
                <input type="hidden" name="id" value="4df9c7ef2c" />
                <input type="hidden" name="f_id" value="00e0ede4f0" />
                <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                  <input type="text" name={honeypotName} tabIndex={-1} defaultValue="" />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    name="EMAIL"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={event => {
                      setEmail(event.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    disabled={status === 'loading'}
                    required
                    autoComplete="email"
                    inputMode="email"
                    spellCheck={false}
                    aria-invalid={status === 'error'}
                    aria-describedby={status === 'error' ? 'lp2-email-error' : undefined}
                    className={`w-full rounded-xl border-2 bg-white text-base text-gray-900 placeholder:text-gray-500 transition focus:border-[#d5ff57] focus:outline-none focus:ring-2 focus:ring-[#d5ff57] sm:flex-1 sm:text-lg sm:leading-[52px] sm:px-5
                      ${status === 'error' ? 'border-red-400' : 'border-transparent'}`}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex w-full items-center justify-center rounded-xl bg-[#467302] px-5 py-3 text-base font-semibold text-white shadow-[0_12px_0_#2f4d01] transition hover:-translate-y-0.5 hover:shadow-[0_14px_0_#2f4d01] disabled:translate-y-0 disabled:opacity-80 disabled:shadow-[0_12px_0_#2f4d01] sm:w-auto sm:text-lg"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      'Get Early Access'
                    )}
                  </button>
                </div>
                {status === 'error' && (
                  <div
                    id="lp2-email-error"
                    className="flex items-center gap-2 text-sm text-red-200"
                    role="alert"
                    aria-live="assertive"
                  >
                    <AlertCircle className="h-4 w-4" />
                    {errorMessage}
                  </div>
                )}
              </form>
            )}
          </div>

          <p className="text-sm text-white/70">
          No spam, no noise. Just keeping you in the loop as Lupin gets ready to launch.
          </p>
        </div>

        <div className="relative w-full max-w-xl">
          <div className="absolute -left-6 top-4 h-14 w-14 rotate-12 rounded-2xl bg-[#8303A6]" aria-hidden="true" />
          <div className="absolute -right-8 -bottom-6 h-16 w-16 -rotate-6 rounded-full bg-[#0f2a14]" aria-hidden="true" />

            <div className="relative min-h-[520px] w-full overflow-visible">
              {avatarCluster.map((circle, index) => (
                <div
                  key={`${circle.alt}-${index}`}
                  className="absolute"
                  style={buildCircleStyle(circle)}
                >
                  <div className="relative h-full w-full rounded-full bg-white p-2">
                    <img
                      src={circle.src}
                      alt={circle.alt}
                      className="h-full w-full rounded-full object-cover"
                      style={{ border: '3px solid #000' }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

