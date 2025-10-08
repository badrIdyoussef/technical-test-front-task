'use client';
/**
 * Composant Guard — redirige vers /login si non connecté.
 * TODO: utilisez isAuthed() quand vous l'aurez implémenté.
 */
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isAuthed } from '@/lib/auth';

export default function Guard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // TODO: activer la redirection réelle une fois l'auth façade prête
    // if (!isAuthed() && pathname !== '/login') router.replace('/login');

        const checkAuth = () => {
            const authed = isAuthed();
            
            if (!authed && pathname !== '/login') {
                router.replace('/login');
                setIsAuthorized(false);
                return;
            }

            if (authed && pathname === '/login') {
                router.replace('/products'); 
                setIsAuthorized(true);
                return;
            }
            
            setIsAuthorized(authed);
        };

        checkAuth();

  }, [router, pathname]);

  if (isAuthorized === null) {
      return <div className="fixed inset-0 flex items-center justify-center">Checking authentication...</div>;
    }
  
  const shouldRenderChildren = isAuthorized || pathname === '/login';


  return <>{shouldRenderChildren ? children : null}</>;
}
