export const checkInCheckoutDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "checkInCheckout",
  "moduleName": "barbershopPro",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 58,
    "planId": ""
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "checkInCheckout",
      "title": "Check-in and checkout",
      "purpose": "Coordinate appointment check-in, service completion, and sale recording with inventory consumption and commission calculation.",
      "executionMode": "entityLifecycle",
      "createsTask": false,
      "taskConfig": {
        "taskTitleTemplate": "",
        "assigneeRules": [],
        "slaRules": [],
        "taskRoomRequired": false
      },
      "actors": [
        "receptionist"
      ],
      "states": [
        {
          "stateId": "booked",
          "description": "Appointment is booked and awaiting check-in."
        },
        {
          "stateId": "checkedIn",
          "description": "Appointment is checked in and service is in progress."
        },
        {
          "stateId": "completed",
          "description": "Service is completed and ready for checkout."
        },
        {
          "stateId": "saleRecorded",
          "description": "Sale is recorded with inventory and commission updates."
        }
      ],
      "transitions": [
        {
          "from": "booked",
          "to": "checkedIn",
          "trigger": "checkInAppointment",
          "actor": "receptionist",
          "conditions": [
            "singleLocationScope"
          ],
          "actions": [
            "Appointment.status=checkedIn"
          ],
          "rulesApplied": [
            "singleLocationScope"
          ]
        },
        {
          "from": "checkedIn",
          "to": "completed",
          "trigger": "completeAppointment",
          "actor": "receptionist",
          "conditions": [
            "singleLocationScope"
          ],
          "actions": [
            "Appointment.status=completed"
          ],
          "rulesApplied": [
            "singleLocationScope"
          ]
        },
        {
          "from": "completed",
          "to": "saleRecorded",
          "trigger": "recordSale",
          "actor": "receptionist",
          "conditions": [
            "saleRequiresCompletion",
            "inventoryCannotGoNegative",
            "commissionCalculationRequired",
            "singleLocationScope"
          ],
          "actions": [
            "InventoryLedger.entryStatus=posted"
          ],
          "rulesApplied": [
            "saleRequiresCompletion",
            "inventoryCannotGoNegative",
            "commissionCalculationRequired",
            "singleLocationScope"
          ]
        }
      ],
      "requiredEntities": [
        "Appointment",
        "Sale",
        "Product",
        "InventoryLedger",
        "CommissionRule",
        "StaffMember"
      ],
      "persistenceRefs": [
        "inventoryLedgerEntry"
      ],
      "usecaseRefs": [
        "checkInAppointmentUsecase",
        "completeAppointmentUsecase",
        "recordSaleUsecase"
      ],
      "metricRefs": [
        "operationsMetrics",
        "performanceMetrics"
      ],
      "userActions": [
        "Check in appointment",
        "Complete appointment",
        "Record sale"
      ],
      "relatedPages": [],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [
        "saleRequiresCompletion",
        "inventoryCannotGoNegative",
        "commissionCalculationRequired",
        "singleLocationScope"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "atomicSaleInventoryUpdate",
          "title": "Atomic sale and inventory update",
          "priority": "now",
          "description": "Record sale and create inventory_ledger_entry in a single transaction to enforce inventoryCannotGoNegative and keep metrics consistent.",
          "tradeoff": "Requires transactional handling across sale and inventory writes in recordSaleUsecase."
        },
        {
          "suggestionId": "commissionAutoCalc",
          "title": "Auto-calculate commissions on checkout",
          "priority": "now",
          "description": "Trigger commission calculation immediately after sale recording to keep performance_metrics current.",
          "tradeoff": "Adds processing time to checkout; may need async handling for high volume."
        },
        {
          "suggestionId": "noTaskWorkflow",
          "title": "No task generated for checkout",
          "priority": "soon",
          "description": "This workflow does not create tasks; keep the flow event-driven through usecases and page actions only.",
          "tradeoff": "Requires UI prompts or alerts if manual follow-up is needed."
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
          "entity": "Appointment"
        },
        {
          "moduleId": "barbershopPro",
          "entity": "Sale"
        },
        {
          "moduleId": "barbershopPro",
          "entity": "Product"
        },
        {
          "moduleId": "barbershopPro",
          "entity": "InventoryLedger"
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
          "artifactId": "checkInCheckout"
        },
        {
          "moduleId": "barbershopPro",
          "artifactType": "usecase",
          "artifactId": "checkInAppointmentUsecase"
        },
        {
          "moduleId": "barbershopPro",
          "artifactType": "usecase",
          "artifactId": "completeAppointmentUsecase"
        },
        {
          "moduleId": "barbershopPro",
          "artifactType": "usecase",
          "artifactId": "recordSaleUsecase"
        },
        {
          "moduleId": "barbershopPro",
          "artifactType": "metricTable",
          "artifactId": "operationsMetrics"
        },
        {
          "moduleId": "barbershopPro",
          "artifactType": "metricTable",
          "artifactId": "performanceMetrics"
        },
        {
          "moduleId": "barbershopPro",
          "artifactType": "table",
          "artifactId": "inventoryLedgerEntry"
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/checkInCheckout.defs.ts",
      "exportName": "checkInCheckoutDef",
      "saveAsDefs": true
    }
  }
} as const;

export default checkInCheckoutDef;
