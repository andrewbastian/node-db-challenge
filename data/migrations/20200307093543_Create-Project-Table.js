exports.up = async function(knex) {

  await knex.schema.createTable('projects', tbl => {

      tbl.increments('id')

      tbl.text('project_name', 128)
        .unique()
        .notNullable()

      tbl.text('project_description')

      tbl.boolean('compleated')
      	.defaultTo(false)
      	.notNullable()
    })

    await knex.schema.createTable("project_resorces", (tbl) =>{
  		
  		tbl.integer("project_id")
  	  		.references("id")
  			.inTable("projects")
  			.onDelete("CASCADE")

  		tbl.integer("resorce_id")
  	  		.references("id")
  			.inTable("resorces")
  			.onDelete("CASCADE")

  		tbl.primary(["project_id", "resorce_id"])

  })

    await knex.schema.createTable('resorces', tbl => {

      tbl.increments('id')

      tbl.text('resorces_name')
        .notNullable()

      tbl.text('resorces_description')

      tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

    });

    await knex.schema.createTable('tasks', tbl => {
      
      tbl.increments('id')

      tbl.text('task_decription')
        .notNullable()

      tbl.text('notes')

      tbl.boolean('task_compleated')
      	.defaultTo(false)

      tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    });

};

exports.down = async function(knex) {

 await knex.schema.dropTableIfExists("project_resorces")
 await knex.schema.dropTableIfExists("resorces")
 await knex.schema.dropTableIfExists("tasks")
 await knex.schema.dropTableIfExists("projects")

};
