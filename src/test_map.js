
import assert from "node:assert";
import * as map from "./map.js";
import * as validators from "./test_validators.js";

export function test()
{
	const ui = {
		is_menu: false,
		game:
		{
			map_cells: null
		}
	};
	const mg = new map.Game();
	const m = new map.Map(mg);
	m.generate();
	m.unpack(ui.game);
	validators.check_ui_data(ui)
}

