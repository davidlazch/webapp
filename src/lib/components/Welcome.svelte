<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import batman from "$lib/images/batman.png"
  
    let username = '';
    let usernameInput = '';
    let passwordInput = '';
    let currentView = 'login';
  
    onMount(() => {
      // Check if we're in the browser and `localStorage` is available
      if (typeof window !== 'undefined' && window.localStorage) {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
          username = storedUsername;
          currentView = 'welcome';
        }
      }
    });
  
    function gotoLoginPage() {
      goto('/login');
    }
  
    function signUp() {
      if (usernameInput && passwordInput) {
        // Replace this with actual sign-up logic
        alert(`Account created for ${usernameInput}`);
      } else {
        alert('Please enter a username and password.');
      }
    }
  
    function logout() {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('username');
      }
      username = '';
      usernameInput = '';
      passwordInput = '';
      currentView = 'login';
    }
</script>
  
{#if currentView === 'login'}
    <div>
      <button on:click={gotoLoginPage}>Login</button>
    </div>
{:else if currentView === 'signup'}
    <div>
    <h1>Sign Up</h1>
    <input type="text" placeholder="Username" bind:value={usernameInput} />
    <input type="password" placeholder="Password" bind:value={passwordInput} />
    <button on:click={signUp}>Create Account</button>
    <button on:click={() => (currentView = 'login')}>Back to Login</button>
  </div>
{:else if currentView === 'welcome'}
    <div>
    <h1>Welcome, {username}!</h1>
    <button on:click={logout}>Logout</button>
  </div>
{/if}

{#if username === 'batman'}
    <div>
        <img src={batman} alt="Batman" width="400rem"/>
    </div>
{/if}
