export const commissionCalculationPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "commissionCalculation",
  "moduleName": "barbershopPro",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 92,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "commissionCalculation",
      "pageName": "Commission calculation",
      "actor": "owner",
      "purpose": "Run commission calculations and review results.",
      "capabilities": [
        "calculateCommissions"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [],
        "taskWorkflows": [],
        "automations": [
          "commissionCalculation"
        ]
      },
      "pluginRefs": [],
      "mdmRefs": [
        "commissionRule",
        "staffMember"
      ],
      "pageInputs": [
        {
          "name": "dateRange",
          "type": "dateRange",
          "required": true,
          "sources": [
            "userInput"
          ],
          "description": "Start and end dates for commission calculation window."
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "ownerDashboard",
          "trigger": "Run commission calculation"
        }
      ],
      "sections": [
        {
          "sectionName": "Calculation window",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "dateRangeSelector",
              "purpose": "Capture the date range for commission calculation.",
              "userActions": [
                "Select start date",
                "Select end date"
              ],
              "requiredEntities": [],
              "readsFields": [],
              "writesFields": [],
              "rulesApplied": [
                "commissionCalculationRequired"
              ]
            }
          ]
        },
        {
          "sectionName": "Run calculation",
          "mode": "action",
          "organisms": [
            {
              "organismName": "commissionCalculationAction",
              "purpose": "Trigger commission calculation for the selected date range.",
              "userActions": [
                "Run commission calculation"
              ],
              "requiredEntities": [
                "Sale",
                "CommissionRule",
                "StaffMember"
              ],
              "readsFields": [],
              "writesFields": [],
              "rulesApplied": [
                "commissionCalculationRequired"
              ]
            }
          ]
        },
        {
          "sectionName": "Results summary",
          "mode": "read",
          "organisms": [
            {
              "organismName": "commissionTotalsByStaff",
              "purpose": "Show commission totals by staff for the selected range.",
              "userActions": [
                "Review totals",
                "Sort by commission amount"
              ],
              "requiredEntities": [
                "StaffMember"
              ],
              "readsFields": [
                "StaffMember.name",
                "StaffMember.id"
              ],
              "writesFields": [],
              "rulesApplied": [
                "commissionCalculationRequired"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "runCommissionCalculation",
        "purpose": "Trigger commission calculation and return summary.",
        "kind": "command",
        "input": {
          "dateRange": {
            "startDate": "date",
            "endDate": "date"
          }
        },
        "output": {
          "status": "string",
          "summary": {
            "totalCommissionAmount": "number",
            "staffTotals": [
              {
                "staffMemberId": "uuid",
                "staffMemberName": "string",
                "commissionAmount": "number",
                "serviceRevenue": "number",
                "productRevenue": "number",
                "totalRevenue": "number",
                "saleCount": "number"
              }
            ]
          }
        },
        "readsEntities": [
          "Sale",
          "CommissionRule",
          "StaffMember"
        ],
        "writesEntities": [
          "Sale"
        ],
        "readsTables": [],
        "writesTables": [],
        "usecaseRefs": [
          "calculateCommissionUsecase"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "commissionCalculationRequired"
        ]
      }
    ]
  }
} as const;

export default commissionCalculationPagePlan;
