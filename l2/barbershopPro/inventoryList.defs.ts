export const inventoryListPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "inventoryList",
  "moduleName": "barbershopPro",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 90,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "inventoryList",
      "pageName": "Inventory",
      "actor": "manager",
      "purpose": "Review inventory levels and adjustments.",
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
      "pageInputs": [],
      "navigationRefs": [
        {
          "direction": "outbound",
          "pageId": "inventoryAdjust",
          "trigger": "Adjust inventory",
          "description": "Navigate to record an inventory adjustment."
        }
      ],
      "sections": [
        {
          "sectionName": "Inventory overview",
          "mode": "view",
          "organisms": [
            {
              "organismName": "inventoryLevelsTable",
              "purpose": "Display current stock levels per product with recent balance info.",
              "userActions": [
                "Adjust inventory",
                "Filter inventory",
                "View ledger summary"
              ],
              "requiredEntities": [
                "Product",
                "InventoryLedger"
              ],
              "readsFields": [
                "Product.productId",
                "Product.name",
                "Product.sku",
                "InventoryLedger.balance_after",
                "InventoryLedger.effective_at",
                "InventoryLedger.entry_status"
              ],
              "writesFields": [],
              "rulesApplied": [
                "inventoryCannotGoNegative"
              ]
            },
            {
              "organismName": "inventoryLedgerSummary",
              "purpose": "Show recent inventory adjustments and totals.",
              "userActions": [
                "Filter by date",
                "View entry details"
              ],
              "requiredEntities": [
                "InventoryLedger",
                "Product"
              ],
              "readsFields": [
                "InventoryLedger.inventory_ledger_entry_id",
                "InventoryLedger.product_id",
                "InventoryLedger.change_type",
                "InventoryLedger.quantity_change",
                "InventoryLedger.balance_after",
                "InventoryLedger.entry_status",
                "InventoryLedger.effective_at",
                "Product.name"
              ],
              "writesFields": [],
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
        "commandName": "getInventoryLevels",
        "purpose": "Load current inventory levels and ledger summary for inventory review.",
        "kind": "query",
        "input": {
          "filters": {
            "productQuery": "string?",
            "status": "string?",
            "fromDate": "string?",
            "toDate": "string?",
            "limit": "number?",
            "offset": "number?"
          }
        },
        "output": {
          "inventoryLevels": [
            {
              "productId": "string",
              "productName": "string",
              "sku": "string",
              "currentBalance": "number",
              "lastUpdatedAt": "string"
            }
          ],
          "ledgerSummary": [
            {
              "inventoryLedgerEntryId": "string",
              "productId": "string",
              "productName": "string",
              "changeType": "string",
              "quantityChange": "number",
              "balanceAfter": "number",
              "entryStatus": "string",
              "effectiveAt": "string"
            }
          ]
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
      }
    ]
  }
} as const;

export default inventoryListPagePlan;
