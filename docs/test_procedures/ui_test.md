
# Interactive UI Test Procedures. #

1. Check for and resolve FIXME comments in src/ui.js (FIXME automate this)

2. Set browser network throttling to a slow setting.  Do a clean load of the
   test page.  Watch the splash screen for display artifacts.  Note that
   the initial menu view appears smoothly.

3. The banner logo should appear on the menu screen.

4. The menu screen should have seven text choices, "Menu Choice #1" ...
   "Menu Choice #7".  Each should be legible, reasonably sized and spaced
   and in an Arial-like sans-serif font.  The Text should not be separated
   from the main page by any box or shadow.

5. Resize the window, all UI elements and all text should scale proportionally.

6. monitor the console there should be no errors or warnings throughout
   the test.

