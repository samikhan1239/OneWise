'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

export default function SessionPage() {
  const params = useParams();
  const router = useRouter();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get(`/api/sessions/${params.id}`);
        setSession(res.data.session);
      } catch (error) {
        router.push('/dashboard');
      }
    };
    fetchSession();
  }, [params.id, router]);

  if (!session) return <div>Loading...</div>;

  return (
    <div>
      <h1>Session {params.id}</h1>
      <p>Status: {session.status}</p>
      {/* Placeholder for code editor, chat, video */}
    </div>
  );
}