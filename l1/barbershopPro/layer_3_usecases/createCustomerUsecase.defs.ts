export const createCustomerUsecaseUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "createCustomerUsecase",
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
      "usecaseId": "createCustomerUsecase",
      "title": "Create customer",
      "purpose": "Create a customer profile for bookings and sales.",
      "actor": "receptionist",
      "layer": "layer_3_usecases",
      "inputEntities": [
        "Customer"
      ],
      "outputEntities": [
        "Customer"
      ],
      "readsTables": [
        "customer"
      ],
      "writesTables": [
        "customer"
      ],
      "commands": [
        "createCustomer"
      ],
      "rulesApplied": [
        "singleLocationScope"
      ]
    }
  }
} as const;

export default createCustomerUsecaseUsecasePlan;
