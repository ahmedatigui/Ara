import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event)

  const config = useRuntimeConfig();
  const { data } = await client.from('Blogs').select('*').eq("author_id", user.id).order('updated_at', { ascending: false });

  //console.log("User", JSON.stringify(user, null, 2))
  //console.log("User id", JSON.stringify(user.id))

  return {
    api: 'Hello, World',
    blogs: data ?? 'No blogs found',
  }
});
