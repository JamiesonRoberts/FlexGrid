# FlexGrid

A production ready drop in flexible box layout "framework" to make your life easier. Also included is 10up's IE flexbox polyfill [which can be found here](https://github.com/10up/flexibility) or on [cdnjs](https://cdnjs.com/libraries/flexibility).

## Versions

* CSS
* SCSS
* LESS (in development)
* Stylus (in development)

## A note about using flexible box layouts

One thing that has become very clear while digging into flexbox and its specifications, is that flexbox is not meant to be the be all and end all of layout tools for CSS. Flexbox is designed to make structuring components and small scale layouts very easy to setup and manipulate. While this repo does a reasonable job of using flexbox to create grid like layouts on a larger scale, the ultimate tool you are looking for is a combination of flexible box layouts ([more information here](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)) and css grid layouts ([more information here](https://css-tricks.com/snippets/css/complete-guide-grid/)). Each governing their own part of the layout.

However, due to browser support levels, the best we can do for a production environment is bend flexbox to serve both needs until css grid layouts are ready.

Over time I hope to maintain this and will work towards a release that uses both flexbox and css grid layout for when browser support is there.

## Flexbox native compatibility
Flexible Box Layout Module ✔ 77.48% ◒ 18.25% [W3C Candidate Recommendation] Method of positioning elements in horizontal or vertical stacks. Support includes the support for the all properties prefixed with `flex` as well as `display: flex`, `display: inline-flex`, `align-content`, `align-items`, `align-self`, `justify-content` and `order`.

IE ✘ 5.5+ ◒ 10+ᵖ² ◒ 11⁴  
Edge ✔  
Firefox ◒ 2+ᵖ¹ ◒ 22+³ ✔ 28+  
Chrome ◒ 4+ᵖ¹ ✔ 21+ᵖ ✔ 29+  
Safari ◒ 3.1+ᵖ¹ ✔ 6.1+ᵖ ✔ 9+  
Opera ✘ 9+ ✔ 12.1+ ✔ 15+ᵖ ✔ 17+  

> ¹Only supports the [old flexbox](http://www.w3.org/TR/2009/WD-css3-flexbox-20090723) specification and does not support wrapping.  
> ²Only supports the [2012 syntax](http://www.w3.org/TR/2012/WD-css3-flexbox-20120322/)   
> ³Does not support flex-wrap or flex-flow properties  
> ⁴Partial support is due to large amount of bugs present (see known issues)  

ⓘ  Most partial support refers to supporting an [older version](http://www.w3.org/TR/2009/WD-css3-flexbox-20090723/) of the specification or an [older syntax](http://www.w3.org/TR/2012/WD-css3-flexbox-20120322/).

## More information about Flexbox specification

* [W3C Flexbox Specifications](https://www.w3.org/TR/css-flexbox-1/)
* [MDN: Using CSS flexible boxes](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)
* [CSS-Tricks: A guide to flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## Attribution

* Special thanks goes to [10up](https://github.com/10up) and his Flexbox polyfill for older IE browsers. The polyfill can be found [here](https://github.com/10up/flexibility).
* Thanks also goes to [CSS-Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) for its great write up on using/understanding flexbox.
