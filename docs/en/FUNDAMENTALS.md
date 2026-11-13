🇪🇸 [Versión en español](../FUNDAMENTOS.md)

# Medical and physics foundations of Fistulab

This document sets out the clinical and physical parameters the simulator uses and where they come from.
Clinical guidelines, peer-reviewed studies and the ultrasound physics literature were consulted.

**Disclaimer.** The simulator is an **educational** tool. It is not intended for diagnosis or for making
clinical decisions. The values are representative, not normative. Each unit must follow its own
protocols and current guidelines.

> Tags: **[CC]** = consolidated textbook knowledge that has not been checked against the primary
> source in this review. **[Verify]** = figure with uncertain attribution; it must be checked against the
> original PDF before being cited.

---

## 1. AVF maturation and access blood flow (Qa)

### 1.1 Maturation criteria

| Criteria set | Diameter | Depth | Flow | Timing | Ref. |
|---|---|---|---|---|---|
| KDOQI 2006, "rule of 6s" | ≥ 6 mm | < 6 mm | > 600 mL/min | Assess at 4–6 weeks | [2] |
| KDOQI 2019 | No numerical rule; maturation is a clinical judgment | — | — | Assess at 4–6 weeks | [1] |
| Robbin 2002 | ≥ 4 mm | ≤ 5 mm | ≥ 500 mL/min | When both criteria were met, 95% of AVFs proved adequate | [6] |
| GEMAV 2017 and Spanish literature | > 5–6 mm ("mature"); 4 mm with 500 mL/min is accepted as "cannulatable" | < 6 mm | > 500 mL/min (mean of ≥ 3 measurements) | — | [3,10,11] |

- A native AVF should not be cannulated before 2 weeks.
- A 2022 reanalysis concludes that the rule of 6s may be too strict [8]:
  - Meeting all 3 criteria gave a PPV of 92%.
  - Flow plus depth gave a PPV of 93%.
  - Diameter alone was not significant.

### 1.2 Measuring Qa

- **Where:** in the **brachial artery**, for both forearm and upper-arm AVFs [10]. In a radiocephalic AVF, the radial artery underestimates Qa because the palmar arch contributes ulnar flow.
- **Sample volume:** 50–70% of the lumen.
- **Insonation angle:** 46–60°, never more than 60°.
- **Segment:** a straight arterial segment.
- **Repetitions:** mean of at least 3 measurements.
- **Formula:** Qa (mL/min) = TAMV (cm/s) × π·(d/2)² (cm²) × 60.
- **Baseline correction:** the brachial artery without an AVF carries about 40–75 mL/min, so the brachial method slightly overestimates Qa.

### 1.3 Flow thresholds

| Parameter | Value | Ref. |
|---|---|---|
| Normal Qa, native AVF | 500–1500 mL/min | [10] |
| Normal Qa, AV graft (AVG) | 600–1800 mL/min | [10] |
| Dysfunction / low flow, GEMAV | AVF < 500 mL/min; AVG < 600 mL/min; or a drop > 20–25% with Qa < 1000 mL/min | [3,4] |
| Dysfunction / low flow, KDOQI 2006 | AVF < 400–500 mL/min | [2] |
| High flow | Qa > 2 L/min or Qa/CO ≥ 30% (GEMAV); Qa/CO > 30–35% in the radiology literature | [3,12,75] |

## 2. Doppler criteria

### 2.1 Significant stenosis

- **GEMAV criterion.** Both of the following conditions must be met:
  - lumen reduction > 50%;
  - PSV ratio > 2.

  In addition, at least one of the following must be met:
  - residual lumen < 2 mm;
  - Qa < 500 mL/min (AVF) or < 600 mL/min (AVG);
  - Qa drop > 20–25% [3,4].
- **PSV ratio:**
  - ≥ 2:1 in the venous segment;
  - ≥ 3:1 at the anastomosis, where there is baseline turbulence [17,19].
- **Absolute PSV:**
  - > 400 cm/s with residual lumen < 2 mm: 85% accuracy for ≥ 50% stenosis [17];
  - ≥ 500 cm/s: 89% sensitivity and 99% PPV [18].

### 2.2 Waveform morphology

| Vessel | Waveform | PSV | EDV | RI | Ref. |
|---|---|---|---|---|---|
| Radial or brachial artery without an AVF | Triphasic, high-resistance | 40–100 cm/s | ≈ 0 or reversed | ≈ 1.0 | [52] |
| Feeding artery of a functioning AVF | Monophasic, low-resistance | 100–400 cm/s | 60–200 cm/s | 0.47 ± 0.07 (RI > 0.52 suggests dysfunction) | [15,16] |
| Draining vein | Pulsatile and arterialized, turbulent near the anastomosis | 30–100 cm/s | — | — | [16] |

- The radial artery distal to a radiocephalic anastomosis often shows **reversed flow** (retrograde from the palmar arch). This is usually physiological.
- Symptomatic steal occurs in 1–8% of cases [57].

## 3. Anatomical dimensions used

| Structure | Value | Ref. |
|---|---|---|
| Distal radial artery | ≈ 2.2–2.4 mm | [54] |
| Brachial artery | ≈ 4.8–5.2 mm | [52] [Verify] |
| Cephalic vein before surgery | ≈ 2 mm; recommended minimum for AVF creation ≥ 2.5 mm | [21] |
| Mature cephalic vein | 6–9 mm | [51] |
| Candidate artery for an AVF | ≥ 2 mm | [5,21] |
| Forearm skin | 1.2 mm on the volar aspect; 1.4 mm on the dorsal aspect | [23] |
| Subcutaneous fat | ≈ 3.8 mm at normal weight; ≈ 13 mm in obesity (mean across several regions) | [59] |
| Venae comitantes | Paired, on both sides of the radial and brachial arteries; they collapse under pressure | [50] |
| Median nerve | Medial to the brachial artery in the cubital fossa | [50] |
| Superficial radial nerve | ≈ 1 mm from the cephalic vein at the level of the radial styloid | [49] |

