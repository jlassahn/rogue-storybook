
import assert from "node:assert";
import * as map from "./map.js";
import * as grid_functions from "./grid_functions.js";

class TestGrid
{
	constructor(dx)
	{
		this.grid_dx = dx;
		this.grid_dy = dx;
		this.grid = new Uint16Array(this.grid_dx*this.grid_dy);
	}
}

export function print(grid)
{
	for (let y=0; y<grid.grid_dy; y++)
	{
		let txt = "";
		for (let x=0; x<grid.grid_dx; x++)
		{
			let n = grid.grid[x + grid.grid_dx*y];
			if (n != 0)
				txt = txt + "#";
			else
				txt = txt + ".";
		}
		console.log(txt);
	}
}

function test_clear()
{
	const grid = new TestGrid(7);
	grid.grid = [
		3, 2, 3, 2, 3, 2, 3,
		2, 0, 2, 0, 2, 0, 2,
		3, 2, 3, 2, 3, 2, 3,
		2, 0, 2, 0, 2, 0, 2,
		3, 2, 3, 2, 3, 2, 3,
		2, 0, 2, 0, 2, 0, 2,
		3, 2, 3, 2, 3, 2, 3
	];
	grid_functions.clear(grid, 0x02);
	assert.deepStrictEqual(grid.grid, [
		1, 0, 1, 0, 1, 0, 1,
		0, 0, 0, 0, 0, 0, 0,
		1, 0, 1, 0, 1, 0, 1,
		0, 0, 0, 0, 0, 0, 0,
		1, 0, 1, 0, 1, 0, 1,
		0, 0, 0, 0, 0, 0, 0,
		1, 0, 1, 0, 1, 0, 1
	]);
}

function test_boundary()
{
	const grid = new TestGrid(7);
	grid.grid = [
		0, 2, 2, 2, 0, 0, 0,
		2, 2, 2, 2, 2, 0, 0,
		2, 2, 2, 2, 2, 0, 0,
		0, 2, 2, 2, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0,
		0, 0, 2, 2, 0, 0, 0,
		0, 0, 0, 0, 0, 2, 2
	];
	grid_functions.boundary(grid, 0x02, 0x01);
	assert.deepStrictEqual(grid.grid, [
		0, 3, 3, 3, 0, 0, 0,
		3, 3, 2, 3, 3, 0, 0,
		3, 3, 2, 3, 3, 0, 0,
		0, 3, 3, 3, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0,
		0, 0, 3, 3, 0, 0, 0,
		0, 0, 0, 0, 0, 3, 3
	]);
}

export function test()
{
	test_clear();
	test_boundary();
	const grid = new TestGrid(63);
	/*
	grid_functions.circle(grid, 31, 31, 4, 0x01);
	grid_functions.boundary(grid, 0x01, 0x02);
	grid_functions.clear(grid, 0x01);
	print(grid);
	*/
}

