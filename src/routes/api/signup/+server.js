import { json } from '@sveltejs/kit';
import { signup } from '$lib/api/auth';

export async function POST({ request }) {
  const { username, password } = await request.json();

  try {
    const user = await signup(username, password);
    return json(user);
  } catch (err) {
    return json({ message: err.message }, { status: 400 });
  }
}
