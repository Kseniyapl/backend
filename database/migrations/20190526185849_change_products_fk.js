exports.up = (knex) => {
	return knex.schema.alterTable('products', (table) => {
		table
			.integer('product_category')
			.nullable()
			.alter();
	});
};

exports.down = (knex) => {
	return knex.schema.alterTable('products', (table) => {
		table
			.integer('product_category')
			.nullable()
			.alter();
	});
};
