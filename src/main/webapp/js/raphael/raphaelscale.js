
(function() {
    var initialized = false;

    var opts = { zoom: true, pan: true, drag: true }

    function init(paper) {
        var root = paper.canvas;
        var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.id = 'viewport';
        root.appendChild(g);
        paper.canvas = g;

        var state = 'none', stateTarget, stateOrigin, stateTf;
        setupHandlers(root);
        initialized = true;

        function setupHandlers(root) {
            /*root.addEventListener('mousedown', handleMouseDown);
            root.addEventListener('mousemove', handleMouseMove);
            root.addEventListener('mouseup', handleMouseUp);*/
            //root.onmouseout = handleMouseUp; // Decomment this to stop the pan functionality when dragging out of the SVG element
           /* if (navigator.userAgent.toLowerCase().indexOf('webkit') >= 0) {
                window.addEventListener('mousewheel', handleMouseWheel, {passive: false}); // Chrome/Safari
            }
            else {
                window.addEventListener('DOMMouseScroll', handleMouseWheel, {passive: false});
                window.addEventListener('onmousewheel', handleMouseWheel, {passive: false}) // Others
            }*/

        }

        function getEventPoint(evt) {
            var p = root.createSVGPoint();
            p.x = evt.clientX;
            p.y = evt.clientY;
            return p;
        }

        function setCTM(element, matrix) {
            var s = "matrix(" + matrix.a + "," + matrix.b + "," + matrix.c + "," + matrix.d + "," + matrix.e + "," + matrix.f + ")";

            //if(window.game.currentPlayer == window.game.session.username)
                element.setAttribute("transform", s);
        }
        function dumpMatrix(matrix) {
            var s = "[ " + matrix.a + ", " + matrix.c + ", " + matrix.e + "\n  " + matrix.b + ", " + matrix.d + ", " + matrix.f + "\n  0, 0, 1 ]";

            return s;
        }

        function setAttributes(element, attributes){
            for (i in attributes)
                element.setAttributeNS(null, i, attributes[i]);
        }


        function handleMouseWheel(evt) {
            if (!opts.zoom) return;
            if (evt.preventDefault)
                evt.preventDefault();
            evt.returnValue = false;
            var svgDoc = evt.target.ownerDocument;
            var delta;
            if (evt.wheelDelta)
                delta = evt.wheelDelta / 1000; // Chrome/Safari
            else
                delta = evt.detail / -90; // Mozilla
            var z = 1 + delta; // Zoom factor: 0.9/1.1
            var g = svgDoc.getElementById("viewport");
            var p = getEventPoint(evt);
            p = p.matrixTransform(g.getCTM().inverse());
            // Compute new scale matrix in current mouse position
            var k = root.createSVGMatrix().translate(p.x, p.y).scale(z).translate(-p.x, -p.y);
            setCTM(g, g.getCTM().multiply(k));
            if (typeof(stateTf) == "undefined")
                stateTf = g.getCTM().inverse();

            stateTf = stateTf.multiply(k.inverse());
        }

        function handleMouseMove(evt) {
            if(evt.preventDefault)
                evt.preventDefault();
            evt.returnValue = false;
            var svgDoc = evt.target.ownerDocument;
            var g = svgDoc.getElementById("viewport");
            if(state == 'pan') {
                // Pan mode
                if (!opts.pan) return;
                var p = getEventPoint(evt).matrixTransform(stateTf);
                setCTM(g, stateTf.inverse().translate(p.x - stateOrigin.x, p.y - stateOrigin.y));
            } else if(state == 'move') {
                // Move mode
                if (!opts.drag) return;
                var p = getEventPoint(evt).matrixTransform(g.getCTM().inverse());
                setCTM(stateTarget, root.createSVGMatrix().translate(p.x - stateOrigin.x, p.y - stateOrigin.y).multiply(g.getCTM().inverse()).multiply(stateTarget.getCTM()));
                stateOrigin = p;
            }
        }

        function handleMouseDown(evt) {
            if(evt.preventDefault)
                evt.preventDefault();
            evt.returnValue = false;
            var svgDoc = evt.target.ownerDocument;
            var g = svgDoc.getElementById("viewport");
            if(evt.target.tagName == "svg" || !opts.drag) {
                // Pan mode
                if (!opts.pan) return;
                state = 'pan';
                stateTf = g.getCTM().inverse();
                stateOrigin = getEventPoint(evt).matrixTransform(stateTf);
            } else {
                // Move mode
                if (!opts.drag || evt.target.draggable == false) return;
                state = 'move';
                stateTarget = evt.target;
                stateTf = g.getCTM().inverse();
                stateOrigin = getEventPoint(evt).matrixTransform(stateTf);
            }
        }

        function handleMouseUp(evt) {
            if(evt.preventDefault)
                evt.preventDefault();
            evt.returnValue = false;
            var svgDoc = evt.target.ownerDocument;
            if((state == 'pan' && opts.pan) || (state == 'move' && opts.drag)) {
                // Quit pan mode
                state = '';
            }
        }
    }
    Raphael.fn.scale = function(o) {
        if (o) {
            for (var key in o) {
                if (opts[key] !== undefined) {
                    opts[key] = o[key];
                }
            }
        }
        if (!initialized) init(this);
        return this;
    }
})();
