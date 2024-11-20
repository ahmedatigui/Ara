import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const config = useRuntimeConfig();
  const { data } = await client.from('Blogs').select('*');

  return {
    api: 'Hello, World',
    blogs: data ?? 'No blogs found',
  };
});
