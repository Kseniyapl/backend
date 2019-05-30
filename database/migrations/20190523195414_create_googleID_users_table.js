exports.up = function(knex, Promise) {
	return knex.schema.table('users', (tbl) => {
		// Fields for users to input social info
		tbl.text('googleID');
		//tbl.text('facebook');
		//tbl.text('github');
		//tbl.text('twitter');
		//tbl.text('linkedin');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropColumn('googleID');
};