## 4. Cannulation technique

### 4.1 Equipment and angle

- **Gauge according to blood pump flow rate (Qb)**, the NKF's guide table, with pre-pump arterial pressure monitored (≈ −250 mmHg as the limit) [27]:

  | Qb (mL/min) | Gauge |
  |---|---|
  | 200–250 | 17G |
  | 250–350 | 16G |
  | 350–450 | 15G |
  | > 450 | 14G |

  GEMAV recommends the finest gauge and shortest needle that allow adequate flow [3]. Follow your unit's protocol.

- New AVFs start with 17G and a Qb of 200–250 mL/min, and progress over several weeks [29].
- **Needle length:** 25 mm (1") or 32 mm (1¼").
- **Cannulation angle:**
  - AVF: 20–35°, around 25° [26,14,27].
  - AVG: ≈ 45°.
- **Bevel:** up.
- **Maneuver:** when flashback appears, **lower the angle and advance**.
- **Needle rotation ("flip"):** the NKF advises against it [27]; some protocols describe it. It is controversial.
- **Tourniquet:** use it to cannulate the AVF (never during dialysis). It is not used with AVGs.

### 4.2 Distances and direction

- **Arterial needle:** ≥ 3 cm from the anastomosis [30]. Sources differ: GEMAV requires ≥ 2.5 cm in a native AVF and 5 cm in a graft [3], Castro 3–4 cm [30] and the UK recommendations ≥ 5 cm [31,74]. The simulator scores ≥ 3 cm.
- **Needle spacing:** ≥ 5 cm between the tips, to avoid recirculation [30,31,74]. GEMAV accepts ≥ 2.5 cm [3]. The simulator scores ≥ 5 cm.
- **Venous needle:** always antegrade, toward the heart.
- **Arterial needle:** antegrade or retrograde, according to the unit's protocol.

### 4.3 Site rotation technique

- **Rope ladder:** the preferred technique (KDOQI 2019; GEMAV).
- **Buttonhole:** only in selected cases, because of the risk of infection.
- **Area puncture:** discouraged, because it leads to aneurysms and stenoses [1,3,5].

## 5. Ultrasound-guided cannulation

- **Indications:** it is especially useful for **first cannulations** and is indicated in **obese patients**, **very deep vessels** and **AVFs that are difficult to cannulate blind** [11]. An AVF may be difficult because of poor maturation or development, juxta-anastomotic vein stenosis, accessory veins, non-cannulatable collaterals or hematomas from previous cannulations [11]. Each case in the simulator explains why ultrasound-guided cannulation is indicated for it.
- **Point-of-care ultrasound (POCUS) by unit staff:** allows earlier detection of access pathology, facilitates cannulation and reduces failed attempts, thereby better preserving the AVF [11].
- **Probe:** high-frequency linear, 7.5–12.5 MHz: high resolution and limited penetration, well suited to vascular access [11,26].
- **Positioning:** patient lying down or seated, with the arm **supported in a comfortable, relaxed position** that can be held for the whole session [74]. In *Room & ergonomics* and in the step checklist, the simulator checks that the arm is supported and moderately abducted, **at about 45° from the body**: this is the simulator's own ergonomic criterion, not a figure from the guidelines.
- **Asepsis:** cannulation is performed with aseptic technique; some centers use a **sterile probe cover and sterile gel** [11]. In the simulator it is a step (*Asepsis* button) and an assessment criterion.
- **Technique:** the probe is held in one hand and the needle in the other, keeping the vessel in view at all times. In the short-axis approach, the entry point lies a few millimeters from the center of the transducer. **Always locate the tip** and adjust the angle accordingly [11].
- **Long-axis (in-plane) approach:**
  - It is the **preferred approach in most hemodialysis units**: the needle stays in the field of view along its entire path, including while approaching and cannulating the vessel [11].
  - Drawback: alignment is harder to maintain and lateral structures are lost from view.
- **Short-axis (out-of-plane) approach:**
  - Advantage: it centers the vessel and shows neighboring structures.
  - Drawback: the needle **is only seen where it crosses the image plane** [11], so its entry through the vessel wall is not seen and it requires more experience [CC].
  - Risk: **mistaking the needle shaft for the tip** and puncturing the posterior wall. On a phantom, 64% of residents punctured the posterior wall of the internal jugular vein with this approach [64].
- **Dynamic needle tip positioning (DNTP):** in short axis, the probe is advanced until the tip dot disappears, then the needle is advanced, and the sequence is repeated. In several randomized trials (peripheral arterial and venous access) it improves success compared with the in-plane approach; for AVFs it is an extrapolation [43,50].
- **Saline flush check:** after flashback, the needle is flushed with a few milliliters of saline while watching the screen.
  - If the tip is in the lumen, the saline flows in without resistance. The microbubbles it carries are very strong scatterers: a plume of bright echoes is seen traveling along the lumen downstream of the tip and, on color Doppler, a high-velocity jet with *aliasing* next to the bevel. In a high-flow AVF the plume leaves the field as soon as the flush ends.
  - If the tip is outside the lumen (in the wall, in tissue, or through the posterior wall), the saline does not advance along the vessel. An anechoic collection appears around the vessel (infiltration), with pain and swelling. Stop the flush and reposition the needle.
  - The same principle (saline microbubbles as contrast) is used to confirm the position of central venous catheters [73].
