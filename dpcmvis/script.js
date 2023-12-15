var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var pal = ["#000", "#333", "#666", "#999","#aaa", "#ddd", "#fff", "#f00", "#f70", "#ff0", "#7f0", "#0f0", "#070", "#0ff", "#07f", "#00f", "#70f", "#f0f", "#f07",  "#f00", "#f70", "#ff0", "#7f0", "#0f0", "#070", "#0ff", "#07f", "#00f", "#70f", "#f0f", "#f07"];
var palCharset = "!@#$%^&*()_+QWERTYUIOP{}ASDFGHJKL:";
var palTemMap
var Cx = 0, Cy = 0;
var vCx, vCy, Mx, My, scale, palf, palc, palssa;
var t = 0; // regular time (ignore this)
var update = {};
var scale = {
  "x": 2,
  "y": 2,
}
update.d = function () {
  palTemMap = document.getElementById("paltemmap").value;
  for (let y = 0; y < c.height / scale.y; y++) {
    drawline(y);
  }
  document.getElementById("width").innerText = palTemMap.split("\n")[0].length;
  document.getElementById("height").innerText = palTemMap.split("\n").length;
}
function drawline(y) {
  for (let x = 0; x<c.width / scale.x ;x++) {
    let width = palTemMap.split("\n")[0].length;
    let height = palTemMap.split("\n").length;
    let current = palTemMap.split("\n")[y%height][x%width];
    ctx.fillStyle = pal[palCharset.indexOf(current)];
    drawPixel((x * scale.x) % c.width, (y * scale.y) % c.height);
  }
}
function drawPixel(x, y) {
  ctx.fillRect(Math.floor(x), Math.floor(y), scale.x, scale.y);
}

function rem(x, n) {
  return Math.round(x - Math.floor(x/n)*n) % n
}

function interl(y, int) {
  if (!int) return 1
  return (y%2==0)*2-1
} 