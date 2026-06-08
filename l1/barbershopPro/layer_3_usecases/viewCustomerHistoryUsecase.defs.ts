export const viewCustomerHistoryUsecaseUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "viewCustomerHistoryUsecase",
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
      "usecaseId": "viewCustomerHistoryUsecase",
      "title": "View customer visit history",
      "purpose": "Retrieve appointments and sales for a customer.",
      "actor": "receptionist",
      "layer": "layer_3_usecases",
      "inputEntities": [
        "Customer"
      ],
      "outputEntities": [
        "Appointment",
        "Sale"
      ],
      "readsTables": [
        "customer",
        "appointment",
        "sale"
      ],
      "writesTables": [],
      "commands": [
        "viewCustomerHistory"
      ],
      "rulesApplied": [
        "singleLocationScope"
      ]
    }
  }
} as const;

export default viewCustomerHistoryUsecaseUsecasePlan;
