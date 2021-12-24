const List = `CREATE TABLE IF NOT EXISTS "list"(
    "id" VARCHAR(150),
    "title" VARCHAR(150),
    "archived" BOOLEAN,
    "inserted" TIMESTAMPTZ,
    "updated" TIMESTAMPTZ,
    PRIMARY KEY ("id")
);`;

const Item = `CREATE TABLE IF NOT EXISTS "item"(
    "id" VARCHAR(150),
    "list_id" VARCHAR(150),
    "description" VARCHAR(300),
    "completed" BOOLEAN,
    "inserted" TIMESTAMPTZ,
    "updated" TIMESTAMPTZ,
    PRIMARY KEY ("id"),
    CONSTRAINT fk_list
    FOREIGN KEY(list_id) 
    REFERENCES list(id)
);`;

module.exports = { List, Item };
