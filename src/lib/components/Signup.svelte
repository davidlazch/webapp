<script>
    import { goto } from '$app/navigation';
    let username = '';
    let password = '';
    let errorMessage = '';
  
    function gotoLoginPage() {
      goto('/login');
    };
  
    async function handleSignup() {
      try {
        const res = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
          const data = await res.json();
          localStorage.setItem('username', data.username);
          goto('/');
        } else {
          const error = await res.json()
          errorMessage = error.message;
        }
      } catch (err) {
        errorMessage = 'An error occurred. Please try again.';
      }
    }
  </script>
  
  <h1>Signup</h1>
  <form on:submit|preventDefault={handleSignup}>
    <label>
      Username:
      <input type="text" bind:value={username} required />
    </label>
    <label>
      Password:
      <input type="password" bind:value={password} required />
    </label>
    <button type="submit">Signup</button>
  </form>
    <p>If you already have an account, please 
      <button on:click={gotoLoginPage}>Login</button>
    </p>
  <p>{errorMessage}</p>
  