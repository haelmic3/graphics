Drawing Program

by  Michael Moran


Haim Levkowitz, Ph.D.


The University of Massachusetts Lowell






This program has a button for points.
Which draws a point for every click and twitch of the mouse the browser is able to record

There is a button for single line drawings.
The algorithm is Bresenham's line algorithm which I read up on from Wikipedia.
My implementation draws a temporary line from the first click to the mouse as sets it on the second click.

The circle button while this one draws a circle the source material is the same as the line.
My implementation has the first click set the mid point with the radius as the second point.

The ellipse was difficult... It may or may not work... It's like disabled... Unless it works...

The rectangle was defined with the line function.
Could have used a faster line function but...

The poly button is a draw mode that uses the last click for the next line.
It has two major accompanying buttons "Close polygon" and "Done"

Close polygon is a button that only shows up in poly mode.
It's main function is to take the last point in the poly and join it with the first completing the polygon.
If it has nothing to do it may behave like done.

Done is like a cancel button. It stops the current shape from being drawn.
It isn't called cancel due to only stopping the last line in poly mode.
It's only behavior is to sync the canvas and clear any click state.

There's a save button that opens a window with the image for saving.

There is color picker with RGB sliders

Setting the Width and Height fields to the desired size is better to do from the beginning but maintains image or crops it.
The button is used to set changes.
It has the behavior that it will clear the state without the click history so ghosting is possible.

Right clicking the canvas allows saving the image as well.

Coordinates are the position of the cursor relative to the canvas.