- **Evidence in AVFs:**
  - Eves 2021 (RCT in difficult AVFs): fewer needle passes (72 vs 99) and fewer skin punctures (10 vs 25) [36].
  - Chen 2023 (RCT): higher success rate with ultrasound guidance [37].
- **Guideline positions:**
  - KDOQI 2019 considers the use of ultrasound by trained operators reasonable.
  - The Spanish literature indicates it for first cannulations, obese patients, deep vessels and difficult AVFs [1,11].

## 6. Difficult scenarios and their ultrasound appearance

| Scenario | Imaging and management | Ref. |
|---|---|---|
| Deep AVF (> 6 mm) | Abundant subcutaneous fat. Requires a steeper angle and a longer needle; consider superficialization | [2,3] |
| Juxta-anastomotic stenosis | Within the first 2–5 cm of the outflow segment. Focal narrowing, *aliasing*, PSV ratio ≥ 3 and post-stenotic turbulence | [25] |
| Stenosis due to intimal hyperplasia | Thickened, echogenic intima; lumen < 2 mm; PSV > 400 cm/s | [10,17] |
| Accessory veins | A collateral > 70% of the cephalic vein diameter predicts non-maturation | [24] |
| Aneurysm | Dilation involving all layers of the wall, often with mural thrombus and slow, swirling flow. The "yin-yang" pattern with a neck and to-and-fro flow is typical of a **pseudoaneurysm**. Size definitions vary (> 18 mm or > 3 times the diameter of the healthy segment; GEMAV, > 20–30 mm): the simulator's case (≈ 15 mm) is an aneurysmal dilation. Do not cannulate the dome or thinned skin | [3,75,76,77] |
| Thrombus | Acute: hypo- or anechoic. Chronic: echogenic. Mural thrombus produces a filling defect on color Doppler | [12,13] |
| Hematoma or infiltration | Heterogeneous hypoechoic collection with no flow on color Doppler; it usually follows a posterior wall puncture | [19,61] |
| Calcified artery (Mönckeberg sclerosis) | Echogenic "rail-like" walls with acoustic shadowing. It is 2–5 times more frequent in CKD | [60] |
| Transposed brachiobasilic AVF | Close proximity of the brachial artery and median nerve, with a risk of arterial puncture | [47] |
| PTFE graft | Double echogenic wall ("train track"), lumen ≈ 6 mm. Cannulate at 45° and without a tourniquet | [61] |

**Cannulation complications**

- Major infiltration: 5.2% per year [44].
- Failed cannulation: 4.4% of episodes; 31.5% of patients had at least one [45].
- In new AVFs, failed cannulations are very common during the first sessions [46].

## 7. Applied ultrasound physics

### 7.1 Acoustic properties

| Tissue | c (m/s) | Z (MRayl) | Attenuation (dB/cm/MHz) | Comment | Ref. |
|---|---|---|---|---|---|
| Skin (dermis) | 1595–1645 | ≈ 1.65 | High (≈ 18–21 dB/cm at 12 MHz) | Bright entry echo | [3] |
| Fat | 1450 | 1.34–1.38 | 0.48–0.6 | Hypoechoic with echogenic septa | [4,5] |
| Muscle | 1590 | 1.70 | 1.1 (perpendicular to the fibers) | "Starry sky" or feathery pattern | [6,7] |
| Tendon | ≈ 1750 | — | ≈ 2.9 | Anisotropy | [8] |
| Blood | 1570 | ≈ 1.61–1.65 | ≈ 0.15 | Nearly anechoic; Rayleigh backscatter (∝ f⁴) | [11,14] |
| Cortical bone | 3500–4080 | 5.7–7.8 | ≈ 20 | R ≈ 31–43%: bright line and complete shadowing | [4,5] |
| Steel needle | 5800 | ≈ 46 | ≈ 0 | Specular reflector with reverberation | [15] |
| Air | 330 | 0.0004 | Very high | Reflection > 99.9% | [4] |

### 7.2 Resolution of a 12 MHz linear probe

- **Wavelength:** λ = 0.128 mm.
- **Axial resolution:** pulse length / 2, i.e., ≈ 0.13–0.19 mm.
- **Lateral resolution:** ≈ λ·F#, i.e., ≈ 0.26–0.39 mm.
- **Slice thickness (elevation):**
  - The elevation focus lies at 1.5–3.5 cm; there the thickness is ≈ 1 mm, and between 1 and 4 mm in more superficial planes [23].
  - Clinical consequence: an AVF at 3–10 mm lies above the elevation focus and is subject to **partial volume**. The needle may *appear* to be inside the lumen when it is not.
  - Narrowing the beam improved first-attempt success from 68.7% to 92.5% [24].

### 7.3 Doppler

- **Doppler equation:** f_D = 2·f₀·v·cosθ / c.
- **Nyquist limit:** v_N = c·PRF / (4·f₀·cosθ). The maximum PRF is ≈ c / (2·depth).
- **Insonation angle:** 30–60°, never more than 60°. A 5° error in angle correction produces ≈ ±15% error at 60° and ≈ ±24% at 70°.
- **Color box steering on linear probes:** ±20°.
- **Spectral broadening:** caused by transit time, beam geometry and turbulence [31].

### 7.4 Needle visibility

