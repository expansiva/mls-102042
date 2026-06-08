export const createServiceUsecaseUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "createServiceUsecase",
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
      "usecaseId": "createServiceUsecase",
      "title": "Create service",
      "purpose": "Create a service with duration and price for bookings.",
      "actor": "manager",
      "layer": "layer_3_usecases",
      "inputEntities": [
        "Service"
      ],
      "outputEntities": [
        "Service"
      ],
      "readsTables": [
        "service"
      ],
      "writesTables": [
        "service"
      ],
      "commands": [
        "createService"
      ],
      "rulesApplied": [
        "serviceDurationPriceRequired",
        "singleLocationScope"
      ]
    }
  }
} as const;

export default createServiceUsecaseUsecasePlan;
