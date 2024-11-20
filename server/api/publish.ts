import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = await serverSupabaseClient(event);
  // const user = serverSupabaseUser()
  const { data: blogs } = await client.from('Blogs').select('*');
  const titleReplacedSpaces = body.title.toLowerCase().replace(/ /g, '-');
  const santizedTitle = titleReplacedSpaces.replace(/[^a-zA-Z0-9\-_.,\-]/g, '');
  const postId = `${santizedTitle}-${blogs?.length ?? body.content.time}`;

  console.log('===============================');
  // console.log(user);
  console.log(JSON.stringify(body, null, 2), blogs?.length, postId);

  const config = useRuntimeConfig();
  const data = await client
    .from('Blogs')
    .insert({
      title: `${body.title}`,
      content: JSON.stringify(body.content),
      post_id: postId,
    });

  console.log(data);

  return {
    data: data ?? 'No blogs found',
    refresh: 'yes',
  };
});
