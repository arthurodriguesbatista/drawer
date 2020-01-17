export default class Coordinate {
  constructor(store) {
    this.store = store;
    this.$div = document.getElementById("xycoordinates");
    this.$canvas = document.getElementById("canvas");
  }

  updateMessage(message = "") {
    this.$div.innerHTML = message;
  }
  destroyMessage() {
    this.$div.removeChild(this.$div.childNodes[0]);
  }
  getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
  message(evt) {
    let mousePos = this.getMousePos(this.$canvas, evt);
    let message = `Coordinates: (${mousePos.x},${mousePos.y})`;
    this.updateMessage(message);
  }

  updateCoordinates(evt) {
    let mousePos = this.getMousePos(this.$canvas, evt);
    this.store.dispatch(this.addCoordinates(mousePos.x, mousePos.y));
  }

  addEvents() {
    this.$canvas.addEventListener("mousemove", this.message.bind(this), false);
    this.$canvas.addEventListener(
      "mouseleave",
      this.destroyMessage.bind(this),
      false
    );
  }
}
