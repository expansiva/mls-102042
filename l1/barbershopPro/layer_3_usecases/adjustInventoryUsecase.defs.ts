export const adjustInventoryUsecaseUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "adjustInventoryUsecase",
  "moduleName": "barbershopPro",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseEntities",
    "stepId": 51,
    "planId": "plan-index-critic:usecasePlan:1"
  },
  "data": {
    "backendArchitecture": {
      "pattern": "layered",
      "layer1Responsibility": "Persist external and module-owned tables, including metrics tables in layer_1_external.",
      "layer2Responsibility": "Expose controllers/BFF endpoints that must call layer_3_usecases and never access tables directly.",
      "layer3Responsibility": "Implement business use cases, enforce rules, and be the only layer that reads/writes layer_1_external tables."
    },
    "controllerRules": {
      "bffMustCallUsecases": true,
      "bffDirectTableAccessForbidden": true
    },
    "usecase": {
      "usecaseId": "adjustInventoryUsecase",
      "title": "Adjust inventory",
      "purpose": "Apply manual stock adjustments and update inventory ledger.",
      "actor": "manager",
      "layer": "layer_3_usecases",
      "inputEntities": [
        "InventoryLedger",
        "Product"
      ],
      "outputEntities": [
        "InventoryLedger"
      ],
      "readsTables": [
        "inventory_ledger_entry",
        "product"
      ],
      "writesTables": [
        "inventory_ledger_entry"
      ],
      "commands": [
        "adjustInventory"
      ],
      "rulesApplied": [
        "inventoryCannotGoNegative",
        "singleLocationScope"
      ]
    }
  }
} as const;

export default adjustInventoryUsecaseUsecasePlan;
