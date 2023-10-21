const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {

    // stores triggered events
    window.deferredPrompt = event;

    // removes hidden class from button
    butInstall.classList.toggle('hidden', false);
  });

butInstall.addEventListener('click', async () => {
  
    const promptEvent = window.deferredPrompt;
  
    if (!promptEvent) {
     return;
    }
  
    // Show prompt
    promptEvent.prompt();
    
    // resets deferred prompt variable (can only be used once)
    window.deferredPrompt = null;
    
    butInstall.classList.toggle('hidden', true);
  });

window.addEventListener('appinstalled', (event) => {
    // clears prompt
    window.deferredPrompt = null;
  }); 