export const cancelAppointmentUsecaseUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "cancelAppointmentUsecase",
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
      "usecaseId": "cancelAppointmentUsecase",
      "title": "Cancel appointment",
      "purpose": "Cancel an appointment and update operational metrics.",
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
        "cancelAppointment"
      ],
      "rulesApplied": [
        "singleLocationScope"
      ]
    }
  }
} as const;

export default cancelAppointmentUsecaseUsecasePlan;
