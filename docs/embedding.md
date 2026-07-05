
# Embedding the game in an HTML page #

There are some examples of web pages containing the game in the `examples`
directory.

The game requires the enclosing page to do the following things:
- Load the stylesheet from `src/rogue_style.cs`.
- Load the script from `src/main.js` as a module.
- Provide a `div` element with an ID of `rogue_top` that will contain the game.
- Put a image inside that `div` with an ID of `rogue_splash`.

The game is designed for an aspect ratio of 3/2 and the graphics is drawn
to match a resolution of 1080x720 pixels.  It should scale well to other sizes
and the examples show some ways to adapt to the browser window size while
keeping the correct aspect ratio.

A splashscreen image is provided in `data/splash.png` which you can use or
replace with whatever you prefer.  There is also a favicon in `data/icon.png`
for pages that wish to use it.

The code in `main.js` will take over the `rogue_top` element, and replace
the `rogue_splash` image with game content elements.  The game needs access
to all the files in the `src` and `data` directories from the repository.

