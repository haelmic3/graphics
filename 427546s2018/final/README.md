This is my version of the final project for computer graphics

To run this please download gl-matrix.js from
https://github.com/toji/gl-matrix

More specifically [this](https://raw.githubusercontent.com/toji/gl-matrix/master/dist/gl-matrix.js) file or the [minified version](https://raw.githubusercontent.com/toji/gl-matrix/master/dist/gl-matrix-min.js).


The current state of the project is rendering simple shapes,
with vertex transforms.
In the canvas there should be a cube projection.
There are 2 draw calls for the shape. The first is the fill triangle
call colored sides.
The second is a draw line call to show the triangles.
Under the canvas there is a little bit of data used for debugging.

There is no interaction yet. The main focus of this week was to:

 - setup a 3d drawable
 - Spell gl.TRIANGLES correctly so the form is solid instead of points.
 - Begin separating components into their own files.
 - Begin merging the position and color buffers into one general object buffer
 - And other tweaks to get ready for dynamic user modeling.

Plans for the next week:

 - open shaders with XHR
 - set up dynamic buffers
 - work on UI.
