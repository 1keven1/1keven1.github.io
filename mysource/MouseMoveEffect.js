(function () {
    var colors = ["#D61C59", "#E7D84B", "#1B8798"];
    characters = ["♬", "♪"];
    elementGroup = [];
    class Element {
        constructor() {
            num = Math.floor(Math.random() * characters.length);
            this.character = characters[num];
            this.lifeSpan = 120;
            this.initialStyles = {
                position: "fixed",
                top: "0",
                display: "block",
                pointerEvents: "none",
                "z-index": "10000000",
                fontSize: "25px",
                "will-change": "transform",
                color: "#000000"
            };
            this.init = function (x, y, color) {
                this.velocity = { x: (Math.random() < .5 ? -1 : 1) * (Math.random() / 2), y: 1 };
                this.position = { x: x - 10, y: y - 20 };
                this.initialStyles.color = color;
                this.element = document.createElement("span");
                this.element.innerHTML = this.character;
                ApplyStyle(this.element, this.initialStyles);
                this.update();
                document.body.appendChild(this.element);
            };
            this.update = function () {
                this.position.x += this.velocity.x;
                this.position.y += this.velocity.y;
                this.lifeSpan--;
                this.element.style.transform = "translate(" + this.position.x + "px," + this.position.y + "px) scale(" + this.lifeSpan / 120 + ")";
            };
            this.die = function () {
                this.element.parentNode.removeChild(this.element);
            };
        }
    }
    AddListener();
    var timer = null;
    Rander();
    /*
    setInterval(
        function () {
            Rander();
        },
        1000 / 60);
    */
    function AddListener() {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("touchmove", Touch);
        document.addEventListener("touchstart", Touch);
    }
    function Rander() {
        clearTimeout(timer);
        for (var i = 0; i < elementGroup.length; i++) {
            elementGroup[i].update();
            if (elementGroup[i].lifeSpan < 0) {
                elementGroup[i].die();
                elementGroup.splice(i, 1);
            }
        }
        timer=setTimeout(Rander,10);
    }
    function onMouseMove(t) {
        num = Math.floor(Math.random() * colors.length);
        CreateElement(t.clientX, t.clientY, colors[num]);
    }
    function CreateElement(x, y, color) {
        var e = new Element;
        e.init(x, y, color);
        elementGroup.push(e);
    }
    function ApplyStyle(element, style) {
        for (var i in style) {
            //console.log(n);
            element.style[i] = style[i];
        }
    }
    function Touch(t) {
        if (t.touches.length > 0) {
            for (var i = 0; i < t.touches.length; i++) {
                num = Math.floor(Math.random() * r.length);
                s(t.touches[i].clientX, t.touches[i].clientY, r[num]);
            }
        }
    }
})();