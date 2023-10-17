module.exports = function(pgm, tables) {
  Object.keys(tables).forEach((table) => {
    const { constraints, schema } = tables[table];

    pgm.createTable(table, schema);

    if (constraints) {
      constraints.forEach((constraint) => {
        Object.keys(constraint).forEach((key) => {
          pgm.addConstraint(table, key, constraint[key]);
        });
      });
    }
  });
}