
function match(grid, x, y, flags)
{
	const n = grid.grid[x + grid.grid_dx*y];
	return (n&flags) == flags;
}

function set(grid, x, y, flags)
{
	grid.grid[x + grid.grid_dx*y] |= flags;
}

export function circle(grid, cx, cy, r, flags)
{
	r = r+0.25;
	for (let y=0; y<grid.grid_dy; y++)
	for (let x=0; x<grid.grid_dx; x++)
	{
		let r2 = (x-cx)*(x-cx) + (y-cy)*(y-cy);
		if (r2 < r*r)
			grid.grid[x + grid.grid_dx*y] |= flags;
	}
}

export function clear(grid, flags)
{
	const mask = ~flags;
	for (let y=0; y<grid.grid_dy; y++)
	for (let x=0; x<grid.grid_dx; x++)
	{
		grid.grid[x + grid.grid_dx*y] &= mask;
	}
}

export function boundary(grid, in_flags, out_flags)
{
	for (let i=0; i<grid.grid_dx; i++)
	{
		if (match(grid, i, 0, in_flags))
			set(grid, i, 0, out_flags);
		if (match(grid, i, grid.grid_dy-1, in_flags))
			set(grid, i, grid.grid_dy-1, out_flags);
	}

	for (let i=0; i<grid.grid_dy; i++)
	{
		if (match(grid, 0, i, in_flags))
			set(grid, 0, i, out_flags);
		if (match(grid, grid.grid_dx-1, i, in_flags))
			set(grid, grid.grid_dx-1, i, out_flags);
	}

	for (let y=1; y<grid.grid_dy-1; y++)
	for (let x=1; x<grid.grid_dx-1; x++)
	{
		if (match(grid, x, y, in_flags)
			&& (!match(grid, x-1, y-1, in_flags) ||
			    !match(grid, x, y-1, in_flags) ||
			    !match(grid, x+1, y-1, in_flags) ||
			    !match(grid, x-1, y, in_flags) ||
			    !match(grid, x+1, y, in_flags) ||
			    !match(grid, x-1, y+1, in_flags) ||
			    !match(grid, x, y+1, in_flags) ||
			    !match(grid, x+1, y+1, in_flags)))
			set(grid, x, y, out_flags);
	}
}

