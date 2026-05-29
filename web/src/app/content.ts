import type { Dossier } from './content.model';

/**
 * Bo Shang's signed op-ed on the AI Race, structured as data.
 * Stance: with Jensen Huang; against Anthropic's "2028: Two scenarios" export-control thesis.
 * Sign-off: bo@trenchwork.org / bo@shang.software
 *
 * Prose, rebuttal matrix, and datasets authored & fact-checked by a 24-agent research workflow.
 */
export const DOSSIER: Dossier = {
  "sections": [
    {
      "id": "thesis",
      "eyebrow": "Position",
      "title": "The Cage Is the Threat",
      "dek": "I agree with Jensen Huang and I disagree with Anthropic. Weaponizing access to Nvidia, TSMC, and ASML's EUV monopoly does not preserve an American lead — it manufactures the self-reliant competitor America most fears.",
      "body": [
        "Let me state my position before I defend it, because I am not interested in the usual Washington ritual of pretending both sides have a point. I agree with Jensen Huang. I disagree with Anthropic's May 14, 2026 essay, *2028: Two scenarios for global AI leadership*. The thesis of that paper — that America should seek a **12-24 month lead** by tightening the chokepoints on Chinese compute, closing the smuggling and offshore-datacenter and DUV-servicing loopholes, criminalizing distillation, and exporting the American stack to deny China footholds — is, in my read of the silicon, exactly backwards. The export-control regime built around Nvidia GPUs, TSMC fabrication, and ASML's lithography is not a wall around China. It is an incubator. The cage is the threat.",
        "Start with the physics, because everything downstream is a consequence of one machine. ASML holds a **100% monopoly on EUV** lithography and roughly **83% of the litho market** overall; its scanners use a 13.5nm wavelength at 0.33 numerical aperture to resolve features no DUV tool can touch in a single exposure. The US-Dutch-Japanese bloc denies EUV to China entirely, which caps SMIC at 193nm ArF-immersion DUV and forces self-aligned multi-patterning to reach a 7nm-class node. The canonical penalty: a 7nm layer that takes **~9 EUV steps takes ~34 DUV steps**. More masks mean more edge-placement error, more overlay defects, longer cycle time — which is why SMIC's N+2 (~7nm) yields run **~50-60%** against TSMC's **80-90%**, and why Huawei's Ascend sits two to three nodes behind the leading edge — Nvidia's Blackwell on TSMC's 5nm-class 4NP, and Rubin on 3nm. This is the actual lever the controls pull. It is real, and it bites.",
        "And here is where the consensus and I part ways. The pro-control case treats that per-chip deficit as the whole game, and on per-chip silicon it is not even close: Nvidia's Rubin delivers **~50 PFLOPS at FP4** against the Ascend 950's ~2, an order-32 advantage. CFR projects US chips at **>17x** Huawei's by 2027; Anthropic counts Huawei at **~4% of Nvidia's aggregate compute in 2026, ~2% in 2027**. If silicon were destiny, the line would hold and there would be no essay to write. But the contest is not decided per chip. It is decided per rack, per datacenter, and per stack — and at those altitudes the arithmetic inverts.",
        "Look at what China builds when you take its chips away. Huawei's CloudMatrix 384 packs **384 Ascend 910C** against just 72 GPUs in Nvidia's GB200 NVL72; five times the chips offset each being a third of a Blackwell, and the result is **~300 PFLOPS versus ~180**, with 3.6x the aggregate memory and a fully optical, all-to-all fabric of **6,912 transceivers** — Huawei spending its telecom and optics heritage where it has it. SemiAnalysis put it plainly: the chip is a generation behind, but the system is a generation *ahead* of current Nvidia and AMD product. The cost is **4.1x the power** and 2.5x worse perf-per-watt — and that is precisely the point. Power is America's binding constraint and China's slack variable. The US optimizes performance-per-watt because it must; China optimizes performance-per-restricted-input and pays the bill in cheap, abundant, lightly regulated electrons. Cage the chip and you simply move the competition to the axis where your adversary is least constrained.",
        "Then the loop closes. The Big Fund — a *semiconductor* vehicle — is financing DeepSeek near a **$45B** valuation; DeepSeek delayed V4 to co-design for Ascend, gave Huawei early optimization access and denied it to Nvidia, and reported R1 inference on CloudMatrix at **~90% lower cost than H100**. Chip funds the model, the model creates demand for the chip, and the whole circuit is immune to export controls by construction. This is the self-reliant full stack — Ascend plus CANN plus MindSpore plus a homegrown optical bus, with CANN now running ~80% of standard PyTorch inference on a config change — that the controls were meant to prevent and instead conjured into existence. You cannot meaningfully throttle a system that no longer touches your supply chain at any point.",
        "So when Anthropic's optimistic scenario asks for *tighter* controls to lock in a lead, I read it as a prescription to accelerate the thing it fears. DeepSeek-V4-Pro priced against our own Opus 4.8 — what they are calling Mythos internally — is the early read on where this goes: frontier-adjacent capability, domestic silicon, a fraction of the cost. China closes nodes a few years late but it closes them: 28nm, then DUV-7nm in the Kirin 9000S. The historical cadence is not a wall, it is a delay, and pressure is the catalyst that converts the delay into indigenization. Jensen has said the controls have *already largely backfired*, dropping Nvidia from **~66% to ~0%** of the China market while handing Huawei the runway and eroding CUDA as DeepSeek ports to CANN. He is right. The durable American advantage was never the chokepoint. It was the platform — the standard the world builds on. Caging China does not protect that platform. It funds the rival standard and then evicts us from the largest market on Earth, where roughly half the world's AI researchers happen to live.",
        "This is a race America cannot win by caging, because caging is not a defensive move — it is the supply of motive, capital, and a captive domestic market to a competitor that would otherwise have had to fight for all three. I would rather compete on the platform while we still own it than spend the next decade discovering, node by node, that we built the wall on the wrong side."
      ],
      "pullQuote": "The cage is not a defensive move. It is the supply of motive, capital, and a captive market to the one competitor America most fears — and we are building the wall on the wrong side.",
      "keyStats": [
        {
          "value": "~4% → ~2%",
          "label": "Huawei share of Nvidia aggregate compute, 2026→2027 (Anthropic / CFR) — the optimistic case Bo argues controls undermine"
        },
        {
          "value": "300 vs 180 PFLOPS",
          "label": "CloudMatrix 384 vs GB200 NVL72 — system beats silicon, at 4.1x the power"
        },
        {
          "value": "9 vs 34 steps",
          "label": "EUV vs DUV passes to pattern a 7nm layer — the chokepoint the controls weaponize"
        },
        {
          "value": "~66% → ~0%",
          "label": "Nvidia's China market share since controls (Bernstein / Huang) — backfire, quantified"
        }
      ]
    },
    {
      "id": "jensen",
      "eyebrow": "Alignment",
      "title": "Why Jensen Huang Is Right",
      "dek": "Caging China's AI with export controls does not stop a competitor — it manufactures one. Jensen Huang has the engineering right, and Anthropic has it backwards.",
      "body": [
        "Let me state my position without the usual diplomatic throat-clearing: Jensen Huang is right, and Anthropic's *2028* essay is wrong on the mechanism, not just the politics. Huang's argument is not a sales pitch dressed as geopolitics, however convenient that reading is. It is an accurate description of how platforms die. His thesis, repeated at CSIS, Computex, and on the Hill, is that export controls are \"short-sighted and dangerous,\" that they have \"already largely backfired,\" and that their first-order effect is not to slow China but to **accelerate Huawei** while ceding the second-largest technology market on Earth and roughly half the world's AI researchers. Nvidia's China share went from about **66% in 2024 to effectively 0% now**. That is not a stockpile we denied the adversary. That is a market we gifted to the one domestic champion best positioned to take it.",
        "Start with what is actually true on the silicon, because I will not win this argument by pretending the gap does not exist. It does, and it is enormous. Nvidia's Rubin delivers about **50 PFLOPS at FP4 per chip**; Huawei's Ascend 950PR delivers roughly **2 PFLOPS** — a per-chip edge near **32x**. The root cause is manufacturing, and the manufacturing root cause is one machine: ASML's EUV scanner, which China cannot buy. Denied EUV, SMIC is stuck on N+2 (~7nm) DUV multipatterning — **~34 lithography steps** where EUV needs ~9 — at **50-60% yield** against TSMC's **80-90%**. The 950PR is a monolithic single die precisely because Huawei cannot touch TSMC's CoWoS packaging. Huawei's own roadmap concedes the 950PR and 950DT have *lower* total processing performance than the older 910C. CFR is not wrong that the best US chips could be 17x more powerful by 2027. I concede every per-chip number on the table.",
        "And here is why none of that wins the war. The contest is not per-chip; it is per-rack, and at the system altitude the picture inverts. Huawei's CloudMatrix 384 packs **384 Ascend 910C** against just **72 GPUs** in Nvidia's GB200 NVL72 — five times the chips, each a third the part — and lands at roughly **300 PFLOPS versus ~180**, with 3.6x the aggregate memory and 2.1x the bandwidth, stitched together by a fully optical, all-to-all fabric of **6,912 transceivers** drawn straight from Huawei's telecom heritage. SemiAnalysis put it plainly: the chip is a generation behind, but the system is a generation *ahead* of current Nvidia and AMD commercial products. The cost is **4.1x the power** and 2.5x worse efficiency per FLOP. In the United States, where the grid is the binding constraint, that trade is fatal. In China, where energy is cheap, abundant, and lightly regulated, power is the slack variable. America optimizes performance-per-watt; China optimizes performance-per-*restricted-input*, and spends electrons it has plenty of. Ren Zhengfei said it himself — the chips trail in raw power, but mathematical optimization and cluster scale close the gap on real workloads. He is describing exactly what the benchmarks show.",
        "The actual prize was never the hardware delta, and this is the part Anthropic's prescription misreads completely. Nvidia's durable moat is **CUDA** plus fifteen years of mature PyTorch tooling, libraries, and hand-tuned kernels — a developer habit, not a transistor count. So consider what we did. We forced China's labs off CUDA and onto CANN. Huawei open-sourced CANN 8.0, added a SIMT execution model in \"CANN Next\" that mirrors CUDA's core abstractions, and now reportedly runs **~80% of standard PyTorch inference** with config changes rather than rewrites. ByteDance and Alibaba, per Reuters, are \"much happier now\"; ByteDance alone plans **over $5.6B** of Ascend spend in 2026. Baidu and Huawei already control **~70%** of China's GPU cloud, with PaddlePaddle fused into Huawei silicon to rival the Nvidia-PyTorch stack. Every researcher we push onto CANN is a person erecting the competing standard. We are not defending the moat. We are funding the bridge across it with our own policy, and calling it containment.",
        "Then there is DeepSeek, which is the whole thesis compressed into one company. DeepSeek ran R1 inference on CloudMatrix and Ascend 910C, claimed it beats Nvidia for that workload, and cut costs roughly **90% versus H100** — serving at about one yuan per million tokens. It delayed V4 specifically to co-design for the Ascend 950PR, gave Huawei early optimization access and denied it to Nvidia and AMD, and V4 reportedly hits **2.87x an H20** on the 950PR. The kicker: the **Big Fund** — a *semiconductor* investment vehicle — is leading a DeepSeek round near a **$45B valuation**. A chip fund financing a model lab closes the national loop: chip to system to software to model to demand for more domestic chips. This is a frontier-class model running natively on Chinese silicon, structurally immune to export controls. It is the \"technological sovereignty premium\" made flesh — and it exists *because* we made CUDA a geopolitical liability and turned Nvidia into a \"legacy\" choice for state-backed firms.",
        "So I disagree with Anthropic's specific asks — close the smuggling, foreign-datacenter, and DUV-servicing loopholes; restrict model access and criminalize distillation; champion American AI exports to lock China out — not because the goal is unworthy but because the mechanism is self-defeating. China's historical cadence is unambiguous: it closes nodes a few years late, but it closes them. 28nm, then DUV-7nm in the 2023 Kirin 9000S. Forced self-reliance is already funding SiCarrier, SMEE, CXMT's domestic HBM3, and homegrown EUV trials — the exact self-sufficient competitor the controls were drafted to prevent. The Anthropic essay's own optimistic numbers — Huawei at ~4% of Nvidia's aggregate compute in 2026, ~2% in 2027, the US commanding an 11x compute edge — are a snapshot of a delta that controls are actively converting into permanent indigenization. You can win the next eight quarters of the benchmark and lose the platform for a decade. Huang understands that American strength is the platform, not a temporary hardware lead. The caging strategy trades the durable asset for the perishable one. That is not national security. That is liquidating the moat to buy a head start that China will use the runway to erase."
      ],
      "pullQuote": "A hardware lead is a number that decays; a platform is a habit that compounds. Export controls are spending the second to buy a few quarters of the first — and handing Huawei the standard, the market, and the researchers in a single stroke.",
      "keyStats": [
        {
          "value": "~32x",
          "label": "Nvidia Rubin per-chip FP4 advantage over Ascend 950PR"
        },
        {
          "value": "300 vs 180 PFLOPS",
          "label": "CloudMatrix 384 vs GB200 NVL72 at the system level"
        },
        {
          "value": "66% to 0%",
          "label": "Nvidia's China market share, 2024 to now"
        },
        {
          "value": "~90%",
          "label": "DeepSeek R1 inference cost cut on Ascend vs H100"
        }
      ]
    },
    {
      "id": "economics",
      "eyebrow": "Economics",
      "title": "The Tax That Funds Your Competitor",
      "dek": "Export controls do not starve China of compute. They forcibly convert the world's largest semiconductor market into a captive, state-financed subsidy for Huawei and SMIC — and bill the American innovator for the privilege.",
      "body": [
        "Start with the number that ends the argument before it begins: Nvidia's China share fell from roughly **66% in 2024** to approximately **0% today**. That is not a containment victory. That is the voluntary forfeiture of the second-largest technology market on earth, a market that — by Jensen Huang's count — also contains close to **half of the world's AI researchers**. When you cede a market that large, you do not delete the demand sitting inside it. Demand is conserved. It does not evaporate when you ban the H100; it migrates. The Apr 2025 H20 license requirement alone cost Nvidia a **~$5.5B** writedown, and the policy regime has since whipsawed — H20 and MI308 licenses restored in Jul 2025, H200 permitted in Dec 2025 under a 25% revenue cut paid to the U.S. government. A control regime that taxes its own champion's exports while reversing itself every two quarters is not a strategy. It is a tantrum with a balance sheet.",
        "Here is where the demand went. Ahead of the Jan 1, 2024 Dutch DUV curbs, China front-ran its purchases so hard that ASML's China revenue spiked to **~46% of sales in Q3 2023**, building a pre-control install base of immersion scanners and a spares buffer. Then the closed loop snapped shut. SMIC's ~7nm (N+2) advanced capacity reached **~50,000 wafers/month by end-2025** — enough die for over a million Ascend chips a year — and is reportedly doubling in 2026. Huawei is targeting **~600,000 Ascend 910C in 2026, up from ~300,000 in 2025**. ByteDance, which a year ago spent essentially nothing on Huawei silicon, now plans **>$5.6B of Ascend purchases in 2026**. Every one of those orders is revenue that, in a sane regime, would have flowed to an American company funding the next node. Instead it underwrites SMIC's yield-learning curve and HiBL memory. The control did not deny China compute; it redirected the *financing* of China's compute from Nvidia's R&D budget to Huawei's.",
        "And the financing is the entire game, because the bottleneck is manufacturing, not ambition. The wall is one machine: ASML's **100% monopoly on EUV**, the 13.5nm-wavelength lithography China is barred from. Denied it, SMIC is pinned to 193nm DUV immersion and must substitute optics with brute process — a 7nm layer needs **~34 DUV multipatterning steps versus ~9 with EUV**. The penalty is structural: SMIC yields run **~50-60% against TSMC's ~80-90%**, at roughly 2x the cycle time. Per chip, Nvidia wins crushingly — Rubin delivers **~50 PFLOPS FP4** against the Ascend 950PR's ~2, a **~25-32x** gap, and CFR projects the best U.S. chips at **>17x** more powerful by 2027. None of that is in dispute. The mistake is treating a per-chip deficit as a permanent moat. A yield curve climbs when you force volume through it — the Ascend 910C went from ~20% yield in late 2024 to ~40% in early 2025, and crossed into profitability precisely there. Controls are the volume mandate.",
        "China is not trying to win the contest you scored. It is changing the scoring. The CloudMatrix 384 super-node packs **384 Ascend 910C against just 72 GPUs in Nvidia's GB200 NVL72** — five times the chip count offsetting each chip being a third of a Blackwell — and lands **~300 PFLOPS against ~155-180**, with **3.6x the aggregate memory and 2.1x the bandwidth**, lashed together by a fully optical all-to-all fabric of **6,912 transceivers** drawn straight from Huawei's telecom heritage. SemiAnalysis's verdict is the one that should keep export hawks awake: the chip is a generation behind, but the *system* is a generation ahead of anything Nvidia or AMD ship commercially. The price is **4.1x the power** — 559 kW versus 145 kW, 2.5x worse per-FLOP. That trade is the whole thesis. In the U.S., power is the binding constraint. In China, energy is cheap, abundant, and lightly regulated. America optimizes performance-per-watt; China optimizes performance-per-restricted-input and pays for it with the slack variable Washington cannot embargo: electricity.",
        "Now follow the money to where it actually compounds — the model layer, and the price the rest of the world will pay. DeepSeek ran R1 inference on CloudMatrix and claimed a **~90% cost cut versus the H100**, serving at roughly one yuan per million tokens. It delayed V4 specifically to co-design for the Ascend 950PR, gave Huawei early optimization access while denying it to Nvidia and AMD, and V4 reportedly hits **2.87x the H20** on domestic silicon. The 'Big Fund' — a *semiconductor* investment vehicle — is leading a DeepSeek round near a **$45B** valuation. Read that again: a chip fund is financing a model lab, because the model is now the demand engine for the chips. Chip → system → software → model → demand for more domestic chips. The loop is closed, indigenous, and structurally immune to export controls. This is what 'good enough' looks like as an export product: a frontier-class model running natively on Chinese hardware, undercutting Opus-4.8-class pricing, marketed to every cost-sensitive buyer in the Global South and to allies who quietly resent being told whose stack to run.",
        "Which brings me to Anthropic's prescription in its May 14 essay — close the smuggling, offshore-datacenter, and DUV-servicing loopholes; criminalize distillation; champion American AI exports to lock China out. Every one of those levers tightens the same vise that built the loop in the first place. Servicing the pre-control DUV base? That base was stockpiled *because* of the controls. Criminalizing distillation? It accelerates the indigenous CANN/MindSpore stack — already commanding, with Baidu, **~70% of China's GPU cloud** — that is eroding the only durable American moat, CUDA. The honest economic ledger reads: controls forfeit the largest market, convert forced domestic demand into a Huawei subsidy, push allies and the unaligned world toward a cheaper Chinese stack, and starve U.S. firms of exactly the revenue that funds the next generation of silicon. You cannot tax your innovator and subsidize his rival and call the difference national security.",
        "Anthropic's optimistic case pegs Huawei at **~4% of Nvidia's aggregate compute in 2026, ~2% in 2027**, and a U.S. sector with **~11x** China's AI compute if controls hold. I do not dispute that those numbers describe 2027. I dispute that they describe 2030 — because they are static snapshots of a dynamic the controls themselves are accelerating. The 4% is not a ceiling China bumps against. It is a floor the embargo is forcing it to build up from, with state capital, captive demand, and cheap power as the foundation."
      ],
      "pullQuote": "You cannot tax your own innovator, subsidize his rival, and call the difference national security. The control didn't deny China compute — it just moved the bill for it from Huawei's books to Nvidia's.",
      "keyStats": [
        {
          "value": "~66% → ~0%",
          "label": "Nvidia's China market share, 2024 to today"
        },
        {
          "value": ">$5.6B",
          "label": "ByteDance's planned 2026 Ascend spend, up from near zero"
        },
        {
          "value": "4.1x",
          "label": "CloudMatrix 384 power draw vs GB200 NVL72 — energy as China's slack variable"
        },
        {
          "value": "~90%",
          "label": "DeepSeek's claimed inference cost cut on Ascend vs the H100"
        }
      ]
    },
    {
      "id": "two-levels",
      "eyebrow": "Framework",
      "title": "Two Levels, Opposite Answers",
      "dek": "Ask whether China is behind on AI and you get two contradictory answers depending on altitude. Measure the chip and Nvidia wins by 30x. Measure the rack and Huawei wins. That gap is the entire argument.",
      "body": [
        "The first thing I tell anyone who wants to reason about the AI hardware race is that you have to declare your altitude before you open your mouth. There are exactly two levels of analysis, and they give nearly opposite answers. At the level of the individual die, the contest is a rout: Nvidia's Rubin pushes roughly **50 PFLOPS at FP4** per GPU with 288GB of HBM4, while Huawei's Ascend 950PR shipping in Q1 2026 manages about **2 PFLOPS at MXFP4** on 128GB of self-built HBM. That is a per-chip advantage on the order of **25 to 32x**, and it is not a fluke of one benchmark. It is the downstream signature of one upstream fact: TSMC builds Rubin on a 3nm node (and Blackwell on a 5nm-class node), and Huawei is stranded on SMIC's N+2 process at roughly 7nm, two to three generations behind, at **50-60% yield against TSMC's 80-90%**. Stop your analysis here and Anthropic's optimistic scenario writes itself.",
        "But almost nobody runs a single chip. They run a datacenter. So raise the altitude to the rack and the answer inverts. Huawei's CloudMatrix 384, sold as the Atlas 900 SuperNode, packs **384 Ascend 910C dies against just 72 GPUs** in Nvidia's GB200 NVL72. Five-times-the-silicon offsets each chip being roughly a third of a Blackwell, and the system comes out ahead: about **300 PFLOPS versus 155-180** for the NVL72, with 3.6x the aggregate memory capacity and 2.1x the bandwidth. The fabric is fully optical, all-to-all, **6,912 transceivers across 16 racks** — a direct dividend of Huawei's telecom and optics heritage, the one domain where it was never behind. SemiAnalysis put it more cleanly than I can: the chip is a generation behind, but the scale-up system is a generation *ahead* of anything Nvidia or AMD currently ships commercially. Same two companies, same week, opposite verdicts. The only thing that changed was the unit of measurement.",
        "The reconciliation is not a paradox; it is an engineering trade, and you can read it directly off the power meter. CloudMatrix 384 draws **559 kW against 145 kW** for the NVL72 — 4.1x the power for 2.5x worse performance-per-FLOP. In Silicon Valley that number kills the design, because in the United States grid interconnection and power are the binding constraint; we optimize ruthlessly for performance-per-watt because watts are what we cannot get. Ren Zhengfei said the quiet part plainly: Ascend trails in raw power, but mathematical optimization plus cluster computing closes the gap on real workloads. China is not trying to win the metric America measures. It is optimizing performance-per-restricted-input — per scarce, sanctioned chip — and paying for it in the one currency it has in surplus: cheap, abundant, lightly regulated electricity. Energy is China's slack variable. We made chips the scarce thing, so they spent the thing that isn't.",
        "This is the hinge the entire dossier swings on, and it is precisely where Anthropic's two scenarios diverge. Their Scenario 1 — a comfortable **12-to-24-month American lead** — is a per-chip story. It assumes the silicon gap *is* the race, that capping China at H100-class hardware (CFR estimates the best Huawei parts only approach H100 in 2026-27, by which point top US chips could be **17x more powerful**) caps China at 'good enough.' Their Scenario 2 — neck-and-neck, with Huawei and Alibaba renting cheap good-enough datacenters to the world — is a per-system story. It concedes that scale and optics and energy route around the die deficit. Anthropic wrote both scenarios. What they did not do is notice that their own prescription is the lever that moves us from the first to the second.",
        "Because the chip deficit is not a law of nature — it is a manufactured artifact of EUV denial, and forcing the system-level workaround is exactly what export controls *do*. Wall Huawei off from TSMC's CoWoS packaging and the 950PR becomes a monolithic single die, trading die size and yield to dodge the bottleneck. Wall it off from Nvidia entirely and you get DeepSeek delaying V4 to co-design natively for Ascend, running on CloudMatrix, claiming a **~90% inference cost cut versus the H100** — financed, not incidentally, by the same Big Fund that exists to build domestic chips. That is the national loop closing in real time: chip to system to software to model to demand for more domestic chips. Every turn of the export-control screw tightens it. The numbers Anthropic cites — Huawei at **~4% of Nvidia's aggregate compute in 2026, ~2% in 2027** — are real today and exactly the kind of comforting figure that lulls you into believing the screw is working when it is in fact welding the loop shut.",
        "So the framing question is not 'who has the better chip,' because we already know the answer and it doesn't decide the war. The question is which level of analysis is load-bearing for policy. If you believe the chip is the race, you tighten the controls Anthropic wants — close the smuggling, foreign-datacenter, and DUV-servicing loopholes, criminalize distillation, export the American stack to deny China footholds. If you believe the *system* is the race, you recognize that every one of those moves pushes China further down the CloudMatrix path it is already winning on, accelerating the self-reliant full-stack competitor we claim to fear. I hold the second view, and the rest of this dossier is the evidence for why the first one is a strategic error dressed up as caution."
      ],
      "pullQuote": "Measure the chip and Nvidia wins by thirty to one. Measure the rack and Huawei wins. Export controls don't change who wins the chip — they just guarantee the fight moves to the rack, where we lose.",
      "keyStats": [
        {
          "value": "~25-32x",
          "label": "Nvidia Rubin per-chip FP4 advantage over Ascend 950PR"
        },
        {
          "value": "300 vs 180 PFLOPS",
          "label": "CloudMatrix 384 over GB200 NVL72 at the system level"
        },
        {
          "value": "4.1x",
          "label": "CloudMatrix 384 power draw vs NVL72 — energy as China's slack variable"
        },
        {
          "value": "~4% / ~2%",
          "label": "Huawei share of Nvidia aggregate compute, 2026 / 2027"
        }
      ]
    },
    {
      "id": "silicon",
      "eyebrow": "Level 1 · The Chip",
      "title": "Nvidia Wins the Silicon, Decisively — and That's Exactly the Trap",
      "dek": "On a per-chip basis the contest isn't close: Nvidia's Rubin is ~32x a single Ascend, and Huawei sits 2-3 process generations behind. I concede all of it. I just don't think it's the variable that decides the race.",
      "body": [
        "Let me start where Anthropic and I actually agree, because the agreement is total and I want no one to mistake what follows for cope. At the level of a single piece of silicon, **Nvidia wins decisively**, and the gap is structural, not a quarter's bad luck. The root cause is one machine: ASML holds a **100% monopoly on EUV** lithography and roughly **83% of the lithography market overall**. EUV resolves features at a 13.5nm wavelength that 193nm DUV immersion physically cannot reach in a single exposure. Deny a country EUV — which the US-Dutch-Japanese bloc does — and you cap it at SMIC's N+2 (~7nm) process, **2-3 generations behind** the leading edge — TSMC's 5nm-class 4NP under Nvidia Blackwell, and the 3nm node under Rubin. This is the wall. Everything downstream is a consequence of it.",
        "The consequences are brutal and I won't soften them. To hit a 7nm layer without EUV you substitute optics with process — self-aligned double and quadruple patterning — so a layer that takes **~9 EUV steps takes ~34 DUV steps**. Every extra mask multiplies cost and stacks edge-placement and overlay defects, which is why SMIC's 7nm yields run **~50-60% against TSMC's ~80-90%** (Ascend 910C clawed from ~20% in late 2024 to ~40% in early 2025, and only turned profitable there), at roughly **2x the cycle time**. The per-chip scoreboard follows directly: Nvidia's Rubin delivers **~50 PFLOPS at FP4** with 288GB of HBM4; Huawei's Ascend 950PR manages **~2 PFLOPS MXFP4** with 128GB of self-built HBM, and the 960 won't reach ~4 PFLOPS until late 2027. That is a **~32x per-chip efficiency gap**. The 950PR is even a **monolithic single die** — Huawei deliberately avoids multi-chiplet designs because it cannot touch TSMC's CoWoS packaging, trading away die size and yield to sidestep a bottleneck it has no other answer for.",
        "And memory is the part that actually kills LLMs. Inference is bandwidth-bound long before it is FLOP-bound, and without large-volume HBM plus advanced packaging, Ascend leans on slower memory that strangles exactly the workloads that matter. The tell is in Huawei's own roadmap, which concedes that the **950PR and 950DT have *lower* total processing performance than the older 910C**. When your new flagship regresses against your previous part on the metric that governs serving cost, you are not winning the silicon. So when the CFR projects that Huawei's chips at best approach H100-class only in 2026-27 — by which point the best US chips could be **>17x more powerful** — and Anthropic pegs Huawei at **~4% of Nvidia's aggregate compute in 2026 and ~2% in 2027**, I don't dispute the arithmetic. I'd defend it. On chips, the deficit is real, it is physical, and it is not closing this cycle.",
        "Here is where I part from Anthropic, and it is not a quibble about the numbers — it's about which number is load-bearing. A war is not won by the most efficient rifle; it is won by the system that puts steel on target. Look one altitude up, at the rack. Huawei's CloudMatrix 384 packs **384 Ascend 910C chips against just 72 GPUs in Nvidia's GB200 NVL72** — 5x the chips offsetting each being a third of a Blackwell — and lands at **~300 PFLOPS versus ~155-180** for the NVL72, with **3.6x the aggregate memory capacity and 2.1x the bandwidth**. The fabric is fully optical and all-to-all: **6,912 transceivers, 3,168 fibers** across 16 racks, drawn straight from Huawei's telecom heritage. SemiAnalysis's verdict is the one that should keep policymakers up at night: the chip is a generation *behind*, but the scale-up system is a generation *ahead* of anything Nvidia or AMD currently ship commercially. Ren Zhengfei said it plainly — the chips trail in raw power, but mathematical optimization and cluster computing close the gap on real workloads.",
        "The cost of that system is power: CloudMatrix 384 draws **559 kW against 145 kW** — 4.1x the energy and 2.5x worse per-FLOP. Anthropic treats this as the disqualifying weakness. I treat it as the entire point. **In America, power is the binding constraint** — the gating item is interconnect queues and megawatts, not silicon. In China, power is cheap, abundant, and lightly regulated. So the two systems are optimizing different objective functions: the US maximizes performance-per-watt; China maximizes performance-per-*restricted-input*, and spends energy — the thing it has — as the slack variable to buy back the chips it doesn't. You cannot embargo a country's electricity grid. When you wall off the constrained input, you simply hand your opponent permission to lean harder on its unconstrained one. The controls didn't remove the variable; they changed which variable matters, in China's favor.",
        "Then there is the software moat, Nvidia's most durable asset — CUDA plus 15-plus years of mature PyTorch tooling — and it is the clearest illustration of how caging backfires. Huawei's counter-stack of CANN, MindSpore, CUNN kernels, and the Unified Bus interconnect was a backwater until export risk made Nvidia a *legacy* choice for state-backed Chinese firms. Now CANN is open-sourced, newer Ascend parts have added a **SIMT execution model** for near-drop-in CUDA compatibility (early benchmarks: ~80% of standard PyTorch inference runs with config changes, not rewrites), and **Baidu plus Huawei control ~70% of China's GPU cloud**. DeepSeek ran R1 inference on CloudMatrix and claimed it beats H100-class hardware at a **~90% cost cut**, then delayed V4 specifically to co-design for Ascend — with China's *semiconductor* Big Fund financing the lab. That closes the loop: chip → system → software → model → demand for more domestic chips. Globally, CUDA lock-in is still overwhelming and CANN is, for now, a China story. But it is a *closed, export-control-immune* China story that did not need to exist. We are funding it. That is the trap, and we built it ourselves.",
        "So I concede Level 1 completely and without asterisks: on the chip, Nvidia wins, the gap is real, and it is wide. My disagreement with Anthropic is that they are reading the right scoreboard at the wrong altitude. The per-chip deficit is the most measurable fact in this entire race and also the least decisive, because China is not trying to win the chip — it is trying to win the *cluster*, and at the cluster, fueled by cheap power and forced indigenization, it is already a generation ahead on the system that ships frontier models. Anthropic looks at 4% and 2% and sees a moat. I look at the same figures and see the precise pressure that converted a fragmented, CUDA-dependent ecosystem into a vertically integrated national stack in under three years."
      ],
      "pullQuote": "Nvidia wins the chip by every honest measure — ~32x per-chip, two to three nodes ahead. The trouble is that China stopped trying to win the chip. It's winning the rack, on cheap power and forced self-reliance, and we're the ones who told it to.",
      "keyStats": [
        {
          "value": "~32x",
          "label": "Nvidia Rubin vs a single Ascend at FP4 (~50 vs ~2 PFLOPS)"
        },
        {
          "value": "4% → 2%",
          "label": "Huawei share of Nvidia aggregate compute, 2026 → 2027 (Anthropic)"
        },
        {
          "value": "300 vs 180 PFLOPS",
          "label": "CloudMatrix 384 (384 Ascend) vs GB200 NVL72 (72 GPUs)"
        },
        {
          "value": "4.1x power",
          "label": "CloudMatrix 384 draws 559 kW vs 145 kW — energy as China's slack variable"
        }
      ]
    },
    {
      "id": "system",
      "eyebrow": "Level 2 · The System",
      "title": "Huawei Lost the Chip and Won the Rack",
      "dek": "The export-control crowd benchmarks silicon and declares victory. They are measuring the wrong altitude. Huawei concedes the die and wins the system — and the system is what trains the model.",
      "body": [
        "Start with the part Anthropic gets right, because I am not in the business of pretending the gap doesn't exist. Per chip, Huawei loses, and it loses badly. Nvidia's Rubin (R200) lands ~**50 PFLOPS** at FP4, 288GB of HBM4, 22 TB/s. Huawei's Ascend 950PR, shipping Q1 2026, manages ~**2 PFLOPS** MXFP4 on 128GB of self-built \"HiBL\" memory at 1.6 TB/s. That is roughly a **32x** per-chip deficit, and it is not an accident — it is manufacturing physics. Huawei is stuck on SMIC's N+2 (~7nm) at ~50-60% yield against TSMC's 3nm at 80-90%, walled off from EUV by ASML export controls and forced onto DUV multi-patterning that needs ~34 process steps where EUV needs ~9. The 950PR is even a *monolithic* single die, because Huawei can't touch TSMC CoWoS packaging. Memory is the real killer: Huawei's own roadmap concedes the 950PR and 950DT have *lower* total processing performance than the older 910C. If the contest were silicon, the controls would be working. CFR puts Huawei at ~4% of Nvidia's aggregate compute in 2026, ~2% by 2027. Concede all of it.",
        "Now raise the altitude one level, to the rack, and the entire picture inverts. Huawei's CloudMatrix 384 — sold as the Atlas 900 SuperNode — packs **384 Ascend 910C** chips against just **72 GPUs** in Nvidia's GB200 NVL72. Five times the chips more than offsets each one being roughly a third of a Blackwell: ~**300 PFLOPS** versus ~**180** for the NVL72, with **3.6x** the aggregate memory capacity and 2.1x the bandwidth. The chip Anthropic loves to benchmark is a generation behind. The system it sits inside is, per SemiAnalysis, a generation *ahead* of anything Nvidia or AMD ships commercially today. You do not train a frontier model on one die. You train it on a rack, and at the rack Huawei is winning right now.",
        "The secret sauce is not semiconductors at all — it is the telecom company Huawei has always been underneath the chip division. Nvidia scales up over copper-dominated NVLink; Huawei built CloudMatrix on a *fully optical* fabric, all-to-all topology, **6,912** pluggable 400G transceivers and 3,168 fibers stitching 16 racks into one coherent machine. This is thirty years of optical-networking heritage repurposed into AI interconnect, and it is precisely the kind of advantage that export controls cannot reach, because there is no chokepoint on a fiber. Ren Zhengfei said it plainly: the Ascend chips trail in raw power, but mathematical optimization and cluster computing close the gap for real workloads. He is not bluffing. DeepSeek ran R1 inference on CloudMatrix and 910C and claimed it beat Nvidia silicon for that workload while cutting cost ~90% versus H100. That is the chip deficit being engineered away at the layer above the chip.",
        "The objection writes itself, so let me address it before Anthropic does: CloudMatrix draws **559 kW** against the NVL72's 145 kW — **4.1x** the power and **2.5x** worse per-FLOP. In Silicon Valley that is a death sentence, because in America power is the binding constraint; you cannot get the interconnect or the substation. But that is an American constraint, not a law of nature. China has cheaper, more abundant, more lightly regulated energy than any AI competitor on Earth. So the two sides are optimizing different objective functions, and people keep refusing to see it. The US optimizes **performance-per-watt** because watts are scarce here. China optimizes **performance-per-restricted-input** — performance per Ascend die — and spends cheap electricity as the slack variable, the input it has in surplus. Burning 4x the power to neutralize a 32x chip gap is not inefficiency. It is rational arbitrage against exactly the scarcity America manufactured.",
        "And here is the part that should keep the export-control hawks up at night: every move on the board is closing into a loop. The Big Fund — a *semiconductor* investment vehicle — is backing DeepSeek and reportedly leading a round near a $45B valuation. DeepSeek delayed V4 specifically to co-design it for Ascend, gave Huawei early optimization access and denied the same to Nvidia, and V4 reportedly hits **2.87x** the H20 on the 950PR. A chip fund financing a model lab that tunes its model for that fund's chips, generating demand for more of those chips: that is chip → system → software → model → demand → chip, a fully closed national circuit that no longer touches a single export-controlled input. This is the self-reliant competitor the controls were written to prevent, assembled in real time *because* of the controls. Anthropic's prescription — close the smuggling and foreign-datacenter and DUV-servicing loopholes, criminalize distillation, lock China out — assumes the leverage point is still the chip. It isn't. The leverage migrated up to the rack and the fiber and the closed-loop capital, and you cannot embargo a topology. I agree with Jensen Huang because the engineering says he is right: caging a competitor at the silicon layer just teaches it to win at the system layer, and the system layer is the one that matters."
      ],
      "pullQuote": "Huawei concedes the die and takes the rack — and the export-control regime keeps scoring the fight at the one altitude where it is no longer being fought.",
      "keyStats": [
        {
          "value": "384 vs 72",
          "label": "Ascend 910C in CloudMatrix 384 vs GPUs in GB200 NVL72"
        },
        {
          "value": "~300 vs ~180 PFLOPS",
          "label": "CloudMatrix 384 vs GB200 NVL72 system compute"
        },
        {
          "value": "6,912",
          "label": "Optical transceivers in CloudMatrix's all-to-all fabric"
        },
        {
          "value": "4.1x power / 2.5x worse per-FLOP",
          "label": "The trade: China spends cheap energy as the slack variable"
        }
      ]
    },
    {
      "id": "power",
      "eyebrow": "Level 3 · The Grid",
      "title": "Power Is How China Buys Around the Gap",
      "dek": "Export controls made the chip the scarce input. So China pays in electrons — a trade America cannot make, and exactly the one China can.",
      "body": [
        "Start with the number that everyone treats as a gotcha and that I read as a confession. Huawei's CloudMatrix 384 — sold as the Atlas 900 SuperNode — draws **559 kW** against the **145 kW** of Nvidia's GB200 NVL72. That is **4.1x the power** and roughly **2.5x worse power-per-FLOP** for the comparable rack. Every analyst who wants to dismiss the Chinese stack stops there, and I understand why: in a Western framing, 2.5x worse efficiency is disqualifying. But that framing smuggles in a hidden assumption — that performance-per-watt is the objective function. It is *our* objective function, because in the United States the binding constraint is the grid, not the silicon. It is not China's.",
        "Look at what the CloudMatrix actually delivers for those electrons. It packs **384 Ascend 910C** chips against just **72 B200s** in the NVL72 — five times the chip count to offset each Ascend being roughly a third of a Blackwell — and lands at **~300 PFLOPS BF16 versus ~155-180** for Nvidia's rack, with **3.6x the aggregate memory capacity and 2.1x the bandwidth**. The fabric is fully optical and all-to-all: **6,912 transceivers**, **3,168 fibers**, across 16 racks, built straight out of Huawei's telecom heritage. SemiAnalysis put it precisely: the chip is a generation *behind*, but the scale-up system is a generation *ahead* of anything Nvidia or AMD ships commercially. The 4.1x power draw is not a defect in that design. It is the price of admission China consciously paid to buy its way around a chip it is not allowed to make.",
        "This is the move the export-control architects never modeled. When you ration the chip, you turn the chip into the scarce input — and a rational adversary re-optimizes around its actual constraint. The US optimizes performance-per-watt because we cannot get the megawatts: interconnection queues run years, transformer lead times run years, and a single new gigawatt-class campus is a multi-year fight with utilities and zoning boards. China inverts every term. It commands cheap, abundant, lightly regulated power and a state apparatus that treats datacenter electricity as a strategic subsidy, not a market price. So China optimizes **performance-per-restricted-input** and spends energy as the slack variable. We made the chip the bottleneck; they answered by paying in the one currency they have in surplus. That is not Chinese cleverness so much as it is American policy handing them the trade.",
        "And the controls keep sharpening the incentive. The root cause is manufacturing — without TSMC or Samsung, Huawei is stuck on SMIC's **N+2 (~7nm)** process at **50-60% yield** against TSMC's 3nm at **80-90%**, because the EUV wall (ASML's 100% monopoly) confines China to slower, lower-yield DUV multi-patterning. Per chip, that gap is brutal: Nvidia's Rubin will deliver **~50 PFLOPS FP4** against the Ascend 950's **~2 PFLOPS** — call it **25-32x** per die. CFR's read is that the best US chips could be **>17x** more powerful by 2027 and that Huawei amounts to maybe **4% of Nvidia's aggregate compute in 2026, 2% in 2027**. Every one of those numbers is real. And every one of them describes a per-chip race, not a per-rack one — the altitude at which China has already chosen not to compete. The deficit in silicon efficiency is precisely what makes spending power rational.",
        "DeepSeek closes the loop and proves the point. It ran R1 inference on CloudMatrix 384 and Ascend 910C, claimed it beat H800/H100-class hardware on that workload, and cut serving cost by roughly **90% versus H100** — at around **1 yuan per million tokens**, even with each 910C delivering only ~60% of an H100's single-chip inference. It then *delayed V4* to co-design it for the Ascend 950PR, handed Huawei early optimization access while denying the same to Nvidia, and with **Big Fund** money behind it knitted the national circuit shut: chip to system to software to model to demand for more domestic chips. The macro picture frames the choice cleanly: DeepSeek-V4-Pro priced against Anthropic's Opus 4.8 — its 'Mythos' tier — is not the pricing of a caged also-ran. It is the pricing of a frontier-class model running natively on chips no export regime can reach. The sovereignty premium is real and it is being paid in electrons.",
        "So when Anthropic's May 14 essay asks for *tighter* controls — close the smuggling and offshore-datacenter and DUV-servicing loopholes, criminalize distillation, champion American AI exports to deny China footholds — to hold a 12-24 month lead, I read a strategy that has misidentified its own chokepoint. The whole prescription assumes the chip is a fence you can keep raising. But power is not a fence we control; it is a slack variable China holds in abundance. Pricing Huawei at 4% or 2% of aggregate compute is comforting precisely because it measures the dimension where China declines to fight. Tighten the chip controls and you do not throttle China — you raise the conversion rate at which it trades cheap energy for restricted silicon, and you fund the indigenous full stack faster. Jensen Huang has been blunt about this: the controls are short-sighted and dangerous and have already largely backfired. On the grid axis specifically, he is simply right. You cannot cage a competitor whose escape hatch is the power meter, and we left that hatch wide open the day we made the chip the prize.",
        "The uncomfortable synthesis is that energy is the one input where the United States is the constrained party and China is not. We optimize per-watt because we must; they spend watts because they can. Export controls did not change that asymmetry — they weaponized it against us, converting a Chinese surplus into a strategic advantage and converting our grid bottleneck into the ceiling on our own lead. Throttle the chip and China buys around the gap in electrons. That is not a loophole to be closed. It is the physics of the trade we set up."
      ],
      "pullQuote": "We made the chip the scarce input. So China pays in electrons — the one currency it holds in surplus and the one America cannot print. You cannot cage a competitor whose escape hatch is the power meter.",
      "keyStats": [
        {
          "value": "4.1x",
          "label": "CloudMatrix 384 power draw vs GB200 NVL72 (559 kW vs 145 kW)"
        },
        {
          "value": "~300 vs ~180 PFLOPS",
          "label": "CloudMatrix 384 (384 Ascend 910C) vs GB200 NVL72 (72 B200)"
        },
        {
          "value": "~90%",
          "label": "DeepSeek R1 inference cost cut on Ascend 910C vs H100"
        },
        {
          "value": "4% / 2%",
          "label": "Huawei share of Nvidia aggregate compute, 2026 / 2027 (CFR)"
        }
      ]
    },
    {
      "id": "software",
      "eyebrow": "Level 4 · The Moat",
      "title": "CUDA vs CANN: You Cannot Bomb a Software Ecosystem Into Not Existing",
      "dek": "The deepest moat in this race was never the chip. It is CUDA and fifteen years of PyTorch tooling. Every export control is a forced-migration program that hands Huawei's CANN the one thing money cannot buy: a captive userbase.",
      "body": [
        "I have spent enough time staring at the silicon comparisons to tell you they are a distraction. Yes, **Nvidia's Rubin delivers ~50 PFLOPS FP4 per chip against the Ascend 950PR's ~2 PFLOPS** — a ~25-32x per-die advantage rooted in TSMC's 3nm node versus SMIC's DUV-multipatterned ~7nm at 50-60% yield. None of that is the moat. Hardware gaps close on a known cadence; China shipped DUV-7nm Kirin in 2023 a few years late, exactly as it closed 28nm before that. The asset that does not close on a cadence — the asset that took Nvidia a decade and a half and tens of thousands of developer-years to accrete — is **CUDA plus the mature PyTorch stack layered on top of it**: the kernels, the libraries, the muscle memory of every ML engineer alive. That is Level 4. That is the thing Jensen Huang is actually defending when he calls the controls 'short-sighted and dangerous,' and he is right.",
        "Here is what the policy class refuses to internalize: a software moat is defended by adoption, not by interdiction. You cannot sanction it, tariff it, or deny it a lithography tool. CUDA's dominance is a function of how many people reach for `import torch` by reflex and find it just works. The only force that erodes that reflex is a credible, well-funded alternative with a captive market compelled to use it — and **export controls are the most effective program ever devised for manufacturing exactly that captive market.** When Washington made Nvidia a legal and geopolitical liability for every state-backed Chinese firm, it did not slow Chinese AI. It conscripted the entire Chinese developer base into porting, hardening, and optimizing Huawei's CANN. That is not a side effect. That is the mechanism.",
        "And the porting is working faster than the comfortable 'CUDA is forever' consensus admits. **CANN now natively supports PyTorch, TensorFlow, ONNX, PaddlePaddle, and more**; the `torch_npu` plugin runs existing PyTorch through the PrivateUse1 mechanism with minimal changes; CUNN supplies a CUDA-library alternative; and Huawei open-sourced CANN 8.0 in late 2025, which triggered a domestic developer influx writing tuned kernels for Llama-3 and Qwen and building automated CUDA-to-CANN converters. The hinge is 'CANN Next,' announced at Huawei Connect 2025, which **bolts a SIMT execution model onto Ascend** — mirroring CUDA's core abstraction for near-drop-in replacement. Early benchmarks put **~80% of standard PyTorch inference code running on Ascend with config changes rather than rewrites.** Migration cost was the entire moat. Migration cost is what just collapsed. Reuters reports ByteDance and Alibaba are 'much happier now' with CANN-CUDA compatibility, and **ByteDance has earmarked over $5.6B of Ascend spend for 2026** — up from roughly nothing.",
        "The market structure makes this irreversible inside China. **Baidu (40.4%) and Huawei (30.1%) together control ~70% of China's GPU cloud**, and Baidu's PaddlePaddle is co-integrated with Huawei silicon specifically to rival the NVIDIA-PyTorch pairing. This is a closed loop, and the loop is funded by the state: the same Big Fund — a *semiconductor* vehicle — is leading a DeepSeek round near a **$45B valuation**. Read that twice. A chip fund is financing a model lab. **Chip → system → software → model → demand for more domestic chips**, with the capital flowing in a circle that no foreign supplier can interrupt because no foreign supplier is in it. The CloudMatrix 384 super-node is the hardware expression of the same logic — 384 Ascend 910C across an all-optical 6,912-transceiver fabric delivering **~300 PFLOPS versus ~180 for the GB200 NVL72**, at 4x the power. China spends cheap, abundant, lightly-regulated energy as the slack variable; SemiAnalysis calls the chip a generation behind and the *system* a generation ahead. Power is America's binding constraint, not China's.",
        "DeepSeek is the proof of concept the controls were never supposed to produce. It ran R1 inference on CloudMatrix/910C and **claimed a ~90% cost cut versus H100**, serving at roughly one yuan per million tokens despite each 910C delivering only ~60% of an H100's single-chip inference. Then it did the thing that should end the debate: it **delayed V4 to co-design for Ascend, gave Huawei early optimization access while denying it to Nvidia and AMD**, with V4 reportedly hitting **2.87x H20 throughput on the 950PR**. A frontier-class model, co-designed for domestic silicon, immune to export controls by construction. This is the 'technological sovereignty premium' — a model worth more to Beijing precisely because no license, loophole-closure, or smuggling crackdown can reach it.",
        "Which is why Anthropic's May 14 prescription reads to me as a category error dressed as strategy. Their playbook — close the smuggling, offshore-datacenter, and DUV-SME servicing loopholes; restrict model access and criminalize distillation; champion American AI exports to deny China footholds — is a plan to fight a software war with hardware weapons. **You can throttle the chip. You cannot bomb the ecosystem.** Criminalizing distillation and fencing model access does not stop CANN from maturing; it removes the last commercial reason for any Chinese firm to keep one foot in the Nvidia world, accelerating the very migration that erodes CUDA's global gravity. Globally, CUDA lock-in is still overwhelming and CANN is, for now, a China story. But 'for now' is doing enormous load-bearing work in Anthropic's two scenarios, and every tightening turn of the screw shortens it. The controls do not cap China at 'good enough.' They build the captive market that funds the only credible CUDA competitor on earth — and then hand it a frontier model to run.",
        "I land where Huang lands, without his commercial stake to apologize for. The moat that mattered was always software, and software moats die from a credible alternative with guaranteed users — not from interdiction. Washington supplied both halves: it made Nvidia radioactive for Chinese state firms, then watched a semiconductor fund finance the model lab that proves Ascend can serve frontier inference. That is not containment. That is venture capital for your rival's full stack, paid in the one currency a software ecosystem actually runs on: forced adoption."
      ],
      "pullQuote": "You can sanction a chip; you cannot sanction a habit. Every export control is a forced-migration program — and the migration only ever runs in one direction: toward the stack that cannot be cut off.",
      "keyStats": [
        {
          "value": "~80%",
          "label": "of standard PyTorch inference code runs on Ascend via CANN Next with config changes, not rewrites"
        },
        {
          "value": "~70%",
          "label": "of China's GPU cloud controlled by Baidu (40.4%) + Huawei (30.1%) — a closed, CUDA-free loop"
        },
        {
          "value": "2.87x",
          "label": "DeepSeek V4 throughput on Ascend 950PR vs Nvidia H20, co-designed for domestic silicon"
        },
        {
          "value": "$5.6B+",
          "label": "ByteDance's planned 2026 Ascend spend, up from near zero as migration cost collapsed"
        }
      ]
    },
    {
      "id": "deepseek",
      "eyebrow": "Case Study",
      "title": "DeepSeek: The National Loop Closes",
      "dek": "A semiconductor fund is financing a frontier AI lab to co-design models for Chinese silicon. That is not an anomaly — it is the export-control regime working exactly as I'd predict, and exactly against the United States.",
      "body": [
        "Follow the money, because the money is the argument. DeepSeek — the lab that humiliated Western incumbents with R1 — is now drawing capital from the **Big Fund**, China's IC Investment Fund, the same RMB 344B (~$47.5B, Big Fund III) vehicle built to finance SMIC, Hua Hong, and YMTC. A round near a **$45B valuation** is led not by a generalist growth investor but by a *semiconductor* fund. Let that sit for a moment. A chip fund is buying into a model lab. That is the national loop closing in real time: chip to system to software to model to demand for more domestic chips. Beijing is no longer treating DeepSeek as a software bet. It is treating it as a strategic load on the fabs — a guaranteed customer that justifies every SMIC wafer and every Ascend die Huawei can produce.",
        "The mechanism is co-design, and it is deliberate. DeepSeek delayed **V4** to migrate its training stack off Nvidia and onto Huawei's Ascend, gave Huawei early optimization access while denying that same access to Nvidia and AMD, and reportedly hit **2.87x H20 throughput** on the Ascend 950PR — the first trillion-parameter MoE fully adapted to domestic silicon. On inference, DeepSeek ran R1 across the **CloudMatrix 384** super-node (384 Ascend 910C, fully optical all-to-all fabric) and claims it beats H800/H100 for that workload, cutting cost roughly **90% versus H100** and serving at about one yuan per million tokens. The Ascend 910C is only ~60% of an H100 on single-chip inference. None of that mattered, because DeepSeek stopped competing on the chip and started competing on the system — exactly the seam where Huawei is a generation ahead, not behind.",
        "This is the **technological sovereignty premium**, and I want to be precise about what it buys. A frontier-class model running natively on Chinese chips is *immune to export controls*. You cannot throttle DeepSeek's compute by denying it H200s if it no longer needs them. Every BIS rule — the Oct 2022 A100/H100 ban, the Oct 2023 tightening onto the cut-down A800/H800, the April 2025 H20 license that cost Nvidia a **$5.5B** charge — is leverage that decays to zero the moment the target re-platforms onto silicon you don't control. Anthropic's own 2028 essay concedes the arithmetic on paper: Huawei at ~4% of Nvidia's aggregate compute in 2026, ~2% in 2027, with the US holding an ~11x compute advantage if controls tighten. But aggregate FLOPs are the wrong denominator. A lab that has escaped the choke does not care that the chokepoint still pinches the labs that stayed.",
        "And the chip deficit is real — I am not pretending otherwise. Nvidia's Rubin delivers ~50 PFLOPS FP4 per GPU against the 950PR's ~2 PFLOPS MXFP4, a 25-32x per-chip gap rooted in manufacturing: SMIC's N+2 (~7nm) at **50-60% yield** versus TSMC's 3nm at 80-90%, with China walled off from EUV and forced onto slower DUV multi-patterning. Huawei's own roadmap admits the 950PR and 950DT have *lower total processing performance than the older 910C* because memory and packaging — the LLM killers — are where the controls bite hardest. So China answered with arithmetic of a different kind: pack 384 weak dies into CloudMatrix 384 for **~300 PFLOPS** against the GB200 NVL72's ~180, with 3.6x the aggregate memory and 2.1x the bandwidth, and pay for it in power — **4.1x** the draw, 2.5x worse per-FLOP. Power is America's binding constraint and China's slack variable. They are spending cheap, abundant, lightly-regulated energy to buy back the silicon the United States denied them. That is not a workaround. That is a strategy with a national fund behind it.",
        "Here is the market proof, and it is the tell. Watch the price of a token, not the spec sheet of a chip. When **DeepSeek-V4-Pro** prices against Anthropic's Opus 4.8 — the model some call Mythos — and lands within striking distance on cost while V4-Pro runs at ~27% of V3.2's inference FLOPs and ~10% of its KV cache, the race America thinks it is winning on hardware is already being lost on economics. Cost convergence is the leading indicator of capability convergence under constraint. The United States is optimizing performance-per-watt because watts are scarce; China is optimizing performance-per-restricted-input because chips are scarce — and software efficiency, mathematical optimization, and cluster scale are the variables you tune when you cannot buy your way out. Ren Zhengfei said it plainly: the chips trail in raw power, but optimization and cluster computing close the gap for real workloads. The token price says he is right.",
        "So when Anthropic's May 14 essay prescribes *tighter* controls — close the smuggling, offshore-datacenter, and DUV-SME-servicing loopholes, restrict model access, criminalize distillation, and export the American stack to lock China out — I read a recipe for accelerating everything in this section. You cannot criminalize your way out of a closed loop. The Big-Fund-financed, Ascend-native, CUDA-free DeepSeek is the precise self-reliant competitor the controls were meant to prevent, and it exists *because* of them. CANN, MindSpore, and PaddlePaddle are a China-only story today — overwhelmingly outgunned by CUDA's 15-year lock-in globally — but they are a closed-loop, export-control-immune story, and that is the only kind that matters to Beijing. Caging did not cap China at 'good enough.' It funded the cage's own dismantling and handed the keys to a semiconductor fund.",
        "I sided with Jensen Huang on this before the V4 numbers landed, and the V4 numbers only made the case sharper. Controls that force a frontier lab onto domestic silicon do not buy a durable lead; they buy a 12-24 month head start in exchange for manufacturing a permanent rival with sovereign compute, sovereign software, and a national balance sheet. That is a bad trade for US national security and a worse one for US economics — Nvidia's China share has already gone from ~66% to roughly zero while Huawei harvests the demand. The loop is closed. Tightening the controls now does not reopen it. It only confirms to Beijing that the cage was worth escaping."
      ],
      "pullQuote": "A semiconductor fund is buying a model lab to run on the chips it finances — the cage didn't cap China, it funded the key. Watch the token price, not the spec sheet: cost convergence is how you know the long race was lost the day it was run as a cage.",
      "keyStats": [
        {
          "value": "~$45B",
          "label": "DeepSeek valuation in a round led by the Big Fund — a semiconductor vehicle financing a model lab"
        },
        {
          "value": "~90%",
          "label": "R1 inference cost cut vs H100 on CloudMatrix 384 / Ascend 910C"
        },
        {
          "value": "2.87x",
          "label": "DeepSeek V4 throughput on Ascend 950PR vs Nvidia H20, after co-design"
        },
        {
          "value": "~2%",
          "label": "Anthropic's own 2027 figure for Huawei's share of Nvidia aggregate compute — the wrong denominator"
        }
      ]
    },
    {
      "id": "taiwan-litho",
      "eyebrow": "Geography of the Gap",
      "title": "Taiwan, the West, and the Lithography Frontier",
      "dek": "The entire AI-chip race narrows to one machine in one country, defended by a five-nation coalition. That is not strength. It is the most fragile chokepoint in the history of strategic technology, and we have built our China policy on top of it.",
      "body": [
        "Strip the geopolitics away and the frontier of AI compute lives in a handful of buildings. **ASML** in Veldhoven holds a **100% monopoly on EUV** lithography and roughly **83% of all lithography** — and ASML in turn depends on **ZEISS SMT** optics and **TRUMPF** drive lasers in Germany. Those scanners feed **TSMC** in Taiwan, which converts them into more than **90% of leading-edge logic**, with **N2 (2nm) in volume production as of Q4 2025**. Behind that sit **Samsung** and **SK Hynix** in Korea for foundry and HBM, **Tokyo Electron, Nikon, and Canon** in Japan for deposition, etch, and DUV, and a lagging Intel in the US. Every EUV-class node on Earth is owned by this allied-plus-Taiwan axis. The PRC mainland — SMIC — is fenced out of EUV entirely and confined to **193nm ArF-immersion DUV multipatterning**. That is the whole map. The single chokepoint is EUV, and I want to be precise about why.",
        "The physics is unforgiving and it is also instructive. EUV runs a **13.5nm wavelength at 0.33 numerical aperture**, resolving roughly **13nm features** in a single exposure. DUV immersion floors out at a **~78-80nm single-exposure half-pitch**. To reach a 7nm-class layer without EUV you replace optics with process — self-aligned double and quadruple patterning — so that one critical layer becomes many. The canonical figure is **~9 EUV steps versus ~34 DUV steps** for the same 7nm layer. Every extra mask multiplies cost and stacks edge-placement and overlay error. That is why SMIC's N+2 (~7nm) runs at **~50-60% yield** against TSMC's **~80-90%**, why SMIC's cycle time is roughly **2x** TSMC's, and why SMIC's DUV-multipatterned 5nm is projected near **~33% yield at 40-50% higher cost per wafer** than TSMC's N5. Intel's 10nm — five years of yield delays from SAQP at a 34nm fin pitch — is the cautionary precedent the China hawks never cite. The wall is real, and it is a wall of yield, cycle time, and defectivity, not of headline wafer price.",
        "Here is the part Washington and Anthropic both underweight: **Taiwan is simultaneously the most central and the most fragile node in the entire system**. The control regime is not American power. It is a *coalition* — the Netherlands has to keep barring ASML servicing, Japan has to keep restricting Tokyo Electron and the photoresist supply chain, Korea has to keep its HBM aligned, and Taiwan has to keep existing as a stable jurisdiction producing the world's only 2nm-and-below logic at scale. A Taiwan Strait contingency is a single point of failure for the West's entire compute supply, not just China's. Every one of those allied dependencies is a seam, and coalitions held together by US pressure fracture the moment the commercial cost of compliance exceeds the diplomatic cost of defection. ASML's own China revenue spiked to **~46% of sales in Q3 2023** as Chinese buyers front-ran the January 2024 Dutch DUV curbs. The coalition is being asked to forgo the second-largest semiconductor market on Earth indefinitely. That is not a stable equilibrium; it is a standing temptation to defect.",
        "And the export-control regime itself is not even monotonic. **Oct 2022** BIS thresholds banning A100/H100 and spawning the cut-down A800/H800, **Oct 2023** tightening to ban those too, **Apr 2025** the H20 license requirement that cost Nvidia a **~$5.5B** charge, then **Jul 2025** restoring H20 and MI308 licenses, then **Dec 2025** permitting H200 under a **25% revenue cut to the US Treasury**. This is not a coalition holding a line. It is a coalition negotiating with itself, tightening and reversing as the commercial pain lands on its own champions. Anthropic's May 14 essay asks this same fracturing apparatus to do *more* — close the smuggling, offshore-datacenter, and DUV-SME servicing loopholes, criminalize distillation, and champion American AI exports to lock China out. You cannot build a durable 12-24 month lead on an instrument your own government keeps re-trading every fiscal quarter.",
        "When you cage a capable adversary at the EUV frontier, you do not stop it — you tell it exactly which problem to solve, and you finance the solving. China answered the per-chip deficit at the system level: **CloudMatrix 384** packs **384 Ascend 910C** against just **72 GPUs** in a GB200 NVL72, delivering **~300 PFLOPS** versus **~155-180**, with more aggregate memory and bandwidth, over a **fully optical all-to-all fabric of 6,912 transceivers** drawn straight from Huawei's telecom heritage. The cost is **559 kW versus 145 kW — 4.1x the power, 2.5x worse per FLOP**. But power is *China's* slack variable: cheap, abundant, lightly regulated. It is *America's* binding constraint. We optimize performance-per-watt because we have to; China optimizes performance-per-restricted-input and spends energy it has in surplus. SemiAnalysis put it cleanly — the chip is a generation behind, the system is a generation ahead. Caging selected for the one axis where the adversary already held the advantage.",
        "Meanwhile the forced march funds the indigenization the controls were meant to prevent. **SiCarrier** debuted 30-plus tools at SEMICON China; **SMEE**'s SSA800 targets 28nm immersion with no US-origin IP; a domestic **LDP-source EUV path** out of Harbin Institute of Technology is in trials at Huawei's Dongguan facility — early and unconfirmed, but moving. **CXMT** is sampling HBM3 to Huawei to attack the memory bottleneck that throttles Ascend on LLMs. **Big Fund III — RMB 344B (~$47.5B)** — sits behind all of it, and the same semiconductor vehicle is backing DeepSeek, whose V4 was delayed to co-design for Ascend. That closes the national loop: chip to system to software to model to demand for more domestic chips, the whole thing immune to export controls by construction. Jensen Huang has said this plainly — the controls are short-sighted, have largely backfired, dropped Nvidia from ~66% to roughly 0% of the China market, and chiefly accelerate Huawei while eroding the CUDA moat as DeepSeek ports to CANN. He is right. I agree with him on every point. The lithography frontier is a wall America did not build and cannot move, defended by allies whose interests diverge from ours by the quarter — and the harder we lean on it as a weapon, the faster we manufacture the self-reliant competitor we say we fear."
      ],
      "pullQuote": "The frontier of AI lives in one machine, in one country, behind a coalition that fractures by the fiscal quarter. We did not build that wall and we cannot move it — and every time we swing it as a weapon, we hand China the blueprint for the wall it builds next.",
      "keyStats": [
        {
          "value": "100%",
          "label": "ASML share of EUV lithography — the single chokepoint, in the Netherlands, not the US"
        },
        {
          "value": "~9 vs ~34",
          "label": "EUV vs DUV steps to pattern one 7nm layer — the yield, cost, and cycle-time penalty of being walled off"
        },
        {
          "value": "300 vs 180 PFLOPS",
          "label": "CloudMatrix 384 (384 Ascend) vs GB200 NVL72 (72 GPUs) — system beats silicon, at 4.1x the power"
        },
        {
          "value": "~$47.5B",
          "label": "Big Fund III, financing the SMIC-SiCarrier-CXMT-DeepSeek loop the controls were meant to prevent"
        }
      ]
    },
    {
      "id": "smic-gap",
      "eyebrow": "Technical Deep-Dive",
      "title": "SMIC vs TSMC: Anatomy of the Gap — and Why the Wall Builds the Wall-Breaker",
      "dek": "The entire chokepoint reduces to one machine and one wavelength. Trace the physics of DUV multipatterning to ~7nm and you find a real gap — and a self-defeating strategy for keeping it open.",
      "body": [
        "The chokepoint everyone calls 'export controls' resolves, when you strip the policy language away, to a single physical fact: a single Dutch company, ASML, holds **100% of the EUV lithography market** and roughly **83% of all lithography**, and the West will not sell EUV to China. EUV prints with a **13.5nm wavelength at 0.33 numerical aperture**, resolving ~13nm features and ~30-38nm half-pitch in one exposure. Denied that machine, SMIC is capped at 193nm-wavelength ArF immersion (ArFi) DUV, whose single-exposure half-pitch floor is ~78-80nm. Everything downstream — the 50-60% yields, the doubled cycle times, the monolithic 950PR, the memory wall — falls out of that one denied wavelength. I want to be precise about the gap before I argue it is being defended the wrong way. The gap is real. The defense is self-defeating.",
        "To reach a 7nm-class node without EUV, you do not buy resolution, you manufacture it: self-aligned double and quadruple patterning (SADP/SAQP) decompose one critical layer into a cascade of deposition, etch, and litho loops. The canonical figure is brutal — a 7nm layer that takes **~9 EUV steps takes ~34 DUV steps**. Each extra mask is not free; it multiplies edge-placement error and overlay defects, and defects compound multiplicatively across a layer stack. That is the mechanical reason SMIC's 7nm (SMIC's N+2, the FinFET node under the Kirin 9000S and the Ascend 910C) lands at **~50-60% yield against TSMC's ~80-90%**. The 910C clawed up from roughly 20% in late 2024 to ~40% in early 2025 — the threshold at which the line finally turned profitable. SMIC's cycle time at 7nm-class runs about **2x TSMC's**, because those multipatterning loops physically lengthen the line. Intel's 10nm is the cautionary precedent every process engineer knows: SAQP at a 34nm fin pitch bought Intel roughly five years of yield purgatory. China is doing the same thing on purpose, because it has no choice.",
        "Push below 7nm and the economics, not just the yields, become the wall. SMIC's 5nm — developed in 2025 jointly with Huawei, the so-called N+3 — is projected at roughly **33% yield and 40-50% higher cost-per-wafer than TSMC's N5**. Note carefully what is and is not true about cost here, because the lazy version of this argument gets it backwards. On raw wafer price, DUV is not always the loser: a single EUV exposure is the dominant cost line, and two EUV exposures can run ~30% more than one DUV-immersion SAQP. TSMC's own ladder — N7 ~$9,500, N5 ~$18,500, N3 north of $20,000 per 300mm wafer against ~$3,000 at 28nm — shows the steepest jump is precisely the DUV-to-EUV transition. So the wall China hits at 5nm is not headline wafer price. It is yield, cycle time, defect density, and tool count: the integrated cost of getting a working die out the door, not the cost of starting a wafer. That distinction is the whole ballgame, and most policy writing elides it.",
        "And here is the part the chokepoint absolutists never put in their slide decks: the leading edge is becoming a wall for *everyone*, including the people holding the EUV monopoly. The 0.33-NA EUV reticle field maxes at **858mm² (26x33mm)**. High-NA EUV (0.55-NA) doubles resolution by halving the scan field to **429mm² (26x16.5mm)**, which forces reticle stitching for any large AI die. That constraint bites Nvidia and TSMC, not SMIC. TSMC's N2 — first GAA nanosheet, in volume Q4 2025, offering +10-15% speed or -25-30% power versus N3E — and the A16 node behind it are running into the same field-size physics that makes huge monolithic accelerators harder to print at the bleeding edge. The frontier is converging toward packaging and system scale-out as the real levers, which is exactly the terrain on which a node-disadvantaged competitor can compete. Huawei's monolithic 950PR — a single die because it cannot touch TSMC CoWoS — is a forced bet, but it is a bet on the same direction the whole industry is being shoved.",
        "The compounding injury is memory. A frontier LLM is bandwidth-bound, not just FLOP-bound, and without large-volume HBM plus advanced packaging the Ascend parts choke on slower memory — which is why Huawei's *own* roadmap concedes the 950PR and 950DT carry lower total processing performance than the older 910C. China's answer, CXMT, is sampling HBM3 to Huawei with mass production targeted for end-2026 and serious analysts doubting that date. So the memory wall is real today. But trace where the pressure goes: forced self-reliance is now financing SMEE's SSA800 ArFi line built with no US-origin IP, SiCarrier's 30-plus tools shown at SEMICON China in March 2025 including a 28nm immersion scanner, homegrown immersion-DUV trials through 2025, a domestic laser-induced-discharge-plasma EUV source in trials at Huawei's Dongguan facility, and a **RMB 344B (~$47.5B) Big Fund III**. None of that existed at this scale before the controls. The controls did not stop the stack; they capitalized it.",
        "This is the substrate of my entire disagreement with Anthropic's '2028' essay. Their prescription — close the smuggling and offshore-datacenter and DUV-SME-servicing loopholes, criminalize distillation, lock China to 'good enough' — treats the ~7nm wall as a permanent moat you defend by tightening. The physics say otherwise. China is already answering a per-chip deficit with system-level scale (CloudMatrix 384: 384 Ascend 910C, fully optical fabric, **~300 PFLOPS against the GB200 NVL72's ~180**) and spending its actual slack variable — cheap, abundant, lightly regulated energy, at 4.1x the power and 2.5x worse perf-per-watt — to buy back what silicon denies. You do not optimize performance-per-watt when watts are cheap; you optimize performance-per-restricted-input. The wall does not stop China. It tells China precisely which machine to go build, and then hands it $47.5 billion of motivation to build it. That is not containment. That is industrial policy, run by us, on Beijing's behalf."
      ],
      "pullQuote": "The gap is real and the physics are unforgiving. But you do not keep a competitor two nodes behind by teaching it to live without your machine — you keep it behind by selling it the machine. Cage SMIC and you fund its replacement.",
      "keyStats": [
        {
          "value": "~9 vs ~34",
          "label": "Litho steps to pattern a 7nm layer: EUV vs DUV multipatterning"
        },
        {
          "value": "50-60% vs 80-90%",
          "label": "SMIC 7nm yield vs TSMC for comparable parts"
        },
        {
          "value": "~33% yield, +40-50% cost",
          "label": "SMIC 5nm (N+3) penalty vs TSMC N5 — the economic ceiling below 7nm"
        },
        {
          "value": "858 → 429 mm²",
          "label": "Reticle field collapse from 0.33-NA to High-NA EUV — a wall for Nvidia/TSMC too"
        }
      ]
    },
    {
      "id": "catchup",
      "eyebrow": "Trajectory",
      "title": "How SMIC and Huawei Catch Up — On a Delay, Not a Wall",
      "dek": "Anthropic's \"2028\" essay treats the chip chokepoint as a wall. It is a delay. Every one of China's catch-up mechanisms — SMIC's DUV multipatterning, SMEE and SiCarrier toolmaking, CXMT's HBM, Big Fund III's $47.5B, the DeepSeek-on-Ascend loop — exists *because* of the controls meant to prevent it.",
      "body": [
        "Start with the root node, because everything else hangs off it. Huawei's silicon is gated by **SMIC's N+2 process — roughly 7nm-class, two to three generations behind the leading edge: TSMC's 5nm-class 4NP under Nvidia's Blackwell, and the N3 (3nm) node under Rubin**. The wall is one machine: ASML holds a **100% monopoly on EUV lithography** and is barred from selling it to China, so SMIC is capped at 193nm ArF-immersion DUV, whose single-exposure pitch floor is ~78-80nm. To hit a 7nm layer on DUV you trade optics for process — self-aligned double and quadruple patterning, roughly **34 DUV steps versus ~9 EUV steps** for the same critical layer. Each extra mask multiplies cost and stacks edge-placement and overlay defects, which is why **SMIC runs ~50-60% yield against TSMC's ~80-90%**, at roughly double the cycle time. The Ascend 910C climbed from ~20% yield in late 2024 to ~40% in early 2025, the point where the line turned profitable. None of this is a secret weakness in my argument. It is the argument: the controls did not stop the 7nm node, they made it expensive and slow. China shipped it anyway.",
        "The catch-up is not a single heroic shrink; it is a coordinated stack, and the export-control regime is funding every layer of it. On domestic toolmaking, **SMEE's SSA800 ArF-immersion line targets 28nm with explicitly no US-origin IP**, while Huawei-linked **SiCarrier debuted 30-plus tools across six categories at SEMICON China in March 2025**, including a 28nm immersion scanner, and its affiliate Yuliangsheng's DUV tool entered SMIC trials by September. A domestic laser-induced-discharge-plasma EUV source out of Harbin Institute of Technology is in trials at Huawei's Dongguan facility — currently ~100-150W against ASML's 250W-plus, with the aggressive throughput claims still unconfirmed industry-press sourcing, so I will not lean on them. The honest read is that domestic sub-10nm production is unlikely before ~2030. But that is the point about cadence, not capability: China arrives late and arrives anyway. It closed 28nm, then closed DUV-7nm in the 2023 Kirin 9000S. Betting that the same pattern fails at the next node is betting against a fifteen-year track record.",
        "Memory is the real LLM killer, and it is the layer where the catch-up is most concrete. Huawei's own roadmap concedes that the **Ascend 950PR and 950DT have *lower* total processing performance than the older 910C** — because without large-volume HBM and advanced packaging, the chips are starved of bandwidth on transformer workloads. The 950PR is a **monolithic single die precisely because Huawei cannot access TSMC's CoWoS packaging**; it dodges the packaging bottleneck at the cost of die size and yield. The fix is already in motion: **CXMT is sampling HBM3 to Huawei and targeting mass production by end-2026**, with DDR5/LPDDR5 already ramping at ~50%-plus yield. Domestic HBM3 attacks the exact bandwidth ceiling that throttles Ascend on LLMs today. Pair that with capacity scaling — **SMIC's 7nm advanced capacity hit ~50,000 wafers/month by end-2025, enough die for over a million Ascend parts a year, reportedly doubling in 2026** as Huawei targets ~600,000 Ascend 910C units versus ~300,000 in 2025 — and you see the deficit closing on two axes at once: yield and volume.",
        "Per-chip, Nvidia wins and it is not close. **Rubin delivers ~50 PFLOPS FP4 per GPU against the Ascend 950PR's ~2 PFLOPS MXFP4 — a ~25-32x single-chip gap**, and CFR's December 2025 read has Huawei silicon at best approaching H100-class in 2026-27 while the best US chips run >17x more powerful by 2027. Anthropic builds its optimistic scenario on the aggregate version of this: **Huawei at ~4% of Nvidia's compute in 2026, ~2% in 2027.** But the per-chip frame is the wrong altitude, and China knows it. At the system level Huawei flips the contest: the **CloudMatrix 384 packs 384 Ascend 910C against just 72 GPUs in Nvidia's GB200 NVL72 — ~5x the chips offsetting each being a third of a Blackwell — for ~300 PFLOPS versus ~155-180, with 3.6x the aggregate memory and 2.1x the bandwidth**, lashed together by a fully optical, all-to-all fabric of 6,912 transceivers drawn straight from Huawei's telecom heritage. SemiAnalysis's verdict is the whole story in one line: the chip is a generation behind, the scale-up system is a generation ahead.",
        "The cost of that trade is power — **CloudMatrix 384 draws 559 kW against 145 kW, 4.1x the power and ~2.5x worse per-FLOP.** In the United States, where power is the binding constraint on datacenter buildout, that would be disqualifying. In China it is the slack variable: cheap, abundant, lightly regulated energy spent to buy back a restricted input. America optimizes performance-per-watt because watts are what it is short of; China optimizes performance-per-restricted-chip because chips are what *it* is short of. Anthropic's prescription — close the smuggling, offshore-datacenter, and DUV-SME-servicing loopholes — is an attempt to make chips scarcer still. It does not touch the slack variable. It just raises the price China pays in megawatts, which China has decided it is willing to pay.",
        "Then there is the software loop, the one that should worry the cagers most because it is the moat they are actively eroding. Nvidia's durable advantage was never the silicon; it was CUDA and fifteen years of mature PyTorch tooling. Huawei's answer — Ascend plus CANN plus MindSpore plus the Unified Bus — was a toy until forced demand made it real. **CANN 8.0 went fully open-source in late 2025; CANN Next added a SIMT execution model mirroring CUDA's abstractions, with early benchmarks suggesting ~80% of standard PyTorch inference code runs on Ascend with config changes rather than rewrites.** Migration cost was the entire barrier, and it is collapsing: ByteDance plans **over $5.6B in Ascend spend in 2026**, and Baidu plus Huawei now control **~70% of China's GPU cloud**. DeepSeek is the keystone — it ran R1 on CloudMatrix/910C claiming it beats H100 at **~90% lower cost**, delayed V4 to co-design for Ascend, and gave Huawei early optimization access it denied Nvidia and AMD. With **Big Fund III's ~$47.5B (RMB 344B)** capital base behind the IC fund's reported lead in a DeepSeek round near a $45B valuation, the national loop closes: chip to system to software to model to demand for more domestic chips.",
        "So I land where Jensen Huang lands, and against Anthropic. Each mechanism I have walked through — DUV multipatterning, SMEE and SiCarrier, CXMT's HBM, the pre-control ASML DUV stockpile and its grey-market servicing, the TSMC-engineer poaching, Big Fund III, the DeepSeek co-design — exists *because* of the controls, not in spite of them. Tighter controls do not break this loop; they are the activation energy for it. Huang's data is the receipt: Nvidia's China share went from **~66% in 2024 to ~0% now**, and the vacuum did not stay empty — it filled with Huawei, with CANN, with a closed, export-control-immune stack and ~50% of the world's AI researchers on the other side of the wall. Anthropic wants a 12-24 month lead bought by closing loopholes, restricting model access, and criminalizing distillation. What that buys, on the evidence, is a faster, angrier, fully indigenized competitor — manufactured to spec, on a delay, by the policy meant to prevent it."
      ],
      "pullQuote": "The export controls did not build a wall. They built a clock — and every mechanism China uses to catch up exists because we set it ticking.",
      "keyStats": [
        {
          "value": "~9 vs ~34",
          "label": "EUV steps vs DUV steps to pattern one 7nm layer — the penalty of being walled off EUV"
        },
        {
          "value": "300 vs 180 PFLOPS",
          "label": "CloudMatrix 384 (384 Ascend 910C) vs GB200 NVL72 — system beats silicon"
        },
        {
          "value": "$47.5B",
          "label": "Big Fund III (RMB 344B), the capital base closing the chip-to-model loop"
        },
        {
          "value": "~0%",
          "label": "Nvidia's China share now, down from ~66% in 2024 — the vacuum Huawei filled"
        }
      ]
    },
    {
      "id": "rebuttal-intro",
      "eyebrow": "The Disagreement",
      "title": "Answering Anthropic, Point by Point",
      "dek": "Anthropic and I want the same thing: no frontier model wired into automated repression. We part on the causal claim that tighter export controls preserve the American lead. They don't preserve it — they manufacture the competitor.",
      "body": [
        "Let me concede the ground worth conceding, because it is real and I will not pretend otherwise. No one serious — not Jensen Huang, not me, not the authors of Anthropic's *2028: Two scenarios for global AI leadership* — wants a frontier system handed to a state security apparatus for automated surveillance, targeting, and repression at population scale. That is the shared value. If the entire argument were about denying the most dangerous capabilities to the most dangerous end-users, we would be allies. It is not, and we are not.",
        "My disagreement is narrow, technical, and total. It is with Anthropic's **causal theory** — the load-bearing assumption underneath both of their scenarios — that the chip chokepoints (Nvidia GPUs, TSMC fabrication, ASML's EUV monopoly) can be tightened into a durable **12-to-24-month** lead that caps China at \"good enough.\" Their prescription follows from that theory: close the smuggling, offshore-datacenter, and DUV-servicing loopholes; restrict model access and criminalize distillation; and export the American stack hard enough to deny China any foothold. I reject the prescription because I reject the theory. The controls are not a wall around China's AI. They are the catalyst of its indigenization.",
        "Here is the part that should trouble Anthropic most: the strongest evidence for my position is *their own evidence*. Read their two scenarios closely and they describe, in Scenario 2, a competitor with cheap \"good enough\" datacenters hosting near-frontier models globally — Huawei and Alibaba silicon, fully optical fabrics, costs cut to the bone. That competitor is not hypothetical and it is not a forecast. It already exists, and it exists *because of* the controls. The CloudMatrix 384 — **384** Ascend 910C chips against just **72** GPUs in Nvidia's GB200 NVL72, a fully optical all-to-all fabric of **6,912** transceivers, **~300 PFLOPS** of system compute against ~180 — is what a telecom company builds when you deny it TSMC's CoWoS packaging and ASML's EUV scanners. SemiAnalysis put it precisely: the chip is a generation behind, but the *system* is a generation ahead. The optical fabric, the **~90%** inference cost cut DeepSeek claims on Ascend, the Big-Fund-financed chip-to-model loop closing on itself — every one of these is a control-shaped artifact. You do not get an indigenous full stack from a competitor you are merely beating. You get it from a competitor you have cornered.",
        "So when Anthropic counts Huawei at **~4%** of Nvidia's aggregate compute in 2026 and **~2%** in 2027, and a CFR-style study projects the US ending with **~11x** China's AI compute if controls hold, I do not dispute the arithmetic. I dispute that the arithmetic is the point. Those are snapshots of a per-chip gap — real, ~32x in Nvidia's favor at FP4 — taken at the exact moment the pressure is converting into the slack variables China actually controls: cheap abundant energy spent as the answer to a chip deficit, a closed domestic market immune to the next license revocation, and a forced march toward homegrown lithography that would never have been funded if Nvidia were still selling freely. America optimizes performance-per-watt because power is its binding constraint. China optimizes performance-per-restricted-input, because the chip is the thing it has been denied. Tightening the restriction does not starve that strategy. It *defines* it.",
        "What follows is the rebuttal, point by point, in a structured matrix: each of Anthropic's specific policy asks set against the technical and geopolitical reality it collides with. I will take their case at its strongest, use their numbers where they are sound, and show where each prescription accelerates exactly the outcome it was written to prevent. The disagreement is not about whether the chokepoints are powerful. They are. It is about which direction the leverage points once you pull the trigger."
      ],
      "pullQuote": "You do not get an indigenous full stack from a competitor you are merely beating. You get it from one you have cornered — and Anthropic's own evidence, the optical fabric and the 90% cost cut, is the receipt.",
      "keyStats": [
        {
          "value": "~4% / ~2%",
          "label": "Huawei share of Nvidia aggregate compute, 2026 / 2027 (Anthropic's own figure)"
        },
        {
          "value": "384 vs 72",
          "label": "Ascend 910C chips in CloudMatrix 384 vs GPUs in GB200 NVL72"
        },
        {
          "value": "~300 PFLOPS",
          "label": "CloudMatrix 384 system compute vs ~180 for GB200 NVL72"
        },
        {
          "value": "12-24 mo",
          "label": "The durable US lead Anthropic's controls are supposed to buy"
        }
      ]
    },
    {
      "id": "synthesis",
      "eyebrow": "Reconciliation",
      "title": "The Honest Synthesis: Both Readings Are True",
      "dek": "Anthropic and Jensen Huang are not arguing about the same layer of the stack. Both are right about their layer. The disagreement is narrow — and the policy meant to defend the lead is the one that most reliably forfeits it.",
      "body": [
        "Let me be precise about where I agree with Anthropic, because the agreement is large and I have no interest in pretending otherwise. On the **per-chip frontier**, the manufacturing ceiling is real and it bites hard. Huawei's Ascend 950PR delivers roughly **2 PFLOPS at MXFP4** against Nvidia Rubin's **~50 PFLOPS** — a **25-32x** single-die gap that no amount of clever fabric papers over. The root cause is one machine Huawei cannot buy: ASML's EUV scanner. Stuck on SMIC's N+2 (~7nm) via DUV multipatterning, Huawei runs **50-60% yield against TSMC's 80-90%**, ~2x the cycle time, and a memory subsystem so constrained that Huawei's *own* roadmap concedes the 950PR and 950DT post lower total processing performance than the older 910C. CFR's estimate that Huawei sits at ~4% of Nvidia's aggregate compute in 2026 and ~2% in 2027 is not propaganda; it is roughly what the wafers and the HBM yields imply. If you define the race as the single-die leading edge in 2026-27, the controls are working exactly as advertised.",
        "And here is where Huang is equally, separately right — because he is talking about a *different altitude*. At the **system level**, the contest inverts. CloudMatrix 384 packs **384 Ascend 910C** against just **72 GPUs** in a GB200 NVL72: five times the silicon, each piece a third as strong, nets out to **~300 PFLOPS versus ~180**, with 3.6x the aggregate memory capacity and a fully optical all-to-all fabric of **6,912 transceivers** drawn straight from Huawei's telecom heritage. SemiAnalysis's verdict is the whole story in one line: the chip is a generation *behind*, but the scale-up system is a generation *ahead* of anything Nvidia or AMD ships commercially. The cost of that inversion is **4.1x the power and 2.5x worse perf-per-watt** — and that is precisely the point, because power is America's binding constraint and China's slack variable. The US optimizes performance-per-watt; China optimizes performance-per-restricted-input and burns cheap, abundant, lightly-regulated electricity to do it. Both optimizations are rational given each side's actual scarcity.",
        "So the honest reconciliation is this: **everyone already agrees China can do cheap, good-enough, near-frontier inference today.** DeepSeek ran R1 on CloudMatrix/910C, claimed it beats H800/H100 for that workload, and cut serving costs roughly **90% versus H100** — serving at about one yuan per million tokens. V4 was *deliberately delayed* to co-design for Ascend, with Huawei given early optimization access denied to Nvidia, and reportedly hits **2.87x an H20** on the 950PR. That is not a forecast. That is a frontier-class model running natively on Chinese silicon, immune to export controls, financed by a *semiconductor* fund — the Big Fund — leading the lab's round near a **$45B valuation**. The chip → system → software → model → demand loop is already closed. The disputed territory is not 'good enough.' It is the *actual frontier* — the largest training runs, the densest dies — and that is exactly the territory Anthropic's two scenarios carve up.",
        "Read the scenarios honestly and they map onto the altitude split with almost surgical cleanness. **Scenario 1** — a durable US lead of 12-24 months — requires that the chip chokepoint *holds*, capping China at 'good enough' while America compounds at the frontier. **Scenario 2** — neck-and-neck — is the world where Huawei and Alibaba stand up cheap 'good enough' datacenters and host near-frontier models globally, where system-level scale and energy arbitrage erase the per-chip deficit for the workloads that pay. Anthropic is not wrong that these are the two branches. Anthropic is wrong about which lever sends us down which branch. Their prescription — close the smuggling, foreign-datacenter, and DUV-SME-servicing loopholes; restrict model access and criminalize distillation; champion American AI exports to deny China footholds — is offered as the road to Scenario 1.",
        "It is, in fact, the most reliable road to Scenario 2. Every tightening does three things at once. It guarantees Huawei a **captive domestic market** — Baidu and Huawei already hold ~70% of China's GPU cloud, and CANN going open-source plus a SIMT execution model that runs ~80% of PyTorch inference with config-only changes is steadily demolishing the CUDA migration moat that was Nvidia's most durable asset. It hands Huawei a **reason to exist at scale**: ByteDance alone plans **>$5.6B** of Ascend spend in 2026, demand that materialized *because* the alternative was cut off. And it converts pressure into **indigenization on a delay** — SMIC capacity reportedly doubling, CXMT sampling HBM3, SiCarrier and SMEE building domestic tools, a non-ASML LDP EUV source in trials at Dongguan. China has closed 28nm, then DUV-7nm in the Kirin 9000S, each a few years late but each *closed*. The historical cadence is not a wall; it is a lag. Caging does not stop the competitor. It funds him, focuses him, and guarantees his customers.",
        "This is why I land with Huang and against the paper. The export-control regime is already **non-monotonic** — banned, then H20-licensed, then restored, then H200 permitted under a 25% revenue cut to the Treasury — which alone should embarrass the 'hold the line' premise. Nvidia's China share went from ~66% in 2024 to roughly zero, and the chief beneficiary was not American security but Huawei's order book. One study's headline that tighter controls yield the US ~11x China's AI compute is the optimistic case, and even it concedes the system layer and the energy arbitrage that make 'good enough at scale' globally exportable. The irony is total and it is not subtle: the policy sold as the defense of the lead is the one input most certain to manufacture the self-reliant rival it fears. You do not win a manufacturing race by handing your competitor a guaranteed market, a strategic mandate, and twenty years of motivation. You win it by out-building, and out-building requires that you keep selling.",
        "— Bo Shang, bo@trenchwork.org / bo@shang.software"
      ],
      "pullQuote": "Both readings are true; the disagreement is narrow but decisive. The policy sold as the defense of the lead — tighter controls — is the one input most certain to manufacture the self-reliant rival it fears, by handing Huawei a captive market and a reason to exist.",
      "keyStats": [
        {
          "value": "25-32x",
          "label": "Nvidia Rubin per-chip FP4 edge over Ascend 950PR — the gap controls defend"
        },
        {
          "value": "~300 vs ~180 PFLOPS",
          "label": "CloudMatrix 384 vs GB200 NVL72 — where system scale flips the contest"
        },
        {
          "value": "~90%",
          "label": "DeepSeek R1 cost cut on Ascend vs H100 — 'good enough' is already settled"
        },
        {
          "value": ">$5.6B",
          "label": "ByteDance's planned 2026 Ascend spend — captive demand the controls created"
        }
      ]
    },
    {
      "id": "conclusion",
      "eyebrow": "Conclusion",
      "title": "A Race You Cannot Win by Caging",
      "dek": "You do not win a long race by freezing a rival that has world-class talent, cheap abundant energy, deep capital, and total state will. You win by out-innovating — and by keeping that rival on your platform. Export controls trade a durable platform advantage for a leaky hardware lead.",
      "body": [
        "Strip away the schematics and what remains is a single strategic error, repeated with conviction. Anthropic's May 14 essay asks Washington to buy a **12-to-24-month** lead by closing the smuggling, offshore-datacenter, and DUV-servicing loopholes, criminalizing distillation, and exporting the American stack to deny China footholds. The optimistic case it sells is **Huawei at ~4% of Nvidia's aggregate compute in 2026, ~2% in 2027**, with the US holding roughly **11x** China's AI compute. I do not dispute the arithmetic. I dispute that the arithmetic is the prize. A two-percent compute share is not a moat when it sits on a fully indigenized, export-control-immune loop that you spent four years funding by accident.",
        "Look at what the wall actually produced. EUV denial — ASML's **100%** EUV monopoly weaponized through The Hague and Tokyo — pins SMIC at N+2, a DUV-multipatterned ~7nm node running **~40-60%** yield against TSMC's **80-90%**, two-to-three generations behind the leading edge — Blackwell on 4NP, Rubin on 3nm. On paper, a rout: a single Rubin is **~25-32x** an Ascend at FP4. And yet DeepSeek ran R1 on a CloudMatrix 384 — **384** Ascend 910C lashed together by **6,912** optical transceivers into **~300 PFLOPS** against the GB200 NVL72's ~180 — and claimed a **~90%** cost cut versus H100. SemiAnalysis' verdict is the whole thesis in nine words: the chip is a generation behind, the system a generation ahead. China answered a per-chip deficit it could not fix with a system-level architecture it built from its own telecom heritage, and paid for it in the one currency the controls forgot to ration — **4.1x** the power, spent freely because energy is China's slack variable and America's binding constraint.",
        "This is what caging manufactures. You cannot embargo talent — **~50%** of the world's AI researchers are Chinese, and Huawei is paying **3x** salaries to repatriate the rest. You cannot embargo capital — Big Fund III is **~$47.5B**, and a semiconductor fund is now leading a DeepSeek round near a **$45B** valuation, financing not a chip but a model, because the state already understands the loop is the asset. You cannot embargo will. What you *can* do is hand a state with all three the one thing it could not previously buy at any price: a non-negotiable reason to build the entire stack itself — lithography, memory, fabric, runtime, framework, model. SiCarrier's tools are in SMIC trials; CXMT is sampling HBM3; a domestic LDP EUV source is on a Huawei bench in Dongguan. None of that was inevitable. The controls made it rational.",
        "And here is the part the hawks refuse to price: the durable American advantage was never the chip. It was **CUDA** and fifteen years of PyTorch tooling — a lock-in that, globally, remains overwhelming. Export controls are spending that asset to buy a hardware lead that leaks by design. Drive DeepSeek, ByteDance, and Alibaba off Nvidia and they do not stop; they port. CANN went open-source, **~80%** of standard PyTorch inference now runs on Ascend with config changes, ByteDance is committing **>$5.6B** to Ascend in 2026, and Baidu plus Huawei already own **~70%** of China's GPU cloud. Every model that migrates from CUDA to CANN is a permanent withdrawal from the only moat that compounds. Jensen Huang has said this plainly — the controls are short-sighted, they have already largely backfired, and they dropped Nvidia from **~66%** of the China market to **~0%**. He is right, and I will not pretend otherwise to sound balanced.",
        "So the prescription inverts. **Sell them the chips. Keep them on CUDA. Compete on the frontier.** A China dependent on H200s and the Nvidia toolchain is a China whose AI sector you can read, throttle, and outpace at will — a customer, not a sovereign competitor. A China forced onto SMIC, CANN, and CloudMatrix is a China you have permanently lost visibility into and permanently motivated to surpass you. The first is leverage that compounds; the second is leverage you set on fire to feel strong for twenty-four months. DeepSeek-V4 delayed to co-design natively for the Ascend 950PR — reportedly **2.87x** an H20 on that silicon — is not a Chinese triumph. It is an American policy artifact.",
        "America can win this race. Not by building a higher wall around a competitor who will tunnel under it on a predictable delay — China has closed 28nm, then DUV-7nm, every node a few years late but reliably closed. America wins by being the platform everyone, including China, cannot afford to leave, and by running faster on the frontier than anyone forced to optimize performance-per-restricted-input can follow. The choice is not control versus surrender. It is a temporary, leaky hardware lead versus a durable, compounding platform advantage. Anthropic chose the former and dressed it as prudence. I choose the latter and call it strategy."
      ],
      "pullQuote": "Sell them the chips, keep them on CUDA, and compete on the frontier — because a China dependent on your platform is leverage that compounds, while a China you force to build its own is a competitor you set the lead on fire to create.",
      "keyStats": [
        {
          "value": "12-24 mo",
          "label": "The temporary lead Anthropic wants — bought by burning a durable CUDA moat"
        },
        {
          "value": "~0%",
          "label": "Nvidia's China market share now, down from ~66% in 2024"
        },
        {
          "value": ">$5.6B",
          "label": "ByteDance's planned 2026 Ascend spend as CANN-CUDA migration cost collapses"
        },
        {
          "value": "~$47.5B",
          "label": "Big Fund III — the capital caging cannot embargo, now funding the chip→model loop"
        }
      ]
    }
  ],
  "rebuttal": [
    {
      "anthropic": "A US lead of 12-24 months is achievable and defensible if we tighten export controls; chokepoints on Nvidia GPUs, TSMC fabrication, and EUV lithography can cap China at 'good enough' and widen America's advantage (Scenario 1, with the US holding ~11x China's AI compute).",
      "response": "The controls do not widen the lead; they convert a dependency into an indigenization program. China reliably closes nodes a few years late but does close them — 28nm, then DUV-7nm in the Kirin 9000S in 2023 — and the same pressure is now funding SiCarrier, SMEE's SSA800, a domestic LDP EUV source in trials at Huawei's Dongguan facility, and CXMT HBM3 sampling to Huawei. An 11x compute ratio measured in 2026 is a snapshot of a gap I am actively teaching the other side to close on a delay; you cannot bank a lead whose mechanism of maintenance accelerates the competitor's self-sufficiency.",
      "verdict": "Backfires"
    },
    {
      "anthropic": "Algorithmic progress is a function of compute, not a substitute for it, so restricting China's access to chips caps how far Chinese labs can push the frontier even if their researchers are excellent.",
      "response": "This conflates per-chip silicon (where Nvidia wins ~25-32x: Rubin ~50 PFLOPS FP4 vs Ascend 950PR ~2) with delivered system compute, where the gap collapses. CloudMatrix 384 packs 384 Ascend 910C against 72 B200s in GB200 NVL72 and yields ~300 PFLOPS vs ~180, with 3.6x aggregate memory and 2.1x bandwidth — SemiAnalysis judged the chip a generation behind but the system a generation ahead. China substitutes architecture and cheap energy (4.1x the power, the slack variable America lacks) for restricted chips, so 'compute' is precisely the variable controls fail to fence.",
      "verdict": "Category error"
    },
    {
      "anthropic": "Smuggling and offshore/foreign-datacenter access let China rent or import frontier compute it cannot buy domestically; closing these loopholes is necessary to make the chokepoints actually bind.",
      "response": "Every loophole you close raises the marginal return on domestic substitution, which is exactly why DeepSeek delayed V4 to co-design for the Ascend 950PR, ran R1 inference on CloudMatrix/910C at a claimed ~90% cost cut versus H100, and gave Huawei early optimization access while denying it to Nvidia and AMD. The Big Fund — a semiconductor vehicle — leading a DeepSeek round near a $45B valuation closes the chip-system-software-model-demand loop. Sealing the smuggling door does not strand Chinese labs; it pays for the domestic foundry order book.",
      "verdict": "Self-defeating"
    },
    {
      "anthropic": "Controlling the servicing of DUV semiconductor manufacturing equipment — the installed ASML immersion base China bought before the curbs — would degrade SMIC's ability to keep producing 7nm-class Ascend silicon.",
      "response": "China front-ran the January 2024 Dutch curbs (ASML China hit ~46% of sales in Q3 2023; ~$3.96B litho imports in 2022) precisely to build a pre-control install base plus a spares buffer, and SiCarrier affiliate Yuliangsheng already had a DUV tool in SMIC trials by September 2025. Servicing controls do not stop the lines; they hand the domestic toolmakers their guaranteed first customer and a forcing function for import substitution. The binding wall was always EUV denial, and that wall is being independently attacked, not the DUV service contract.",
      "verdict": "Misidentifies the chokepoint"
    },
    {
      "anthropic": "Distillation attacks let Chinese labs copy the capabilities of frontier American models cheaply; restricting model access and criminalizing or deterring distillation protects the US capability lead.",
      "response": "Distillation deterrence assumes China needs to copy frontier weights, but the trajectory is sovereignty, not theft: DeepSeek-V4 reportedly hits 2.87x H20 on the 950PR as the first trillion-parameter MoE fully adapted to domestic chips, and DeepSeek-V4-Pro pricing already undercuts frontier US models. A frontier-class model running natively on Chinese silicon is export-control-immune by construction. Criminalizing distillation is unenforceable across jurisdictions and irrelevant against a competitor that is now training its own frontier models on its own hardware loop rather than distilling yours.",
      "verdict": "Solves the wrong problem"
    },
    {
      "anthropic": "America should champion the global export of the full American AI stack so that allied and neutral markets standardize on US models and chips, denying China the international footholds it would need to set the global default.",
      "response": "Jensen Huang's data is the rebuttal: controls dropped Nvidia from ~66% China share in 2024 to ~0%, ceding the second-largest technology market and roughly half the world's AI researchers, and eroding CUDA as DeepSeek ports to CANN. Huawei open-sourced CANN 8.0, added a SIMT model so ~80% of PyTorch inference runs with config-only changes, and Baidu plus Huawei already hold ~70% of China's GPU cloud. You cannot 'lock out' a rival by first vacating the market that funds his R&D and seeds the open-source stack that becomes the global alternative outside the US bloc.",
      "verdict": "Hands over the market"
    },
    {
      "anthropic": "Huawei is only ~4% of Nvidia's aggregate compute in 2026 and ~2% in 2027, so the indigenous Chinese alternative is a rounding error and the chokepoints are working.",
      "response": "That ratio flatters the controls by counting raw aggregate chips while ignoring that China does not need parity — it needs enough frontier-capable inference to run sovereign models, which CloudMatrix already delivers at system level. The share is also a function of denominator growth (Nvidia's volume), not Huawei stagnation: SMIC 7nm capacity reached ~50,000 wafers/month by end-2025 and is reportedly doubling, with Ascend output rising from ~300k (2025) toward ~600k-750k units (2026) and ByteDance committing >$5.6B to Ascend. A 2% share attached to a doubling capacity curve and a closed national loop is not a moat; it is the early part of an exponential.",
      "verdict": "Overstated"
    },
    {
      "anthropic": "Chinese AI safety and alignment practices lag the US, so concentrating the capability lead in American hands produces safer frontier AI than a neck-and-neck world.",
      "response": "Throttling China's chip access does not make Chinese AI safer — it makes it less legible and less interoperable by pushing the entire stack into a closed, export-control-immune CANN/Ascend/DeepSeek loop where US labs and regulators have zero visibility or leverage. Safety is advanced by engagement, shared evaluation norms, and dependency that creates mutual stakes, all of which controls destroy. Manufacturing a hermetic, state-financed adversary stack is the most dangerous possible outcome for safety, not the safest; a sealed competitor optimizing under sanctions has every incentive to cut the corners Anthropic worries about.",
      "verdict": "True but self-defeating"
    },
    {
      "anthropic": "The two scenarios diverge on policy: holding the chip chokepoints produces Scenario 1 (durable US lead), while leakage produces Scenario 2 (Huawei plus Alibaba hosting cheap 'good enough' near-frontier models globally), so tighter controls are the safer bet.",
      "response": "The paper treats Scenario 2 as a failure of enforcement when it is the predictable output of enforcement: caging is the mechanism that produces the cheap, sovereign, globally hosted stack it fears. The manufacturing root cause — EUV denial forcing SMIC onto DUV multi-patterning at ~50-60% yield — is real and is exactly why China is industrializing performance-per-restricted-input (system scale plus cheap energy) rather than performance-per-watt. Tighter controls do not select Scenario 1 over Scenario 2; they fund the indigenization that makes Scenario 2 the equilibrium.",
      "verdict": "Backfires"
    },
    {
      "anthropic": "Nvidia's CUDA and 15+ years of PyTorch tooling constitute a durable software moat that locks in American platform dominance, reinforcing the value of hardware chokepoints.",
      "response": "The CUDA moat is real globally but is precisely what controls are eroding inside China and increasingly in the neutral world. CANN now supports PyTorch, TensorFlow, ONNX and PaddlePaddle, torch_npu runs existing PyTorch via PrivateUse1, CANN Next added SIMT for near-drop-in CUDA replacement, and the open-sourcing of CANN 8.0 triggered automated CUDA-to-CANN conversion tooling — which is why ByteDance and Alibaba report being 'much happier now.' Geopolitical risk made Nvidia the 'legacy' choice for state-backed Chinese firms; the moat does not protect a vendor you have legislated out of the market.",
      "verdict": "Eroding by policy"
    }
  ],
  "datasets": {
    "perChip": [
      {
        "name": "Nvidia H100",
        "pflopsFp4": 4,
        "node": "TSMC 4N (5nm-class)",
        "vendor": "Nvidia",
        "year": "2022",
        "note": "Reference baseline. ~4 PFLOPS at FP8 sparse (no native FP4; figure is the FP8-sparse/INT8 ceiling shown for FP4-axis comparability). The export-control benchmark chip: A100/H100 were banned to China in Oct 2022, spawning the cut-down A800/H800; the Oct 2023 update banned those too, and Nvidia later cut the H20 (2024). CFR: Ascend 910C delivers ~60% of H100 single-chip inference; Huawei silicon at best approaches H100-class only in 2026-27."
      },
      {
        "name": "Nvidia Blackwell B200",
        "pflopsFp4": 18,
        "node": "TSMC 4NP (5nm-class), CoWoS-L dual-die",
        "vendor": "Nvidia",
        "year": "2024",
        "note": "~18 PFLOPS FP4 (sparse; ~9 dense) per GPU. Dual-reticle die fused via TSMC CoWoS advanced packaging plus large-volume HBM3e — exactly the two inputs (advanced packaging + HBM) China is walled off from. 8x H100 building block of the GB200 NVL72 rack compared below."
      },
      {
        "name": "Huawei Ascend 950 (950PR)",
        "pflopsFp4": 1.56,
        "node": "SMIC N+2 (~7nm DUV multipatterning)",
        "vendor": "Huawei",
        "year": "2026",
        "note": "~2 PFLOPS MXFP4 (1.56 PFLOPS cited in some sources) / ~1 PFLOPS FP8; 128GB in-house HBM (HiBL 1.0), 1.6 TB/s. Monolithic single die — Huawei deliberately avoids multi-chiplet because it cannot access TSMC CoWoS packaging, dodging the packaging bottleneck at the cost of die size/yield. SMIC ~7nm yield ~50-60% vs TSMC ~80-90%. Memory is the LLM killer: Huawei's own roadmap concedes the 950PR/950DT have LOWER total processing performance than the older 910C on some workloads. Against Rubin's ~50 PFLOPS this is the ~25-32x per-chip gap (32x using the 1.56 figure)."
      },
      {
        "name": "Huawei Ascend 960",
        "pflopsFp4": 4,
        "node": "SMIC N+2/N+3 (~7nm, possible 5nm-class)",
        "vendor": "Huawei",
        "year": "2027",
        "note": "~4 PFLOPS FP4 / ~2 PFLOPS FP8; 288GB, 9.6 TB/s — doubles the 950's compute, memory and interconnect. Rapid ~2x cadence year-over-year is the core of Bo's thesis: caging forces an indigenized doubling curve. Still ~12.5x behind Rubin (~50 PFLOPS) per chip in 2027, the gap Anthropic/CFR expect controls to widen to >17x. Node uncertain: depends on whether SMIC's DUV-multipatterned 5nm-class (~33% yield, 40-50% cost premium) is production-ready, or it stays on N+2."
      },
      {
        "name": "Nvidia Rubin (R200)",
        "pflopsFp4": 50,
        "node": "TSMC N3 (3nm), CoWoS + HBM4",
        "vendor": "Nvidia",
        "year": "2026/27",
        "note": "~50 PFLOPS FP4 (35 dense, up to 50 with 3rd-gen Transformer Engine); 288GB HBM4, 22 TB/s. GTC 2026. 3nm node sits 2-3 generations ahead of SMIC's ~7nm N+2. ~25x a single Ascend 950 at FP4 (~32x vs the 1.56 MXFP4 figure). The per-chip benchmark of Nvidia dominance that the system-level CloudMatrix argument is built to circumvent."
      }
    ],
    "system": [
      {
        "name": "Huawei CloudMatrix 384 (Atlas 900 SuperNode)",
        "chips": 384,
        "chipType": "Ascend 910C",
        "pflops": 300,
        "vendor": "Huawei",
        "note": "~300 PFLOPS (BF16) from 384 Ascend 910C NPUs + 192 CPUs across 16 racks. 5.33x the chip count of GB200 NVL72 offsets each Ascend being ~1/3 a Blackwell, netting ~1.67x the compute plus ~3.6x aggregate memory capacity and ~2.1x bandwidth. Fully optical all-to-all scale-up fabric: 6,912 400G LPO/SiPh transceivers (5,376 scale-up + 1,536 scale-out), 3,168 fibers — Huawei's telecom/optical heritage applied to AI. SemiAnalysis verdict: the chip is a generation behind, but the scale-up SYSTEM is a generation AHEAD of current Nvidia/AMD commercial products. DeepSeek ran R1 inference here claiming it beats H100, ~90% cost cut. This is 'system beats silicon' — the empirical core of Bo's argument that controls channel rather than stop China."
      },
      {
        "name": "Nvidia GB200 NVL72",
        "chips": 72,
        "chipType": "B200 (Blackwell)",
        "pflops": 180,
        "vendor": "Nvidia",
        "note": "~180 PFLOPS (BF16; ~155-180 cited) from 72 B200 GPUs + 36 Grace CPUs in one liquid-cooled rack, NVLink5 copper scale-up domain. Far denser per-chip and far more power-efficient (145 kW vs CloudMatrix's 559 kW), but fewer chips and less aggregate memory. The reference rack-scale product against which CloudMatrix 384's chip-count-over-silicon strategy is measured."
      }
    ],
    "power": {
      "powerRatio": 4.1,
      "perFlopRatio": 2.5,
      "note": "CloudMatrix 384 draws ~559 kW vs ~145 kW for a GB200 NVL72 = ~4.1x the power (the raw kW ratio is ~3.86x; 4.1x is the commonly cited system figure including networking/cooling overhead), and ~2.5x worse power-per-FLOP (range cited 2.3-2.5x). This is the deliberate trade at the heart of the thesis: in the US, grid power is the binding constraint, so Nvidia/hyperscalers optimize performance-per-watt. China has cheaper, more abundant, more lightly-regulated energy, so it optimizes performance-per-restricted-input (chips), spending cheap electricity as the slack variable. Export controls that throttle chip access simply push China harder onto the axis where it has comparative advantage."
    },
    "aggregate": [
      {
        "year": "2025",
        "huaweiPctOfNvidia": 5,
        "note": "CFR (Dec 2025) baseline: Huawei's aggregate AI compute is ~5% of Nvidia's. Context point preceding the years Anthropic projects; shown to make the declining trend legible."
      },
      {
        "year": "2026",
        "huaweiPctOfNvidia": 4,
        "note": "~4% — the figure both CFR and Anthropic's 14 May 2026 essay use. Anthropic treats this small share as evidence the chip chokepoints are working and should be tightened. Bo's counter: the share is small precisely because the controls are young; it understates the indigenized doubling cadence (Ascend 950->960->970 at ~2x/yr) and ignores that DeepSeek-class frontier models now run NATIVELY on this 4% — export-control-immune compute is worth more than its headline share. Note Huawei's per-chip silicon is improving faster than the aggregate ratio because Nvidia is also scaling output rapidly."
      },
      {
        "year": "2027",
        "huaweiPctOfNvidia": 2,
        "note": "~2% — CFR/Anthropic projection. The ratio FALLS even as Huawei's absolute compute grows, because Nvidia's Rubin ramp (~50 PFLOPS/chip, 3nm) outpaces SMIC's ~7nm-constrained output: by 2027 the best US chip is >17x the best Huawei chip. Anthropic reads this as the lead worth defending with tighter controls. Bo reads the same number as the optimistic-case denominator that controls themselves undermine — the Big-Fund-financed chip->system->software->model->demand loop (DeepSeek-V4-Pro on Ascend) converts the aggregate gap into a closed, self-reliant domestic market that no longer buys Nvidia at all, the exact competitor Jensen Huang warns the policy manufactures. Treat 2027 as a projection with wide error bars (depends on SMIC capacity doubling, CXMT HBM3 volume, and whether controls hold)."
      }
    ],
    "lithoLadder": [
      {
        "node": "2nm (N2)",
        "vendor": "TSMC",
        "technique": "0.33-NA EUV single-exposure, GAA nanosheet (volume Q4 2025)",
        "lithoClass": "EUV",
        "generationsBehind": 0
      },
      {
        "node": "2nm (SF2)",
        "vendor": "Samsung",
        "technique": "0.33-NA EUV, GAA (MBCFET) nanosheet",
        "lithoClass": "EUV",
        "generationsBehind": 0
      },
      {
        "node": "3nm (N3/N3E)",
        "vendor": "TSMC",
        "technique": "0.33-NA EUV single-exposure, FinFET (node under Nvidia Rubin)",
        "lithoClass": "EUV",
        "generationsBehind": 0
      },
      {
        "node": "3nm (SF3)",
        "vendor": "Samsung",
        "technique": "0.33-NA EUV, GAA nanosheet",
        "lithoClass": "EUV",
        "generationsBehind": 0
      },
      {
        "node": "5nm (N5)",
        "vendor": "TSMC",
        "technique": "0.33-NA EUV (~9 EUV steps for a critical layer); wafer ~$18,500",
        "lithoClass": "EUV",
        "generationsBehind": 0
      },
      {
        "node": "7nm (N7)",
        "vendor": "TSMC",
        "technique": "EUV single-exposure on critical layers; wafer ~$9,500; yield ~80-90%",
        "lithoClass": "EUV",
        "generationsBehind": 0
      },
      {
        "node": "7nm (N+2)",
        "vendor": "SMIC",
        "technique": "193nm ArF-immersion DUV with SADP/SAQP multipatterning (~34 DUV steps vs ~9 EUV); Kirin 9000S / Ascend 910C",
        "lithoClass": "DUV",
        "generationsBehind": 3
      },
      {
        "node": "5nm (N+3)",
        "vendor": "SMIC",
        "technique": "DUV multipatterning pushed below 7nm (developed 2025 with Huawei); ~33% yield, +40-50% cost/wafer vs TSMC N5",
        "lithoClass": "DUV",
        "generationsBehind": 2
      },
      {
        "node": "14nm",
        "vendor": "SMIC",
        "technique": "ArF-immersion DUV, FinFET; mature multipatterning",
        "lithoClass": "DUV",
        "generationsBehind": 0
      },
      {
        "node": "28nm",
        "vendor": "SMIC",
        "technique": "DUV (ArF/immersion), planar; wafer ~$3,000; SMEE SSA800 domestic-litho target",
        "lithoClass": "DUV",
        "generationsBehind": 0
      }
    ],
    "yield": [
      {
        "vendor": "SMIC (N+2 ~7nm, Ascend/Kirin die)",
        "low": 50,
        "high": 60
      },
      {
        "vendor": "TSMC (N7/N5/N3 comparable parts)",
        "low": 80,
        "high": 90
      }
    ],
    "pricing": [
      {
        "model": "DeepSeek-V4-Pro",
        "vendor": "DeepSeek",
        "relativeCostIndex": 1,
        "note": "Illustrative baseline (=1) for inference cost-per-token; ~90% cheaper than US frontier per DeepSeek's R1-on-CloudMatrix-384 claims (~1 yuan/M tokens). Big Fund-backed, V4 co-designed for Ascend. NOT an official price — illustrates the cost gap only."
      },
      {
        "model": "Opus 4.8",
        "vendor": "Anthropic",
        "relativeCostIndex": 12,
        "note": "Illustrative ~10-15x DeepSeek-V4-Pro per token, reflecting US-frontier inference economics on Nvidia/CUDA. Illustrative of the cost gap, not an official price."
      },
      {
        "model": "Mythos (premium tier)",
        "vendor": "Anthropic",
        "relativeCostIndex": 21,
        "note": "Illustrative ~18-25x DeepSeek-V4-Pro per token for the premium frontier tier. Illustrative of the cost gap, not an official price."
      }
    ],
    "timeline": [
      {
        "year": "2019",
        "milestone": "Huawei first Entity-List restriction; pivot to self-reliance begins",
        "detail": "US adds Huawei to the Entity List (May 2019), cutting access to US chip IP and tooling; Huawei begins building the domestic chip-to-software stack that controls would later harden into a closed loop."
      },
      {
        "year": "Oct 2022",
        "milestone": "BIS export controls weaponize the lithography chokepoint",
        "detail": "October 2022 BIS rules impose compute/interconnect thresholds, SME and US-person rules; EUV (ASML) already denied, capping SMIC at 193nm ArF-immersion DUV and forcing multipatterning."
      },
      {
        "year": "2023",
        "milestone": "SMIC N+1/N+2 DUV-7nm ships in Kirin 9000S",
        "detail": "Mate 60 Pro's Kirin 9000S proves SMIC can reach a 7nm-class node on DUV multipatterning without EUV — the canonical proof that caging converts to indigenization on a delay, not a permanent wall."
      },
      {
        "year": "May 2024",
        "milestone": "Big Fund III launches at RMB 344B (~$47.5B)",
        "detail": "Largest of the three IC Investment Fund tranches; MoF ~17% largest stake; capital for SMIC, Hua Hong, YMTC and the broader chip-to-model national loop."
      },
      {
        "year": "2024",
        "milestone": "Ascend 910C yield climbs and turns profitable",
        "detail": "SMIC 7nm Ascend 910C die yield rises from ~20% (Sep 2024) toward ~40% (early 2025), the threshold where the line turned profitable despite DUV multipatterning penalties."
      },
      {
        "year": "2025",
        "milestone": "CloudMatrix 384 (Atlas 900 SuperNode) ships",
        "detail": "384 Ascend 910C in a fully optical all-to-all fabric (6,912 transceivers) delivers ~300 PFLOPS vs ~180 for GB200 NVL72 — SemiAnalysis: chip a generation behind, system a generation ahead; spends cheap energy (559 kW vs 145 kW) as the slack variable."
      },
      {
        "year": "2025",
        "milestone": "DeepSeek runs R1 inference on Ascend 910C",
        "detail": "DeepSeek serves R1 on CloudMatrix 384, claims it beats Nvidia for R1 inference and cuts cost ~90% vs H100 (~1 yuan/M tokens); V4 delayed to co-design natively for Ascend — the export-control-immune sovereignty premium."
      },
      {
        "year": "2025",
        "milestone": "Domestic litho and tooling step up: SiCarrier, SMEE, CANN 8.0",
        "detail": "SiCarrier debuts 30+ tools incl. a 28nm immersion scanner at SEMICON China (Mar 2025); SMEE SSA800 ArF-immersion (no US-origin IP); Huawei open-sources CANN 8.0, adds SIMT (CANN Next) for near-drop-in CUDA replacement; domestic LDP-source EUV in trials at Huawei Dongguan."
      },
      {
        "year": "2026",
        "milestone": "Ascend 950PR (monolithic die) + CXMT HBM3 ramp",
        "detail": "Ascend 950PR (~2 PFLOPS MXFP4, 128GB HiBL HBM) ships as a monolithic die to dodge the TSMC CoWoS packaging block; CXMT samples domestic HBM3 to Huawei, attacking the memory-bandwidth bottleneck that throttles LLMs; Huawei targets ~600k Ascend 910C output."
      },
      {
        "year": "Q4 2027",
        "milestone": "Ascend 960 doubles per-chip compute",
        "detail": "~2 PFLOPS FP8 / ~4 PFLOPS FP4, 288GB / 9.6 TB/s — rapid doubling cadence even as Nvidia Rubin (~50 PFLOPS FP4) keeps a ~25-32x per-chip lead; Anthropic pegs Huawei aggregate at ~2% of Nvidia in 2027."
      },
      {
        "year": "2028",
        "milestone": "Ascend 970 (~8 PFLOPS FP4) and projected domestic EUV-class attempts",
        "detail": "Per-chip silicon still trails Nvidia, but system-scale + cheap energy + a closed Big-Fund-financed chip-to-model loop define the neck-and-neck scenario; domestic sub-10nm/EUV-class production remains aspirational (analysts: unlikely before ~2030) — the self-reliant competitor the controls manufactured."
      }
    ],
    "foundryMap": [
      {
        "entity": "ASML",
        "region": "Netherlands",
        "capability": "Sole EUV / High-NA EUV scanner maker; ~83% of all lithography; the export-control chokepoint (depends on ZEISS SMT optics + TRUMPF lasers)",
        "bloc": "West/Allied",
        "hasEUV": true
      },
      {
        "entity": "TSMC",
        "region": "Taiwan",
        "capability": "Leading-edge logic foundry (>90% share); N2/N3 EUV; CoWoS advanced packaging; powers Nvidia Rubin (N3) & Blackwell (4NP)",
        "bloc": "West/Allied",
        "hasEUV": true
      },
      {
        "entity": "Samsung",
        "region": "South Korea",
        "capability": "EUV logic foundry (SF2/SF3 GAA) + HBM/DRAM; allied second source",
        "bloc": "West/Allied",
        "hasEUV": true
      },
      {
        "entity": "Intel",
        "region": "United States",
        "capability": "EUV logic foundry (Intel 18A); High-NA EUV early adopter; lagging vs TSMC",
        "bloc": "West/Allied",
        "hasEUV": true
      },
      {
        "entity": "SK Hynix",
        "region": "South Korea",
        "capability": "Leading HBM supplier (HBM3E/HBM4) for Nvidia accelerators; uses EUV for advanced DRAM",
        "bloc": "West/Allied",
        "hasEUV": true
      },
      {
        "entity": "SMIC",
        "region": "China (PRC)",
        "capability": "DUV-only foundry; N+2 ~7nm via ArF-immersion multipatterning (Kirin 9000S, Ascend 910C); ~50-60% yield; blocked from EUV",
        "bloc": "PRC",
        "hasEUV": false
      },
      {
        "entity": "Huawei / HiSilicon",
        "region": "China (PRC)",
        "capability": "Fabless designer of Ascend NPUs / Kirin SoCs; CloudMatrix system integrator; CANN/MindSpore/Unified Bus software stack; depends on SMIC for fabrication",
        "bloc": "PRC",
        "hasEUV": false
      },
      {
        "entity": "CXMT",
        "region": "China (PRC)",
        "capability": "Domestic DRAM/HBM maker; sampling HBM3 to Huawei (mass production targeted end-2026); DDR5/LPDDR5 ramp — attacks the LLM memory-bandwidth bottleneck",
        "bloc": "PRC",
        "hasEUV": false
      }
    ]
  },
  "scenarios": [
    {
      "id": "s1",
      "tag": "Scenario 1",
      "title": "A Commanding, Expanding Lead",
      "verdict": "Anthropic's goal",
      "points": [
        "US models 12–24 months ahead on intelligence, and the lead is growing.",
        "Chip chokepoints hold; China is capped at \"good enough.\"",
        "Democracies set the rules and norms of frontier AI.",
        "Step-function model releases that China cannot match until 2029–30."
      ],
      "boNote": "Achievable only if a multi-democracy coalition holds perfect export discipline for years — against its own commercial interest in the largest market on earth. A truce renewed every fiscal year is not a moat."
    },
    {
      "id": "s2",
      "tag": "Scenario 2",
      "title": "Neck-and-Neck at the Near-Frontier",
      "verdict": "Where the cage leads",
      "points": [
        "PRC models only months behind, hosted on cheap, \"good enough\" hardware.",
        "Huawei + Alibaba datacenters globally prevalent, especially in the Global South.",
        "CANN / MindSpore matured by a conscripted domestic userbase.",
        "A closed-loop national stack: chip → system → software → model → demand."
      ],
      "boNote": "This is not the failure case — it is the predictable case. Every line of it is accelerated by tighter controls. The policy meant to prevent Scenario 2 is the surest way to cause it."
    }
  ]
};
