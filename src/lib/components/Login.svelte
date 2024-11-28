<script>
    import { goto } from '$app/navigation';
    let username = '';
    let password = '';
    let errorMessage = '';
  
    function gotoSignupPage() {
      goto('/signup');
    };
  
    async function handleLogin() {
      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
  
        if (res.ok) {
          const data = await res.json();
          localStorage.setItem('username', data.username);
          goto('/');
        } else {
          const error = await res.json();
          errorMessage = error.message;
        }
      } catch (err) {
        errorMessage = 'An error occurred. Please try again.';
      }
    }
  </script>
  
  <h1>Login</h1>
  <form on:submit|preventDefault={handleLogin}>
    <label>
      Username:
      <input type="text" bind:value={username} required />
    </label>
    <label>
      Password:
      <input type="password" bind:value={password} required />
    </label>
    <button type="submit">Login</button>
  </form>
  {#if errorMessage == 'Account does not exist'}
    <p>{errorMessage} - Please <button on:click={gotoSignupPage}>Signup</button></p>
  {:else if errorMessage == 'Invalid username or password'}
    <p>{errorMessage}</p>
  {/if}
  