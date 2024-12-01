import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  const config = useRuntimeConfig();
  const { data } = await client
    .from('Blogs')
    .select('*')
    .eq('author_username', user?.user_metadata?.display_name)
    .order('updated_at', { ascending: false });

  console.log('posts User', JSON.stringify(user, null, 2));
  console.log('posts Username', user?.user_metadata?.display_name);

  return {
    api: 'Hello, World',
    blogs: data ?? 'No blogs found',
  };
});
