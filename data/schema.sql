
CREATE TABLE users
(
    user_id       serial NOT NULL,
    created_at    timestamp NOT NULL,
    username      text NOT NULL,
    password      text NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
);

INSERT INTO users (created_at, username, password) VALUES (CURRENT_TIMESTAMP, 'user', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8');

CREATE TABLE documents
(
    document_id   serial NOT NULL,
    user_id       integer NOT NULL references users(user_id),
    created_at    timestamp NOT NULL,
    title         text NOT NULL,
    content       text,
    CONSTRAINT documents_pkey PRIMARY KEY (document_id)
);