// my diary service worker
const CACHE='diary-v1';

self.addEventListener('install', e=>{ self.skipWaiting(); });
self.addEventListener('activate', e=>{ e.waitUntil(self.clients.claim()); });

self.addEventListener('fetch', e=>{
  e.respondWith(
    fetch(e.request).then(res=>{
      const copy=res.clone();
      caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});
      return res;
    }).catch(()=> caches.match(e.request))
  );
});

self.addEventListener('notificationclick', e=>{
  e.notification.close();
  e.waitUntil(clients.matchAll({type:'window'}).then(list=>{
    for(const c of list){ if('focus' in c) return c.focus(); }
    if(clients.openWindow) return clients.openWindow('.');
  }));
});
