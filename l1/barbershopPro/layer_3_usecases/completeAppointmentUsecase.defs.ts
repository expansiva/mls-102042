export const completeAppointmentUsecaseUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "completeAppointmentUsecase",
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
      "usecaseId": "completeAppointmentUsecase",
      "title": "Complete appointment",
      "purpose": "Mark appointment completed before checkout.",
      "actor": "receptionist",
      "layer": "layer_3_usecases",
      "inputEntities": [
        "Appointment"
      ],
      "outputEntities": [
        "Appointment"
      ],
      "readsTables": [
        "appointment"
      ],
      "writesTables": [
        "appointment",
        "operations_metrics"
      ],
      "commands": [
        "completeAppointment"
      ],
      "rulesApplied": [
        "singleLocationScope"
      ]
    }
  }
} as const;

export default completeAppointmentUsecaseUsecasePlan;
