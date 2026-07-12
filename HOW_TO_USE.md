# 🧪 How to Use Finora — Tester's Guide

> A step-by-step walkthrough for anyone who wants to explore and test Finora.
> **Live App**: [https://finora-gold-gamma.vercel.app](https://finora-gold-gamma.vercel.app)

---

## 📋 Table of Contents

1. [Create an Account](#1-create-an-account)
2. [Upload Transactions](#2-upload-transactions)
3. [AI Categorization](#3-ai-categorization)
4. [Analytics Dashboard](#4-analytics-dashboard)
5. [Budget Management](#5-budget-management)
6. [AI Financial Advisor](#6-ai-financial-advisor)
7. [Account Settings](#7-account-settings)
8. [Sample Test Files](#8-sample-test-files)

---

## 1. Create an Account

1. Visit [https://finora-gold-gamma.vercel.app](https://finora-gold-gamma.vercel.app)
2. Click **Get Started** or navigate to `/sign-up`
3. Enter your name, email, and a password
4. You'll be redirected to the **Dashboard** automatically

> ℹ️ No email verification required — you're in immediately.

---

## 2. Upload Transactions

Finora supports two upload formats:

### Option A — CSV Upload (Recommended for testing)

1. Go to **Dashboard → Upload** (or click the Upload icon in the sidebar)
2. Click **"Upload CSV"**
3. Use this sample CSV format:

```csv
date,description,amount,type
2024-01-15,Spotify Premium,149,EXPENSE
2024-01-16,Netflix,649,EXPENSE
2024-01-17,Salary Credit,85000,INCOME
2024-01-18,Amazon Purchase,2340,EXPENSE
2024-01-19,Swiggy Food Order,450,EXPENSE
2024-01-20,Uber Ride,280,EXPENSE
2024-01-21,Medical Store,890,EXPENSE
2024-01-22,Electricity Bill,1200,EXPENSE
2024-01-23,Freelance Payment,15000,INCOME
2024-01-24,Gym Membership,1500,EXPENSE
```

4. The transactions will be imported instantly

### Option B — PDF Bank Statement

1. Click **"Upload PDF"**
2. Upload any standard bank statement PDF
3. Gemini AI will extract transactions automatically (may take 10-15 seconds)

---

## 3. AI Categorization

After uploading transactions:

1. Go to **Dashboard → Transactions**
2. You'll see your transactions listed with **no category** assigned yet
3. Click the **"Categorize with AI"** button
4. Gemini will analyze each transaction description and assign one of:
   - Housing · Transportation · Food & Dining · Utilities
   - Insurance · Healthcare · Savings & Investments
   - Personal Care · Entertainment · Miscellaneous
5. Categories appear on each transaction row within a few seconds

> ⚡ **Tip**: Categorization works best with real merchant names (e.g. "Swiggy", "Amazon", "HDFC EMI").

---

## 4. Analytics Dashboard

1. Navigate to **Dashboard → Analytics**
2. You'll see:
   - **Income vs Expense** bar chart (30-day view)
   - **Category Breakdown** pie/donut chart
   - **Daily Cash Flow** line chart
   - **Summary Cards** — total income, expenses, and net balance

> ℹ️ Charts populate once you have at least a few categorized transactions.

---

## 5. Budget Management

1. Go to **Dashboard → Home** (main dashboard)
2. Click **"Add Budget"**
3. Fill in:
   - **Category**: Choose from the same categories as AI categorization
   - **Amount**: Your monthly budget limit (e.g. ₹5000 for Food & Dining)
4. The dashboard shows a **progress bar** for each budget
5. Budgets turn **amber** at 80% and **red** at 100%

---

## 6. AI Financial Advisor

1. Navigate to **Dashboard → AI Advisor**
2. The advisor has access to your **real 30-day financial data** (transactions + budgets)
3. Try asking:
   - *"How much did I spend on food this month?"*
   - *"What's my biggest expense category?"*
   - *"Am I on track with my budgets?"*
   - *"Summarize my financial health"*
   - *"How can I save more money based on my spending?"*

> 🧠 Every answer is **grounded in your actual data** — the AI cannot hallucinate numbers it doesn't have.

---

## 7. Account Settings

1. Go to **Dashboard → Settings**
2. You can:
   - Update your **display name**
   - Change your **password**
   - View account information

---

## 8. Sample Test Files

### Minimal CSV (copy & paste into a `.csv` file)

```csv
date,description,amount,type
2024-06-01,Rent Payment,15000,EXPENSE
2024-06-02,Salary,90000,INCOME
2024-06-03,Zomato Order,380,EXPENSE
2024-06-04,Amazon Shopping,3200,EXPENSE
2024-06-05,Uber Cab,220,EXPENSE
2024-06-06,HDFC Credit Card Bill,8500,EXPENSE
2024-06-07,Freelance Income,12000,INCOME
2024-06-08,Electricity Bill,1100,EXPENSE
2024-06-09,Jio Recharge,299,EXPENSE
2024-06-10,Apollo Pharmacy,650,EXPENSE
2024-06-11,Gym Membership,2000,EXPENSE
2024-06-12,Movie Tickets,600,EXPENSE
2024-06-13,Grocery Store,2400,EXPENSE
2024-06-14,Petrol Station,1800,EXPENSE
2024-06-15,Health Insurance,3500,EXPENSE
```

### Expected Categorization Result

| Description | Expected Category |
|---|---|
| Rent Payment | Housing |
| Zomato Order | Food & Dining |
| Amazon Shopping | Miscellaneous |
| Uber Cab | Transportation |
| Electricity Bill | Utilities |
| Apollo Pharmacy | Healthcare |
| Gym Membership | Personal Care |
| Movie Tickets | Entertainment |
| Jio Recharge | Utilities |
| Health Insurance | Insurance |

---

## 🐛 Reporting Issues

If you encounter a bug, please open an issue at:
[https://github.com/ritikj17/finora/issues](https://github.com/ritikj17/finora/issues)

Include:
- Steps to reproduce
- Expected vs actual behavior
- Browser and device info

---

*Built with ❤️ in India.*
