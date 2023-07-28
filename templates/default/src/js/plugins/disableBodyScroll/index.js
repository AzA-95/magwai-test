/**
 * Prevent body scroll and overscroll.
 * Tested on mac, iOS chrome / Safari, Android Chrome.
 *
 * Based on: https://benfrain.com/preventing-body-scroll-for-modals-in-ios/
 *           https://stackoverflow.com/a/41601290
 *
 * Use in combination with:
 * html, body {overflow: hidden;}
 *
 * and: -webkit-overflow-scrolling: touch; for the element that should scroll.
 *
 * disableBodyScroll(true, ['.i-can-scroll', '.i-can-scroll2']);
 */

var disableBodyScroll = (function () {

    /**
     * Private variables
     */
    var _selectors = [],
        _elements = [],
        _clientY = [];

    /**
     * Polyfills for Element.matches and Element.closest
     */
    if (!Element.prototype.matches)
        Element.prototype.matches = Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;

    if (!Element.prototype.closest)
        Element.prototype.closest = function (s) {
            var ancestor = this;
            if (!document.documentElement.contains(el)) return null;
            do {
                if (ancestor.matches(s)) return ancestor;
                ancestor = ancestor.parentElement;
            } while (ancestor !== null);
            return el;
		};
	
	/**
     * 
     * @param  array array
     * @return void
     */
	var forEach = function (array, callback) {
		if (Array.isArray(array)) array.forEach(callback);
	};

    /**
     * Prevent default unless within _selector
     * 
     * @param  event object event
     * @return void
     */
    var preventBodyScroll = function (event) {
		if (_elements.length) {
			var hasClosestSelector = false;

			forEach(_selectors, function (selector) {
				if (event.target.closest(selector) !== null) {
					hasClosestSelector = true;
					return;
				}
			});

			if (hasClosestSelector === false) event.preventDefault();
		} else {
			event.preventDefault();
		}
    };

    /**
     * Cache the clientY co-ordinates for
     * comparison
     * 
     * @param  event object event
     * @return void
     */
    var captureClientY = function (event, index) {
        // only respond to a single touch
        if (event.targetTouches.length === 1) {
            _clientY[index] = event.targetTouches[0].clientY;
        }
    };

    /**
     * Detect whether the element is at the top
     * or the bottom of their scroll and prevent
     * the user from scrolling beyond
     * 
     * @param  event object event
     * @return void
     */
    var preventOverscroll = function (event, index) {
		// only respond to a single touch
	    if (event.targetTouches.length !== 1) {
	    	return;
		}

		var element = _elements[index];
		var clientY = event.targetTouches[0].clientY - _clientY[index];

	    // The element at the top of its scroll,
	    // and the user scrolls down
	    if (element.scrollTop === 0 && clientY > 0) {
	        event.preventDefault();
	    }

	    // The element at the bottom of its scroll,
	    // and the user scrolls up
		// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
		if ((element.scrollHeight - element.scrollTop <= element.clientHeight) && clientY < 0) {
	        event.preventDefault();
	    }

    };

    /**
     * Disable body scroll. Scrolling with the selector is
     * allowed if a selector is porvided.
     * 
     * @param  boolean allow
     * @param  string selector Selector to element to change scroll permission
     * @return void
     */
    return function (allow, selectors) {
		if (selectors !== undefined) {
			forEach(selectors, function (selector, index){
				_selectors.push(selector);
				_elements.push(document.querySelector(selector));

				var element = _elements[index];

				if (allow === true) {
					element.addEventListener('touchstart', function (event) {
						captureClientY(event, index);
					}, { passive: false });
					
					element.addEventListener('touchmove', function (event) {
						preventOverscroll(event, index);
					}, { passive: false });
				} else {
					element.removeEventListener('touchstart', function (event) {
						captureClientY(event, index);
					}, { passive: false });

					element.removeEventListener('touchmove', function (event) {
						preventOverscroll(event, index);
					}, { passive: false });
				}
			});
		}
		
		if (allow === true) {
			document.body.addEventListener("touchmove", preventBodyScroll,  { passive: false });
		} else {
            document.body.removeEventListener("touchmove", preventBodyScroll,  { passive: false });
		}
	};
	
}());

window.disableBodyScroll = disableBodyScroll;