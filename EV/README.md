# EV App Proposal - SOW & Estimation Workspace

This directory contains Statement of Work (SOW) configurations and technical analysis documents for the **EV App Proposal** project.

## Directory Contents

*   **[technical_analysis_estimator.html](file:///d:/XOITT/EV/sow/technical_analysis_estimator.html)**: The primary interactive application. It serves as an Admin Dashboard to perform project scoping, API mapping, Three-Point (PERT) resource estimations, and risk management. It automatically compiles and renders a professional Statement of Work document that can be exported directly.
*   **[logo.png](file:///d:/XOITT/EV/sow/logo.png)**: The official project logo, automatically rendered inside the dashboard and proposal templates.

---

## Access Control Levels

To safeguard estimates and templates, the application implements two access modes:

1.  **View-Only Mode (Default for General Users)**:
    *   All sliders, checkboxes, input cells, select dropdowns, and configuration parameters are locked.
    *   Users can search/filter tasks and view the generated Statement of Work, print PDFs, or copy markdown.
    *   Saves and resets are disabled.
2.  **Admin Mode (Unlocked)**:
    *   Click **Admin Access** in the top header.
    *   **Static Credentials**:
        *   **Email**: `admin@xoitt.com`
        *   **Password**: `EV@2026`
    *   Once logged in, all PERT estimations, resource rates, capacities, risk matrix weights, and scoping checkboxes are fully editable.
    *   Admin changes persist locally using `localStorage` and remain active forever until modified.
    *   An option to **Reset Defaults** is provided to revert changes back to the original proposal baseline.

---

## Scoping & Resource Restrictions

As per requirements, this proposal focuses **exclusively on front-end client-side development and API endpoint connections**:
*   **Included Roles**: *UI Developer* and *API Integration Engineer*.
*   **Excluded Roles**: *Backend Lead Architect* and *QA Automation Specialist* are excluded from the resource rates.
*   **Included Tasks**: Backlog covers Flutter mobile screens, map SDK layers, trip planner panels, remote start/stop operations triggers, Stripe mobile checkout integration, and WebSockets telemetry clients.
*   **Excluded Tasks**: Database server architectures, backend microservice setups, PostGIS configurations, and QA test script coverages are explicitly deferred.

---

## How to Use the Estimator Tool

1.  **Open the Application**: Double-click or open **[technical_analysis_estimator.html](file:///d:/XOITT/EV/sow/technical_analysis_estimator.html)** in any modern web browser.
2.  **Authenticate**: Click **🔑 Admin Access** at the top right, log in with `admin@xoitt.com` and `EV@2026`.
3.  **Scoping & Modules**: Go to the **Modules & Scope** tab. Toggle modules in-scope or out-of-scope.
4.  **OCPI API Mapping**: Go to the **OpenAPI Scope** tab. Include/exclude endpoints from the client integration scope.
5.  **Three-Point (PERT) Estimation**: Go to the **PERT Estimator** tab. Edit the Optimistic (O), Most Likely (M), and Pessimistic (P) values inline for each task. The Expected Value ($E = \frac{O + 4M + P}{6}$), Standard Deviation, and Confidence Intervals recalculate dynamically.
6.  **Resource Configuration**: Go to the **Team & Rates** tab to set individual hourly billing rates and adjust capacity (FTE).
7.  **Risk Mitigation**: Go to the **Risk Matrix** tab to set likelihood/impact scales (1-5). The tool applies a risk contingency buffer (up to 30%) to the final pricing.
8.  **Generate the Proposal**: Go to the **Statement of Work** tab. If the calculated risk-adjusted estimate exceeds the **₹7,00,000 budget limit**, a red warning banner will be displayed at the top. Click **Print Proposal / PDF** to output a clean, formatted document ready for signing.

---

## Technical Highlights of the Estimation Model

*   **INR Lakhs Format**: Costs are rendered in Indian Rupees (₹) and formatted using the Indian numbering system (`Intl.NumberFormat('en-IN')`) to output values as Lakhs (e.g., `₹7,00,000`).
*   **Budget Guardrail**: Tracks a maximum budget constraint of **₹7,00,000**. Highlights budget overflows prominently in red across both the dashboard view and printed proposal.
*   **PERT Distribution**: Expected hours are calculated using the beta distribution formula:
    $$E = \frac{O + 4M + P}{6}$$
*   **Project Standard Deviation**: The aggregate project standard deviation ($\sigma_{project}$) is calculated using the square root of the sum of variances (mathematically sound) rather than a simple sum of standard deviations:
    $$\sigma_{project} = \sqrt{\sum \sigma_i^2} = \sqrt{\sum \left(\frac{P_i - O_i}{6}\right)^2}$$
*   **Confidence Range**: The dashboard displays the 95% confidence interval ($\approx 1.96$ standard deviations) to show the statistical bounds of the timeline:
    $$\text{Range} = E_{project} \pm 1.96 \cdot \sigma_{project}$$
