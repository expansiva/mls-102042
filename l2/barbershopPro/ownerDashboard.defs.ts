export const ownerDashboardPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "ownerDashboard",
  "moduleName": "barbershopPro",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 69,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "ownerDashboard",
      "pageName": "Owner dashboard",
      "actor": "owner",
      "purpose": "Monitor revenue, bookings, utilization, and operational trends.",
      "capabilities": [
        "viewDashboard"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [],
      "pageInputs": [
        {
          "name": "dateRange",
          "type": "dateRange",
          "required": false,
          "sources": [
            "queryParam"
          ],
          "description": "Optional date range for dashboard metrics."
        },
        {
          "name": "periodPreset",
          "type": "string",
          "required": false,
          "sources": [
            "queryParam"
          ],
          "description": "Preset period such as today, weekToDate, or monthToDate."
        }
      ],
      "navigationRefs": [
        {
          "direction": "outbound",
          "pageId": "adminMetricsDashboard",
          "trigger": "View metrics dashboard"
        },
        {
          "direction": "outbound",
          "pageId": "commissionCalculation",
          "trigger": "Run commission calculation"
        }
      ],
      "sections": [
        {
          "sectionName": "dashboardFilters",
          "mode": "view",
          "organisms": [
            {
              "organismName": "dateRangeSelector",
              "purpose": "Allow the owner to choose the period for metrics.",
              "userActions": [
                "Select period",
                "Apply date range"
              ],
              "requiredEntities": [],
              "readsFields": [],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "kpiSummary",
          "mode": "view",
          "organisms": [
            {
              "organismName": "operationsMetricsSummary",
              "purpose": "Show bookings, revenue, utilization, cancellations, and no-shows for the selected period.",
              "userActions": [
                "View KPI cards",
                "View trend sparkline"
              ],
              "requiredEntities": [
                "Appointment",
                "Sale",
                "StaffMember"
              ],
              "readsFields": [
                "operationsMetrics.bookingCount",
                "operationsMetrics.revenue",
                "operationsMetrics.utilizationMinutes",
                "operationsMetrics.availableMinutes",
                "operationsMetrics.cancellationCount",
                "operationsMetrics.noShowCount"
              ],
              "writesFields": [],
              "rulesApplied": [
                "RULE_singleLocationScope"
              ]
            },
            {
              "organismName": "performanceMetricsSummary",
              "purpose": "Show commission, service revenue, product revenue, and sales totals.",
              "userActions": [
                "View KPI cards",
                "View breakdown by staff"
              ],
              "requiredEntities": [
                "Sale",
                "StaffMember"
              ],
              "readsFields": [
                "performanceMetrics.commissionAmount",
                "performanceMetrics.serviceRevenue",
                "performanceMetrics.productRevenue",
                "performanceMetrics.totalRevenue",
                "performanceMetrics.saleCount",
                "performanceMetrics.unitsSold"
              ],
              "writesFields": [],
              "rulesApplied": [
                "RULE_singleLocationScope",
                "RULE_commissionCalculationRequired"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "getOwnerDashboardMetrics",
        "purpose": "Load current operational and performance metrics for the owner view.",
        "kind": "query",
        "input": {
          "dateRange": {
            "start": "timestamptz",
            "end": "timestamptz"
          },
          "periodPreset": "string"
        },
        "output": {
          "operationsMetricsSummary": {
            "bookingCount": "number",
            "revenue": "number",
            "utilizationMinutes": "number",
            "availableMinutes": "number",
            "cancellationCount": "number",
            "noShowCount": "number"
          },
          "performanceMetricsSummary": {
            "commissionAmount": "number",
            "serviceRevenue": "number",
            "productRevenue": "number",
            "totalRevenue": "number",
            "saleCount": "number",
            "unitsSold": "number"
          },
          "asOf": "timestamptz"
        },
        "readsEntities": [
          "Appointment",
          "Sale",
          "StaffMember"
        ],
        "writesEntities": [],
        "readsTables": [],
        "writesTables": [],
        "usecaseRefs": [
          "viewDashboardUsecase"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "RULE_singleLocationScope",
          "RULE_commissionCalculationRequired"
        ]
      }
    ]
  }
} as const;

export default ownerDashboardPagePlan;
