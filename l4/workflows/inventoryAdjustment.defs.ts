export const inventoryAdjustmentDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "inventoryAdjustment",
  "moduleName": "barbershopPro",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 59,
    "planId": ""
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "inventoryAdjustment",
      "title": "Inventory adjustment",
      "purpose": "Track manual stock adjustments and corrections through the inventory ledger while maintaining non-negative stock levels.",
      "executionMode": "entityLifecycle",
      "createsTask": false,
      "taskConfig": {
        "taskTitleTemplate": "",
        "assigneeRules": [],
        "slaRules": [],
        "taskRoomRequired": false
      },
      "actors": [
        "manager"
      ],
      "states": [
        {
          "stateId": "draft",
          "description": "Adjustment drafted but not posted to the ledger."
        },
        {
          "stateId": "posted",
          "description": "Ledger entry posted and stock updated."
        }
      ],
      "transitions": [
        {
          "from": "draft",
          "to": "posted",
          "trigger": "submitAdjustment",
          "actor": "manager",
          "conditions": [
            "inventoryCannotGoNegative",
            "singleLocationScope"
          ],
          "actions": [
            "InventoryLedger.change_type=adjustment",
            "InventoryLedger.quantity_change=<input>",
            "InventoryLedger.balance_after=<computed>",
            "InventoryLedger.entry_status=posted",
            "InventoryLedger.effective_at=now",
            "InventoryLedger.created_at=now"
          ],
          "rulesApplied": [
            "inventoryCannotGoNegative",
            "singleLocationScope"
          ]
        }
      ],
      "requiredEntities": [
        "InventoryLedger",
        "Product"
      ],
      "persistenceRefs": [
        "inventoryLedgerEntry"
      ],
      "usecaseRefs": [
        "adjustInventoryUsecase"
      ],
      "metricRefs": [],
      "userActions": [
        "submitAdjustment"
      ],
      "relatedPages": [],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [
        "inventoryCannotGoNegative",
        "singleLocationScope"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "adjustmentReasonRequired",
          "title": "Require adjustment reason",
          "priority": "now",
          "description": "Ensure every inventory ledger entry includes a change_type and notes for audit purposes.",
          "tradeoff": "Adds mandatory fields and validation on adjustment submission."
        },
        {
          "suggestionId": "noTaskWorkflow",
          "title": "No task created for adjustments",
          "priority": "soon",
          "description": "This workflow posts adjustments immediately without creating tasks to keep inventory corrections fast and manager-driven.",
          "tradeoff": "Reduced audit queue visibility compared to a task-based review flow."
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
          "entity": "InventoryLedger"
        }
      ],
      "writesArtifacts": [
        {
          "moduleId": "barbershopPro",
          "artifactType": "workflow",
          "artifactId": "inventoryAdjustment"
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/inventoryAdjustment.defs.ts",
      "exportName": "inventoryAdjustmentDef",
      "saveAsDefs": true
    }
  }
} as const;

export default inventoryAdjustmentDef;
