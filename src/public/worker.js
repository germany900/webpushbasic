console.log('service worker');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log(data);
    console.log('Notifications received!!!');
})