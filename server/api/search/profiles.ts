import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server';
import type { Database } from '../../../types/database.types.ts';

export default defineEventHandler(async (event) => {
  //const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient<Database>(event);
  const { query } = getQuery(event);

  //console.log("USER: ", user.value);

  const sanitizedQuery = String(query)
    .replace(/ /g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '');
  console.log(JSON.stringify(query, null, 2), sanitizedQuery);
  const { data: userData } = await client
    .from('Profiles')
    .select('*')
    .eq('username', `${query}`)
    .limit(1);

  const { data: posts } = await client
    .from('Blogs')
    .select('*')
    .eq('author_username', userData[0]?.username)
    .order('updated_at', { ascending: false });

  console.log('profile user: ', userData[0]);
  console.log('profile user id: ', userData[0]?.user_id);
  //console.log('user', JSON.stringify(userData, null, 2), JSON.stringify(posts, null, 2));

  return {
    api: 'Hello, Profiles!',
    found: !!userData?.length,
    profile: {
      id: userData[0]?.id,
      created_at: userData[0]?.created_at,
      updated_at: userData[0]?.updated_at,
      username: userData[0]?.username,
      description: userData[0]?.description,
      avatar: userData[0]?.avatar,
      user_id: userData[0]?.user_id,
    },
    posts: posts,
  };
});
