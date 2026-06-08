export const staffPerformancePagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "staffPerformance",
  "moduleName": "barbershopPro",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 93,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "staffPerformance",
      "pageName": "Staff performance",
      "actor": "manager",
      "purpose": "Review staff performance metrics and commissions.",
      "capabilities": [
        "viewStaffPerformance"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [
        "staffMember"
      ],
      "pageInputs": [
        {
          "name": "dateRange",
          "type": "dateRange",
          "required": false,
          "sources": [
            "queryParam",
            "userSelection"
          ],
          "description": "Date range for performance metrics."
        }
      ],
      "navigationRefs": [],
      "sections": [
        {
          "sectionName": "Performance filters",
          "mode": "view",
          "organisms": [
            {
              "organismName": "dateRangeFilter",
              "purpose": "Select the time window for staff performance metrics.",
              "userActions": [
                "Select date range",
                "Apply filters"
              ],
              "requiredEntities": [],
              "readsFields": [],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Staff performance summary",
          "mode": "view",
          "organisms": [
            {
              "organismName": "staffPerformanceTable",
              "purpose": "Display performance metrics and commission summaries by staff member.",
              "userActions": [
                "View staff performance metrics"
              ],
              "requiredEntities": [
                "StaffMember"
              ],
              "readsFields": [
                "performanceMetrics.staffMember",
                "performanceMetrics.commissionAmount",
                "performanceMetrics.serviceRevenue",
                "performanceMetrics.productRevenue",
                "performanceMetrics.totalRevenue",
                "performanceMetrics.saleCount",
                "performanceMetrics.unitsSold"
              ],
              "writesFields": [],
              "rulesApplied": [
                "commissionCalculationRequired",
                "singleLocationScope"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "getStaffPerformance",
        "purpose": "Load staff performance metrics.",
        "kind": "query",
        "input": {
          "dateRange": {
            "start": "timestamptz",
            "end": "timestamptz"
          }
        },
        "output": {
          "staffPerformance": [
            {
              "staffMemberId": "uuid",
              "commissionAmount": "numeric",
              "serviceRevenue": "numeric",
              "productRevenue": "numeric",
              "totalRevenue": "numeric",
              "saleCount": "integer",
              "unitsSold": "integer"
            }
          ],
          "totals": {
            "commissionAmount": "numeric",
            "serviceRevenue": "numeric",
            "productRevenue": "numeric",
            "totalRevenue": "numeric",
            "saleCount": "integer",
            "unitsSold": "integer"
          }
        },
        "readsEntities": [
          "Sale",
          "StaffMember",
          "CommissionRule"
        ],
        "writesEntities": [],
        "readsTables": [],
        "writesTables": [],
        "usecaseRefs": [
          "viewStaffPerformanceUsecase"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "commissionCalculationRequired",
          "singleLocationScope"
        ]
      }
    ]
  }
} as const;

export default staffPerformancePagePlan;