- Reflection from the needle is **specular**: visibility falls as the insertion angle increases [44–46].
  - In plane, the echo is deflected by 2θ in the lateral direction and is captured by the transducer aperture (≈ 4 cm): the needle remains well visible up to ≈ 40–45°.
  - Out of plane, the deflection is in elevation, where the aperture is only a few millimeters: mostly the diffuse component remains (bevel, surface roughness). The needle dot is faint in tissue and much clearer inside the anechoic lumen.
- **Reverberation:** sound bounces inside the tube, between the inner faces of its anterior and posterior walls. Parallel lines are seen, spaced by the needle's inner diameter (its chord along the beam), considerably fainter than the needle itself and progressively weaker. They are more numerous with a flat needle and disappear as it is tilted. They are seen mainly over the anechoic lumen of the vessel. The "comet-tail" forms inside the needle lumen [48].
- **Bayonet artifact:** caused by differences in the speed of sound between tissues [49].

## 8. Simulation methods (state of the art)

- **Convolution methods:**
  - Bamber and Dickinson 1980: tissue is synthesized as a random medium and convolved with the PSF [33].
  - Gao 2009 (COLE): scan-line convolution [34], ported to the GPU by Storve and Torp in 2017 [35].
- **Ray tracing with convolution on deformable meshes:** Bürger 2013 [36], Salehi 2015 [37].
- **Monte Carlo ray tracing with rough interfaces:** Mattausch and Goksel 2016/2018 [38,39].
- **Validation reference:** Field II (Jensen 1996) [40].

## 9. Existing simulators and features incorporated

| Simulator | Key feature incorporated |
|---|---|
| HeartWorks, CAE Vimedix | 3D anatomy alongside the scan plane, and augmented reality view |
| Simbionix U/S Mentor | Probe positioning assistant, performance report with safety assessment, Doppler, measurements |
| SonoSim | Case library and guided curriculum |
| Intelligent Ultrasound NeedleTrainer | **% of time with the tip visible**, total time, selectable gauge |
| PerkTutor (3D Slicer) | Needle path through tissue, potential tissue damage, insertion time |
| Blue Phantom | Blood flashback on entering the vessel |

## 10. Competency metrics and common errors

- **Sites 2007** (520 blocks) [63]. The most frequent novice errors were:
  - advancing the needle without visualizing it;
  - unintentional probe movement;
  - failing to match the image orientation to the patient.
- **Tsuchiya 2016** [65]: with the screen aligned with the visual axis and the puncture site, success was 100% vs 70%, and time was 28.5 s vs 68.2 s.

## 11. Ergonomics

- **Alignment:** the operator's visual axis, the puncture site and the screen should be in line [65].
- **Screen:** at eye level [68].
- **Probe marker:** it should match the on-screen indicator, on the operator's left side [72].
- **Patient's arm:** relaxed, supported and extended [26].
- **Operator's shoulder:** avoid excessive abduction [68,69].


## 12. How it is implemented in the simulator

### 12.1 Geometry

- **Canonical left arm**, with the forearm supinated and the elbow extended. The cross-section is a muscle ellipse (deep fascia) surrounded by subcutaneous fat and skin.
- **Average adult circumferences**: ≈ 16.5 cm at the wrist, ≈ 23 cm at mid-forearm and ≈ 29 cm in the upper arm.
- **Subcutaneous fat**: 3–7 mm. The obesity case adds ≈ 8.5 mm.
- **Vessels, nerves, tendons and bones**: variable-radius Catmull-Rom curves, placed in anatomical coordinates (angle around the arm and depth below the skin or the fascia). They are resampled every 1.5 mm (vessels) or every 3 mm (all other structures).
- **Lesions** applied to the vessel lumen:
  - stenosis (diameter reduction and intimal thickening);
  - aneurysm (dilation, swirling flow, spontaneous echo contrast);
  - crescent-shaped mural thrombus;
  - post-anastomotic jet (turbulence).

### 12.2 Hemodynamics

- **Flow rate** in each vessel: Q(t) = Q̄ · w(phase). The waveforms are normalized to a mean of 1.
- **Resulting resistive indices**:

  | Vessel | RI |
  |---|---|
  | AVF feeding artery | 0.50 |
  | AVF vein | 0.40 |
  | Artery at rest | 0.97 |
  | Ulnar artery in a radiocephalic AVF | 0.69 |

- **Local velocity**: v(ρ) = v̄·(n+2)/n·(1−ρⁿ), with v̄ = Q/A (continuity). A stenosis accelerates the flow and an aneurysm slows it down, with no manual tuning.
- **Validation** (`tests/unit/model.test.ts`):
  - The integral of velocity over the cross-section reproduces the defined flow rate with an error below 15%.
  - In the juxta-anastomotic stenosis, velocity is more than 3 times that in the outflow segment.
  - In the feeding brachial artery, pulsed-wave Doppler measures an RI ≈ 0.44 and a Qa ≈ 880 mL/min versus the model's 830 mL/min.
- **Compressibility**:
  - Local pressure is 7 mmHg per mm of indentation, with exponential decay with depth (λ = 14 mm).
  - A vessel collapses when that pressure exceeds its intraluminal pressure:

    | Vessel | Intraluminal pressure |
    |---|---|
    | Vein | ≈ 8 mmHg |
    | AVF | ≈ 22 mmHg (+25 with tourniquet) |
    | AVG | ≈ 60 mmHg |
    | Artery | ≈ 90 mmHg |

### 12.3 Image formation

The image is computed in eight sequential GPU passes.

