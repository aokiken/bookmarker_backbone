var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/bookmarker_backbone',
  '/bookmarker_backbone/stylesheets/style.css',
  '/bookmarker_backbone/javascripts/app.js',
  '/bookmarker_backbone/javascripts/app.js',
];

self.addEventListener('install', function(event) {
  // インストール処理
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // キャッシュがあったのでレスポンスを返す
        if (response) {
          return response;
        }

        // 重要：リクエストを clone する。リクエストは Stream なので
        // 一度しか処理できない。ここではキャッシュ用、fetch 用と2回
        // 必要なので、リクエストは clone しないといけない
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // レスポンスが正しいかをチェック
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // 重要：レスポンスを clone する。レスポンスは Stream で
            // ブラウザ用とキャッシュ用の2回必要。なので clone して
            // 2つの Stream があるようにする
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});
