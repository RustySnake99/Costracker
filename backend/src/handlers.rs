use axum::{Json, extract::{Path, State}, http::StatusCode};
use sqlx::{Pool, Sqlite};
use crate::models::{Transaction, CreateTransaction};

pub async fn get_transactions(State(pool): State<Pool<Sqlite>>) -> Json<Vec<Transaction>> {
    let transactions = sqlx::query_as::<_, Transaction>(r#"SELECT * FROM transactions ORDER BY transaction_date DESC"#)
        .fetch_all(&pool).await.expect("Failed to fetch transactions!");

    Json(transactions)
}

pub async fn get_transaction_by_id(State(pool): State<Pool<Sqlite>>, Path(id): Path<i64>) -> Result<Json<Transaction>, StatusCode> {
    let transaction = sqlx::query_as::<_, Transaction>(
        r#"SELECT * FROM transactions WHERE id = ?"#
    ).bind(id.clone()).fetch_optional(&pool).await.unwrap();

    match transaction {
        Some(t) => {println!("Transaction completed!"); Ok(Json(t))},
        None => {println!("This transaction couldn't be completed!"); Err(StatusCode::NOT_FOUND)}
    }
}

pub async fn delete_transaction(State(pool): State<Pool<Sqlite>>, Path(id): Path<i64>) -> StatusCode {
    let result = sqlx::query("DELETE FROM transactions WHERE id = ?").bind(id.clone()).execute(&pool).await.unwrap();

    if result.rows_affected() == 0 {StatusCode::NOT_FOUND}
    else {StatusCode::NO_CONTENT}
}

pub async fn create_transaction(State(pool): State<Pool<Sqlite>>, Json(payload): Json<CreateTransaction>) -> Json<CreateTransaction> {
    println!("\t- Received Transaction: {:?}", payload);

    sqlx::query(r#"
        INSERT INTO transactions (amount, category, summary, transaction_type, transaction_date) VALUES (?, ?, ?, ?, ?)
    "#).bind(payload.amount).bind(&payload.category).bind(&payload.summary).bind(&payload.transaction_type).bind(&payload.transaction_date).execute(&pool).await.expect("Failed to insert transaction!");

    println!("Transaction Inserted!");

    Json(payload)
}

pub async fn update_transaction(State(pool): State<Pool<Sqlite>>, Path(id): Path<i64>, Json(payload): Json<CreateTransaction>) -> StatusCode {
    let result = sqlx::query(r#"
        UPDATE transactions SET amount = ?, category = ?,  summary = ?, transaction_type = ?, transaction_date = ? WHERE id = ?
    "#).bind(payload.amount).bind(&payload.category).bind(&payload.summary).bind(&payload.transaction_type).bind(&payload.transaction_date).bind(id).execute(&pool).await.expect("Failed to update transactions!");

    if result.rows_affected() == 0 {StatusCode::NOT_FOUND}
    else {StatusCode::OK}
}