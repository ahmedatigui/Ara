import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);
  const { data: blogs } = await client.from('Blogs').select('*');

  const titleReplacedSpaces = String(body.title)
    .toLowerCase()
    .replace(/ /g, '-');
  const santizedTitle = titleReplacedSpaces.replace(/[^a-zA-Z0-9\-_.,\-]/g, '');
  const postId = `${santizedTitle}-${blogs?.length ?? body?.content?.time}`;

  console.log('===============================');
  console.log('publish: ', user);
  console.log(JSON.stringify(body, null, 2), blogs?.length, postId);

  const config = useRuntimeConfig();
  const data = await client.from('Blogs').insert({
    title: `${body.title}`,
    content: JSON.stringify(body.content),
    post_id: postId,
    author_username: `${user?.user_metadata?.display_name}`,
  });

  console.log(data);

  return {
    data: data ?? 'No blogs found',
    refresh: 'yes',
  };
});
