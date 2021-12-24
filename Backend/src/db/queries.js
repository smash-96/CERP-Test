const pool = require("./db_init");
const { v4: uuidv4 } = require("uuid");
const config = require("../../prices.json");

// GET /pricing-models
// returns all of the pricing models available for the system
// also returns the default pricing model in prices.json
const getPricingModels = async (ctx) => {
	try {
		const { default_pricing } = config;
		const pricing_models = await pool.query(
			`SELECT * FROM pricing_model_tb;`
		);

		const result = {
			default_pricing: default_pricing,
			pricing_models: pricing_models.rows,
		};
		ctx.body = result;
	} catch (err) {
		ctx.throw(404, err);
	}
};

// POST /pricing-models
// creates a new pricing model in the system
// returns the ID of the new pricing model to the caller
const insertPricingModels = async (ctx) => {
	try {
		const { name, pricing } = ctx.request.body;

		const uid = uuidv4();
		// INSERTION

		await pool.query(`INSERT INTO pricing_model_tb(id, name)
		VALUES ('${uid}' , '${name}') RETURNING *;`);

		pricing.map(async (value) => {
			await pool.query(`INSERT INTO prices_tb(model_id, name, price, value)
			VALUES ('${uid}' , '${value.name}' , '${value.price}' , '${value.value}') RETURNING *;`);
		});

		// RETURN ID
		ctx.body = { id: uid };
		// ctx.body = "Testing";
	} catch (err) {
		console.log("ERROR", err);
		ctx.throw(404, err);
	}
};

// GET /pricing-models/:pm-id
// get an individual pricing model
// include the price configurations for the pricing model
// if the pricing model isn't found by pm-id it responds with not found
const getPricingModelByID = async (ctx) => {
	const f_id = ctx.params.id;
	const pricingModel = await pool.query(
		`SELECT * FROM pricing_model_tb where id='${f_id}'`
	);

	if (!pricingModel.rows.length) {
		ctx.throw(200, "Pricing Model not found");
	}

	const priceConfig = await pool.query(
		`SELECT * FROM prices_tb where model_id='${f_id}'`
	);

	const temp = priceConfig.rows.map((value, index) => {
		return {
			id: value.id,
			name: value.name,
			price: value.price,
			value: value.value,
		};
	});
	const finalObj = {
		...pricingModel.rows[0],
		pricing: temp,
	};

	ctx.body = { pricing_model: finalObj };
};

// PUT /pricing-models/:pm-id
// updates an existing pricing model meta-data
// does not affect the pricing configurations for the pricing model
const updatePricingModelByID = async (ctx) => {
	try {
		const f_id = ctx.params.id;
		const { name } = ctx.request.body;
		await pool.query(
			`Update pricing_model_tb
			 SET name = '${name}'
			 where id='${f_id}'`
		);
		// RETURN ID

		// ctx.body = { pricingModel };
		ctx.body = "Pricing Model Updated";
	} catch (err) {
		ctx.throw(404, err);
	}
};

// GET /pricing-models/:pm-id/prices
// returns the prices configured for a specific pricing model
const getModelPrice = async (ctx) => {
	const f_id = ctx.params.id;

	const pricingModel = await pool.query(
		`SELECT * FROM prices_tb where model_id='${f_id}'`
	);

	const temp = pricingModel.rows.map((value, index) => {
		return {
			id: value.id,
			name: value.name,
			price: value.price,
			value: value.value,
		};
	});

	if (!pricingModel) {
		ctx.throw(200, "Pricing Model not found");
	} else {
		ctx.body = { prices: temp };
	}
};

// POST /pricing-models/:pm-id/prices
// adds a new price configuration for a pricing model
const insertModelPrice = async (ctx) => {
	try {
		const f_id = ctx.params.id;
		const { price, name, value } = ctx.request.body;

		await pool.query(`INSERT INTO prices_tb(model_id, price, name, value)
		VALUES ('${f_id}' , '${price}' , '${name}' , '${value}') RETURNING *;`);

		ctx.body = "New Price Configuration Added";
	} catch (err) {
		console.log("ERROR", err);
		ctx.throw(404, err);
	}
};

