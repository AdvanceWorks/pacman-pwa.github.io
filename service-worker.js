const cacheName = 'cache-v2';

// A list of local resources we always want to be cached.
const cacheFiles = [
  'index.html',
  '', // Alias for index.html
  'css/bootstrap.min.css',
  'css/pacman-home.css',
  'css/pacman.css',
  'css/Quadrit.ttf',
  'img/advanceworks.png',
  'img/advanceworks_affraid.png',
  'img/advanceworks_eat.png',
  'img/advanceworks_logo.png',
  'img/dotnetcore.png',
  'img/dotnetcore_affraid.png',
  'img/dotnetcore_eat.png',
  'img/favicon.ico',
  'img/github.png',
  'img/java.png',
  'img/java_affraid.png',
  'img/java_eat.png',
  'img/move-down-big.png',
  'img/move-left-big.png',
  'img/move-right-big.png',
  'img/move-up-big.png',
  'img/outsystems.png',
  'img/outsystems_affraid.png',
  'img/outsystems_eat.png',
  'img/pause.png',
  'img/sound-off.png',
  'img/sound-on.png',
  'img/logo/ios/180.png',
  'img/logo/ios/32.png',
  'img/logo/ios/16.png',
  'js/jquery.min.js',
  'js/loudest.js',
  'js/setup-service-worker.js',
  'js/board.js',
  'js/bubbles.js',
  'js/fruits.js',
  'js/game.js',
  'js/ghosts.js',
  'js/home.js',
  'js/pacman.js',
  'js/paths.js',
  'js/sound.js',
  'js/tools.js',
  'sound/die.mp3',
  'sound/eat-fruit.mp3',
  'sound/eat-ghost.mp3',
  'sound/eat-pill.mp3',
  'sound/eating.mp3',
  'sound/extra-life.mp3',
  'sound/ghost-eaten.mp3',
  'sound/ready.mp3',
  'sound/siren.mp3',
  'sound/waza.mp3'
];


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(cacheFiles))
  );
});


self.addEventListener('fetch', event => {
  if (
    event.request.url.startsWith('chrome-extension') ||
    event.request.url.includes('extension') ||
    !(event.request.url.indexOf('http') === 0)
) return;
  event.respondWith(
    caches.open(cacheName).then(cache =>
       // Go to the cache first
      cache.match(event.request).then(response => response || // Return a cached response if we have one
        fetch(event.request).then(response => { // Otherwise, hit the network and add it to che cache
            cache.put(event.request, response.clone());
            return response;
        })
      )
    )
  );
});

self.addEventListener('fetch', (event) => {
  // Check if this is a request for an image
  if (event.request.destination === 'image') {
    event.respondWith(caches.open(cacheName).then((cache) => {
      // Go to the cache first
      return cache.match(event.request.url).then((cachedResponse) => {
        // Return a cached response if we have one
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise, hit the network
        return fetch(event.request).then((fetchedResponse) => {
          // Add the network response to the cache for later visits
          cache.put(event.request, fetchedResponse.clone());

          // Return the network response
          return fetchedResponse;
        });
      });
    }));
  } else {
    return;
  }
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
      self.skipWaiting();
  }
});