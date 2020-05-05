const Publickey = 'BBZ5ve1g0N1rj4wlWs54k7KAPYetwDjqqeFTM1rkbO4n4iizTFV7s8K_sRyNhiDE2QtG9LW4f4UQfLTIffgOEt4';

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
   
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const subscription = async () => {

    //service worker!!
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: "/"
    });
    console.log('new Service Worker!!');

    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(Publickey)
    });
    

    await fetch('/subscription', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log('subscribed!!');
}

const form = document.querySelector('#myform');
const message = document.querySelector('#message');
form.addEventListener('submit', e => {
    e.preventDefault();
    fetch('/new-message', {
        method: 'POST',
        body: JSON.stringify({
            message: message.value
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    form.reset();
})


subscription();