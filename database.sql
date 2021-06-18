create TABLE users(
    id SERIAL PRIMARY KEY,
    fio VARCHAR(255),
    age INTEGER,
    birthday DATE,
    organization_id INTEGER,
    FOREIGN KEY (organization_id) REFERENCES organizations (id)
);
create TABLE organizations(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);