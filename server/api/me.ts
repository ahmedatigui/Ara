import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server';
import type { Database } from '../../../types/database.types.ts';

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient<Database>(event);

  console.log('me user: ', user);

  const { data: userData } = await client
    .from('Profiles')
    .select('*')
    .eq('username', `${user.username}`);
  console.log('user', JSON.stringify(userData, null, 2));

  return {
    api: 'Hello, Profiles!',
    found: !!userData?.length,
    profile: {
      username: userData[0]?.username,
      avatar: userData[0]?.avatar,
    },
  };
});
