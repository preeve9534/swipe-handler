class SwipeHandler {

	constructor(options={}) { 
        if ((options) && (options.debug)) console.log("Swipe(%s)...", JSON.stringify(options));

        if ((options.container) && (typeof options.container == 'string')) options.container = document.querySelector(options.container);
        if ((options.callback) && (typeof options.callback != 'function')) throw "Swipe: callback is not a function (options.callback)";
        if ((options.leftbutton) && (typeof options.leftbutton == 'string')) options.leftbutton = document.getElementById(options.leftbutton);
        if ((options.rightbutton) && (typeof options.rightbutton == 'string')) options.rightbutton = document.getElementById(options.rightbutton);
        if (!options.sensitivity) options.sensitivity = 200;
        
        this.options = options;
        this.panels = [];
        this.touch = { startX: 0, startY: 0, endX: 0, endY: 0 };

        if (this.options.container) {
            var children = this.options.container.childNodes();
            [...children].forEach(child => this.addPanel(child));
        }
    }

    addPanel(panel, zone) {
        if (this.options.debug) console.log("Swipe.addPanel(%s,%s)...", panel, zone);

        if (panel) {
            this.panels.push(panel);
            this.panels.forEach(panel => panel.classList.add('hidden'));
            this.panels[0].classList.remove('hidden');

            if (zone) {
                zone.addEventListener('touchstart', function(e) { this.touchStart(e); }.bind(this), false);
                zone.addEventListener('touchend', function(e) { this.touchEnd(e); }.bind(this), false);
            }
        }
    }

    touchStart(e) {
        if (this.options.debug) console.log("Swipe.touchStart(%s)...", e);
        alert("start");
        this.touch.startX = e.changedTouches[0].screenX;
        this.touch.startY = e.changedTouches[0].screenY;
    }

    touchEnd(e) {
        if (this.options.debug) console.log("Swipe.touchEnd(%s)...", e);
        alert("end");
        this.touch.endX = e.changedTouches[0].screenX;
        this.touch.endY = e.changedTouches[0].screenY;
        this.handleGesture();
    }

    handleGesture() {
        if (this.options.debug) console.log("Swipe.handleGesture()...");
        alert("handle");

        if ((this.touch.endX < this.touch.startX) && (this.touch.startX - this.touch.endX) > this.options.sensitivity) this.swipeLeft();
        if ((this.touch.endX > this.touch.startX) && (this.touch.endX - this.touch.startX) > this.options.sensitivity) this.swipeRight();
    }

    swipeLeft() {
        if (this.options.debug) console.log("Swipe.swipeLeft()...");
        alert("left");
    }

    swipeRight() {
        if (this.options.debug) console.log("Swipe.swipeRight()...");
        alert("right");

        if ((!this.options.callback) || (this.options.callback(this.touch))) {
            var target = -1;
            for (var i = 0; i < this.panels.length; i++) {
                if (!this.panels[i].classList.contains("hidden")) { target = i; this.panels[i].classList.add("hidden"); }
            }; 
            this.panels[(((target + 1) < this.panels.length)?(target + 1):0)].classList.remove("hidden");
        }
    }

}
