import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'; 
import type { Database } from '../../../types/database.types.ts';            

export default defineEventHandler(async (event) => {                         
  const client = await serverSupabaseClient<Database>(event);                
  const { query } = getQuery(event);                                         
                                                                             
  console.log(JSON.stringify(query, null, 2));                               
  const { data } = await client                                              
    .from('Blogs')                                                           
    .select('*')                                                             
    .eq('post_id', `${query}`);                                              
    .rq('username', `${}`)
  console.log('data', data);                                                 
  return {                                                                   
    api: 'Hello, World',                                                     
    found: !!data?.length,                                                   
    blogs: data,                                                             
  };                                                                         
});                                                                          
