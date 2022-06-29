-- Database: medprev_cms_dev
DROP DATABASE IF EXISTS github_share_reviews;

CREATE DATABASE github_share_reviews
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;