// DELETE /pricing-models/:pm-id/prices/:price-id
// removes a price configuration from a pricing model
// if the pricing model isn't found by pm-id it responds with not found
// if the price configuration isn't found by price-id it responds with not found
const deleteModelPrice = async (ctx) => {
	const { pmId, priceId } = ctx.params;

	const pricingModel = await pool.query(
		`SELECT * FROM pricing_model_tb where id='${pmId}'`
	);
	if (!pricingModel.rows.length) {
		ctx.throw(200, "Pricing Model Not Found");
	}
	const priceConfig = await pool.query(
		`SELECT * FROM prices_tb where id='${priceId}'`
	);
	if (!priceConfig) {
		ctx.throw(200, "Price Configuration Not Found");
	}

	await pool.query(
		`DELETE FROM prices_tb where id='${priceId}' and model_id='${pmId}'`
	);

	ctx.body = "Price Configuration Deleted";
};

// PUT /machines/:machine-id/prices/:pm-id
// sets the pricing model for an individual machine to the one from pm-id
// if the machine already has a pricing model, it is replaced by this one
// if the machine isn't found by machine-id it responds with not found
// if the pricing model isn't found by pm-id it responds with not found
const updateMachinePriceByID = async (ctx) => {
	const { machineId, priceId } = ctx.params;
	const pricingModel = await pool.query(
		`SELECT * FROM pricing_model_tb where id='${priceId}'`
	);
	if (!pricingModel.rows.length) {
		ctx.throw(200, "Pricing Model not found");
	}

	const machineModel = await pool.query(
		`SELECT * FROM machine_tb where id='${machineId}'`
	);
	if (!machineModel.rows.length) {
		ctx.throw(200, "Machine not found");
	}
	try {
		await pool.query(
			`Update machine_tb
			 SET pricing_id = '${priceId}'
			 where id='${machineId}'`
		);

		ctx.body = "Pricing Model Updated for Machine";
	} catch (err) {
		ctx.throw(500, "Internal Server Error");
	}
};

// DELETE /machines/:machine-id/prices/:pm-id
// removes the pricing model from the machine (unsets it)
const deleteMachinePrice = async (ctx) => {
	const { machineId, pmId } = ctx.params;

	await pool.query(
		`Update machine_tb
		 SET pricing_id = ''
		 where id='${machineId}'`
	);

	ctx.body = "Removed Pricing Model For Machine";
};

// GET /machines/:machine-id/prices
// return the pricing model and price configurations set for a given machine
// if the machine does not have a pricing model configured then the default model from prices.json is returned
// if the machine isn't found by machine-id it responds with not found
const getMachinePricesByID = async (ctx) => {
	const { machineId } = ctx.params;
	const { default_pricing } = config;

	const machineModel = await pool.query(
		`SELECT * FROM machine_tb where id='${machineId}'`
	);

	if (!machineModel.rows.length) {
		ctx.throw(200, "Machine Model not found");
	}
	if (machineModel.rows[0].pricing_id === "") {
		const result = {
			default_pricing: default_pricing,
		};
		ctx.body = result;
	}
	const pricing_id = machineModel.rows[0].pricing_id;

	const pricingModel = await pool.query(
		`SELECT * FROM pricing_model_tb where id='${pricing_id}'`
	);

	if (!pricingModel.rows.length) {
		ctx.throw(200, "Pricing Model not found");
	}

	const priceConfig = await pool.query(
		`SELECT * FROM prices_tb where model_id='${pricing_id}'`
	);

	const temp = priceConfig.rows.map((value, index) => {
		return {
			id: value.id,
			name: value.name,
			price: value.price,
			value: value.value,
		};
	});
	const finalObj = {
		...pricingModel.rows[0],
		pricing: temp,
	};

	ctx.body = { pricing_model: finalObj };
};

module.exports = {
	getPricingModels,
	insertPricingModels,
	getPricingModelByID,
	updatePricingModelByID,
	getModelPrice,
	insertModelPrice,
	deleteModelPrice,
	updateMachinePriceByID,
	deleteMachinePrice,
	getMachinePricesByID,
};
