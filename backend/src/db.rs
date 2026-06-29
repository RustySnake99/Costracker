use sqlx::{Pool, Sqlite, sqlite::SqlitePoolOptions};

pub async fn connect_db() -> Pool<Sqlite> {
    SqlitePoolOptions::new().max_connections(5).connect("sqlite:database.db").await.expect("Failed to connect to the database!")
}

pub async fn init_db(pool: &Pool<Sqlite>) {
    match sqlx::query(r#"
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            amount REAL NOT NULL,
            category TEXT NOT NULL,
            summary TEXT NOT NULL,
            transaction_type TEXT NOT NULL,
            transaction_date TEXT NOT NULL
        );"#).execute(pool).await {
            Ok(_) => println!("Table 'TRANSACTIONS' has been initialized!"),
            Err(e) => println!("Error {} occurred during database initialization!", e),
        }
}