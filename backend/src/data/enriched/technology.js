// Technology domain enriched roadmap data
export const technologyRoadmaps = {
  "ai-ml-engineer": [
    {
      investment: {
        time: "2 Years (Class 11-12 + 1-2 hrs daily programming & competitive math)",
        cost: "₹40,000 - ₹1,50,000 (Schooling, books, JEE/entrance prep)"
      },
      actionItems: [
        {
          task: "Master Linear Algebra, Multivariable Calculus, and Probability in Class 11-12.",
          detail: "Eigenvalues, matrix decompositions, partial derivatives, and Bayes' theorem form the mathematical foundation of modern neural networks."
        },
        {
          task: "Learn Python syntax and write scripts for algorithmic math problems on Project Euler.",
          detail: "Gain fluency in data structures (lists, dictionaries, sets, recursion) before starting ML libraries."
        },
        {
          task: "Build early computer vision or logic scripts using OpenCV and Python basics.",
          detail: "Implement simple image filters, face detection using Haar cascades, and basic numerical plots."
        }
      ],
      resources: [
        {
          name: "3Blue1Brown - Essence of Linear Algebra",
          type: "course",
          url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab",
          note: "Unsurpassed geometric visualization of vector spaces, matrices, and transformations."
        },
        {
          name: "Python for Everybody (Charles Severance / Coursera)",
          type: "course",
          url: "https://www.py4e.com",
          note: "Gentle yet comprehensive introduction to algorithmic Python."
        },
        {
          name: "Khan Academy Multivariable Calculus",
          type: "platform",
          url: "https://www.khanacademy.org/math/multivariable-calculus",
          note: "Master gradients, directional derivatives, and cost function surfaces."
        }
      ],
      checkpoint: {
        criteria: "Scoring 90%+ in 12th Board Mathematics and completing 25+ algorithmic Python challenges.",
        deliverable: "GitHub repository with mathematical Python scripts and verified Class 12 marksheet."
      },
      decisionPoints: [
        {
          question: "B.Tech in Pure CS vs Specialized B.Tech in AI/ML",
          options: [
            {
              choice: "Core B.Tech in Computer Science & Engineering (CSE)",
              pros: "Broadest foundation in OS, compilers, databases, and maximum flexibility across software roles.",
              cons: "Requires picking AI/ML electives independently during junior/senior years."
            },
            {
              choice: "Specialized B.Tech in Artificial Intelligence & Data Science",
              pros: "Early curriculum focus on neural nets, statistics, and GPU programming.",
              cons: "May pigeonhole early career if general backend/systems roles are preferred later."
            }
          ]
        }
      ],
      warning: "Jumping directly into high-level PyTorch or Keras before understanding calculus and gradient descent: Without the math, you will struggle to debug vanishing gradients or loss divergence.",
      fallbackPlan: "If top-tier engineering college entrance rank is missed, enroll in state/private CSE and focus on open-source ML contributions and Kaggle competitions.",
      realWorldStats: [
        {
          label: "Engineering Entrance Weightage",
          value: "33% Mathematics",
          context: "Critical rank decider in JEE Main & Advanced"
        },
        {
          label: "AI Specialization Seats",
          value: "40,000+ Nationally",
          context: "Available across accredited engineering colleges in India"
        }
      ]
    },
    {
      investment: {
        time: "4 Years (Undergraduate degree + 15-20 hrs/week lab & project work)",
        cost: "₹3,00,000 - ₹18,00,000 (Govt NIT/IIT to private universities)"
      },
      actionItems: [
        {
          task: "Implement core ML algorithms from scratch in pure NumPy (Linear/Logistic Regression, Decision Trees, K-Means, Neural Nets).",
          detail: "Writing forward and backward propagation manually cements understanding of vectorization and autograd."
        },
        {
          task: "Master PyTorch and the Hugging Face Transformers ecosystem.",
          detail: "Fine-tune pretrained vision models (ResNet, ViT) and NLP models (BERT, RoBERTa, LLaMA) on domain datasets."
        },
        {
          task: "Secure summer research internships or ML engineering internships at startups.",
          detail: "Contribute to real data preprocessing pipelines, feature engineering, and model evaluation metrics."
        }
      ],
      resources: [
        {
          name: "Deep Learning Specialization by Andrew Ng (Coursera)",
          type: "course",
          url: "https://www.deeplearning.ai",
          note: "The industry standard curriculum covering CNNs, RNNs, Transformers, and hyperparameter tuning."
        },
        {
          name: "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow (Aurélien Géron)",
          type: "book",
          url: "https://www.oreilly.com",
          note: "Pragmatic, production-tested code for end-to-end ML pipelines."
        },
        {
          name: "Fast.ai - Practical Deep Learning for Coders",
          type: "platform",
          url: "https://course.fast.ai",
          note: "Top-down, code-first deep learning course focused on state-of-the-art results."
        }
      ],
      checkpoint: {
        criteria: "Publishing at least 2 full-stack ML apps on Hugging Face Spaces with Dockerized REST API endpoints.",
        deliverable: "Live deployed model endpoints with interactive Streamlit/Gradio frontends."
      },
      decisionPoints: [
        {
          question: "Kaggle Competitions vs Real-World End-to-End System Deployment",
          options: [
            {
              choice: "Kaggle Competitive Track",
              pros: "Excels at advanced feature engineering, ensembling, and high tabular data modeling rankings.",
              cons: "Does not test Docker, latency optimization, API serving, or pipeline monitoring."
            },
            {
              choice: "End-to-End MLOps & Production Engineering",
              pros: "Directly matches industry hiring requirements for deployable production ML systems.",
              cons: "Less prestigious community badges than Kaggle Grandmaster status."
            }
          ]
        }
      ],
      warning: "Focusing solely on model accuracy and ignoring data quality: In industry, 80% of ML work is data cleaning, label verification, and pipeline latency, not tuning neural hyperparameters.",
      fallbackPlan: "If ML-specific roles are scarce at campus placement, take a Software Development Engineer (SDE) or Data Analyst role and transfer internally to the AI team.",
      realWorldStats: [
        {
          label: "Campus AI/ML CTC Range",
          value: "₹8L - ₹28L/yr",
          context: "Tier 1 & Tier 2 engineering placements"
        },
        {
          label: "Industry Data Time Allocation",
          value: "70% - 80%",
          context: "Spent on data ingestion, cleaning, and evaluation"
        }
      ]
    },
    {
      investment: {
        time: "1-2 Years (Academic research or deep portfolio building)",
        cost: "₹20,000 - ₹80,000 (Cloud GPU compute credits on AWS/RunPod/Lambda)"
      },
      actionItems: [
        {
          task: "Publish a workshop or conference research paper (NeurIPS, CVPR, EMNLP, or IEEE/Springer).",
          detail: "Formulate a novel hypothesis, conduct ablations, and submit rigorous experimental benchmarks."
        },
        {
          task: "Implement cutting-edge research papers from arXiv within 2 weeks of publication.",
          detail: "Reproduce diffusion models, mixture-of-experts (MoE), or speculative decoding architectures."
        },
        {
          task: "Contribute to open-source AI frameworks (LangChain, vLLM, PyTorch, Transformers).",
          detail: "Fix bugs, optimize CUDA kernels, or add new model architectures to earn global visibility."
        }
      ],
      resources: [
        {
          name: "Papers with Code (ArXiv Track)",
          type: "platform",
          url: "https://paperswithcode.com",
          note: "Tracks state-of-the-art benchmarks and open-source implementations for research papers."
        },
        {
          name: "Weights & Biases (W&B)",
          type: "tool",
          url: "https://wandb.ai",
          note: "Industry-standard experiment tracking, hyperparameter sweeps, and model artifact versioning."
        },
        {
          name: "Deep Learning Book by Goodfellow, Bengio, and Courville",
          type: "book",
          url: "https://www.deeplearningbook.org",
          note: "The definitive mathematical textbook on representation learning and deep generative models."
        }
      ],
      checkpoint: {
        criteria: "Accepted paper at an accredited peer-reviewed venue or 100+ GitHub stars on an open-source ML repo.",
        deliverable: "Published arXiv preprint or verified merged pull requests in major ML libraries."
      },
      decisionPoints: [
        {
          question: "Research Scientist Track (Academia/Labs) vs Applied ML Engineer (Enterprise)",
          options: [
            {
              choice: "Research Scientist Track (MS/PhD)",
              pros: "Inventing new model architectures, foundational models, long-term patents, academic prestige.",
              cons: "Requires 4-6 years of low-stipend doctoral study; slow transition to commercial production."
            },
            {
              choice: "Applied ML Engineer Track (Industry)",
              pros: "Immediate high salary, solving commercial enterprise problems, fast iteration cycles.",
              cons: "Mostly consuming existing models rather than inventing novel mathematical architectures."
            }
          ]
        }
      ],
      warning: "Running expensive GPU training experiments without clear hypotheses: You will burn thousands in cloud credits without gaining actionable insights.",
      fallbackPlan: "If research papers are rejected, redirect empirical findings into a high-impact technical blog post on Medium or Substack with an accompanying interactive GitHub demo.",
      realWorldStats: [
        {
          label: "Research Scientist Starting CTC",
          value: "₹25L - ₹60L+",
          context: "Top tech research labs (Google DeepMind, Microsoft Research, Meta AI)"
        },
        {
          label: "Top AI Paper Acceptance Rate",
          value: "20% - 25%",
          context: "NeurIPS and ICML average acceptance rate"
        }
      ]
    },
    {
      investment: {
        time: "2-4 Years (M.Tech/MS program or equivalent senior industry tenure)",
        cost: "₹1,50,000 - ₹35,00,000 (Indian M.Tech vs US/European MS degree)"
      },
      actionItems: [
        {
          task: "Master LLM Serving and Quantization frameworks (vLLM, TensorRT-LLM, GGUF, AWQ).",
          detail: "Optimize inference throughput, implement continuous batching, and minimize p99 latency under heavy concurrency."
        },
        {
          task: "Design and implement production Retrieval-Augmented Generation (RAG) and Agentic workflows.",
          detail: "Utilize vector databases (Qdrant, Milvus, Pinecone), semantic routing, hybrid search, and automated evaluation (Ragas)."
        },
        {
          task: "Lead MLOps infrastructure setup using Kubernetes, Kubeflow, MLflow, and Triton Inference Server.",
          detail: "Automate continuous retraining, drift detection, model canary deployments, and zero-downtime rollouts."
        }
      ],
      resources: [
        {
          name: "Designing Machine Learning Systems by Chip Huyen",
          type: "book",
          url: "https://www.oreilly.com",
          note: "Comprehensive blueprint for data engineering, model development, monitoring, and production infrastructure."
        },
        {
          name: "Full Stack LLM Bootcamp",
          type: "course",
          url: "https://fullstackdeeplearning.com",
          note: "State-of-the-art curriculum on building, serving, and evaluating LLM-powered applications."
        },
        {
          name: "vLLM High-Throughput Inference Engine",
          type: "tool",
          url: "https://github.com/vllm-project/vllm",
          note: "Essential open-source library for PagedAttention and high-throughput LLM serving."
        }
      ],
      checkpoint: {
        criteria: "Delivering a production system handling 1,000+ requests/sec with under 100ms inference latency.",
        deliverable: "Production architecture diagram, SLA latency dashboard, and verified model monitoring alerts."
      },
      decisionPoints: [
        {
          question: "Higher Studies (MS/PhD in US/EU) vs Senior Indian Unicorn AI Roles",
          options: [
            {
              choice: "MS in Computer Science abroad (US / Europe)",
              pros: "Direct access to Silicon Valley frontier labs, dollar-denominated compensation, cutting-edge GPU clusters.",
              cons: "High student debt (₹40L - ₹80L) and unpredictable post-study work visa regulations."
            },
            {
              choice: "Stay in India at Global Capability Centers (GCCs) / Tier 1 AI Startups",
              pros: "Zero educational debt, skyrocketing Indian AI compensation (₹35L - ₹75L CTC), high purchasing power.",
              cons: "Fewer frontier foundation-model training runs compared to Silicon Valley."
            }
          ]
        }
      ],
      warning: "Ignoring prompt injection, data drift, and halluncination risks: Deploying GenAI systems without guardrails (NeMo Guardrails, Llama Guard) leads to severe enterprise compliance failures.",
      fallbackPlan: "Transition into a Staff Cloud Architect or Lead Backend Engineer role; high-concurrency systems experience is directly transferable.",
      realWorldStats: [
        {
          label: "Senior AI/ML Engineer CTC",
          value: "₹35L - ₹80L/yr",
          context: "India metros (Bengaluru, Hyderabad, Gurgaon)"
        },
        {
          label: "Global US Remote Salary",
          value: "$140,000 - $250,000/yr",
          context: "Senior AI Engineer remote contracts"
        }
      ]
    }
  ],

  "blockchain-developer": [
    {
      investment: {
        time: "1-2 Years (College CS courses + 10 hrs/week cryptography study)",
        cost: "₹10,000 - ₹40,000 (Computer science textbooks & online platform subscriptions)"
      },
      actionItems: [
        {
          task: "Master Data Structures, Algorithms, and Object-Oriented Programming in C++ or Go.",
          detail: "Understand hash tables, binary search trees, cryptographic hashing (SHA-256), and peer-to-peer networking."
        },
        {
          task: "Study distributed consensus mechanisms: Proof of Work (PoW), Proof of Stake (PoS), and Byzantine Fault Tolerance.",
          detail: "Learn how decentralized nodes reach consensus without a centralized authority."
        },
        {
          task: "Set up and run a local Ethereum node using Geth or Nethermind on testnet.",
          detail: "Understand the JSON-RPC interface, peer discovery, and transaction mempool behavior."
        }
      ],
      resources: [
        {
          name: "Mastering Bitcoin by Andreas M. Antonopoulos",
          type: "book",
          url: "https://github.com/bitcoinbook/bitcoinbook",
          note: "The foundational bible on peer-to-peer digital currencies and cryptographic proof."
        },
        {
          name: "CS198.1x: Bitcoin and Cryptocurrencies (UC Berkeley / edX)",
          type: "course",
          url: "https://www.edx.org",
          note: "Academic deep dive into consensus protocols and cryptographic hash primitives."
        },
        {
          name: "CryptoZombies Interactive Solidity Tutorial",
          type: "platform",
          url: "https://cryptozombies.io",
          note: "Gamified, beginner-friendly introduction to writing smart contracts on Ethereum."
        }
      ],
      checkpoint: {
        criteria: "Successfully running a local node and executing transactions via command-line RPC.",
        deliverable: "Verified local blockchain environment and personal notes on Byzantine consensus."
      },
      decisionPoints: [
        {
          question: "EVM Ecosystem (Solidity/Vyper) vs Rust-based Ecosystems (Solana/Near/Cosmos)",
          options: [
            {
              choice: "Ethereum & EVM Layer 2s (Arbitrum, Optimism, Polygon)",
              pros: "Largest developer ecosystem, 75%+ of total DeFi value locked (TVL), highest job volume.",
              cons: "High mainnet gas fees, EVM architectural legacy constraints."
            },
            {
              choice: "Solana & High-Throughput Rust Chains",
              pros: "Blazing fast transactions (65k TPS), sub-cent fees, rising institutional adoption.",
              cons: "Steeper learning curve with Rust memory management and account-based programming model."
            }
          ]
        }
      ],
      warning: "Confusing token trading with blockchain engineering: Day trading meme coins teaches you nothing about EVM opcodes, mempools, or reentrancy security.",
      fallbackPlan: "Strengthen standard backend development (Node.js/Go/PostgreSQL); Web2 fintech companies eagerly hire engineers with strong distributed systems foundations.",
      realWorldStats: [
        {
          label: "Global Web3 Developer Pool",
          value: "30,000+ Active Devs",
          context: "Full-time open-source contributors globally"
        },
        {
          label: "EVM Dominance",
          value: "75%+ of Web3 TVL",
          context: "Across DeFi protocols"
        }
      ]
    },
    {
      investment: {
        time: "6 - 12 Months intensive smart contract development",
        cost: "₹15,000 - ₹50,000 (Foundry/Hardhat courses, testnet gas faucets, certified bootcamps)"
      },
      actionItems: [
        {
          task: "Master Solidity 0.8.x, Foundry, and Hardhat development environments.",
          detail: "Write unit tests, fuzz tests, and invariant tests for ERC-20, ERC-721, and ERC-1155 token standards."
        },
        {
          task: "Study EVM storage layout, assembly (Yul), and gas optimization techniques.",
          detail: "Learn storage packing, bitwise operations, memory vs storage opcodes to minimize contract deployment and execution gas."
        },
        {
          task: "Complete the Ethernaut and Damn Vulnerable DeFi smart contract hacking wargames.",
          detail: "Understand reentrancy, flash loan attacks, oracle manipulation, and signature replay exploits."
        }
      ],
      resources: [
        {
          name: "Mastering Ethereum by Andreas Antonopoulos & Gavin Wood",
          type: "book",
          url: "https://github.com/ethereumbook/ethereumbook",
          note: "In-depth guide to EVM mechanics, smart contracts, and decentralized applications."
        },
        {
          name: "Patrick Collins - 32-Hour Foundry Full Course",
          type: "course",
          url: "https://www.youtube.com/c/PatrickCollins",
          note: "The most comprehensive modern Foundry, Solidity, and DeFi developer tutorial online."
        },
        {
          name: "OpenZeppelin Contracts Library",
          type: "documentation",
          url: "https://www.openzeppelin.com/contracts",
          note: "The industry standard, battle-tested smart contract library for secure token and governance implementations."
        }
      ],
      checkpoint: {
        criteria: "Solving all levels of Ethernaut up to Level 20 and scoring 100% on contract test coverage with Foundry.",
        deliverable: "GitHub repository containing custom DeFi liquidity pool or lending protocol with full fuzzing suite."
      },
      decisionPoints: [
        {
          question: "Foundry vs Hardhat as Primary Smart Contract Framework",
          options: [
            {
              choice: "Foundry (Rust-based, Solidity tests)",
              pros: "Blazing fast test execution, native fuzzing, write tests in Solidity without context switching.",
              cons: "Fewer legacy plugins compared to mature JavaScript/TypeScript ecosystems."
            },
            {
              choice: "Hardhat (TypeScript/JavaScript)",
              pros: "Huge plugin ecosystem, seamless integration with web frontends (ethers.js/viem).",
              cons: "Slower test runs on large contract suites; requires context switching between JS and Solidity."
            }
          ]
        }
      ],
      warning: "Deploying un-audited smart contracts to public mainnets with real funds: Code is immutable on-chain; a single logic bug or missing access control modifier will permanently drain all client liquidity.",
      fallbackPlan: "Focus on Web3 Frontend / Integration engineering using React, Wagmi, and Viem; high demand exists for connecting UI to existing smart contracts.",
      realWorldStats: [
        {
          label: "Hacks from Smart Contract Exploits",
          value: "$1.8 Billion+ Annually",
          context: "Lost globally due to reentrancy, oracle, and logic bugs"
        },
        {
          label: "Junior Web3 Remote CTC",
          value: "$60,000 - $110,000/yr",
          context: "Global crypto startups and DAOs"
        }
      ]
    },
    {
      investment: {
        time: "6 - 9 Months building production dApps and competing in hackathons",
        cost: "₹0 - ₹20,000 (ETH Sepolia / Arbitrum Sepolia faucets, testnet deployments)"
      },
      actionItems: [
        {
          task: "Participate in global ETHGlobal hackathons (ETHOnline, ETHGlobal Singapore/London/Bangkok).",
          detail: "Form cross-functional teams, ship functional protocols in 36 hours, and pitch to protocol foundation judges."
        },
        {
          task: "Build and deploy a full-stack dApp combining Solidity smart contracts, The Graph indexer, and Next.js frontend.",
          detail: "Implement wallet connection via RainbowKit/AppKit and index events using Subgraphs."
        },
        {
          task: "Implement Account Abstraction (ERC-4337) and zero-knowledge proof verifiers (Circom / SnarkJS).",
          detail: "Integrate paymasters for gasless transactions and social logins (Passkeys/Web3Auth)."
        }
      ],
      resources: [
        {
          name: "ETHGlobal Hackathon Showcase",
          type: "platform",
          url: "https://ethglobal.com/showcase",
          note: "Archive of thousands of prize-winning Web3 prototypes and technical architectures."
        },
        {
          name: "The Graph Protocol Documentation",
          type: "documentation",
          url: "https://thegraph.com/docs",
          note: "Decentralized indexing protocol for querying blockchain data with GraphQL."
        },
        {
          name: "RareSkills Web3 Technical Blog",
          type: "platform",
          url: "https://rareskills.io/blog",
          note: "Advanced technical tutorials on EVM assembly, zero knowledge, and gas optimization."
        }
      ],
      checkpoint: {
        criteria: "Winning a sponsor bounty at a recognized Web3 hackathon (ETHGlobal, Chainlink Hackathon, or Solana Grizzlython).",
        deliverable: "Live deployed dApp with verified contracts on Etherscan/Basescan and working decentralized frontend."
      },
      decisionPoints: [
        {
          question: "Protocol Developer (L1/L2 consensus) vs Application Developer (DeFi/NFT/Gaming dApps)",
          options: [
            {
              choice: "Application Layer (dApp & DeFi Developer)",
              pros: "Fast feedback loops, rich hackathon bounties, immense startup venture opportunities.",
              cons: "Vulnerable to market hype cycles; protocols can become obsolete quickly."
            },
            {
              choice: "Core Protocol & Infrastructure (Go/Rust/C++)",
              pros: "Deep systems engineering prestige, high job stability at foundations (Ethereum, Arbitrum, Solana).",
              cons: "Requires deep C++/Go/Rust expertise and years of peer-to-peer networking mastery."
            }
          ]
        }
      ],
      warning: "Over-relying on centralized RPC endpoints without fallback providers: When Infura or Alchemy rate limits your dApp during high traffic, your users experience complete transaction failure.",
      fallbackPlan: "Contribute to DAO technical committees, write technical documentation, or apply for protocol developer grants (Gitcoin, Optimism RetroPGF) for self-funded development.",
      realWorldStats: [
        {
          label: "Hackathon Sponsor Bounty Range",
          value: "$2,000 - $25,000",
          context: "Per winning team at ETHGlobal"
        },
        {
          label: "Grant Funding Available",
          value: "$100M+ Annually",
          context: "Distributed by Ethereum, Arbitrum, Optimism, and Solana foundations"
        }
      ]
    },
    {
      investment: {
        time: "1-3 Years continuous production delivery & security auditing",
        cost: "₹30,000 - ₹1,00,000 (Hardware wallets, security tools, audit platforms)"
      },
      actionItems: [
        {
          task: "Perform smart contract security audits on competitive platforms (Code4rena, Sherlock, Cantina).",
          detail: "Find high-severity vulnerabilities in live protocols to earn bounty payouts and climb global auditor leaderboards."
        },
        {
          task: "Design cross-chain messaging bridges and liquidity rebalancing systems using Chainlink CCIP or LayerZero.",
          detail: "Ensure cryptographic message verification and defend against multi-chain replay exploits."
        },
        {
          task: "Lead protocol architecture from initial tokenomics modeling to mainnet deployment and multi-sig governance (Safe).",
          detail: "Implement timelocks, emergency pause mechanisms, and decentralized upgradeable proxy patterns (UUPS/Transparent)."
        }
      ],
      resources: [
        {
          name: "Code4rena Competitive Smart Contract Audits",
          type: "platform",
          url: "https://code4rena.com",
          note: "Top security arena where auditors compete for cash prize pools on real production codebases."
        },
        {
          name: "Sherlock DeFi Security",
          type: "platform",
          url: "https://sherlock.xyz",
          note: "Premier platform for smart contract auditing and protocol insurance coverage."
        },
        {
          name: "Secureum Security Bootcamp Notes",
          type: "documentation",
          url: "https://secureum.substack.com",
          note: "Comprehensive taxonomy of 101+ common smart contract vulnerabilities and audit checklist."
        }
      ],
      checkpoint: {
        criteria: "Submitting at least 1 verified High or Medium severity finding in an audit competition.",
        deliverable: "Published formal audit report and recognized ranking on Code4rena or Sherlock leaderboards."
      },
      decisionPoints: [
        {
          question: "Full-Time Smart Contract Security Auditor vs Core DeFi Protocol Lead",
          options: [
            {
              choice: "Independent Smart Contract Security Auditor",
              pros: "Complete remote autonomy, lucrative bounty economics ($10k - $50k+ per audit cycle), zero on-call operations.",
              cons: "Income fluctuates with market audit volume; stressful race against hundreds of global security researchers."
            },
            {
              choice: "Core Protocol Tech Lead at Web3 Startup",
              pros: "Stable base salary ($150k - $250k) plus substantial token grants / equity upside.",
              cons: "Constant pressure of securing hundreds of millions in TVL; 24/7 security alert responsibility."
            }
          ]
        }
      ],
      warning: "Neglecting multi-signature operational security: Storing deployer private keys in `.env` files or unprotected cloud servers leads to compromised protocol ownership.",
      fallbackPlan: "Transition into a Fintech Security Consultant or Cryptography Specialist for tier-1 banks implementing central bank digital currencies (CBDC) or tokenized assets.",
      realWorldStats: [
        {
          label: "Top Smart Contract Auditor Earnings",
          value: "$200,000 - $600,000+/yr",
          context: "Top 50 auditors on Code4rena & Sherlock"
        },
        {
          label: "Senior Web3 Engineer Remote CTC",
          value: "$120,000 - $220,000/yr",
          context: "US & European Web3 companies hiring globally"
        }
      ]
    }
  ],

  "cloud-architect": [
    {
      investment: {
        time: "2 Years (High school physics & math + Linux/networking exploration)",
        cost: "₹30,000 - ₹1,00,000 (Schooling, internet, refurbished PC for Linux lab)"
      },
      actionItems: [
        {
          task: "Master the OSI 7-Layer Model and TCP/IP protocol suite.",
          detail: "Understand DNS resolution, subnetting (CIDR notation), NAT, routing tables, and port addressing."
        },
        {
          task: "Install Ubuntu Linux or Debian on a secondary partition or virtual machine (VirtualBox).",
          detail: "Learn bash shell scripting, systemd services, SSH key pairs, user permissions, and cron jobs."
        },
        {
          task: "Build and host a basic static website on GitHub Pages or Cloudflare Pages with custom DNS records.",
          detail: "Configure CNAME, A records, and understand TLS/SSL handshake certificates."
        }
      ],
      resources: [
        {
          name: "Computer Networking: A Top-Down Approach (Kurose & Ross)",
          type: "book",
          url: "https://www.pearson.com",
          note: "The undisputed foundational textbook on computer networking and internet protocols."
        },
        {
          name: "Linux Journey (Free Interactive Tutorial)",
          type: "platform",
          url: "https://linuxjourney.com",
          note: "Step-by-step modular guide to command line, file systems, permissions, and network troubleshooting."
        },
        {
          name: "Professor Messer's Network+ Video Course",
          type: "course",
          url: "https://www.professormesser.com",
          note: "Free, high-quality walkthrough of enterprise networking fundamentals."
        }
      ],
      checkpoint: {
        criteria: "Successfully configuring a Linux server with custom firewall rules (UFW/iptables) and automated backup cron scripts.",
        deliverable: "Working personal Linux homelab environment and documented network topology diagram."
      },
      decisionPoints: [
        {
          question: "Dual Boot Linux vs Cloud Virtual Machines (Free Tier)",
          options: [
            {
              choice: "Local Linux Dual Boot / Homelab PC",
              pros: "Zero recurring costs, total control over hardware virtualization and local networking.",
              cons: "Requires compatible physical computer; risk of wiping OS if dual-boot partition is misconfigured."
            },
            {
              choice: "Cloud Free Tier (AWS EC2 / Oracle Cloud Always Free)",
              pros: "Exposes you to public IPv4 addresses, security groups, and cloud console immediately.",
              cons: "Accidental charges if free tier resource limits are exceeded."
            }
          ]
        }
      ],
      warning: "Ignoring Linux command-line fundamentals and jumping straight into GUI cloud consoles: In real cloud engineering, clicking buttons in the AWS console is banned; everything is managed via CLI and code.",
      fallbackPlan: "If engineering entrance rank is low, enroll in a BCA or B.Sc IT program; cloud engineering values industry certifications and hands-on lab skill over college pedigree.",
      realWorldStats: [
        {
          label: "Linux Server Market Share",
          value: "90%+",
          context: "Of public cloud workloads worldwide"
        },
        {
          label: "Average Cloud Hiring Growth",
          value: "22% CAGR",
          context: "Annual expansion across enterprise IT in India"
        }
      ]
    },
    {
      investment: {
        time: "4 Years (Undergraduate degree + 10-15 hrs/week cloud lab experiments)",
        cost: "₹2,50,000 - ₹12,00,000 (Tuition fee across state and private engineering universities)"
      },
      actionItems: [
        {
          task: "Containerize applications using Docker and compose multi-container stacks (Node/Python + PostgreSQL + Redis).",
          detail: "Understand images, layers, volumes, bridge networks, and multi-stage Dockerfile builds for minimal footprint."
        },
        {
          task: "Master Infrastructure as Code (IaC) with Terraform.",
          detail: "Provision VPCs, public/private subnets, internet gateways, route tables, and load balancers programmatically."
        },
        {
          task: "Implement CI/CD automation with GitHub Actions or GitLab CI.",
          detail: "Automate linting, unit testing, Docker image creation, vulnerability scanning (Trivy), and cloud deployment."
        }
      ],
      resources: [
        {
          name: "Docker Deep Dive by Nigel Poulton",
          type: "book",
          url: "https://nigelpoulton.com",
          note: "Clear, engaging breakdown of container architecture, runtimes, and orchestration."
        },
        {
          name: "Terraform: Up & Running by Yevgeniy Brikman",
          type: "book",
          url: "https://www.oreilly.com",
          note: "The definitive guide to writing maintainable, modular infrastructure as code."
        },
        {
          name: "Mumshad Mannambeth - KodeKloud DevOps Courses",
          type: "course",
          url: "https://kodekloud.com",
          note: "Interactive hands-on terminal labs for Docker, Kubernetes, and Terraform."
        }
      ],
      checkpoint: {
        criteria: "Deploying a highly-available, multi-tier web application on AWS using 100% Terraform code without touching the web console.",
        deliverable: "Public GitHub repository with modular Terraform scripts and live URL backed by an Application Load Balancer."
      },
      decisionPoints: [
        {
          question: "Multi-Cloud Strategy vs Single Cloud Specialization (AWS vs Azure)",
          options: [
            {
              choice: "AWS Specialization",
              pros: "Largest market share (31%+), pioneer of cloud innovations, deepest catalog of specialized services.",
              cons: "Intense market competition among junior certified engineers."
            },
            {
              choice: "Microsoft Azure Specialization",
              pros: "Dominant in Fortune 500 enterprise migrations, hybrid cloud integration, strong hiring in GCCs.",
              cons: "Less popular in early-stage tech startups."
            }
          ]
        }
      ],
      warning: "Leaving unattached Elastic IPs, NAT Gateways, or GPU instances running in cloud accounts: A single forgotten NAT Gateway or RDS instance will rack up thousands of rupees on your credit card in a month.",
      fallbackPlan: "If campus placements offer traditional software support roles, accept the offer, leverage company-sponsored cloud training, and transition to the Cloud Platform / DevOps team within 12 months.",
      realWorldStats: [
        {
          label: "Global AWS Market Share",
          value: "31% - 32%",
          context: "Leading global infrastructure cloud provider"
        },
        {
          label: "Junior DevOps / Cloud CTC",
          value: "₹6.5L - ₹16L/yr",
          context: "Fresh graduates with verified Docker & Terraform portfolios"
        }
      ]
    },
    {
      investment: {
        time: "6 - 12 Months dedicated certification study and hands-on exam prep",
        cost: "₹30,000 - ₹75,000 (AWS Solutions Architect Associate exam ₹13,000 + CKA exam ₹32,000 + practice tests)"
      },
      actionItems: [
        {
          task: "Earn the AWS Certified Solutions Architect - Associate (SAA-C03) or Azure Solutions Architect Expert (AZ-305).",
          detail: "Learn well-architected framework pillars: Operational Excellence, Security, Reliability, Performance, and Cost Optimization."
        },
        {
          task: "Earn the Certified Kubernetes Administrator (CKA) certification from the Linux Foundation.",
          detail: "Pass the 100% hands-on performance-based exam configuring pods, deployments, ingress controllers, RBAC, and ETCD backups."
        },
        {
          task: "Build zero-downtime Blue/Green and Canary deployment pipelines using ArgoCD and GitOps.",
          detail: "Enforce Git as the single source of truth for Kubernetes cluster state."
        }
      ],
      resources: [
        {
          name: "Adrian Cantrill - AWS Solutions Architect Associate Course",
          type: "course",
          url: "https://learn.cantrill.io",
          note: "Gold standard in-depth cloud architecture course with architectural theory and real enterprise animations."
        },
        {
          name: "Jon Bonso Tutorials Dojo Practice Exams",
          type: "platform",
          url: "https://tutorialsdojo.com",
          note: "Highest fidelity practice questions mirroring official AWS exam difficulty and case studies."
        },
        {
          name: "Kubernetes in Action by Marko Lukša",
          type: "book",
          url: "https://www.manning.com",
          note: "Comprehensive deep dive into Kubernetes internal control loops and distributed networking."
        }
      ],
      checkpoint: {
        criteria: "Passing AWS SAA-C03 (score 800+/1000) and CKA certification exam on the first attempt.",
        deliverable: "Digital verifiable Credly certification badges and live Kubernetes cluster running GitOps via ArgoCD."
      },
      decisionPoints: [
        {
          question: "Multiple Associate Certifications vs One Deep Professional Certification",
          options: [
            {
              choice: "Deep CKA + AWS Solutions Architect Professional (SAP-C02)",
              pros: "Proves serious enterprise engineering competence; puts you in the top 5% of candidate resumes.",
              cons: "Exams are notoriously difficult and require 300+ hours of rigorous problem solving."
            },
            {
              choice: "Broad Stack of 4-5 Associate / Practitioner Certs",
              pros: "Broad awareness across security, data, and devops domains in shorter time.",
              cons: "Viewed by senior hiring managers as 'paper certification' without hands-on proof."
            }
          ]
        }
      ],
      warning: "Relying on brain dumps to pass certifications: You might get the certificate, but you will fail the 15-minute technical scenario interview when asked to design disaster recovery across two regions.",
      fallbackPlan: "If AWS certification is delayed, focus on building an open-source Terraform module or Kubernetes Helm chart on GitHub to demonstrate real competence directly to recruiters.",
      realWorldStats: [
        {
          label: "CKA Exam Pass Rate",
          value: "~50% - 55%",
          context: "Hands-on command-line terminal exam"
        },
        {
          label: "Certified Architect Salary Premium",
          value: "25% - 35%",
          context: "Higher starting CTC compared to non-certified peers"
        }
      ]
    },
    {
      investment: {
        time: "3-5 Years senior production experience & organizational leadership",
        cost: "₹50,000 - ₹1,50,000 (FinOps Certified Practitioner, Togaf 9/10, executive networking)"
      },
      actionItems: [
        {
          task: "Design resilient Multi-Region and Disaster Recovery architectures (RPO < 5 mins, RTO < 15 mins).",
          detail: "Implement DynamoDB global tables, Aurora cross-region read replicas, Route 53 latency routing, and AWS KMS key replication."
        },
        {
          task: "Lead Cloud FinOps and cost governance initiatives to reduce monthly cloud burn by 25-40%.",
          detail: "Audit unallocated compute, convert on-demand workloads to Savings Plans / Spot instances, and enforce resource tagging policies."
        },
        {
          task: "Formulate Enterprise Cloud Security and Compliance posture (SOC 2, ISO 27001, HIPAA, PCI-DSS).",
          detail: "Implement AWS Organizations, Service Control Policies (SCPs), GuardDuty, AWS Config rules, and IAM zero-trust policies."
        }
      ],
      resources: [
        {
          name: "Cloud FinOps: Collaborative, Real-Time Cloud Value Decision Making (O'Reilly)",
          type: "book",
          url: "https://www.oreilly.com",
          note: "The blueprint for driving financial accountability and unit economic efficiency in the cloud."
        },
        {
          name: "AWS Well-Architected Whitepapers",
          type: "documentation",
          url: "https://aws.amazon.com/architecture/well-architected",
          note: "Official architectural guidelines for designing fault-tolerant, secure, and cost-effective distributed systems."
        },
        {
          name: "Gartner IT Infrastructure & Cloud Summit",
          type: "platform",
          url: "https://www.gartner.com",
          note: "Industry intelligence on cloud migrations, vendor lock-in mitigation, and enterprise platform engineering."
        }
      ],
      checkpoint: {
        criteria: "Successfully migrating a legacy on-premise monolith to a cloud-native microservices architecture with zero production downtime.",
        deliverable: "Approved Enterprise Architecture Blueprint, FinOps cost reduction report, and executive stakeholder sign-off."
      },
      decisionPoints: [
        {
          question: "Principal Cloud Architect (Enterprise / MNC) vs Cloud Pre-Sales Solutions Architect (AWS/Google)",
          options: [
            {
              choice: "Pre-Sales / Partner Solutions Architect at Cloud Vendor (AWS/Azure/GCP)",
              pros: "High compensation with lucrative variable bonuses, work across dozens of diverse client architectures.",
              cons: "Heavy travel and customer quota pressures; does not manage ongoing operational systems."
            },
            {
              choice: "Internal Enterprise Principal Cloud Architect",
              pros: "Deep ownership over long-term platform evolution, culture, and team mentorship.",
              cons: "Can get bogged down in enterprise politics, legacy procurement, and slow corporate approvals."
            }
          ]
        }
      ],
      warning: "Over-architecting solutions with unnecessary microservices and distributed complexity when a simple managed serverless or container service would suffice.",
      fallbackPlan: "Transition into a Director of Platform Engineering or Chief Information Security Officer (CISO) track, where enterprise cloud governance skills are in extreme demand.",
      realWorldStats: [
        {
          label: "Principal Cloud Architect CTC",
          value: "₹45L - ₹90L/yr",
          context: "India Tier-1 enterprises & GCCs (Bengaluru, Hyderabad, Pune)"
        },
        {
          label: "Global US Compensation",
          value: "$180,000 - $320,000/yr",
          context: "Lead Enterprise Solutions Architects"
        }
      ]
    }
  ],

  "cybersecurity": [
    {
      investment: {
        time: "2 Years (Class 11-12 + 1 hr daily networking & Linux exploration)",
        cost: "₹25,000 - ₹75,000 (Home computer, networking gear, basic online courses)"
      },
      actionItems: [
        {
          task: "Learn computer networking, subnetting, Wireshark packet analysis, and DNS queries.",
          detail: "Capture and analyze unencrypted HTTP, FTP, and DNS packets on your home Wi-Fi to understand protocol vulnerabilities."
        },
        {
          task: "Learn Python and Bash scripting for automating network scanning and banner grabbing.",
          detail: "Write a simple port scanner in Python using socket library to inspect open ports on local devices."
        },
        {
          task: "Complete beginner challenges on OverTheWire (Bandit wargame).",
          detail: "Solve 34 levels of Linux command-line puzzles to build foundational shell navigation skills."
        }
      ],
      resources: [
        {
          name: "OverTheWire: Bandit Wargame",
          type: "platform",
          url: "https://overthewire.org/wargames/bandit",
          note: "The universally recommended starting point for learning terminal security and privilege navigation."
        },
        {
          name: "Wireshark Network Analysis by Laura Chappell",
          type: "book",
          url: "https://wiresharkbook.com",
          note: "Practical handbook for packet capture, traffic analysis, and network troubleshooting."
        },
        {
          name: "NetworkChuck - Free Cybersecurity Tutorials",
          type: "course",
          url: "https://www.youtube.com/c/NetworkChuck",
          note: "Engaging, visual explanations of hacking tools, routers, VPNs, and Linux fundamentals."
        }
      ],
      checkpoint: {
        criteria: "Completing all 34 levels of Bandit on OverTheWire and analyzing a `.pcap` capture file to identify credentials.",
        deliverable: "Personal technical writeup document detailing solved Bandit wargame levels."
      },
      decisionPoints: [
        {
          question: "B.Tech in Computer Science vs B.Tech / B.Sc in Cybersecurity",
          options: [
            {
              choice: "Core B.Tech in Computer Science & Engineering",
              pros: "Superior understanding of low-level memory, OS kernels, and compilers; wider fallback software options.",
              cons: "Requires independent self-study to learn modern pentesting tools and defensive forensics."
            },
            {
              choice: "Specialized Degree in Cybersecurity / Forensic Science",
              pros: "Curriculum directly covers cryptography, ethical hacking, and cyber law from day one.",
              cons: "Some specialized college programs lack deep software development and algorithm foundations."
            }
          ]
        }
      ],
      warning: "Engaging in unauthorized hacking or running DDoS scripts on school or public networks: Cybercrime laws (IT Act Section 66) carry non-bailable criminal penalties; always practice exclusively in legal, isolated sandbox labs.",
      fallbackPlan: "If engineering entrance results are low, enroll in a standard BCA or B.Sc IT and build credibility through competitive Capture The Flag (CTF) rankings.",
      realWorldStats: [
        {
          label: "Global Cybersecurity Talent Deficit",
          value: "3.5+ Million Unfilled Jobs",
          context: "Chronic talent shortage reported by ISC2"
        },
        {
          label: "Indian Cybersecurity Market Growth",
          value: "18% - 20% Annually",
          context: "Driven by banking regulations and data privacy compliance"
        }
      ]
    },
    {
      investment: {
        time: "4 Years (Undergraduate degree + 15 hrs/week hands-on lab challenges)",
        cost: "₹3,00,000 - ₹12,00,000 (College tuition + TryHackMe/HackTheBox VIP subscriptions ₹15,000/yr)"
      },
      actionItems: [
        {
          task: "Complete TryHackMe learning paths: Complete Beginner, Web Fundamentals, and Junior Penetration Tester.",
          detail: "Learn OWASP Top 10 vulnerabilities: SQL Injection, Cross-Site Scripting (XSS), CSRF, IDOR, and SSRF."
        },
        {
          task: "Participate in national and global CTFs (PicoCTF, DEF CON CTF qualifiers, NahamCon CTF).",
          detail: "Specialize in Web Exploitation, Reverse Engineering, Cryptography, or Forensics."
        },
        {
          task: "Set up a home Active Directory lab with Windows Server 2022, domain controllers, and Kali Linux.",
          detail: "Practice Kerberoasting, AS-REP roasting, pass-the-hash, and lateral movement techniques."
        }
      ],
      resources: [
        {
          name: "TryHackMe Practical Cybersecurity Training",
          type: "platform",
          url: "https://tryhackme.com",
          note: "Interactive browser-based virtual machines for hands-on offensive and defensive training."
        },
        {
          name: "PortSwigger Web Security Academy",
          type: "platform",
          url: "https://portswigger.net/web-security",
          note: "The world's premier free resource for learning and practicing web application vulnerabilities."
        },
        {
          name: "The Web Application Hacker's Handbook by Dafydd Stuttard",
          type: "book",
          url: "https://www.wiley.com",
          note: "The bible of web application penetration testing and architectural vulnerabilities."
        }
      ],
      checkpoint: {
        criteria: "Reaching Top 5% rank on TryHackMe and successfully solving 20+ 'Easy' and 'Medium' machines on Hack The Box.",
        deliverable: "Verified Hack The Box user profile badge and detailed vulnerability walkthrough writeups on personal blog."
      },
      decisionPoints: [
        {
          question: "Offensive Security (Red Team / Pentesting) vs Defensive Security (Blue Team / SOC)",
          options: [
            {
              choice: "Defensive Security (Blue Team / SOC Analyst)",
              pros: "70%+ of cybersecurity entry-level hiring; stable corporate hours; direct pathway into incident response.",
              cons: "Can involve repetitive log triage in early junior tiers (handling false positive SIEM alerts)."
            },
            {
              choice: "Offensive Security (Red Team / Pentesting)",
              pros: "High intellectual stimulation, prestige of breaking into systems, high bug bounty potential.",
              cons: "Fewer junior positions available; intense competition requiring proof of OSCP or bounties."
            }
          ]
        }
      ],
      warning: "Becoming an automated scanner runner ('script kiddie'): Running Nessus or Acunetix without understanding how vulnerabilities work at the code level will fail you in any real technical interview.",
      fallbackPlan: "Join an enterprise IT department as a Network Administrator or Systems Engineer; lateral moves into internal Cyber Security Operations Centers (SOC) are common after 1-2 years.",
      realWorldStats: [
        {
          label: "Junior SOC Analyst Starting CTC",
          value: "₹5L - ₹12L/yr",
          context: "Across Indian IT service firms, banks, and MNC GCCs"
        },
        {
          label: "SOC Hiring Ratio",
          value: "4 Blue Team : 1 Red Team",
          context: "Enterprise security budget distribution"
        }
      ]
    },
    {
      investment: {
        time: "1-2 Years intensive bounty hunting and professional certification prep",
        cost: "₹40,000 - ₹1,80,000 (Burp Suite Pro license, OSCP lab package ₹1,40,000)"
      },
      actionItems: [
        {
          task: "Earn the OSCP (Offensive Security Certified Professional) or BTL1 (Blue Team Level 1) certification.",
          detail: "OSCP's 24-hour practical exam proves real-world hands-on network and Active Directory penetration testing ability."
        },
        {
          task: "Hunt for real vulnerabilities on public bug bounty platforms (HackerOne, Bugcrowd, Intigriti).",
          detail: "Find valid sub-domain takeovers, IDORs, logic flaws, and rate-limiting bypasses on authorized targets."
        },
        {
          task: "Master SIEM and EDR platforms: Splunk, Elastic Security, Microsoft Sentinel, and CrowdStrike Falcon.",
          detail: "Write custom detection rules (Sigma, YARA) and analyze real-world malware attack chains."
        }
      ],
      resources: [
        {
          name: "OffSec PEN-200: Penetration Testing with Kali Linux (OSCP)",
          type: "course",
          url: "https://www.offsec.com/courses/pen-200",
          note: "The gold standard hands-on certification required by tier-1 security consulting firms."
        },
        {
          name: "HackerOne Hacker101 Community",
          type: "platform",
          url: "https://www.hacker101.com",
          note: "Free educational materials, private bug bounty program invites, and CTF challenges."
        },
        {
          name: "Practical Malware Analysis by Sikorski & Honig",
          type: "book",
          url: "https://nostarch.com/malware",
          note: "Essential guide to disassembling, debugging, and reverse engineering malicious binaries."
        }
      ],
      checkpoint: {
        criteria: "Passing the 24-hour OSCP exam or receiving your first valid bounty payout on HackerOne/Bugcrowd.",
        deliverable: "Official OSCP certification badge and recognized Hall of Fame acknowledgment on corporate programs."
      },
      decisionPoints: [
        {
          question: "Full-Time Bug Bounty Hunting vs Corporate Security Consultant Role",
          options: [
            {
              choice: "Full-Time Bug Bounty Hunter",
              pros: "Total freedom of location and hours; earning in US Dollars with no boss or corporate meetings.",
              cons: "Zero income stability; dry spells lasting months; intense competition from global researchers."
            },
            {
              choice: "Security Consultant / Penetration Tester at Consulting Firm (Big 4 / Boutique)",
              pros: "Guaranteed monthly salary, structured career progression, formal client interaction experience.",
              cons: "Rigid compliance reporting; writing 80-page pentest reports under strict corporate deadlines."
            }
          ]
        }
      ],
      warning: "Testing targets outside the authorized program scope in bug bounties: Breaching out-of-scope assets will result in immediate bans from platforms and potential legal action.",
      fallbackPlan: "Pivot into Cloud Security Engineering (AWS/Azure security architecture), where certified engineers with pentesting backgrounds command high demand.",
      realWorldStats: [
        {
          label: "OSCP Exam Duration",
          value: "24 Hours Hands-on + 24 Hours Reporting",
          context: "Strict proctored practical examination"
        },
        {
          label: "Average Bug Bounty Payout",
          value: "$500 - $3,000",
          context: "For verified Medium and High severity web vulnerabilities"
        }
      ]
    },
    {
      investment: {
        time: "3-6 Years progressive enterprise leadership & specialized domain mastery",
        cost: "₹50,000 - ₹1,20,000 (CISSP exam ₹65,000 + CISM / CRISC annual membership fees)"
      },
      actionItems: [
        {
          task: "Earn the CISSP (Certified Information Systems Security Professional) from ISC2.",
          detail: "Requires 5 years of verified security work experience across 8 domains: Security & Risk Management, Asset Security, Architecture, etc."
        },
        {
          task: "Architect Zero-Trust Network Access (ZTNA) and Secure Access Service Edge (SASE) for enterprise environments.",
          detail: "Enforce continuous authentication, micro-segmentation, and device health posture verification."
        },
        {
          task: "Establish Cyber Threat Intelligence (CTI) feeds and automated Incident Response playbooks (SOAR).",
          detail: "Map enterprise threat models against MITRE ATT&CK framework and lead simulated Purple Team exercises."
        }
      ],
      resources: [
        {
          name: "Official (ISC)2 CISSP CBK Reference",
          type: "book",
          url: "https://www.isc2.org",
          note: "The authoritative body of knowledge covering all 8 enterprise security governance domains."
        },
        {
          name: "MITRE ATT&CK Framework Knowledge Base",
          type: "documentation",
          url: "https://attack.mitre.org",
          note: "Globally accessible knowledge base of adversary tactics and techniques based on real-world observations."
        },
        {
          name: "SANS Institute Whitepapers and Webcasts",
          type: "platform",
          url: "https://www.sans.org",
          note: "Cutting-edge research on advanced persistent threats (APTs), digital forensics, and incident response."
        }
      ],
      checkpoint: {
        criteria: "Passing the CISSP examination and successfully leading an enterprise security audit for SOC 2 Type II or ISO 27001.",
        deliverable: "CISSP Credential verification number and signed enterprise security audit compliance certificate."
      },
      decisionPoints: [
        {
          question: "Chief Information Security Officer (CISO) Track vs Principal Security Architect",
          options: [
            {
              choice: "CISO / Security Leadership (Executive Track)",
              pros: "Seat at the executive table, direct board reporting, shaping organizational risk strategy and budgets.",
              cons: "High legal liability during corporate data breaches; high stress and burnout rate (average CISO tenure is 2 years)."
            },
            {
              choice: "Principal Security Architect (Technical Track)",
              pros: "Focus on pure technical architecture, zero management politics, high job stability.",
              cons: "Fewer executive equity grants compared to C-suite officers."
            }
          ]
        }
      ],
      warning: "Treating security as a blocker for product teams instead of a business enabler: Friction-heavy security gates cause development teams to secretly bypass security controls (Shadow IT).",
      fallbackPlan: "Transition into an independent Virtual CISO (vCISO) or Cyber Insurance Risk Assessor advising mid-market enterprises on compliance and policy.",
      realWorldStats: [
        {
          label: "Lead Security Architect CTC",
          value: "₹35L - ₹75L/yr",
          context: "India metros (Bengaluru, Mumbai, Delhi-NCR)"
        },
        {
          label: "CISO Compensation Range",
          value: "₹60L - ₹1.8 Cr+/yr",
          context: "Top Indian banks, fintechs, and multinational GCCs"
        }
      ]
    }
  ],

  "data-scientist": [
    {
      investment: {
        time: "2 Years (Class 11-12 high school curriculum + 5 hrs/week math & data intuition)",
        cost: "₹30,000 - ₹90,000 (Schooling, textbooks, graphing calculators, online tutorials)"
      },
      actionItems: [
        {
          task: "Master descriptive statistics, probability distributions (Normal, Poisson, Binomial), and hypothesis testing in school.",
          detail: "P-values, confidence intervals, and z-scores form the core foundation of A/B testing in industry."
        },
        {
          task: "Learn Python for data analysis using NumPy, Pandas, and Matplotlib.",
          detail: "Practice reading dirty CSV datasets, handling missing values, filtering rows, and generating exploratory plots."
        },
        {
          task: "Master SQL queries: SELECT, GROUP BY, HAVING, subqueries, and window functions (ROW_NUMBER, RANK).",
          detail: "SQL is the universal language for extracting enterprise data from cloud data warehouses."
        }
      ],
      resources: [
        {
          name: "Practical Statistics for Data Scientists (Bruce, Bruce & Gedeck)",
          type: "book",
          url: "https://www.oreilly.com",
          note: "The best concise bridge between mathematical statistical theory and practical Python code."
        },
        {
          name: "Mode Analytics SQL Tutorial for Data Analysis",
          type: "platform",
          url: "https://mode.com/sql-tutorial",
          note: "Interactive hands-on SQL tutorial using real-world business datasets."
        },
        {
          name: "StatQuest with Josh Starmer (YouTube)",
          type: "course",
          url: "https://statquest.org",
          note: "Clear, step-by-step visual breakdowns of probability, distributions, and regression models."
        }
      ],
      checkpoint: {
        criteria: "Scoring 85%+ in 12th Board Mathematics and solving 30+ complex SQL query puzzles on LeetCode / HackerRank.",
        deliverable: "Class 12 Marksheet and GitHub repo with exploratory data analysis (EDA) notebooks."
      },
      decisionPoints: [
        {
          question: "B.Tech in Computer Science vs B.Sc in Statistics/Mathematics (ISI / Chennai Math Institute)",
          options: [
            {
              choice: "B.Stat / B.Math at Indian Statistical Institute (ISI Kolkata/Bangalore)",
              pros: "World-class mathematical rigor, unmatched placement in quantitative finance and frontier data science.",
              cons: "Fierce entrance exam with <1% acceptance rate; very heavy theoretical math curriculum."
            },
            {
              choice: "B.Tech in Computer Science / Data Science",
              pros: "Strong software engineering skills, broad campus placement opportunities, high elective flexibility.",
              cons: "Less theoretical statistical depth compared to dedicated math/stats institutes."
            }
          ]
        }
      ],
      warning: "Assuming Data Science is just importing `sklearn.linear_model`: If you cannot explain the mathematical assumptions of ordinary least squares (homoscedasticity, multicollinearity), you will fail data science interviews.",
      fallbackPlan: "If specialized math degrees are inaccessible, take a B.Com or Economics Honours degree with a minor in statistics and build a Python/SQL data portfolio.",
      realWorldStats: [
        {
          label: "ISI Entrance Acceptance Rate",
          value: "< 1%",
          context: "India's premier statistical research institute"
        },
        {
          label: "SQL Question Weightage",
          value: "50% of Initial Screenings",
          context: "First round of data science and analyst interviews"
        }
      ]
    },
    {
      investment: {
        time: "3-4 Years (Undergraduate degree + 15 hrs/week projects & competitions)",
        cost: "₹2,00,000 - ₹10,00,000 (Tuition fees across university programs)"
      },
      actionItems: [
        {
          task: "Build supervised and unsupervised machine learning pipelines using Scikit-Learn and XGBoost/LightGBM.",
          detail: "Perform rigorous cross-validation, feature importance ranking, hyperparameter tuning, and ROC-AUC evaluation."
        },
        {
          task: "Learn cloud data warehouse querying on Snowflake, Google BigQuery, or AWS Redshift.",
          detail: "Query multi-gigabyte datasets, write optimized CTEs, and analyze query execution plans."
        },
        {
          task: "Design and interpret A/B tests: sample size determination, statistical power, p-hacking avoidance, and cuped variance reduction.",
          detail: "A/B testing is the primary mechanism tech companies use to validate product features."
        }
      ],
      resources: [
        {
          name: "Feature Engineering for Machine Learning by Alice Zheng & Amanda Casari",
          type: "book",
          url: "https://www.oreilly.com",
          note: "In-depth guide to transforming raw numerical, text, and categorical data into high-performance features."
        },
        {
          name: "Google Cloud BigQuery Sandbox & Documentation",
          type: "platform",
          url: "https://cloud.google.com/bigquery",
          note: "Query public terabyte-scale datasets for free without provisioning servers."
        },
        {
          name: "Trustworthy Online Controlled Experiments: A Practical Guide to A/B Testing (Kohavi et al.)",
          type: "book",
          url: "https://experimentguide.com",
          note: "The definitive industry handbook written by leaders from Microsoft, Google, and Amazon."
        }
      ],
      checkpoint: {
        criteria: "Publishing a complete end-to-end data science project predicting customer churn or pricing elasticity with a documented business impact report.",
        deliverable: "Interactive dashboard on Streamlit / Tableau and reproducible GitHub codebase with clear documentation."
      },
      decisionPoints: [
        {
          question: "Product Data Scientist (Metrics & Experimentation) vs Machine Learning Scientist (Algorithms)",
          options: [
            {
              choice: "Product Data Scientist",
              pros: "Close to business leadership, high influence over product roadmaps, strong demand at consumer tech companies.",
              cons: "Less deep algorithmic modeling; requires constant stakeholder presentations and SQL queries."
            },
            {
              choice: "Machine Learning Scientist",
              pros: "Deep modeling, algorithm optimization, higher initial technical prestige.",
              cons: "Higher educational bar (often prefers Master's or PhD candidates); requires strong production MLOps integration."
            }
          ]
        }
      ],
      warning: "Optimizing for accuracy on imbalanced datasets without checking Precision, Recall, and PR-AUC: A model that predicts 'no fraud' 99.9% of the time is 99.9% accurate but completely useless in business.",
      fallbackPlan: "Target Business Intelligence (BI) Analyst or Data Analyst roles upon graduation; top performers transition to Data Scientist titles within 18-24 months.",
      realWorldStats: [
        {
          label: "Campus Data Scientist CTC",
          value: "₹8L - ₹22L/yr",
          context: "Tier 1 & Tier 2 campus placements"
        },
        {
          label: "SQL vs Python Query Split",
          value: "60% SQL : 40% Python",
          context: "Daily working time of an industry product data scientist"
        }
      ]
    },
    {
      investment: {
        time: "1-2 Years intensive portfolio development, Kaggle challenges, and production deployment",
        cost: "₹15,000 - ₹60,000 (Compute credits, specialized domain courses, portfolio hosting)"
      },
      actionItems: [
        {
          task: "Compete in Kaggle competitions to reach Kaggle Expert or Master ranking.",
          detail: "Master gradient boosting ensembles, stacking techniques, and rigorous local validation schemes."
        },
        {
          task: "Deploy production data pipelines using dbt (data build tool) and Apache Airflow.",
          detail: "Build automated DAGs for data transformation, testing, and documentation in cloud data warehouses."
        },
        {
          task: "Master Deep Learning for NLP and Tabular data using PyTorch and Hugging Face.",
          detail: "Fine-tune language models for classification, sentiment extraction, and automated text summarization."
        }
      ],
      resources: [
        {
          name: "Kaggle Competitions & Datasets",
          type: "platform",
          url: "https://www.kaggle.com",
          note: "Global community platform for competitive machine learning and data science benchmarking."
        },
        {
          name: "dbt (data build tool) Fundamentals Course",
          type: "course",
          url: "https://courses.getdbt.com",
          note: "Free, industry-standard training for modern analytics engineering and data transformation."
        },
        {
          name: "Storytelling with Data by Cole Nussbaumer Knaflic",
          type: "book",
          url: "https://www.storytellingwithdata.com",
          note: "Mastering executive data visualization and communicating analytical insights to non-technical leaders."
        }
      ],
      checkpoint: {
        criteria: "Achieving at least 2 Kaggle medals (Silver/Gold) or deploying an automated dbt pipeline servicing 10+ analytical models.",
        deliverable: "Verified Kaggle profile URL and live analytics dashboard driving real business decisions."
      },
      decisionPoints: [
        {
          question: "Analytics Engineer Track (dbt/SQL/Data Warehouses) vs Data Scientist Track (ML/Stats)",
          options: [
            {
              choice: "Analytics Engineer Track",
              pros: "Massive industry demand, clean boundary between raw data and business models, high salary.",
              cons: "Focuses on data modeling and transformation rather than predictive mathematical algorithms."
            },
            {
              choice: "Core Data Scientist Track",
              pros: "Direct predictive modeling, causal inference, and machine learning experimentation.",
              cons: "Ambiguous role boundaries; often pulled into ad-hoc reporting if company lacks data maturity."
            }
          ]
        }
      ],
      warning: "Presenting p-values and technical ML metrics to executive business stakeholders: Executives care about revenue, retention, and CAC, not whether your F1-score improved by 0.02.",
      fallbackPlan: "Transition into a Growth Analyst or Product Operations role; having strong data intuition makes you an invaluable partner to product management.",
      realWorldStats: [
        {
          label: "Senior Data Scientist CTC",
          value: "₹24L - ₹55L/yr",
          context: "India technology unicorns and global capability centers"
        },
        {
          label: "Remote US Compensation",
          value: "$130,000 - $210,000/yr",
          context: "Senior Data Scientist global remote roles"
        }
      ]
    }
  ],

  "game-developer": [
    {
      investment: {
        time: "2 Years (High school physics & math + 5 hrs/week game engine exploration)",
        cost: "₹40,000 - ₹1,20,000 (Computer with dedicated GPU, gaming books, indie assets)"
      },
      actionItems: [
        {
          task: "Master Vector Mathematics, Trigonometry, and Newtonian Physics in Class 11-12.",
          detail: "Dot products, cross products, kinematic equations, and collision detection physics are vital for game math."
        },
        {
          task: "Learn C++ or C# syntax and Object-Oriented Programming principles.",
          detail: "Understand memory management, pointers/references, classes, inheritance, and composition over inheritance."
        },
        {
          task: "Download Godot Engine or Unity and build a complete 2D arcade clone (Pong, Flappy Bird, Space Invaders).",
          detail: "Implement user input handling, sprite animation, audio triggers, score keeping, and game-over state loops."
        }
      ],
      resources: [
        {
          name: "Game Programming Patterns by Robert Nystrom",
          type: "book",
          url: "https://gameprogrammingpatterns.com",
          note: "Free online book explaining design patterns (Game Loop, Component, State, Object Pool) tailored for games."
        },
        {
          name: "Brackeys Unity Archive & Tutorials",
          type: "course",
          url: "https://www.youtube.com/c/Brackeys",
          note: "The most beloved beginner tutorials for Unity game development and C# scripting."
        },
        {
          name: "Math for Game Developers (Freya Holmér)",
          type: "course",
          url: "https://www.youtube.com/c/FreyaHolmer",
          note: "Magnificent visual explanations of vectors, splines, quaternions, and shaders."
        }
      ],
      checkpoint: {
        criteria: "Publishing a playable 2D game on Itch.io with working sound, restart loop, and clean collision physics.",
        deliverable: "Live Itch.io game URL and public GitHub repository."
      },
      decisionPoints: [
        {
          question: "Unity (C#) vs Unreal Engine (C++ / Blueprints) for Beginners",
          options: [
            {
              choice: "Unity (C#)",
              pros: "Fast iteration, massive asset store, dominates mobile and indie game development, gentle learning curve.",
              cons: "Less native photorealism out-of-the-box compared to Unreal."
            },
            {
              choice: "Unreal Engine 5 (C++ & Blueprints)",
              pros: "Industry standard for AAA console/PC games, Nanite & Lumen photorealism, node-based Visual Scripting.",
              cons: "Steep hardware requirements; heavy compile times; C++ memory management."
            }
          ]
        }
      ],
      warning: "Attempting to build a massive multiplayer online RPG (MMORPG) as your first game project: Scope creep causes 99% of beginner game developers to abandon their projects within two weeks.",
      fallbackPlan: "If specialized game design colleges are too expensive, take a standard B.Tech in Computer Science and build games during annual college hackathons and game jams.",
      realWorldStats: [
        {
          label: "Mobile Game Market Share",
          value: "50%+ of Global Gaming Revenue",
          context: "Led heavily by Unity engine games"
        },
        {
          label: "First Game Completion Rate",
          value: "< 5% of Beginners",
          context: "Due to over-scoped initial project ambition"
        }
      ]
    },
    {
      investment: {
        time: "3-4 Years (Undergraduate degree + 20 hrs/week game programming)",
        cost: "₹3,00,000 - ₹15,00,000 (Tuition fees across university programs)"
      },
      actionItems: [
        {
          task: "Master 3D gameplay programming: Character Controllers, Camera Systems, and State Machines.",
          detail: "Implement smooth third-person character movement, raycast ground checks, jump mechanics, and camera collision clipping."
        },
        {
          task: "Learn Shader programming (HLSL/GLSL) and write custom vertex and fragment shaders.",
          detail: "Create custom water effects, toon shading, dissolution effects, and screen-space post-processing."
        },
        {
          task: "Implement Artificial Intelligence behaviors using Behavior Trees, NavMesh pathfinding, and Finite State Machines (FSM).",
          detail: "Code realistic enemy patrol routes, field-of-view detection, cover-seeking, and combat attack loops."
        }
      ],
      resources: [
        {
          name: "Real-Time Rendering (Akenine-Möller, Haines, Hoffman)",
          type: "book",
          url: "https://www.realtimerendering.com",
          note: "The definitive encyclopedia of modern real-time graphics and rendering pipelines."
        },
        {
          name: "Unity Learn Premium (Free Access)",
          type: "platform",
          url: "https://learn.unity.com",
          note: "Official structured courses from Unity covering gameplay, rendering, and optimization."
        },
        {
          name: "Unreal Engine Official Documentation & Learning",
          type: "platform",
          url: "https://dev.epicgames.com/community",
          note: "Comprehensive tutorials from Epic Games on Gameplay Framework, Blueprints, and C++ integration."
        }
      ],
      checkpoint: {
        criteria: "Developing a polished 3D playable demo with functional AI enemies, health systems, and custom UI.",
        deliverable: "Playable 3D demo build and a 60-second gameplay video showcase on YouTube / LinkedIn."
      },
      decisionPoints: [
        {
          question: "Gameplay Programmer vs Graphics / Engine Programmer",
          options: [
            {
              choice: "Gameplay Programmer",
              pros: "Works directly with game designers, focuses on player feel, animation blending, combat mechanics.",
              cons: "Higher competition; lower compensation ceiling than specialized low-level graphics engineers."
            },
            {
              choice: "Graphics / Engine Programmer",
              pros: "Rare specialized skill, high demand in AAA studios (Rockstar, EA, Ubisoft), top compensation.",
              cons: "Requires intense linear algebra, Vulkan/DirectX 12 API mastery, and GPU architecture expertise."
            }
          ]
        }
      ],
      warning: "Neglecting performance profiling and garbage collection: Allocating memory every frame inside the `Update()` loop causes devastating frame-rate drops on mobile and consoles.",
      fallbackPlan: "Target Simulation / AR / VR Engineering roles in automotive, defense, or architectural visualization industries, which pay handsomely for Unity and Unreal talent.",
      realWorldStats: [
        {
          label: "Target Console Frame Rate",
          value: "60 FPS (16.6ms budget per frame)",
          context: "Non-negotiable industry performance standard"
        },
        {
          label: "Junior Game Programmer CTC",
          value: "₹5L - ₹12L/yr",
          context: "Indian game studios (Ubisoft India, Nazara, Dream11)"
        }
      ]
    },
    {
      investment: {
        time: "1-2 Years intensive game jam participation and portfolio polish",
        cost: "₹10,000 - ₹50,000 (Game jam tickets, Steam developer fees $100/game, sound asset licenses)"
      },
      actionItems: [
        {
          task: "Participate in at least 5 global game jams (Ludum Dare, Global Game Jam, GMTK Game Jam).",
          detail: "Build and submit functional thematic games within strict 48-hour or 72-hour deadlines."
        },
        {
          task: "Implement Multiplayer Networking using Photon Fusion, Unity Netcode for GameObjects, or Unreal Replication.",
          detail: "Handle client prediction, server reconciliation, lag compensation, and RPC message serialization."
        },
        {
          task: "Release a commercial game on Steam, Google Play, or App Store.",
          detail: "Integrate Steamworks SDK (achievements, leaderboards, cloud saves) or mobile in-app purchases and analytics."
        }
      ],
      resources: [
        {
          name: "Ludum Dare Game Jam",
          type: "platform",
          url: "https://ldjam.com",
          note: "The longest-running global game jam where developers build games from scratch in 48 hours."
        },
        {
          name: "Game Maker's Toolkit (Mark Brown on YouTube)",
          type: "course",
          url: "https://www.youtube.com/c/MarkBrownGMT",
          note: "Masterclass analyses of level design, player agency, accessibility, and game mechanics."
        },
        {
          name: "Steamworks Documentation & SDK",
          type: "documentation",
          url: "https://partner.steamgames.com/doc/home",
          note: "Official documentation for distributing games, handling builds, and managing store pages on Steam."
        }
      ],
      checkpoint: {
        criteria: "Releasing a commercial game on Steam with at least 50 positive reviews or ranking in the Top 10% of a major game jam.",
        deliverable: "Live Steam store page link and verified Steamworks developer badge."
      },
      decisionPoints: [
        {
          question: "Indie Solo Game Developer vs Applying to Established Game Studios",
          options: [
            {
              choice: "Applying to Established Studios (EA, Ubisoft, Sumo Digital)",
              pros: "Guaranteed monthly income, healthcare, mentorship from veteran leads, credit on famous IP.",
              cons: "You are a small cog in a 500-person machine; occasional crunch time before ship dates."
            },
            {
              choice: "Indie Solo Development",
              pros: "100% creative control over art, code, and story; keep all revenue after store cut.",
              cons: "Extreme financial risk; 90% of indie games make less than $1,000 on Steam."
            }
          ]
        }
      ],
      warning: "Ignoring game marketing until release day: Launching a game without building a Steam wishlist community over 6-12 months guarantees zero visibility in Steam's algorithm.",
      fallbackPlan: "Work as a freelance Unity/C# contractor on Upwork or Fiverr building custom gameplay mechanics for international clients.",
      realWorldStats: [
        {
          label: "Steam Wishlist Rule of Thumb",
          value: "7,000 - 10,000 Wishlists",
          context: "Minimum required for algorithmic launch visibility on Steam"
        },
        {
          label: "Global Games Industry Value",
          value: "$180+ Billion",
          context: "Larger than global film and music industries combined"
        }
      ]
    },
    {
      investment: {
        time: "3-5 Years studio production experience on shipped titles",
        cost: "₹30,000 - ₹1,00,000 (GDC vault pass, specialized studio leadership workshops)"
      },
      actionItems: [
        {
          task: "Lead Technical Architecture for gameplay subsystems, memory budgets, and multithreaded job systems (Unity DOTS / Unreal Mass).",
          detail: "Profile frame render times using RenderDoc, PIX, and Unity Profiler to hit locked 60 FPS on PlayStation/Xbox."
        },
        {
          task: "Establish continuous build automation and automated smoke test bots using Jenkins and Perforce (Helix Core).",
          detail: "Automate daily nightly builds for target platforms (Windows, iOS, Android, Switch, PS5)."
        },
        {
          task: "Mentor junior gameplay programmers and conduct technical code reviews on game balance and network replication.",
          detail: "Maintain clean coding standards, documentation, and reusable cross-project gameplay libraries."
        }
      ],
      resources: [
        {
          name: "GDC (Game Developers Conference) Vault",
          type: "platform",
          url: "https://www.gdcvault.com",
          note: "World's most valuable repository of technical presentations from AAA studio directors."
        },
        {
          name: "RenderDoc Graphic Debugger",
          type: "tool",
          url: "https://renderdoc.org",
          note: "The open-source standalone graphics debugger for frame inspection and shader profiling."
        },
        {
          name: "Perforce Helix Core Version Control",
          type: "platform",
          url: "https://www.perforce.com",
          note: "The industry standard version control system for multi-gigabyte binary game assets and AAA pipelines."
        }
      ],
      checkpoint: {
        criteria: "Shipping at least 1 major commercial title on PC or Consoles with your name in the game credits.",
        deliverable: "Verified MobyGames developer credits listing and shipped commercial game build."
      },
      decisionPoints: [
        {
          question: "Technical Director (Technical Leadership) vs Lead Game Designer (Creative Direction)",
          options: [
            {
              choice: "Technical Director (TD)",
              pros: "Owns engine selection, architectural stability, performance budgets, highly compensated.",
              cons: "Less direct say over creative narrative, level art, or gameplay mechanics."
            },
            {
              choice: "Lead Game Designer",
              pros: "Shapes the creative soul, story, player emotions, and moment-to-moment gameplay loops.",
              cons: "Subject to publisher executive pressure and subjective creative criticism."
            }
          ]
        }
      ],
      warning: "Allowing technical debt to accumulate during pre-production: Patching quick hacks without refactoring ensures the final 6 months of shipping will be an agonizing bug nightmare.",
      fallbackPlan: "Transition into Technical Art or VFX programming; the bridge between 3D artists and game code commands massive industry premiums.",
      realWorldStats: [
        {
          label: "Lead Game Programmer CTC",
          value: "₹25L - ₹60L/yr",
          context: "Indian studio leads (Rockstar Games India, EA Hyderabad, Ubisoft Pune)"
        },
        {
          label: "Global AAA Senior Salary",
          value: "$120,000 - $190,000/yr",
          context: "Senior Game Engineers in US, Canada, and Europe"
        }
      ]
    }
  ]
};

