export const customerDetailPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "customerDetail",
  "moduleName": "barbershopPro",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 73,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "customerDetail",
      "pageName": "Customer profile",
      "actor": "receptionist",
      "purpose": "Review and update customer details and visit history.",
      "capabilities": [
        "manageCustomers"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [
        "customer"
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
          "description": "Customer identifier for loading profile and history.",
          "entityRef": "Customer"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "customerList",
          "trigger": "Select customer"
        }
      ],
      "sections": [
        {
          "sectionName": "Customer details",
          "mode": "viewEdit",
          "organisms": [
            {
              "organismName": "CustomerProfileForm",
              "purpose": "View and update customer contact details and preferences.",
              "userActions": [
                "Edit customer details",
                "Save customer updates"
              ],
              "requiredEntities": [
                "Customer"
              ],
              "readsFields": [
                "Customer.id",
                "Customer.fullName",
                "Customer.phone",
                "Customer.email",
                "Customer.preferences",
                "Customer.notes"
              ],
              "writesFields": [
                "Customer.fullName",
                "Customer.phone",
                "Customer.email",
                "Customer.preferences",
                "Customer.notes"
              ],
              "rulesApplied": [
                "RULE_singleLocationScope"
              ]
            }
          ]
        },
        {
          "sectionName": "Visit history",
          "mode": "view",
          "organisms": [
            {
              "organismName": "CustomerVisitHistoryList",
              "purpose": "Review appointments and sales for this customer.",
              "userActions": [
                "View appointment history",
                "View sales history"
              ],
              "requiredEntities": [
                "Appointment",
                "Sale"
              ],
              "readsFields": [
                "Appointment.id",
                "Appointment.scheduledAt",
                "Appointment.serviceName",
                "Appointment.staffName",
                "Appointment.status",
                "Sale.id",
                "Sale.completedAt",
                "Sale.totalAmount",
                "Sale.itemsSummary"
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
        "commandName": "getCustomerProfile",
        "purpose": "Load customer details and visit history.",
        "kind": "query",
        "input": {
          "customerId": "string"
        },
        "output": {
          "customer": {
            "id": "string",
            "fullName": "string",
            "phone": "string",
            "email": "string",
            "preferences": "object",
            "notes": "string"
          },
          "visitHistory": {
            "appointments": [
              {
                "id": "string",
                "scheduledAt": "string",
                "serviceName": "string",
                "staffName": "string",
                "status": "string"
              }
            ],
            "sales": [
              {
                "id": "string",
                "completedAt": "string",
                "totalAmount": "number",
                "itemsSummary": "string"
              }
            ]
          }
        },
        "readsEntities": [
          "Customer",
          "Appointment",
          "Sale"
        ],
        "writesEntities": [],
        "readsTables": [
          "appointment",
          "sale"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "viewCustomerHistoryUsecase"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "RULE_singleLocationScope"
        ]
      },
      {
        "commandName": "updateCustomer",
        "purpose": "Save customer profile updates.",
        "kind": "command",
        "input": {
          "customerId": "string",
          "updates": {
            "fullName": "string",
            "phone": "string",
            "email": "string",
            "preferences": "object",
            "notes": "string"
          }
        },
        "output": {
          "customer": {
            "id": "string",
            "fullName": "string",
            "phone": "string",
            "email": "string",
            "preferences": "object",
            "notes": "string"
          }
        },
        "readsEntities": [
          "Customer"
        ],
        "writesEntities": [
          "Customer"
        ],
        "readsTables": [],
        "writesTables": [],
        "usecaseRefs": [
          "updateCustomerUsecase"
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

export default customerDetailPagePlan;
