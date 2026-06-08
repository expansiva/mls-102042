export const requestWalkInSlotsUsecaseUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "requestWalkInSlotsUsecase",
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
      "usecaseId": "requestWalkInSlotsUsecase",
      "title": "Request walk-in time slots",
      "purpose": "Generate optimal walk-in time slots using availability and appointments.",
      "actor": "receptionist",
      "layer": "layer_3_usecases",
      "inputEntities": [
        "AvailabilitySlot",
        "Appointment",
        "StaffMember"
      ],
      "outputEntities": [
        "AvailabilitySlot"
      ],
      "readsTables": [
        "availability_slot",
        "appointment",
        "staff_member"
      ],
      "writesTables": [
        "availability_slot",
        "operations_metrics"
      ],
      "commands": [
        "requestWalkInSlots"
      ],
      "rulesApplied": [
        "singleLocationScope"
      ]
    }
  }
} as const;

export default requestWalkInSlotsUsecaseUsecasePlan;
