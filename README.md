# Harlem Shake Bookmarklet

A modern bookmarklet that makes elements on any ordinary website dance and shake to the Harlem Shake track.

## Install

1. Create a bookmark in your browser and give it a name such as `Harlem Shake`.
2. Paste the contents of `dotheharlemshake.js` into the bookmark URL field.
3. Open a normal HTTP or HTTPS website, then click the bookmark.

The script is self-contained in the bookmark: it loads the local project files through jsDelivr and starts the animation after the audio reaches the drop.

Click the bookmark again while it is running to stop and clean it up.

Some sites, especially sites with strict Content Security Policy headers, browser extensions, or pages in Chrome Web Store viewer mode, prevent bookmarklets or external assets from loading. The bookmarklet also cannot access browser-controlled pages such as `chrome://` or restricted PDFs.