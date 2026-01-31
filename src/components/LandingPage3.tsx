import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import logoTransparent from '../../lupin-logo-transparent.png';
import landing3 from '../../landing3.png';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export function LandingPage3() {
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
  const mailchimpTarget = 'mailchimp_iframe_3';

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
    <div
      className="min-h-screen text-white px-6 py-12 md:px-12 lg:px-16 bg-[linear-gradient(to_bottom,_#C5D9D5_0%,_#C5D9D5_50%,_white_50%,_white_100%)] lg:bg-[linear-gradient(to_right,_#C5D9D5_0%,_#C5D9D5_50%,_white_50%,_white_100%)]"
    >
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
              <span className="text-[#8303A6]">Show up</span> for the people who matter, <span className="text-[#8303A6]">regularly.</span>

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
                className="flex flex-col gap-3 rounded-2xl p-3 backdrop-blur"
                noValidate
              >
                <iframe
                  ref={iframeRef}
                  onLoad={handleIframeLoad}
                  name={mailchimpTarget}
                  title="mailchimp-silent-submit-3"
                  style={{ display: 'none' }}
                  aria-hidden="true"
                />
                <input type="hidden" name="u" value="5708d487c290f03aaa16cbbd7" />
                <input type="hidden" name="id" value="4df9c7ef2c" />
                <input type="hidden" name="f_id" value="00e0ede4f0" />
                <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                  <input type="text" name={honeypotName} tabIndex={-1} defaultValue="" />
                </div>
                <div className="flex flex-col gap-3">
                  <input
                    name="EMAIL"
                    type="email"
                    placeholder="Enter your email for early access"
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
                    aria-describedby={status === 'error' ? 'lp3-email-error' : undefined}
                    className={`w-full rounded-full border bg-[#F7E8F2] px-5 py-2 text-base text-[#2d1837] placeholder:text-[#7a5f7a] shadow-sm transition focus:border-[#0b0732] focus:outline-none focus:ring-2 focus:ring-[#d1b3e0] sm:flex-1 sm:text-lg sm:leading-[32px] sm:px-6
                      ${status === 'error' ? 'border-red-400' : 'border-[#7a4b87]'}`}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex w-full items-center justify-center rounded-full border border-[#0b0732] bg-[#0b0732] px-7 py-2 text-base font-semibold text-white shadow-md shadow-[#0b0732]/30 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#0b0732]/40 disabled:translate-y-0 disabled:opacity-70 sm:w-auto sm:px-8 sm:text-lg"
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
                    id="lp3-email-error"
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

          <p className="text-sm text-black/70">
          No spam, no noise. Just keeping you in the loop as Lupin gets ready to launch.
          </p>
        </div>

        <div className="relative w-full max-w-xl flex justify-center">
          <img
            src={landing3}
            alt="Lupin landing preview"
            className="w-full max-w-xl rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
}


