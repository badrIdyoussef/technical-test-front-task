'use client';
/**
 * TODO:
 * - Valider email/password (Zod)
 * - Créer un token façade, le stocker (sessionStorage)
 * - Rediriger vers /products
 */
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { setToken } from '@/lib/auth';
import { z } from 'zod'; // Import Zod


const loginSchema = z.object({
  email: z.string().email("L'adresse email n'est pas valide."),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères."),
}); 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string|undefined>(undefined);
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: valider + setToken(email) + router.push('/products')
    // setError('TODO: implémenter la connexion façade');

    try {

      loginSchema.parse({ email, password });

      setToken(email);

      router.push('/products');

    } catch (error) {
        if (error instanceof z.ZodError) {

        const errorMessages = error.errors.map(e => e.message).join(' / ');
        setError(errorMessages);

      } else {
        setError('Une erreur inconnue est survenue.');
      } 
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card">
        <h2 className="text-xl font-semibold mb-3">Connexion</h2>
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="label">Email</label>
            <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div>
            <label className="label">Mot de passe</label>
            <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button className="btn btn-primary" type="submit">Se connecter</button>
        </form>
      </div>
      <div className="card text-sm text-gray-600 dark:text-gray-300">
        Auth façade (pas d’API). Ajoutez une redirection automatique si pas de token pour /products, /orders, /metrics.
      </div>
    </div>
  );
}