1. **Tissue map.**
   - For each sample (320 × 600 at medium quality), its true position in the tissue is computed. This accounts for compression and for the tissue conforming to the flat face of the probe; where there is no contact, gel or air remains.
   - Slice thickness is integrated with 3 Gauss-Hermite nodes. The full width at half maximum (FWHM) is ≈ 1.1 mm at the elevation focus (18 mm) and increases toward the surface.
2. **Speckle.** Complex scatterers on a tissue-fixed 0.072 mm grid, with constant variance. Each tissue's mean amplitude and its patterns (septa, fascicles, fibers) modulate the speckle.
3. **Interfaces.**
   - Reflection coefficient R = ((Z₂−Z₁)/(Z₂+Z₁))².
   - Specular echo ∝ √R·(0.25 + 0.75·cos³θ).
   - Transmission loss ln(1−R) on the round trip.
   - Attenuation α·f·2·Δz.
   - Edge shadowing at grazing incidence on blood interfaces.
4. **Prefix sum** of the log-transmission along each line (Hillis-Steele algorithm).
5. Gaussian **axial PSF**, with σ = 0.5 λ.
6. Depth-dependent **lateral PSF**. It is ≈ 1 λ·F# at the focus and widens away from it; a two-focal-zone option is available.
7. **B-mode:**
   - electronic noise (visible at great depth with high gain);
   - automatic compensation of 0.72 dB/cm/MHz plus the user's TGC;
   - logarithmic compression with the selected dynamic range and an S-shaped gray map;
   - speckle reduction with a bilateral filter and persistence.
8. **Color and power Doppler:**
   - mean projected blood velocity within the color cell, with estimator noise proportional to the spectral width;
   - aliasing beyond ±v_Nyquist, wall filter and priority threshold;
   - parallelogram-shaped color box when steered (±20°).

**Needle:**
- Analytic ray–cylinder intersection in 7 elevation planes.
- The specular echo from a smooth cylinder comes from its **crest** (stationary-phase point): each ray is weighted by its distance from the needle axis, and rays striking the flank return almost no echo.
- Visibility depends on the insertion angle, with a broad lobe in the lateral direction (in plane) and a narrow one in elevation (out of plane), plus a diffuse component; bevel enhancement.
- The wall echo and its 5 reverberations carry a **constant phase along the needle**. The reverberations are spaced by the tube's inner chord along the beam, with inner diameter ≈ outer − 0.3 mm. The 1st lies ≈ 20 dB below the needle echo with the needle flat, and each bounce subtracts ≈ 8 dB more. In plane, each bounce is further attenuated with the insertion angle (factor exp[−(θ/26°)²] per bounce): at 10°, 3–4 lines are visible; at 20°, two or three; and at 35°, none. With a per-pixel or per-depth phase, the thin metal echo partially canceled out between neighboring rows or columns, depending on the grid of the selected quality, and the needle looked discontinuous.
- Out of plane, each echo is widened by the distance the needle descends between two elevation planes: the slice integrates a continuous band (slice thickness × tan α).
- Partial shadowing.
- "Tenting" deformation of the wall before it is punctured. The thresholds are 1–2.6 mm depending on the vessel.

**Saline flush (J key):**
- With the tip in the lumen: a plume of microbubbles (bright scatterers moving with the blood) from the tip downstream, advancing at the vessel's mean velocity, which detaches and washes out once the injection ends (10 mL in 2.5 s). A jet at the bevel outlet (≈ 2 m/s with 15G, flow/internal area) with turbulence and *aliasing* on color Doppler, which settles within ≈ 1 cm.
- With the tip outside the lumen: infiltration. Next to a vessel, a perivascular anechoic halo that grows over 1–3 s along ≈ 12 mm; away from a vessel, a spherical collection. It is penalized in the score.

**Pulsed-wave Doppler:**
- Sampling of the sample volume in the model: 7 points along the beam × 3 lateral × 3 in elevation.
- Histogram with spectral broadening (transit, geometry and turbulence) and aliasing wrap-around.
- Exponentially distributed spectral speckle.
- Automatic envelope; computation of PSV, EDV, RI, PI, TAMV and Q = TAMV·π(d/2)²·60.
- Audio synthesized at the Doppler frequency f_D = 2f₀v·cosθ/c, in stereo according to flow direction.

## 13. Ultrasound-guided peripheral IV (over-the-needle catheter)

The “Difficult peripheral IV” case (`piv_dificil`) and lesson 9 use the same arm, the same probe and the same needle physics as AVF cannulation. What changes is the device (an over-the-needle peripheral IV catheter), the checklist and the assessment. The fistula criteria (distance from the anastomosis, needle separation, arterial or venous needle) do not apply.

### 13.1 Indication and vein selection

- **Indication:** the Society of Hospital Medicine recommends real-time ultrasound guidance for peripheral IV placement in adults with difficult venous access [75] **[Verify]** (read in a reprint during the earlier scoping study; the text could not be opened again in this review).
- **“3:1:3” rule:** look for veins at least **3 mm in diameter**, **1 cm deep (1.5 cm at most)** and straight [76]. The source gives the third figure, the straight length, as “3 mm”, which looks like a typo; the simulator does not use it.
- **Diameter:** in 180 cannulations between the antecubital fossa and the mid-humerus, first-attempt success was 63% (78/124) in veins ≥ 4 mm and 39% (22/56) in veins < 4 mm [81].
- **Depth:**
  - first-attempt success was 58% (96/165) between 0.3 and 1.5 cm deep and 27% (4/15) outside that range [81];
  - with 151 catheters (20G, 48 mm), the probability that the line was still working at 48 h was 1.00 in veins less than 0.4 cm deep, 0.62 between 0.4 and 1.19 cm and 0.29 at 1.2 cm or deeper. Vein diameter made no difference [80].
