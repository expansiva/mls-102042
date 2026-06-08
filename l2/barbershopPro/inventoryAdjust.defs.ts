export const inventoryAdjustPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "inventoryAdjust",
  "moduleName": "barbershopPro",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 91,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "inventoryAdjust",
      "pageName": "Adjust inventory",
      "actor": "manager",
      "purpose": "Record inventory adjustments with reason codes.",
      "capabilities": [
        "trackInventory"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "inventoryAdjustment"
        ],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [
        "product"
      ],
      "pageInputs": [
        {
          "name": "productId",
          "type": "uuid",
          "required": true,
          "sources": [
            "routeParam",
            "previousStepResult"
          ],
          "description": "Product to adjust inventory for.",
          "entityRef": "Product",
          "fieldRef": "Product.id"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "inventoryList",
          "trigger": "Adjust inventory"
        },
        {
          "direction": "outbound",
          "pageId": "inventoryList",
          "trigger": "Adjustment saved"
        }
      ],
      "sections": [
        {
          "sectionName": "Product context",
          "mode": "view",
          "organisms": [
            {
              "organismName": "ProductSummary",
              "purpose": "Show the selected product and current stock context for the adjustment.",
              "userActions": [],
              "requiredEntities": [
                "Product",
                "InventoryLedger"
              ],
              "readsFields": [
                "Product.id",
                "Product.title",
                "Product.sku",
                "InventoryLedger.balance_after",
                "InventoryLedger.effective_at"
              ],
              "writesFields": [],
              "rulesApplied": [
                "inventoryCannotGoNegative"
              ]
            }
          ]
        },
        {
          "sectionName": "Adjustment entry",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "InventoryAdjustmentForm",
              "purpose": "Capture adjustment quantity and reason and submit the adjustment.",
              "userActions": [
                "Adjust inventory"
              ],
              "requiredEntities": [
                "InventoryLedger",
                "Product"
              ],
              "readsFields": [
                "Product.id"
              ],
              "writesFields": [
                "InventoryLedger.change_type",
                "InventoryLedger.quantity_change",
                "InventoryLedger.entry_status",
                "InventoryLedger.effective_at",
                "InventoryLedger.created_at",
                "InventoryLedger.balance_after"
              ],
              "rulesApplied": [
                "inventoryCannotGoNegative"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "getProductAdjustmentContext",
        "purpose": "Load product details and current stock context for the adjustment.",
        "kind": "query",
        "input": {
          "productId": "uuid"
        },
        "output": {
          "product": {
            "id": "uuid",
            "title": "string",
            "sku": "string"
          },
          "currentStock": {
            "balanceAfter": "integer",
            "effectiveAt": "timestamptz"
          }
        },
        "readsEntities": [
          "Product",
          "InventoryLedger"
        ],
        "writesEntities": [],
        "readsTables": [
          "inventory_ledger_entry"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "adjustInventoryUsecase"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "inventoryCannotGoNegative"
        ]
      },
      {
        "commandName": "adjustInventory",
        "purpose": "Record inventory adjustment and update ledger.",
        "kind": "command",
        "input": {
          "productId": "uuid",
          "quantity": "integer",
          "reason": "string"
        },
        "output": {
          "ledgerEntry": {
            "inventoryLedgerEntryId": "uuid",
            "productId": "uuid",
            "changeType": "string",
            "quantityChange": "integer",
            "balanceAfter": "integer",
            "entryStatus": "string",
            "effectiveAt": "timestamptz",
            "createdAt": "timestamptz"
          },
          "updatedStock": {
            "productId": "uuid",
            "balanceAfter": "integer"
          }
        },
        "readsEntities": [
          "Product",
          "InventoryLedger"
        ],
        "writesEntities": [
          "InventoryLedger"
        ],
        "readsTables": [
          "inventory_ledger_entry"
        ],
        "writesTables": [
          "inventory_ledger_entry"
        ],
        "usecaseRefs": [
          "adjustInventoryUsecase"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "inventoryCannotGoNegative"
        ]
      }
    ]
  }
} as const;

export default inventoryAdjustPagePlan;
