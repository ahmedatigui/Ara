import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = await serverSupabaseClient(event);
  const user = serverSupabaseUser();
  const { data: usernameExists } = await client
    .from('Profiles')
    .select('*')
    .eq('username', body.username);

  const usernameReplacedSpaces = body.username.toLowerCase().replace(/ /g, '-');
  const username =
    usernameExists.length > 0
      ? `${usernameReplacedSpaces}-${usernameExists.length + 1}`
      : usernameReplacedSpaces;

  console.log('===============================');

  const config = useRuntimeConfig();
  const data = await client.from('Profiles').insert({
    username: `${username}`,
    description: `${body.desc}`,
    email: `${body.email}`,
  });

  console.log(data);

  return {
    data: data ?? 'No profiles found',
    refresh: 'yes',
  };
});