- **Location:** in the same study, survival was 0.83 in the antecubital fossa or forearm and 0.50 in the brachial region [80]. The vein in this case, above the elbow, is therefore a fallback target: when there is no other, how much catheter stays inside matters even more.
- **Vein or artery:** veins are thin-walled, ovoid and more easily compressed by the probe than arteries. The two brachial veins lie on either side of the brachial artery. The chosen segment should be straight, wide, relatively superficial and distinct from the artery [77]. In the upper arm, the usual targets are the basilic and the deep brachial veins [76].
- **Complications:** early line failure, hematoma, arterial puncture, nerve damage and infection [76]; extravasation, arterial puncture, hematoma and nerve damage [77].

**Values of the case** (teaching values, set to sit at the limit of the “3:1:3” rule):

| Parameter | Value in the simulator |
|---|---|
| Basilic vein, 29.5 to 37.5 cm from the wrist | 2.6 mm in diameter; ≈ 3.1 mm with a tourniquet (the model distends veins by 18%) |
| Depth of the anterior wall | ≈ 10.5 mm (center of the vein at ≈ 12 mm) |
| Subcutaneous fat | ≈ 14 mm (9 mm more than the reference arm) |
| Cephalic and median veins | < 2 mm (unsuitable for the line) |
| Brachial artery and median nerve | ≈ 12–13 mm deeper than the vein, beneath the fascia, and 3–16 mm off its vertical |

### 13.2 Catheter length inside the vein

- **Pandurangadu 2018** [78]. Prospective study of 86 ultrasound-guided lines followed for 72 h. **All** lines with less than 30% of the catheter inside the vein failed, as did 32.4% of those with 30–64%, and **none** of those with 65% or more. Each additional 5% of catheter in the vein reduced the hazard of failure by 29% (HR 0.71; 95% CI 0.60–0.83).
- **Bahl 2020** [79]. Randomized trial of 257 patients with 20G catheters: the 6.35 cm catheter lasted a median of 136 h and the 4.78 cm catheter 92 h. With more than 2.75 cm in the vein the median was 129 h; with 2.75 cm or less, 75 h.
- Hence the advice to use long catheters, at least 1.75 inches (≈ 4.5 cm) [76].
- **In the simulator:**
  - the **metric** is the catheter length inside the vein lumen, in mm and as a percentage of the catheter length;
  - the assessment **criterion** is **≥ 65%** [78];
  - the skin-to-vein path measures depth / sin(angle), so a deep vein “eats up” the catheter if you enter at a shallow angle. In the case, with the catheter inserted up to the hub:

| Catheter | 45° | 40° | 35° | 30° | 25° |
|---|---|---|---|---|---|
| 48 mm | ≈ 33 mm (69%) | ≈ 32 mm (66%) | ≈ 30 mm (63%) | ≈ 28 mm (58%) | — |
| 64 mm | ≈ 49 mm (77%) | — | — | ≈ 44 mm (68%) | ≈ 40 mm (63%) |

### 13.3 Equipment

- **Over-the-needle catheter**, 20G and 48 mm by default: the one used by Fields 2012 [80] and the “standard long” (4.78 cm) of Bahl 2020; the 64 mm one is their “ultralong” (6.35 cm) [79].
- **Gauges** and hub color: 22G, 0.9 mm, blue; 20G, 1.1 mm, pink; 18G, 1.3 mm, green [82].
- Linear **probe** of 7.5 MHz or higher, with a **sterile transparent cover** and **single-use sterile lubricant**; **tourniquet** proximal to the insertion site [77]. Skin disinfected with chlorhexidine or alcohol [76].
- **The simulator's own values**, with no source: the catheter tip sits 1.5 mm behind the needle tip (consistent with the advice to advance 1–2 mm after flashback [77]) and the inner needle is 0.3 mm smaller in diameter than the catheter.

### 13.4 Technique

| Simulator step | Rationale |
|---|---|
| Vein located and measured, in short axis | Transverse view, with the probe marker to the operator's left and the image depth set to about twice the depth of the vein; preliminary survey with a tourniquet [77] |
| Tourniquet applied | Proximal to the insertion site [77] |
| Asepsis | Sterile cover and lubricant [77] |
| Catheter placed | In short axis, the skin entry point lies at a distance from the probe equal to the vein depth, at about 45° [76]. You can also enter in short axis and switch to long axis, or do it all in long axis [76] |
| Needle tip in the vein | The needle indents the wall and then pops through; flashback confirms the tip is in the lumen. The tip must be seen throughout the advance [77] |
| Catheter tip in the vein | After flashback, advance 1–2 mm further so the catheter tip enters too [77]; “several millimeters up to a centimeter” under direct vision [76] |
| Catheter threaded | Holding the needle still, the catheter is slid over it. It should go in easily: resistance or pain means it is not in the vein, so stop and cannulate at another site [77] |
| Needle removed | After threading the catheter [77] |
| Tourniquet released and saline flush | The tourniquet is released and the line is flushed with about 5 mL of saline, which should flow freely; if it extravasates, the catheter is removed and another site is used [77] |

### 13.5 How it is implemented

- **Catheter states:** mounted on the needle (it moves with it) → threaded over the needle → needle removed.
  - With the catheter mounted, the physics is that of the needle (§12): tenting, “pop”, flashback, back wall, transfixion, artery, nerve.
  - When you slide it, if the needle tip is in the lumen but the catheter tip has not entered, it **will not advance**. If it has entered, it advances without resistance: it rides on the needle up to the needle tip and, from there on, aligns with the vein axis, drifts toward the center of the lumen and slides along the wall without going through it.
  - With the needle tip outside the lumen, the catheter goes straight into the tissue and the line is not valid; the flush then causes **extravasation** (the same anechoic collection as the infiltration in §5).
  - Once the catheter is threaded, the needle no longer advances or changes direction: it can only be withdrawn. This is a simplification of the simulator.
