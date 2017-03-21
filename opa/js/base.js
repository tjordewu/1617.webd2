/* ==========================================================================
   Base JavaScript for OPA
   --------------------------------------------------------------------------
   Version:         1.0
   Developed by:    Philippe De Pauw - Waterschoot (drdynscript)
   Last updated:    25-02-2016
   Company:         Artevelde University College Ghent
   ========================================================================== 
   1. Set Active Navigation Item by clicking on a navigation link
   2. Listen to scroll event
   3. Set Active Navigation Item by checking the offset of the major elements
   ========================================================================== 
 */
   
(function() {
   'use strict';
   
   var spaPageElements = document.querySelectorAll('.spa__page');   
   var spaAnchorElements = document.querySelectorAll('.nav__item-link');
   
   // Click Event on all the links in the navigation
   if (spaAnchorElements != null && typeof spaAnchorElements != 'undefined') {
       var spaAnchorElement = null;
       for (var i = 0; i < spaAnchorElements.length; i++) {
           spaAnchorElement = spaAnchorElements[i];
           spaAnchorElement.addEventListener('click', function (ev) {
               ev.preventDefault();
               
               var href = this.getAttribute('href');
               setActiveNavigationItem(href);
               
               var top = getOffsetRect(document.querySelector('.spa__page[id=' + href.substring(1)  + ']')).top;
               
               //TweenLite.to(window, 0.368, {scrollTo:{y:top, x:0}, ease:Power2.easeOut});
               
               location.hash = href;
               
               return false;
           });
       }
   }
   
   // Scroll Event
   window.addEventListener('scroll', function (ev) {
       if (spaPageElements != null && typeof spaPageElements != 'undefined') {
            var doc = document.documentElement;              
            var left = (this.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
            var top = (this.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
            var spaPageElement = null, spaPageRect = null, spaPageTop = null, spaPageLeft = null, spaPageId = null, spaHeight = null;
            
            for (var i = 0; i < spaPageElements.length; i++) {
                spaPageElement = spaPageElements[i];
                spaPageRect = spaPageElement.getBoundingClientRect();
                spaPageLeft = spaPageRect.left;
                spaPageTop = spaPageRect.top;
                spaHeight = spaPageElement.clientHeight;
                if(spaPageTop <= 0 && spaPageTop > (-1*spaHeight)) {
                    spaPageId = spaPageElement.id;
                    setActiveNavigationItem('#' + spaPageId);
                }
            }
        }
   }); 
   
   // Set Active Menu Item
   function setActiveNavigationItem(href) {
        var spaAnchorElement = document.querySelector('.nav .nav__item-link[href="' + href + '"]');
        if (spaAnchorElement != null && typeof spaAnchorElement != 'undefined') {
            var spaActiveAnchorElement = spaAnchorElement.parentElement.parentElement.querySelector('.nav__item-link.active');
            if (spaActiveAnchorElement != null && typeof spaActiveAnchorElement != 'undefined') {
                spaActiveAnchorElement.classList.remove('active');
                spaActiveAnchorElement.parentElement.classList.remove('active');
            }
            spaAnchorElement.classList.add('active');
            spaAnchorElement.parentElement.classList.add('active');
        }
   }
   
   // Get Offset Element
   function getOffsetRect(elem) {
        // (1)
        var box = elem.getBoundingClientRect()
        
        var body = document.body
        var docElem = document.documentElement
        
        // (2)
        var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
        var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft
        
        // (3)
        var clientTop = docElem.clientTop || body.clientTop || 0
        var clientLeft = docElem.clientLeft || body.clientLeft || 0
        
        // (4)
        var top  = box.top +  scrollTop - clientTop
        var left = box.left + scrollLeft - clientLeft
        
        return { top: Math.round(top), left: Math.round(left) }
    }
   
})();