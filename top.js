
console.log("Hello")

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const image = new Image(192, 192);
image.onload = draw_view;

image.src = "./data/tile00.png";

document.getElementById("game").style.visibility = "visible";
document.getElementById("splash").style.visibility = "hidden";
function draw_view()
{
	console.log("drawing");
	canvas.width = 48*15;
	canvas.height = 48*15;

	var t0 = performance.now();
	for (var y = 0; y < 15; y++)
	for (var x = 0; x < 15; x++)
	{
		const dstx = x*48;
		const dsty = y*48 - 16;

		var srcx = 48;
		if (((y & 7) == 0) || ((x & 7) == 0))
			srcx = 0;
		const srcy = 0;
		/* can use this or image here */
		ctx.drawImage(this, srcx, srcy, 48, 64, dstx, dsty, 48, 64);
	}

	var t1 = performance.now();
	console.log(t1-t0);
}