- **Image:** the steel needle looks as it does in AVF cannulation (bright line with reverberations and a shadow). The catheter without the needle is drawn as a fainter **double line**, with no reverberations and almost no shadow **[CC]**. The curved segment is approximated by two straight ones.
- **Flush:** through the catheter, with the needle removed and the tourniquet released; 5 mL in 2.5 s.
- **Assessment:**

| Criterion | Penalty |
|---|---|
| Catheter in a vein lumen, needle removed | 35 |
| ≥ 65% of the catheter inside the vein | 10 |
| No arterial puncture or nerve contact | 30 and 20 (deducted when they happen) |
| Back wall not perforated | 18 (when it happens) |
| Aseptic technique | 5 |
| Tourniquet released at the end | 3 |
| Saline flush with no extravasation | 5 (and 12 for each extravasation) |

- **Not simulated:** securing and dressing the line, blood sampling, patient pain, venous valves or thrombosis of the vein. The angle is changed by pivoting about the entry point, so lowering the needle after flashback is of no use in such a deep, thin vein.

---

## References

### Guidelines and consensus documents

1. Lok CE et al. KDOQI Clinical Practice Guideline for Vascular Access: 2019 Update. *Am J Kidney Dis* 2020;75(4 S2):S1–S164.
2. NKF-KDOQI Vascular Access Guidelines 2006. *Am J Kidney Dis* 2006;48(S1).
3. Ibeas J, Roca-Tey R, et al. Guía Clínica Española del Acceso Vascular para Hemodiálisis (GEMAV) (in Spanish). *Nefrología* 2017;37(S1):1–191.
4. Roca-Tey R et al. *J Vasc Access* 2018;19:422–429.
5. Schmidli J et al. ESVS 2018 Clinical Practice Guidelines on Vascular Access. *Eur J Vasc Endovasc Surg* 2018;55:757–818.

### AVF maturation and flow

6. Robbin ML et al. *Radiology* 2002;225:59–64.
7. Robbin ML et al. (HFM study). *J Am Soc Nephrol* 2018;29:2735–44.
8. *J Vasc Surg* 2022: "Rules of 6 criteria…", PMID 35227801.
9. Allon M et al. *Am J Kidney Dis* 2018.

### Nefrología al día and nursing procedures

10. Aragoncillo I, Caldés S. Ecografía Doppler en el acceso vascular (in Spanish). *Nefrología al día*.
11. Moyano Franco MJ, Salgueira Lazo M, Roca-Tey R. Punción ecoguiada del acceso vascular para hemodiálisis (in Spanish). *Nefrología al día*. https://nefrologiaaldia.org/articulo/puncion-ecoguiada-del-acceso-vascular-para-hemodialisis/
12. Síndrome de hiperaflujo de la FAV (in Spanish). *Nefrología al día*.
14. SEDEN. Procedimientos de enfermería nefrológica 3.3 y 3.4 (in Spanish).

### Doppler and stenosis

15. Brachial artery Doppler parameters, PMID 29151789.
16. *RadioGraphics* 1993;13(5): Duplex sonography of hemodialysis AVF.
17. PMID 23641285.
18. *Ann Vasc Surg* 2017, PMID 27521824.
19. Saati A et al. *Cardiovasc Diagn Ther* 2023.

### Anatomy and vessel wall

21. Silva MB Jr et al. *J Vasc Surg* 1998;27:302–8.
23. Normal skin thickness on high-frequency ultrasound. *QIMS*.
24. Planken RN et al. *J Vasc Access* 2007.
25. *AJR* 2015: Arteriovenous fistulas and their characteristic sites of stenosis.
75. Sharbidre KG et al. Hemodialysis access: US for preprocedural mapping and evaluation of maturity and access dysfunction. *RadioGraphics* 2024;44(1):e230053. https://doi.org/10.1148/rg.230053
76. Inston N et al. Aneurysms in vascular access: state of the art and future developments. *J Vasc Access* 2017;18(6):464–472. https://doi.org/10.5301/jva.5000828
77. Balaz P, Björck M. True aneurysm in autologous hemodialysis fistulae: definitions, classification and indications for treatment. *J Vasc Access* 2015;16(6):446–453. https://doi.org/10.5301/jva.5000391

### Cannulation technique and site rotation

26. Brouwer DJ. Cannulation Camp. *Dial Transplant* 2011.
27. NKF VAIT-11b, Cannulation.
29. Midwest Kidney Network, new AVF cannulation protocol.
30. Castro MCM et al. *Braz J Nephrol* 2020;42:38–46.
31. KQuIP. Clinical guidelines for cannulation of AVF/AVG, 2016.
74. VASBI and British Renal Society Vascular Access SIG. Clinical Practice Recommendations for Needling of Arteriovenous Fistulae and Grafts for Haemodialysis, 2018. https://www.thinkkidneys.nhs.uk/kquip/wp-content/uploads/sites/5/2018/10/Clinical-Practice-Recommendations-for-Needling-of-Arteriovenous-Fistulae-and-Grafts-for-Haemodialysis.pdf

### Ultrasound-guided cannulation

