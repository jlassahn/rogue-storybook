
# Interactive UI Test Procedures. #

## 1. Main Menu ##

1.1. monitor the console there should be no errors or warnings throughout
   the test.

1.2. Set browser network throttling to a slow setting.  Do a clean load of the
   test page.  Watch the splash screen for display artifacts.  Note that
   the initial menu view appears smoothly.

1.3. The banner logo should appear on the menu screen.

1.4. The menu screen should have seven text choices, "Menu Choice #1" ...
   "Menu Choice #7".  Each should be legible, reasonably sized and spaced
   and in an Arial-like sans-serif font.  The Text should not be separated
   from the main page by any box or shadow.

1.5. Resize the window, all UI elements and all text should scale proportionally.

1.6. Clicking either the image or the text for the menu options should produce
   a message on the console with the correct menu IDs (101 ... 107).

1.7. The menu screen should have description text that says:
	This is the main
	menu text.  It gets
	updated by the game
	based on menu
	selections.

1.8. The menu should have a main button that says "Play".  Clicking it should
   open the main game screen.

## 2. Main Game Screen ##

