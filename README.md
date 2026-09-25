# Saga E-Commerce

This project is an implementation of the orchestration-based **Saga** pattern for an e-commerce order flow, built with [NestJS](https://nestjs.com/). It uses the **Transactional Outbox** pattern to guarantee reliable messaging so that no message is lost between updating a business entity and emitting events microservices over **Kafka**.

> The project is still under development.

## Architecture

The system is composed of three microservices, each with it own PostgreSQL database:

| Service       | Responsibility                                      |
|---------------|-----------------------------------------------------|
| **Orders**    | Accepts orders, orchestrates the saga, manages the outbox |
| **Inventory** | Reserves and releases stock                         |
| **Payments**  | Processes and refunds payments                      |

Inter-service communication flows through **Apache Kafka**. The Orders service acts as the saga orchestrator, using a state machine (`PENDING → INVENTORY_PENDING → PAYMENT_PENDING → CONFIRMED / COMPENSATING → FAILED`).

### Key Patterns

- **Orchestration-based Saga**: the Orders service coordinates the distributed transaction across Inventory and Payments.
- **Transactional Outbox**: domain events are written to an `Outbox` table within the same database transaction as the business data, then asynchronously published to Kafka ensuring an at-least-once delivery.

## Tech Stack

- **Runtime:** Node.js / TypeScript
- **Framework:** NestJS
- **Messaging:** Apache Kafka (via KafkaJS)
- **Database:** PostgreSQL (via TypeORM)
- **Containerisation:** Docker & Docker Compose

## Getting Started

### Prerequisites

- Node.js ≥ 18
- Docker & Docker Compose

### Run with Docker Compose

```bash
docker compose up
```

This starts Kafka, three Postgres instances, and all three microservices. The Orders API is exposed on **port 3000**.

### Local Development

```bash
npm install
npm run start:dev
```

Build individual services:

```bash
npm run build:orders
npm run build:inventory
npm run build:payments
```

## Project Structure

```
apps/
  orders/        # Saga orchestrator & REST API
  inventory/     # Inventory reservation service
  payments/      # Payment processing service
libs/
  contracts/     # Shared topics, interfaces & DTOs
  messaging/     # Kafka messaging utilities & transactional helpers
```