36. Eves J et al. *J Vasc Access* 2021.
37. Chen S et al. *Hemodial Int* 2023;27:21–7.
43. Studies on DNTP (PMID 23059741; PMC10941806).
73. Vezzani A et al. Ultrasound localization of central vein catheter and detection of postprocedural pneumothorax: an alternative to chest radiography. *Crit Care Med* 2010;38(2):533–538 (saline contrast to confirm catheter position).

### Ultrasound-guided peripheral IV

75. Franco-Sadud R et al. Recommendations on the Use of Ultrasound Guidance for Central and Peripheral Vascular Access in Adults: A Position Statement of the Society of Hospital Medicine. *J Hosp Med* 2019. Reprint: https://mdedge.com/content/recommendations-use-ultrasound-guidance-central-and-peripheral-vascular-access-adults
76. WikEM. Ultrasound-assisted peripheral line placement (revision of 17 April 2024). https://wikem.org/wiki/Ultrasound-assisted_peripheral_line_placement
77. Liu YT. How To Do Ultrasound-Guided Peripheral Intravenous Catheter Insertion. *MSD Manual, Professional Version* (reviewed October 2025). https://www.msdmanuals.com/professional/critical-care-medicine/how-to-do-peripheral-vascular-procedures/how-to-do-peripheral-vein-cannulation-ultrasound-guided
78. Pandurangadu AV, Tucker J, Brackney AR, Bahl A. Ultrasound-guided intravenous catheter survival impacted by amount of catheter residing in the vein. *Emerg Med J* 2018;35(9):550–555. doi:10.1136/emermed-2017-206803 (abstract; PMID 30021833).
79. Bahl A, Hijazi M, Chen NW, Lachapelle-Clavette L, Price J. Ultralong Versus Standard Long Peripheral Intravenous Catheters: A Randomized Controlled Trial of Ultrasonographically Guided Catheter Survival. *Ann Emerg Med* 2020;76(2):134–142. doi:10.1016/j.annemergmed.2019.11.013 (abstract; PMID 31955940).
80. Fields JM, Dean AJ, Todman RW et al. The effect of vessel depth, diameter, and location on ultrasound-guided peripheral intravenous catheter longevity. *Am J Emerg Med* 2012;30(7):1134–1140. doi:10.1016/j.ajem.2011.07.027 (abstract; PMID 22078967).
81. Witting MD, Schenkel SM, Lawner BJ, Euerle BD. Effects of vein width and depth on ultrasound-guided peripheral intravenous success rates. *J Emerg Med* 2010;39(1):70–75. doi:10.1016/j.jemermed.2009.01.003 (abstract; PMID 19272730).
82. Doyle E. *Paediatric Anaesthesia*. Oxford University Press, 2007, p. 110 (gauge, diameter and color of peripheral catheters; cited in Wikipedia, “Peripheral venous catheter”).

### Cannulation complications

44. Lee T, Barker J, Allon M. *Am J Kidney Dis* 2006;47:1020–6.
45. Coventry LL et al. *BMC Nephrol* 2019.
46. Kumbar L et al. *Adv Chronic Kidney Dis* 2020.
47. Wang A, Silberzweig JE. *Am J Kidney Dis* 2009;53:351–4.

### Anatomy and venous maturation

49. Superficial radial nerve and cephalic vein, high-resolution ultrasound study (2024).
50. StatPearls: Cubital Fossa.
51. Doppler assessment of AVF maturation (2025).
52. Normal spectral and color Doppler findings (ECR 2006).
54. Reference diameter of the distal radial artery. *Korean J Intern Med*.
57. Renal Fellow Network 2019, steal syndrome.
59. Subcutaneous fat on ultrasound (2025).
60. *Cleve Clin J Med* 2020;87:396.
61. Sharbidre KG, Robbin ML et al. *RadioGraphics* 2024;44(1).

### Ultrasound physics and tissue properties

- IT'IS Foundation Tissue Properties Database.
- Culjat MO et al. *Ultrasound Med Biol* 2010;36:861–873.
- Moran CM et al. *Ultrasound Med Biol* 1995 (skin).
- Topp KA, O'Brien WD. *J Acoust Soc Am* 2000;107:1027 (muscle anisotropy).
- Lockwood GR et al. *Ultrasound Med Biol* 1991 (blood and arterial wall).
- Ng A. Resolution in ultrasound imaging. *BJA Education*.

### Ultrasound simulation

33. Bamber JC, Dickinson RJ. *Phys Med Biol* 1980;25:463–479.
34. Gao H et al. *IEEE TUFFC* 2009;56:404–409.
35. Storve S, Torp H. *IEEE TUFFC* 2017.
36b. Bürger B et al. *IEEE Trans Med Imaging* 2013;32:609–618.
37b. Salehi M et al. MICCAI 2015.
38–39. Mattausch O, Goksel O. VCBM 2016; *Comput Graph Forum* 2018;37:202–213.
40. Jensen JA. Field II. *Med Biol Eng Comput* 1996.

### Needle visibility

44b. Chin KJ et al. *Reg Anesth Pain Med* 2008;33:532–544.
45b. Schafhalter-Zoppoth I et al. *Reg Anesth Pain Med* 2004;29:480–488.
48. Reusz G et al. *Br J Anaesth* 2014;112:794 (needle artifacts).

### Learning ultrasound-guided procedures

63. Sites BD et al. *Reg Anesth Pain Med* 2007.
64. Blaivas M, Adhikari S. *Crit Care Med* 2009.
65. Tsuchiya M et al. *J Clin Monit Comput* 2016.

### Ergonomics

68. SDMS. Industry Standards for the Prevention of WRMSDs in Sonography.
72. NYSORA. Transducer-needle orientation.
