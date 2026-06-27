
console.log("Hello")

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const image = new Image(192, 192);
image.onload = draw_view;

image.src = "./data/testimage.png";

document.getElementById("game").style.visibility = "visible";
document.getElementById("splash").style.visibility = "hidden";
function draw_view()
{
	console.log("drawing");
	canvas.width = 48*15;
	canvas.height = 48*15;

	var t0 = performance.now();
	var srcx = 48;
	var srcy = 0;
	for (var dsty = 0; dsty < 48*15; dsty += 48)
	for (var dstx = 0; dstx < 48*15; dstx += 48)
	{
		/* can use this or image here */
		ctx.drawImage(this, srcx, srcy, 48, 48, dstx, dsty, 48, 48);
	}


	srcx = 0;
	srcy = 0;
	for (var dsty = 0; dsty < 48*15; dsty += 48)
	for (var dstx = 0; dstx < 48*15; dstx += 48)
	{
		/* can use this or image here */
		ctx.drawImage(this, srcx, srcy, 48, 48, dstx, dsty, 48, 48);
	}
	var t1 = performance.now();
	console.log(t1-t0);
}

