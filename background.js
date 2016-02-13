/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    id: 'main',
    bounds: { width: 300, height: 450 },
    outerBounds : { minWidth : 325, minHeight:450, maxWidth: 325, maxHeight: 450},
    resizable : false
  });

});