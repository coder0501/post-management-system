-- Create the 'users' table with auto-incremented 'id' column
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'blogs' table with a foreign key referencing 'users' table
CREATE TABLE blogs (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    slug VARCHAR(255) UNIQUE,
    user_id INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Example insertions (for testing purposes)
INSERT INTO users (username, email, password) 
VALUES 
    ('john_doe', 'john.doe@example.com', 'hashedpassword1'),
    ('jane_smith', 'jane.smith@example.com', 'hashedpassword2');

INSERT INTO blogs (title, category, description, status, slug, user_id) 
VALUES 
    ('Tech Blog 1', 'Tech', 'Description of the first tech blog', 'Approved', 'tech-blog-1', 1),
    ('Health Blog 1', 'Health', 'Description of the first health blog', 'Pending', 'health-blog-1', 2);
