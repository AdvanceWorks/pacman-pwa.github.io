var refreshing;
navigator.serviceWorker.addEventListener('controllerchange',
    function() {
        if (refreshing) return;
        refreshing = true;
        window.location.reload();
    }
);

function invokeServiceWorkerUpdateFlow(registration) {
    $('#newversion').addClass('show');
    $('#newversion').on('click touchstart', function(e) {
        registration.waiting.postMessage('SKIP_WAITING');
    });
}

// check if the browser supports serviceWorker at all
if ('serviceWorker' in navigator && !(location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.hostname === '')) {
    // wait for the page to load
    window.addEventListener('load', async () => {
        // register the service worker from the file specified
        const registration = await navigator.serviceWorker.register('service-worker.js');

        // ensure the case when the updatefound event was missed is also handled
        // by re-invoking the prompt when there's a waiting Service Worker
        if (registration.waiting) {
            invokeServiceWorkerUpdateFlow(registration)
        }

        // detect Service Worker update available and wait for it to become installed
        registration.addEventListener('updatefound', () => {
            if (registration.installing) {
                // wait until the new Service worker is actually installed (ready to take over)
                registration.installing.addEventListener('statechange', () => {
                    if (registration.waiting) {
                        // if there's an existing controller (previous Service Worker), show the prompt
                        if (navigator.serviceWorker.controller) {
                            invokeServiceWorkerUpdateFlow(registration);
                        } else {
                            // otherwise it's the first install, nothing to do
                        }
                    }
                })
            }
        })
    });
}