# Tech Charity Platform

A modern web platform built with Next.js that enables charitable donations through M-Pesa integration, featuring a responsive dashboard for tracking donations and impact metrics.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [M-Pesa Integration](#m-pesa-integration)
- [Contributing](#contributing)

## Overview

Tech Charity is a platform designed to bridge the digital divide by facilitating technology education and resources for underserved communities. The platform enables seamless donations through M-Pesa integration and provides real-time tracking of impact metrics.

```plantuml
@startuml Overview
!theme plain
skinparam backgroundColor transparent
skinparam defaultFontName Arial

actor "Donor" as donor
actor "Admin" as admin
rectangle "Tech Charity Platform" {
    component "Frontend\n(Next.js)" as frontend
    component "Backend\n(Next.js API)" as backend
    database "MongoDB" as db
    component "M-Pesa API" as mpesa
}

donor --> frontend : Makes donation
frontend --> backend : Processes request
backend --> mpesa : Initiates payment
mpesa --> backend : Payment callback
backend --> db : Stores transaction
admin --> frontend : Views dashboard

@enduml
```

## Features

- 🌐 Responsive web interface
- 💳 M-Pesa payment integration
- 📊 Real-time donation tracking
- 📱 Mobile-first design
- 🔒 Secure payment processing
- 📈 Impact statistics dashboard

## System Architecture

### Payment Flow

```plantuml
@startuml Payment Flow
!theme plain
skinparam backgroundColor transparent
skinparam defaultFontName Arial

participant "User" as user
participant "Frontend" as frontend
participant "Backend API" as api
participant "M-Pesa" as mpesa
participant "MongoDB" as db

user -> frontend : 1. Initiates donation
frontend -> api : 2. Submits donation details
api -> mpesa : 3. Initiates STK Push
mpesa -> user : 4. Prompts for payment
user -> mpesa : 5. Confirms payment
mpesa -> api : 6. Payment callback
api -> db : 7. Updates donation status
frontend <- api : 8. Confirms success
user <- frontend : 9. Shows confirmation

@enduml
```

### Component Architecture

```plantuml
@startuml Components
!theme plain
skinparam backgroundColor transparent
skinparam defaultFontName Arial

package "Frontend" {
    [Navigation]
    [DonationForm]
    [Dashboard]
    [PaymentProcessor]
}

package "Backend" {
    [API Routes]
    [M-Pesa Service]
    [Database Service]
}

database "MongoDB" {
    [Donations]
    [Statistics]
}

[Navigation] --> [Dashboard]
[DonationForm] --> [PaymentProcessor]
[PaymentProcessor] --> [API Routes]
[API Routes] --> [M-Pesa Service]
[API Routes] --> [Database Service]
[Database Service] --> [Donations]
[Database Service] --> [Statistics]

@enduml
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- ngrok (for local M-Pesa callback testing)

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/tech-charity.git
cd tech-charity
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

## Environment Setup

Create a \`.env.local\` file with the following variables:

\`\`\`env
# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/tech_charity

# M-Pesa Configuration
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_PASSKEY=your_passkey
MPESA_SHORTCODE=your_shortcode
MPESA_ENVIRONMENT=sandbox

# Development configuration with ngrok
MPESA_CALLBACK_SECRET_KEY=your_secret_key
MPESA_CALLBACK_URL=your_ngrok_url/api/mpesa/your_secret_key
\`\`\`

## API Documentation

### Donation Endpoints

\`\`\`typescript
// Create Donation
POST /api/donations
{
  name: string;
  phone: string;
  amount: number;
}

// Get Donations
GET /api/donations?page=1&limit=10

// Get Donation Stats
GET /api/donations/stats

// M-Pesa Callback
POST /api/mpesa/{secretKey}
\`\`\`

## Database Schema

```plantuml
@startuml Database Schema
!theme plain
skinparam backgroundColor transparent
skinparam defaultFontName Arial

entity "Donation" {
  * _id: ObjectId
  --
  * name: String
  * phone: String
  * amount: Number
  * checkoutRequestId: String
  * status: String
  * createdAt: Date
  mpesaCode: String
  transactionDate: Date
}

@enduml
```

## M-Pesa Integration

The platform integrates with M-Pesa's STK Push API for payment processing. Here's the flow:

1. User initiates donation
2. System triggers STK push
3. User receives payment prompt
4. User confirms payment
5. M-Pesa sends callback
6. System updates donation status

### Callback Handling

```plantuml
@startuml Callback Handling
!theme plain
skinparam backgroundColor transparent
skinparam defaultFontName Arial

start
:Receive M-Pesa callback;
if (Valid security key?) then (yes)
  if (Valid IP?) then (yes)
    :Parse callback data;
    if (Payment successful?) then (yes)
      :Extract transaction details;
      :Update donation status;
      :Return success;
    else (no)
      :Mark donation as failed;
      :Return acknowledgment;
    endif
  else (no)
    :Log invalid IP;
    :Return acknowledgment;
  endif
else (no)
  :Log invalid key;
  :Return acknowledgment;
endif
stop

@enduml
```

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Safaricom for M-Pesa API support
- All contributors who help bridge the digital divide
