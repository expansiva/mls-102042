export const adminMetricsDashboardPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "adminMetricsDashboard",
  "moduleName": "barbershopPro",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 70,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "adminMetricsDashboard",
      "pageName": "Admin metrics dashboard",
      "actor": "owner",
      "purpose": "Review detailed metrics tables for operations and performance.",
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
          "name": "timePeriod",
          "type": "string",
          "required": false,
          "sources": [
            "queryParam",
            "userSelection"
          ],
          "description": "Time period to scope metrics (e.g., day, week, month)."
        },
        {
          "name": "dateRange",
          "type": "object",
          "required": false,
          "sources": [
            "queryParam",
            "userSelection"
          ],
          "description": "Optional start/end dates for metrics filtering."
        },
        {
          "name": "filters",
          "type": "object",
          "required": false,
          "sources": [
            "queryParam",
            "userSelection"
          ],
          "description": "Optional dimension filters such as staff member, service, product, or status."
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "ownerDashboard",
          "trigger": "View metrics dashboard"
        }
      ],
      "sections": [
        {
          "sectionName": "Metrics filters",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "metricsFilterControls",
              "purpose": "Allow the owner to set time period and dimension filters for the metrics tables.",
              "userActions": [
                "Set time period",
                "Apply filters",
                "Reset filters"
              ],
              "requiredEntities": [],
              "readsFields": [],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Operations metrics table",
          "mode": "view",
          "organisms": [
            {
              "organismName": "operationsMetricsTable",
              "purpose": "Display operational metrics table with bookings, revenue, utilization, and appointment status trends.",
              "userActions": [
                "View operations metrics",
                "Sort table",
                "Change aggregation window"
              ],
              "requiredEntities": [
                "Appointment",
                "Sale",
                "StaffMember"
              ],
              "readsFields": [
                "operationsMetrics.recorded_at",
                "operationsMetrics.staff_member_id",
                "operationsMetrics.service_id",
                "operationsMetrics.appointment_status",
                "operationsMetrics.metric_category",
                "operationsMetrics.booking_count",
                "operationsMetrics.revenue",
                "operationsMetrics.utilization_minutes",
                "operationsMetrics.available_minutes",
                "operationsMetrics.cancellation_count",
                "operationsMetrics.no_show_count"
              ],
              "writesFields": [],
              "rulesApplied": [
                "RULE_singleLocationScope"
              ]
            }
          ]
        },
        {
          "sectionName": "Performance metrics table",
          "mode": "view",
          "organisms": [
            {
              "organismName": "performanceMetricsTable",
              "purpose": "Display staff performance metrics including commissions, service/product revenue, and sales totals.",
              "userActions": [
                "View performance metrics",
                "Sort table",
                "Change aggregation window"
              ],
              "requiredEntities": [
                "Sale",
                "StaffMember"
              ],
              "readsFields": [
                "performanceMetrics.recorded_at",
                "performanceMetrics.staff_member_id",
                "performanceMetrics.service_id",
                "performanceMetrics.product_id",
                "performanceMetrics.commission_rule_id",
                "performanceMetrics.commission_amount",
                "performanceMetrics.service_revenue",
                "performanceMetrics.product_revenue",
                "performanceMetrics.total_revenue",
                "performanceMetrics.sale_count",
                "performanceMetrics.units_sold"
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
        "commandName": "getAdminMetricsTables",
        "purpose": "Fetch metric tables for the admin dashboard.",
        "kind": "query",
        "input": {
          "timePeriod": "string",
          "dateRange": {
            "startDate": "string",
            "endDate": "string"
          },
          "filters": {
            "staffMemberId": "string",
            "serviceId": "string",
            "productId": "string",
            "appointmentStatus": "string",
            "metricCategory": "string"
          }
        },
        "output": {
          "operationsMetricsTable": {
            "rows": [
              {
                "recordedAt": "string",
                "staffMemberId": "string",
                "serviceId": "string",
                "appointmentStatus": "string",
                "metricCategory": "string",
                "bookingCount": "number",
                "revenue": "number",
                "utilizationMinutes": "number",
                "availableMinutes": "number",
                "cancellationCount": "number",
                "noShowCount": "number"
              }
            ],
            "aggregationWindow": "string"
          },
          "performanceMetricsTable": {
            "rows": [
              {
                "recordedAt": "string",
                "staffMemberId": "string",
                "serviceId": "string",
                "productId": "string",
                "commissionRuleId": "string",
                "commissionAmount": "number",
                "serviceRevenue": "number",
                "productRevenue": "number",
                "totalRevenue": "number",
                "saleCount": "number",
                "unitsSold": "number"
              }
            ],
            "aggregationWindow": "string"
          }
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
          "RULE_singleLocationScope"
        ]
      }
    ]
  }
} as const;

export default adminMetricsDashboardPagePlan;
