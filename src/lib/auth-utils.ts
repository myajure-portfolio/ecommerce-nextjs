import { auth } from '@/auth';

export async function requireAdmin() {
  const session = await auth();
  
  if (!session?.user) {
    return { authorized: false, error: 'Unauthorized' };
  }
  
  if (session.user.role !== 'admin') {
    return { authorized: false, error: 'Forbidden: Admin access required' };
  }
  
  return { authorized: true, userId: session.user.id };
}