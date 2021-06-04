import { useEffect, useRef } from "react";
import variables from "../../resources/scss/base.module.scss";

const CanvasImg = ({
  src,
  alt,
  width,
  heigth,
  zone,
  setLoaded,
  isCropped,
  ratio,
  editZone,
}) => {
  const canvas = useRef();
  let ctx = null;
  let rect = {};
  let mouseX;
  let mouseY;
  let closeEnough = 1;
  let dragTL = false;
  let dragBL = false;
  let dragTR = false;
  let dragBR = false;
  let drag = false;

  // draw rectangle
  const drawRect = (info, style = {}) => {
    const { startX, startY, w, h } = info;
    const {
      borderColor = variables.themeColorPrimary,
      borderWidth = 3,
    } = style;
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.rect(startX, startY, w, h);
    ctx.clearRect(startX, startY, w, h);
    ctx.stroke();
  };

  const crop = (info) => {
    const { startX, startY, w, h } = info;
    const rWidth = width / ratio;
    const rheigth = heigth / ratio;
    var image = new Image();
    image.src = src;

    image.onload = function () {
      ctx.drawImage(
        image,
        startX * ratio,
        startY * ratio,
        w * ratio,
        h * ratio,
        0,
        0, // Place the result at 0, 0 in the canvas,
        rWidth,
        rheigth
      ); // With as width / height: 100 * 100 (scale)
    };
  };

  useEffect(() => {
    //set the canvas
    const canvasEle = canvas.current;
    const rWidth = width / ratio;
    const rheigth = heigth / ratio;
    canvasEle.width = rWidth;
    canvasEle.height = rheigth;

    // get context of the canvas
    ctx = canvasEle.getContext("2d");

    // put the opacity in the entire canvas
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.fillRect(0, 0, rWidth, rheigth);

    const x1 = rWidth * zone.x1;
    const x2 = rWidth * zone.x2;
    const y1 = rheigth * zone.y1;
    const y2 = rheigth * zone.y2;

    const rInfo = { startX: x1, startY: y1, w: x2 - x1, h: y2 - y1 };
    if (isCropped) {
      crop(rInfo);
    } else {
      drawRect(rInfo);
      editZone ? init(rInfo) : unmount();
    }
    return () => {
      unmount();
    };
  }, [isCropped, zone, editZone]);

  function init(info) {
    const { startX, startY, w, h } = info;
    canvas.current.addEventListener("mousedown", mouseDown, false);
    document.addEventListener("mouseup", mouseUp, false);
    canvas.current.addEventListener("mousemove", mouseMove, false);

    rect = {
      startX: startX,
      startY: startY,
      w: w,
      h: h,
    };

    drawHandles();
  }

  function unmount() {
    if (canvas.current) {
      canvas.current.removeEventListener("mousedown", mouseDown);
      canvas.current.removeEventListener("mousemove", mouseMove);
    }
    document.removeEventListener("mouseup", mouseUp);
  }

  function mouseDown(e) {
    let lrect = canvas.current.getBoundingClientRect();
    mouseX = Math.max(0, Math.min(canvas.current.width, e.pageX - lrect.left));
    mouseY = Math.max(0, Math.min(canvas.current.height, e.pageY - lrect.top));

    // if there is, check which corner
    //   (if any) was clicked
    //
    // 4 cases:
    // 1. top left
    if (!drag) {
      if (
        checkCloseEnough(mouseX, rect.startX) &&
        checkCloseEnough(mouseY, rect.startY)
      ) {
        console.log("TL");
        dragTL = true;
        drag = true;
      }
      // 2. top right
      else if (
        checkCloseEnough(mouseX, rect.startX + rect.w) &&
        checkCloseEnough(mouseY, rect.startY)
      ) {
        console.log("TR");
        dragTR = true;
        drag = true;
      }
      // 3. bottom left
      else if (
        checkCloseEnough(mouseX, rect.startX) &&
        checkCloseEnough(mouseY, rect.startY + rect.h)
      ) {
        console.log("BL");
        dragBL = true;
        drag = true;
      }
      // 4. bottom right
      else if (
        checkCloseEnough(mouseX, rect.startX + rect.w) &&
        checkCloseEnough(mouseY, rect.startY + rect.h)
      ) {
        console.log("BR");
        dragBR = true;
        drag = true;
      }
    }

    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    draw();
  }

  function checkCloseEnough(p1, p2) {
    //console.log("p1 : " + p1);
    //console.log("p2: " + p2);
    return Math.abs(p1 - p2) < closeEnough;
  }

  function mouseUp() {
    drag = dragTL = dragTR = dragBL = dragBR = false;
  }

  function mouseMove(e) {
    let lrect = canvas.current.getBoundingClientRect();
    mouseX = Math.max(0, Math.min(canvas.current.width, e.pageX - lrect.left));
    mouseY = Math.max(0, Math.min(canvas.current.height, e.pageY - lrect.top));

    if (dragTL) {
      rect.w += rect.startX - mouseX;
      rect.h += rect.startY - mouseY;
      rect.startX = mouseX;
      rect.startY = mouseY;
    } else if (dragTR) {
      rect.w = Math.abs(rect.startX - mouseX);
      rect.h += rect.startY - mouseY;
      rect.startY = mouseY;
    } else if (dragBL) {
      rect.w += rect.startX - mouseX;
      rect.h = Math.abs(rect.startY - mouseY);
      rect.startX = mouseX;
    } else if (dragBR) {
      rect.w = Math.abs(rect.startX - mouseX);
      rect.h = Math.abs(rect.startY - mouseY);
    }
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    draw();
  }

  function draw() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);
    drawRect(rect);
    drawHandles();
  }

  function drawCircle(x, y, radius) {
    ctx.fillStyle = variables.themeColorPrimary;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  function drawHandles() {
    drawCircle(rect.startX, rect.startY, closeEnough);
    drawCircle(rect.startX + rect.w, rect.startY, closeEnough);
    drawCircle(rect.startX + rect.w, rect.startY + rect.h, closeEnough);
    drawCircle(rect.startX, rect.startY + rect.h, closeEnough);
  }

  return (
    <div className="d-flex justify-content-center">
      <img
        width={width / ratio}
        height={heigth / ratio}
        src={src}
        onLoad={setLoaded && setLoaded.bind(this, true)}
        alt={alt}
      />
      <canvas
        style={{ cursor: `${editZone ? "pointer" : "unset"}` }}
        className={`position-absolute ${isCropped ? "cropped-canvas" : ""}`}
        ref={canvas}
      ></canvas>
    </div>
  );
};

export default CanvasImg;
