use serde::{Serialize, Deserialize};
use sqlx::FromRow;

#[derive(Debug, Deserialize, Serialize, FromRow)]
pub struct Transaction {
    pub id: i64,
    pub amount: f64,
    pub category: String,
    pub summary: String,
    pub transaction_type: String,
    pub transaction_date: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct CreateTransaction {
    pub amount: f64,
    pub category: String,
    pub summary: String,
    pub transaction_type: String,
    pub transaction_date: String,
}