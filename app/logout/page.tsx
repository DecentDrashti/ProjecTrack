import { redirect } from 'next/navigation';

export default function logout() {
  redirect('/login');
}