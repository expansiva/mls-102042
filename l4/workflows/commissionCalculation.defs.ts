export const commissionCalculationDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "commissionCalculation",
  "moduleName": "barbershopPro",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 60,
    "planId": ""
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "commissionCalculation",
      "title": "Commission calculation",
      "purpose": "Compute and update staff commissions for a period based on sales and configured commission rules.",
      "executionMode": "automation",
      "createsTask": false,
      "taskConfig": {
        "taskTitleTemplate": "",
        "assigneeRules": [],
        "slaRules": [],
        "taskRoomRequired": false
      },
      "actors": [
        "owner"
      ],
      "states": [
        {
          "stateId": "idle",
          "description": "Commission calculation is waiting to run."
        },
        {
          "stateId": "calculating",
          "description": "Commission calculation is in progress."
        },
        {
          "stateId": "completed",
          "description": "Commission calculation finished and metrics updated."
        },
        {
          "stateId": "failed",
          "description": "Commission calculation failed to complete."
        }
      ],
      "transitions": [
        {
          "from": "idle",
          "to": "calculating",
          "trigger": "startCalculation",
          "actor": "owner",
          "conditions": [],
          "actions": [],
          "rulesApplied": [
            "commissionCalculationRequired",
            "singleLocationScope"
          ]
        },
        {
          "from": "calculating",
          "to": "completed",
          "trigger": "calculationSucceeded",
          "actor": "owner",
          "conditions": [],
          "actions": [],
          "rulesApplied": [
            "commissionCalculationRequired",
            "singleLocationScope"
          ]
        },
        {
          "from": "calculating",
          "to": "failed",
          "trigger": "calculationFailed",
          "actor": "owner",
          "conditions": [],
          "actions": [],
          "rulesApplied": [
            "commissionCalculationRequired",
            "singleLocationScope"
          ]
        },
        {
          "from": "failed",
          "to": "calculating",
          "trigger": "retryCalculation",
          "actor": "owner",
          "conditions": [],
          "actions": [],
          "rulesApplied": [
            "commissionCalculationRequired",
            "singleLocationScope"
          ]
        }
      ],
      "requiredEntities": [
        "Sale",
        "CommissionRule",
        "StaffMember"
      ],
      "persistenceRefs": [
        "sale",
        "commission_rule",
        "staff_member"
      ],
      "usecaseRefs": [
        "calculateCommissionUsecase"
      ],
      "metricRefs": [
        "performanceMetrics"
      ],
      "userActions": [
        "runCommissionCalculation"
      ],
      "relatedPages": [],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [
        "commissionCalculationRequired",
        "singleLocationScope"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "scheduledCommissionRun",
          "title": "Schedule periodic commission recalculation",
          "priority": "soon",
          "description": "Automate nightly or weekly commission runs to ensure performance_metrics remain accurate without manual owner intervention.",
          "tradeoff": "Requires job scheduling and monitoring to avoid off-hours load spikes."
        },
        {
          "suggestionId": "commissionReviewTask",
          "title": "Create review task for commission exceptions",
          "priority": "later",
          "description": "If commission calculation detects anomalies, create a task for the owner to review before finalizing payouts.",
          "tradeoff": "Adds task workflow complexity and requires exception detection logic."
        },
        {
          "suggestionId": "noTaskAutomation",
          "title": "Keep commission calculation as automation-only",
          "priority": "now",
          "description": "No task is created because commission calculation runs as a backend automation and exceptions are handled via reporting instead of task assignment.",
          "tradeoff": "Owners must proactively monitor metrics or reports to spot issues."
        }
      ],
      "workflowScope": "singleModule",
      "moduleRefs": [
        "barbershopPro"
      ],
      "pageRefsByModule": [],
      "entityRefsByModule": [
        {
          "moduleId": "barbershopPro",
          "entity": "Sale"
        },
        {
          "moduleId": "barbershopPro",
          "entity": "CommissionRule"
        },
        {
          "moduleId": "barbershopPro",
          "entity": "StaffMember"
        }
      ],
      "writesArtifacts": [
        {
          "moduleId": "barbershopPro",
          "artifactType": "workflow",
          "artifactId": "commissionCalculation"
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/commissionCalculation.defs.ts",
      "exportName": "commissionCalculationDef",
      "saveAsDefs": true
    }
  }
} as const;

export default commissionCalculationDef;
