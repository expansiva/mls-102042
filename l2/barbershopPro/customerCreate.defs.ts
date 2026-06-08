export const customerCreatePagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "customerCreate",
  "moduleName": "barbershopPro",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 72,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "customerCreate",
      "pageName": "New customer",
      "actor": "receptionist",
      "purpose": "Capture customer details for new profiles.",
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
      "pageInputs": [],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "customerList",
          "trigger": "New customer"
        },
        {
          "direction": "outbound",
          "pageId": "customerDetail",
          "trigger": "Save customer"
        }
      ],
      "sections": [
        {
          "sectionName": "Customer details",
          "mode": "create",
          "organisms": [
            {
              "organismName": "CustomerProfileForm",
              "purpose": "Collect customer identity and contact details for profile creation.",
              "userActions": [
                "Enter identity details",
                "Enter contact details"
              ],
              "requiredEntities": [
                "Customer"
              ],
              "readsFields": [],
              "writesFields": [
                "Customer.firstName",
                "Customer.lastName",
                "Customer.preferredName",
                "Customer.phone",
                "Customer.email",
                "Customer.birthDate",
                "Customer.notes"
              ],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Create customer",
          "mode": "create",
          "organisms": [
            {
              "organismName": "CreateCustomerAction",
              "purpose": "Submit the new customer profile.",
              "userActions": [
                "Create customer"
              ],
              "requiredEntities": [
                "Customer"
              ],
              "readsFields": [
                "Customer.firstName",
                "Customer.lastName",
                "Customer.preferredName",
                "Customer.phone",
                "Customer.email",
                "Customer.birthDate",
                "Customer.notes"
              ],
              "writesFields": [
                "Customer.customerId"
              ],
              "rulesApplied": []
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "createCustomer",
        "purpose": "Create a new customer profile.",
        "kind": "command",
        "input": {
          "customerProfile": {
            "firstName": "string",
            "lastName": "string",
            "preferredName": "string",
            "phone": "string",
            "email": "string",
            "birthDate": "string",
            "notes": "string"
          }
        },
        "output": {
          "customer": {
            "customerId": "string",
            "firstName": "string",
            "lastName": "string",
            "preferredName": "string",
            "phone": "string",
            "email": "string",
            "birthDate": "string",
            "notes": "string",
            "createdAt": "string"
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
          "createCustomerUsecase"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "singleLocationScope"
        ]
      }
    ]
  }
} as const;

export default customerCreatePagePlan;
