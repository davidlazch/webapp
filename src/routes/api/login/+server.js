import { json } from '@sveltejs/kit';
import { login } from '$lib/api/auth';

export async function POST({ request }) {
  const { username, password } = await request.json();

  try {
    const user = await login(username, password);
    return json(user);
  } catch (err) {
    return json({ message: err.message }, { status: 401 });
  }
}
