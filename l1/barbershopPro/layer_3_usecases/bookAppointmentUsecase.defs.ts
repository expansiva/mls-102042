export const bookAppointmentUsecaseUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "bookAppointmentUsecase",
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
      "usecaseId": "bookAppointmentUsecase",
      "title": "Book appointment",
      "purpose": "Create an appointment and update availability while preventing overlaps.",
      "actor": "receptionist",
      "layer": "layer_3_usecases",
      "inputEntities": [
        "Appointment",
        "AvailabilitySlot",
        "Customer",
        "StaffMember",
        "Service"
      ],
      "outputEntities": [
        "Appointment",
        "AvailabilitySlot"
      ],
      "readsTables": [
        "appointment",
        "availability_slot",
        "customer",
        "staff_member",
        "service"
      ],
      "writesTables": [
        "appointment",
        "availability_slot",
        "operations_metrics"
      ],
      "commands": [
        "bookAppointment"
      ],
      "rulesApplied": [
        "appointmentMustHaveCustomerStaffService",
        "appointmentNoOverlapPerStaff",
        "singleLocationScope"
      ]
    }
  }
} as const;

export default bookAppointmentUsecaseUsecasePlan;
