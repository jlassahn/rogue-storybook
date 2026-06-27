
# Graphics #

Most graphics in the game are built from tiles.  A tile is 48 pixels wide
and 64 pixels high.  On the main map, tiles are drawn on a 48x48 pixel grid
which gives some vertical overlap between graphics.  This allows a bit of a
3D effect, where some images can extend up to 16 pixels above their square
to look like they're in front of other tiles.

Tile image data comes from sprite sheets, which are PNG image files.  Each
sheet has a 8x8 images.  A tile index is an integer of the form

`X + 8*Y + 64*SheetNumber`

There's no particular limit to the number of sheets, we'll just keep adding
PNG files as needed.  Images will be somewhat organized by theme for ease
of doing graphic design, but the game engine doesn't particularly care which
images are at which locations, it just works with index numbers.

Some useful calculated sizes:
- Sprite Sheets are 384x512 pixels.
- The ideal resolution for the game is 1080x720

