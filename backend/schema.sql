CREATE DATABASE IF NOT EXISTS discord_clone;

USE discord_clone;

CREATE TABLE users (
    id CHAR(36) NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE (username),
    UNIQUE (email)
);

CREATE TABLE servers (
    id CHAR(36) NOT NULL,
    name VARCHAR(100) NOT NULL,
    owner_id CHAR(36) NOT NULL,
    invite_code VARCHAR(6) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE (invite_code),

    CONSTRAINT fk_servers_owner
        FOREIGN KEY (owner_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE server_members (
    server_id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,

    PRIMARY KEY (server_id, user_id),

    CONSTRAINT fk_server_members_server
        FOREIGN KEY (server_id)
        REFERENCES servers(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_server_members_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE channels (
    id CHAR(36) NOT NULL,
    name VARCHAR(100) NOT NULL,
    server_id CHAR(36) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT fk_channels_server
        FOREIGN KEY (server_id)
        REFERENCES servers(id)
        ON DELETE CASCADE
);

CREATE TABLE messages (
    id CHAR(36) NOT NULL,
    content TEXT NOT NULL,
    user_id CHAR(36) NOT NULL,
    channel_id CHAR(36) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT fk_messages_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_messages_channel
        FOREIGN KEY (channel_id)
        REFERENCES channels(id)
        ON DELETE CASCADE
);