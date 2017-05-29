import { isElementInViewport, findParentWithClass } from '~/utils/dom'

var tooltipNode;
var $highlightedPost;
var modifiedQuotelinks = [];

const { headerHeight } = window.appSettings;

const highlightClass = 'highlight';
const animateClass = ' ' + 'animate';
const tooltipClass = 'ThreadPost tip';

// Space between the tooltip and the quote link
const tooltipMargin = 5

// When a person quotes multiple posts, what text should be used to
// distinguish the post you're on from the other posts
// e.g. hover over a quote, a tooltip pops up with multple quotes. Which one is
// replying to the post you're on?
const quoteDistinguisher = " (This)";

// Distance from the right side of the screen. When to render the tooltip on
// the left instead of the right
const rightThreshold = 200;

export const createTooltipCreator = ($thread) => {
    return function (event) {

        const target = event.target,
              href = target.getAttribute('href'),
              $post = $thread.find(href),
              linkPos = target.getBoundingClientRect()  // abs position of link

        highlightQuotedIDIfMultiple($post, target);

        if (isElementInViewport($post[0])) {
            $post.addClass(highlightClass)
            $highlightedPost = $post
            return
        }

        console.groupCollapsed('%c Tooltip', 'color:gold');

        let left, top, el = document.createElement('div')

        el.innerHTML = $post.html()
        el.className = tooltipClass

        document.body.appendChild(el)

        // Set distance from left == to the hovered link
        left = linkPos.left

        // Set top to render above the link
        top = linkPos.top - el.offsetHeight - tooltipMargin

        // Check if would render out of page vertically
        if (top < headerHeight) {
            // top of element overflowed
            console.log("top overflowed")

            // render below
            top = linkPos.bottom + tooltipMargin

            // check if bottom will overflow
            if (top + el.offsetHeight > window.innerHeight) {
                // center element around link
                console.warn("bottom overflowed")

                top = linkPos.top - (el.offsetHeight / 2) - target.offsetHeight / 2
                left = linkPos.right + tooltipMargin

                if (top < headerHeight || top + el.offsetHeight > window.innerHeight) {
                    // element overflows; render at top of window
                    console.warn("Can't center. Placed at top.")
                    top = headerHeight+2 // 2 == header margin
                }
            }
        }

        // Check if right side overflows
        if (left + el.offsetWidth > window.innerWidth - rightThreshold) {
            left -= el.offsetWidth/2 - 26;
        }

        console.log(`top: ${top}, left: ${left}, el.offsetHeight: ${el.offsetHeight} linkPos.top: ${linkPos.top}`);
        console.groupEnd()

        el.style.top  = top + 'px'
        el.style.left = left + 'px'

        el.className += animateClass

        tooltipNode = el
    }
}

export const destroyTooltip = () => {
    if (tooltipNode) {
        document.body.removeChild(tooltipNode);
        tooltipNode = null;
    } else if ($highlightedPost) {
        $highlightedPost.removeClass(highlightClass);
        $highlightedPost = null;
    }

    if (modifiedQuotelinks.length) {
        for (let i = 0; i < modifiedQuotelinks.length; i++) {
            modifiedQuotelinks[i].text =
                modifiedQuotelinks[i].text.replace(quoteDistinguisher, "");
        }

        modifiedQuotelinks = []
    }
}


function highlightQuotedIDIfMultiple($post, target) {
    const id = findParentWithClass(target, 'ThreadPost').id.replace('p', '');
    const $quotes = $post.find('blockquote .quotelink');

    if ($quotes.length <= 1) {
        console.info("Tooltip contained single quote");
        return
    }


    $quotes.each( function( ) {
        if (this.text.includes(id)) {
            this.text += quoteDistinguisher;
            modifiedQuotelinks.push(this);
        } else {
            console.info(`${id} not in ${this.text}`)
        }
    });
}

