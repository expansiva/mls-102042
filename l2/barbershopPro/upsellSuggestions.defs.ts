export const upsellSuggestionsPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "upsellSuggestions",
  "moduleName": "barbershopPro",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 95,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "upsellSuggestions",
      "pageName": "Upsell suggestions",
      "actor": "receptionist",
      "purpose": "Request and review upsell suggestions for a customer.",
      "capabilities": [
        "llmRecommendations"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [],
        "taskWorkflows": [
          "upsellSuggestion"
        ],
        "automations": []
      },
      "pluginRefs": [
        "pluginLlmUpsell"
      ],
      "mdmRefs": [
        "customer",
        "service",
        "product"
      ],
      "pageInputs": [
        {
          "name": "customerId",
          "type": "string",
          "required": true,
          "sources": [
            "routeParam",
            "previousStepResult"
          ],
          "description": "Customer to generate upsell suggestions for.",
          "entityRef": "Customer",
          "fieldRef": "Customer.id"
        },
        {
          "name": "appointmentId",
          "type": "string",
          "required": false,
          "sources": [
            "routeParam",
            "previousStepResult",
            "query"
          ],
          "description": "Appointment context if suggestions are tied to a scheduled visit.",
          "entityRef": "Appointment",
          "fieldRef": "Appointment.id"
        },
        {
          "name": "serviceId",
          "type": "string",
          "required": false,
          "sources": [
            "routeParam",
            "previousStepResult",
            "query"
          ],
          "description": "Current service context when there is no appointment.",
          "entityRef": "Service",
          "fieldRef": "Service.id"
        }
      ],
      "navigationRefs": [
        {
          "direction": "outbound",
          "pageId": "recordSale",
          "trigger": "Add upsell item",
          "description": "Proceed to record a sale with the selected upsell item."
        }
      ],
      "sections": [
        {
          "sectionName": "Upsell request",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "UpsellRequestForm",
              "purpose": "Capture customer and service context to request upsell suggestions.",
              "userActions": [
                "Request upsell suggestions"
              ],
              "requiredEntities": [
                "Customer",
                "Service",
                "Sale"
              ],
              "readsFields": [
                "Customer.id",
                "Appointment.id",
                "Service.id"
              ],
              "writesFields": [],
              "rulesApplied": [
                "RULE_singleLocationScope"
              ]
            }
          ]
        },
        {
          "sectionName": "Suggested upsell items",
          "mode": "view",
          "organisms": [
            {
              "organismName": "UpsellSuggestionList",
              "purpose": "Show recommended services or products with rationale.",
              "userActions": [
                "Add upsell item",
                "Dismiss upsell suggestion",
                "Retry upsell suggestion"
              ],
              "requiredEntities": [
                "Service"
              ],
              "readsFields": [
                "Service.id",
                "Service.name",
                "Service.price",
                "UpsellSuggestion.rationale"
              ],
              "writesFields": [],
              "rulesApplied": [
                "RULE_singleLocationScope"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "requestUpsellSuggestions",
        "purpose": "Get upsell recommendations for a customer.",
        "kind": "command",
        "input": {
          "customerId": "string",
          "appointmentId?": "string",
          "serviceId?": "string"
        },
        "output": {
          "status": "string",
          "suggestions": [
            {
              "serviceId": "string",
              "name": "string",
              "price": "number",
              "rationale": "string"
            }
          ],
          "requestedAt": "string"
        },
        "readsEntities": [
          "Customer",
          "Service",
          "Sale"
        ],
        "writesEntities": [],
        "readsTables": [],
        "writesTables": [],
        "usecaseRefs": [
          "requestUpsellSuggestionUsecase"
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

export default upsellSuggestionsPagePlan;
