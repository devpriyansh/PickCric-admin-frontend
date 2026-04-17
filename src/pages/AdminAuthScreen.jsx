// AdminAuthScreen.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ShieldCheck, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from "../../public/logo2.png"; // Adjust path as needed

const AdminAuthScreen = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const showMessage = (text, type = 'error') => {
      setMessage({ text, type });
      setTimeout(() => setMessage(null), 5000);
  };

  const handleAdminLogin = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      
      try {
          const response = await fetch('http://localhost:5001/api/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password })
          });
          const data = await response.json();

          if (response.ok && data.success) {
              // Save admin token separately from user token!
              localStorage.setItem('pickcric_admin_token', data.token);
              localStorage.setItem('pickcric_admin_data', JSON.stringify(data.admin));
              navigate('/dashboard');
          } else {
              showMessage(data.message || 'Access Denied. Unauthorized.');
          }
      } catch (error) {
          showMessage('Network error. Cannot reach secure server.');
      } finally {
          setIsLoading(false);
      }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0B1120] px-4 relative overflow-hidden">
      
      {/* Secure Portal Background Styling */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]"></div>

      <div className="relative z-10 w-full max-w-md">
         
         {/* Top Icon / Branding */}
         <div className="flex flex-col items-center mb-8">
             <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                <ShieldCheck className="w-8 h-8 text-blue-400" />
             </div>
             <img src={Logo} alt="PickCric Logo" className="h-10 mb-2 opacity-80" />
             <h1 className="font-display font-black text-2xl tracking-widest uppercase text-slate-200">Admin Portal</h1>
             <p className="text-slate-500 text-xs font-bold tracking-widest uppercase mt-2">Restricted Access Only</p>
         </div>

         <AnimatePresence>
             {message && (
                 <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-xl flex items-center gap-3 border bg-red-500/10 border-red-500/30 text-red-400 backdrop-blur-md"
                 >
                     <AlertCircle className="w-5 h-5 flex-shrink-0" />
                     <p className="text-sm font-medium">{message.text}</p>
                 </motion.div>
             )}
         </AnimatePresence>

         {/* Admin Glass Form */}
         <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-700 p-8 shadow-2xl">
            <form onSubmit={handleAdminLogin} className="flex flex-col gap-6">
                
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest pl-1">Admin Email</label>
                    <div className="relative flex items-center group">
                        <Mail className="absolute left-4 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@pickcric.com"
                            className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-slate-200 placeholder-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest pl-1">Authorization Key</label>
                    <div className="relative flex items-center group">
                        <Lock className="absolute left-4 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-slate-200 placeholder-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                            required
                        />
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={isLoading} 
                    className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm py-4 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all uppercase tracking-widest flex justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Verifying...' : 'Authorize Access'}
                </button>
            </form>
         </div>

      </div>
    </div>
  );
};

export default AdminAuthScreen;