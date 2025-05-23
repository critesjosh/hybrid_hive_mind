# Brainstorm & Project Recap

## 🌀 What We Explored

We participated in a crypto-focused workshop, but tonight's session centered on AI and group collaboration. Our goal was to brainstorm ideas for a product that combines blockchain and AI. We asked for project suggestions that would be both innovative and feasible.

---

## 🎯 Goal or Focus

We aimed to generate creative ideas for a workshop project that incorporates both blockchain and AI.

---

## 🌱 Raw Ideas List

- Decentralized AI Model Marketplace
- AI-Powered Reputation System for DAOs
- On-Chain AI Insurance
- AI-Powered NFT Verifier
- Decentralized Prompt Training Playground
- AI Voting Assistant for DAOs
- On-Chain AI-Powered Content Curation Bot
- Crypto Wallet Sentiment Analyzer
- Blockchain-Based AI-Generated Art Game
- AI-Powered Smart Contract Auditor Bot
- AI Wallet Name Generator
- Token-Gated AI Chatbot
- AI-Powered Web3 Resume Builder
- Crypto Scam Detector Assistant
- Blockchain-Powered AI Daily Oracle

---

## 🔥 Favorite Ideas

- AI-Powered Smart Contract Auditor Bot
- AI-Powered Reputation System for DAOs

---

## 🪞 Reflections

AI generated ideas rapidly, including options we hadn’t considered. However, the initial suggestions were very technical, so we asked for ideas with physical components (e.g., fashion or fitness), resulting in:

- AI-Powered NFT Fashion Drops
- Blockchain-Based AI Fitness Challenge Tracker
- Proof-of-Workout NFT Generator
- AI-Curated Outfit Styler with On-Chain Closet
- Decentralized Smart Mirror Companion

---

## 🛤 Possible Next Steps

Trip is familiar with Bolt for app generation, so we planned to start there.

Next, we asked ChatGPT to create a Product Requirements Document (PRD) for our top idea.

---

# Project: AI-Powered Smart Contract Auditor Bot

## 🚀 What We Built

We prompted ChatGPT to create a PRD for an AI-Powered Smart Contract Auditor Bot—a web application where users upload smart contracts for instant AI-generated audits. The PRD was fed into bolt.new to generate a prototype.

---

**PRD Summary: SmartAudit AI**

- **Description:**  
  A web app for uploading Solidity smart contracts and receiving instant AI-generated audit reports highlighting security risks, bad practices, and optimization suggestions. Optionally, results can be stored on-chain for public trust.

- **Key Features:**
  - Smart Contract Upload (.sol file or pasted code)
  - Syntax validation and linting
  - AI-Powered Audit (vulnerability detection, recommendations, code quality scoring)
  - Structured Audit Report (risk level, issues, fixes, best practices, overall score)
  - Example Contracts for demo/testing
  - (Future) Save Audit Report to Blockchain as NFT or log (with metadata)

- **User Flow:**
  - Landing Page: Welcome, upload option, example contracts
  - Audit Page: Upload/paste, submit, loading spinner
  - Results Page: Collapsible audit report, download/copy options, try another contract

- **Assumptions:**
  - Uses GPT-4 for code analysis
  - No contract execution in prototype
  - No user login for MVP

---

**Example Input (Solidity Contract):**
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleBank {
    mapping(address => uint) balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint amount) public {
        require(balances[msg.sender] >= amount, "Insufficient funds");
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed.");
        balances[msg.sender] -= amount;
    }
}
```

**Example Output (AI Audit Report):**

- **Risk Level:** 🔴 High
- **Issues Found:**
  - Reentrancy Vulnerability (`withdraw` function)  
    - *Fix:* Move `balances[msg.sender] -= amount;` before the call.
  - Lack of Events  
    - *Fix:* Add events for `deposit()` and `withdraw()`.
- **Overall Score:** 62 / 100
- **Suggestions:**  
  - Add SafeMath for overflow protection (if using  "AI acted like a mirror that exaggerated our first instincts. Best results came when we challenged its suggestions, not when we just accepted them

Citations:
[1] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/30643975/5e2d1ea5-397e-439c-b403-d22bddf55990/paste.txt

---
Answer from Perplexity: pplx.ai/share