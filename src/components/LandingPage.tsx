import React, { useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import logo from '../../lupin-logo.png';
import avatar1 from '../../avatars/1.png';
import avatar2 from '../../avatars/2.png';
import avatar3 from '../../avatars/3.png';
import avatar4 from '../../avatars/4.png';
import avatar5 from '../../avatars/5.png';
import avatar6 from '../../avatars/6.png';
import avatar7 from '../../avatars/7.png';
import avatar8 from '../../avatars/8.png';
import avatar9 from '../../avatars/9.png';
export function LandingPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const bottomAvatars = [
    { src: avatar3, alt: 'Smiling Lupin customer', className: 'w-24 h-24 md:w-28 md:h-28 mt-12' },
    { src: avatar4, alt: 'Happy Lupin customer', className: 'w-36 h-36 md:w-40 md:h-40 -mt-8' },
    { src: avatar5, alt: 'Excited Lupin customer', className: 'w-20 h-20 md:w-24 md:h-24' },
    { src: avatar6, alt: 'Cheerful Lupin customer', className: 'w-24 h-24 md:w-28 md:h-28' },
    { src: avatar7, alt: 'Joyful Lupin customer', className: 'w-16 h-16 md:w-20 md:h-20' },
    { src: avatar8, alt: 'Delighted Lupin customer', className: 'w-20 h-20 md:w-24 md:h-24 mt-4' },
    { src: avatar9, alt: 'Grateful Lupin customer', className: 'w-14 h-14 md:w-16 md:h-16' }
  ];
  const mobileBottomAvatars = bottomAvatars.slice(0, 3);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };
  return <div className="min-h-screen w-full bg-white relative overflow-hidden flex flex-col items-center justify-center p-6 font-sans">
      {/* Decorative Background Circles - Top Left */}
      <div className="absolute top-4 left-4 opacity-70 pointer-events-none select-none md:hidden">
        <img
          src={avatar1}
          alt="Happy Lupin customer"
          className="w-16 h-16 rounded-full mb-3 object-cover shadow-md"
        />
        <img
          src={avatar2}
          alt="Smiling Lupin customer"
          className="w-12 h-12 rounded-full object-cover shadow"
        />
      </div>
      <div className="absolute top-10 -left-10 md:top-20 md:left-20 opacity-70 pointer-events-none select-none hidden md:block">
        <img
          src={avatar1}
          alt="Happy Lupin customer"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-4 ml-8 object-cover shadow-md"
        />
        <img
          src={avatar2}
          alt="Smiling Lupin customer"
          className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover shadow"
        />
      </div>

      {/* Decorative Background Avatars - Bottom Cluster */}
      <div className="absolute bottom-6 right-4 opacity-70 pointer-events-none select-none flex gap-3 md:hidden">
        {mobileBottomAvatars.map(avatar => <img key={avatar.alt} src={avatar.src} alt={avatar.alt} className={`${avatar.className} rounded-full object-cover shadow-md w-16 h-16`} />)}
      </div>

      <div className="absolute -bottom-20 -right-20 md:bottom-10 md:right-10 opacity-70 pointer-events-none select-none hidden md:flex flex-wrap max-w-md justify-end gap-4">
        {bottomAvatars.map(avatar => <img key={avatar.alt} src={avatar.src} alt={avatar.alt} className={`${avatar.className} rounded-full object-cover shadow-md`} />)}
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
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Coming Soon...
          </h1>
          <div className="space-y-2">
            <p className="text-xl md:text-2xl text-gray-600 font-medium">
            Lupin is the best way to stay connected with friends and family
            </p>

          </div>
        </div>

        {/* Email Capture Form */}
        <div className="w-full max-w-md mx-auto mb-12">
          {status === 'success' ? <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex flex-col items-center animate-in fade-in zoom-in duration-300">
              <CheckCircle2 className="w-12 h-12 text-green-500 mb-3" />
              <h3 className="text-lg font-semibold text-green-800">
                You're in the Loop!
              </h3>
              <p className="text-green-600">We'll be in touch soon.</p>
              <button onClick={() => setStatus('idle')} className="mt-4 text-sm text-green-700 hover:text-green-900 underline">
                Register another email
              </button>
            </div> : <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative">
                <input type="email" placeholder="Enter your email address" value={email} onChange={e => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }} disabled={status === 'loading'} className={`w-full px-6 py-4 text-lg bg-white border-2 rounded-xl outline-none transition-all duration-200 shadow-sm
                    ${status === 'error' ? 'border-red-300 focus:border-red-500 text-red-900 placeholder:text-red-300' : 'border-gray-200 focus:border-[#9333ea] text-gray-900 placeholder:text-gray-400'}
                    disabled:bg-gray-50 disabled:cursor-not-allowed
                  `} />
                {status === 'error' && <div className="absolute -bottom-6 left-0 flex items-center text-red-500 text-sm">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errorMessage}
                  </div>}
              </div>

              <button type="submit" disabled={status === 'loading'} className="w-full bg-[#9333ea] hover:bg-[#7e22ce] text-white font-semibold text-lg py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center">
                {status === 'loading' ? <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Joining...
                  </> : 'Loop Me In!'}
              </button>
            </form>}
        </div>

        {/* Footer Text */}
        <div className="text-center space-y-1">
          <p className="text-sm text-gray-400">
            No spam, ever. Your email is safe with us.
          </p>
          <p className="text-sm text-gray-400">Unsubscribe at any time.</p>
        </div>
      </main>
    </div>;
}