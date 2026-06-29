mod db;
mod models;
mod handlers;

use tower_http::cors::CorsLayer;
use axum::{routing::{get, post, delete}, Router, http::{HeaderValue, Method}};

async fn home() -> &'static str {
    "Expense Tracker API activated!"
}

#[tokio::main]
async fn main() {
    let pool = db::connect_db().await;
    db::init_db(&pool).await;
    println!("Databases connected successfully!");

    let cors = CorsLayer::new().allow_origin("http://localhost:3000".parse::<HeaderValue>().unwrap())
        .allow_methods([Method::GET, Method::POST, Method::PUT, Method::DELETE]).allow_headers(tower_http::cors::Any);

    let app = Router::new()
        .route("/", get(home))
        .route("/transactions", post(handlers::create_transaction).get(handlers::get_transactions))
        .route("/transactions/{id}", delete(handlers::delete_transaction).put(handlers::update_transaction).get(handlers::get_transaction_by_id))
        .with_state(pool.clone()).layer(cors);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8000").await.unwrap();

    println!("Server active @ http://localhost:8000");
    axum::serve(listener, app).await.unwrap();

    drop(pool);
}