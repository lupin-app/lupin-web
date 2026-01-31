import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import avatar1 from '../../avatars/1.png';
import avatar2 from '../../avatars/2.png';
import avatar3 from '../../avatars/3.png';
import avatar5 from '../../avatars/5.png';
import avatar9 from '../../avatars/9.png';
import avatar7 from '../../avatars/7.png';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export function LandingPage4() {
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
  const mailchimpTarget = 'mailchimp_iframe_4';

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
    <div className="relative min-h-screen overflow-hidden bg-[#fdfcff] text-[#120731] flex items-center justify-center">
      <div className="pointer-events-none absolute left-[-32%] top-[-12%] h-[130%] w-[55%] -skew-x-[14deg] bg-gradient-to-b from-[#6b4ff6] via-[#7a5eff] to-[#9a7bff] shadow-[0_0_80px_rgba(107,79,246,0.35)]" />
      <div className="pointer-events-none absolute right-32 top-36 h-8 w-8 rounded-full bg-[#f5a500]/30" />
      <div className="pointer-events-none absolute right-[12%] bottom-10 h-24 w-24 rounded-full bg-[#d6ceff]/70 blur-[2px]" />

      <div className="relative mx-auto max-w-5xl px-6 py-24 lg:py-28">
        <div className="relative grid place-items-center">
          <div className="w-full max-w-[740px] space-y-6 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight drop-shadow-sm">
              <span className="text-[#f7f3ff] lg:text-[#120731]">
                <span
                  className="text-[#f5a500]"
                  style={{ fontFamily: '"Pacifico", "Brush Script MT", cursive' }}
                >
                  Show up
                </span>{' '}
                for the people who{' '}
                <span
                  className="text-[#5b32ff]"
                  style={{ fontFamily: '"Pacifico", "Brush Script MT", cursive' }}
                >
                  matter
                </span>
                , regularly.
              </span>
            </h1>
            <p className="mx-auto max-w-xl text-lg text-white/90 lg:text-[#61557a]">
              Lupin helps you stay connected over time with the people you care about most. It creates simple, recurring
              moments to check in, share updates, and respond, without the pressure of constant messaging. And when life
              gets busy, Lupin quietly helps smooth things out, so staying in touch feels natural, not forced.
            </p>

            <div className="w-full max-w-[704px] mx-auto">
              {status === 'success' ? (
                <div className="flex items-center gap-3 rounded-2xl bg-white shadow-lg px-4 py-4 ring-1 ring-black/5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#8ae45a] text-[#145b1b]">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-base font-semibold text-[#120731]">You’re on the list!</p>
                    <p className="text-sm text-[#5c4f73]">We’ll follow up with early access soon.</p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="ml-auto text-sm font-semibold text-[#5b32ff] underline decoration-2 decoration-transparent transition hover:decoration-[#5b32ff]"
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
                  className="flex flex-col gap-3 rounded-3xl bg-white/80 p-4 shadow-xl ring-1 ring-black/5 backdrop-blur"
                  noValidate
                >
                  <iframe
                    ref={iframeRef}
                    onLoad={handleIframeLoad}
                    name={mailchimpTarget}
                    title="mailchimp-silent-submit-4"
                    style={{ display: 'none' }}
                    aria-hidden="true"
                  />
                  <input type="hidden" name="u" value="5708d487c290f03aaa16cbbd7" />
                  <input type="hidden" name="id" value="4df9c7ef2c" />
                  <input type="hidden" name="f_id" value="00e0ede4f0" />
                  <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                    <input type="text" name={honeypotName} tabIndex={-1} defaultValue="" />
                  </div>
                  <div className="flex flex-col items-center gap-3 sm:flex-row">
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
                      aria-describedby={status === 'error' ? 'lp4-email-error' : undefined}
                      className={`w-full rounded-full border-2 bg-white py-3 text-base text-[#120731] placeholder:text-[#9a8fb1] shadow-sm transition focus:border-[#5b32ff] focus:outline-none focus:ring-2 focus:ring-[#c9b8ff] sm:flex-1 sm:text-lg sm:px-5
                        ${status === 'error' ? 'border-red-400' : 'border-transparent'}`}
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6b4ff6] to-[#8b68ff] px-6 py-3 text-base font-semibold text-white shadow-[0_18px_50px_rgba(107,79,246,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(107,79,246,0.45)] disabled:translate-y-0 disabled:opacity-70 sm:w-auto sm:px-8 sm:text-lg"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Joining...
                        </>
                      ) : (
                        <>
                          Get Early Access
                          <ArrowRight className="h-5 w-5" />
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-center text-sm text-[#5c4f73]">
                    No spam, no noise. Just keeping you in the loop as Lupin gets ready to launch.
                  </p>
                  {status === 'error' && (
                    <div
                      id="lp4-email-error"
                      className="flex items-center gap-2 text-sm text-red-500"
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
          </div>

          <div className="pointer-events-none absolute top-1/2 hidden -translate-y-1/2 lg:flex lg:flex-col lg:items-center lg:gap-6" style={{ left: '-260px' }}>
            <div className="relative flex h-full min-h-[700px] w-[220px] items-center justify-center">
              <div className="absolute h-24 w-24 rounded-full bg-white shadow-xl ring-4 ring-[#6b4ff6]/20" style={{ left: '-28px', top: '0px' }}>
                <img src={avatar1} alt="Curious child" className="h-24 w-24 rounded-full object-cover" />
              </div>
              <div className="absolute h-18 w-18 rounded-full bg-white shadow-xl ring-4 ring-[#6b4ff6]/15" style={{ left: '52px', top: '300px' }}>
                <img src={avatar2} alt="Smiling child" className="h-16 w-16 rounded-full object-cover" />
              </div>
              <div className="absolute h-20 w-20 rounded-full bg-white shadow-xl ring-4 ring-[#6b4ff6]/25" style={{ left: '-74px', top: '600px' }}>
                <img src={avatar3} alt="Playful child" className="h-[72px] w-[72px] rounded-full object-cover" />
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute top-1/2 hidden -translate-y-1/2 lg:flex lg:flex-col lg:items-center lg:gap-6" style={{ right: '-340px', bottom: '100px' }}>
            <div className="relative flex w-full max-w-[340px] items-center justify-center">
              <div className="absolute right-12 top-[-20px] h-14 w-14 rounded-full bg-[#f5a500]/40 blur-[1px]" />
              <div className="absolute flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl ring-4 ring-[#6b4ff6]/15" style={{ right: '-00px', bottom: '-140px' }}>
                <img src={avatar7} alt="Happy child" className="h-20 w-20 rounded-full object-cover" />
              </div>
              <div className="absolute flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-xl ring-4 ring-[#6b4ff6]/15" style={{ right: '120px', top: '100px' }}>
                <img src={avatar5} alt="Joyful child" className="h-14 w-14 rounded-full object-cover" />
              </div>
              <div className="absolute flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white shadow-xl ring-4 ring-[#6b4ff6]/20" style={{ right: '-140px', top: '40px' }}>
                <img src={avatar9} alt="Cheerful child" className="h-[60px] w-[60px] rounded-full object-cover" />
              </div>
              <div className="relative h-44 w-44 overflow-hidden rounded-full bg-white shadow-[0_22px_50px_rgba(18,7,49,0.12)] ring-4 ring-[#f5a500]/20" style={{ right: '0px', bottom: '240px' }}>
                <img src={avatar9} alt="Smiling kid" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


